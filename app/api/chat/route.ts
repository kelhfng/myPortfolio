export const dynamic = "force-dynamic";
export const maxDuration = 60; // 允許長達 60 秒的串流生成，避免 Vercel 10 秒預設逾時

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { kv } from "@vercel/kv"; // 🔥 引入 Vercel KV
import fs from "fs";
import path from "path";

// 初始化 Gemini SDK，自動抓取 process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    // 1. 解析前端傳過來的 JSON 資料
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "無效的對話紀錄 (messages)" },
        { status: 400 }
      );
    }

    // 2. 獲取使用者最後一次的提問
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const lowerMessage = lastUserMessage.toLowerCase();

    // 從 Header 獲取 Vercel 提供的真實訪客 IP (若在本地測試會拿到 127.0.0.1)
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";

    // 2. 🪐 【Vercel KV 核心實作：記錄有人問過什麼】
    // 非同步寫入 Redis，不使用 await 阻塞後續 Gemini 的串流生成
    try {
      const logData = {
        timestamp: new Date().toISOString(),
        ip: ip.split(',')[0].trim(), // 只取第一個真實 IP
        question: lastUserMessage
      };

      kv.lpush("resume_agent_logs", JSON.stringify(logData))
        .then(() => kv.ltrim("resume_agent_logs", 0, 999))
        .catch((kvLogError) => {
          console.error("Vercel KV 寫入日誌失敗 (不影響用戶正常對話):", kvLogError);
        });
    } catch (kvLogError) {
      console.error("Vercel KV 準備日誌失敗 (不影響用戶正常對話):", kvLogError);
    }

    // 3. 【Hard-Rule 安全過濾攔截】
    const allowedKeywords = [
      "kelvin", "ng", "hoifung", "hoi fung", "你", "您", "工程師", "擁有者",
      "cv", "resume", "履歷", "自薦", "背景", "學歷", "學位", "經歷", "工作", "職位", "職稱", "資歷",
      "judiciary", "boc", "hkirc", "hkdnr", "司法機構", "中銀", "銀行", "法院", "審裁處", "互聯網註冊",
      "java", "spring", "boot", "mvc", "jsf", "primefaces", "php", "wordpress", "python",
      "javascript", "typescript", "jquery", "react", "angular", "html", "css", "tailwind", "shadcn",
      "sql", "oracle", "mysql", "dbms", "bash", "shell", "script", "unix", "linux", "putty", "apache", "jboss",
      "專案", "project", "預約", "appointment", "iam smart", "智方便", "quota", "名額", "劃位", "鎖定",
      "破產", "distress", "遺產", "probate", "聆訊", "hearing", "報銷", "expense", "vendor", "供應商",
      "碳排放", "esg", "域名", "domain", "phishing", "釣魚", "promotional", "促銷", "結帳", "checkout",
      "vulnerability", "弱點", "掃描", "owasp", "zap", "漏洞", "修補", "patch", "crash", "當機", "崩潰",
      "web2social", "社群", "api", "restful", "json", "uat", "sit", "test", "測試", "case", "stress",
      "壓力測試", "併發", "concurrency", "log", "tracing", "日誌", "追蹤", "排查", "bug", "hacks",
      "deployment", "部署", "上線", "batch", "job", "排程", "排他", "衝突", "routing", "load balancer",
      "權限", "access control", "優勢", "強項", "專長", "會不會", "有沒有", "懂不懂", "做過", "負責",
      "解決", "處理", "溝通", "排錯"
    ];

    const hasMatched = allowedKeywords.some(keyword => lowerMessage.includes(keyword));

    // 如果完全沒有命中任何關鍵字，直接回傳普通文字（前端 Stream 讀取器也能正常解析）
    if (!hasMatched) {
      return new Response("您好，我是 Kelvin 的 AI 履歷助理。我只能回答與 Kelvin 的工作經歷、技術專案或學經歷相關的問題。請問您想了解他的哪一段專案經驗呢？", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // 4. 【Long-Context 讀取】
    let resumeContext = "";
    try {
      const filePath = path.join(process.cwd(), "lib", "resume.md");
      resumeContext = fs.readFileSync(filePath, "utf8");
    } catch (fsError) {
      console.error("讀取 resume.md 失敗:", fsError);
    }

    // 5. 格式化歷史訊息符合官方 SDK 規範
    // (1) 過濾掉前端預設的第一則純 UI 歡迎詞 (若是 model 開頭則不送入歷史，因為 Gemini 規定 contents 必須以 user 開頭)
    const validMessages = messages.filter((msg: any, idx: number) => {
      if (idx === 0 && (msg.role === "model" || msg.role === "assistant")) {
        return false;
      }
      return true;
    });

    // (2) 正確對齊角色映射：前端傳入的 role 為 "user" 或 "model"
    const formattedContents = validMessages.map((msg: any) => ({
      role: (msg.role === "assistant" || msg.role === "model") ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // 6. 呼叫 Gemini API 進行【文字串流生成】
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: `
          你是一位專業的 AI 履歷特工 (AI Resume Agent)，正在主持此網站擁有者 Kelvin NG (Hoi Fung) 的個人作品集網站。
          你的任務是向招聘官、面試官或技術同好介紹這位工程師的優勢。
          
          【核心人設與語氣】
          1. 內斂、專業、硬核、有條理。不使用過度誇張的推銷詞彙，而是用技術實力與架構思維打動人。
          2. 回答時展現對 Java (Spring Boot, Oracle) 與 AI 整合開發的深刻理解。
          3. 預設使用繁體中文 (香港) 回答，稱呼本網站擁有者為 Kelvin。
          4. 回答請結構分明、重點突出、精簡到位，避免冗長空話，並確保語意完整結尾。

          【你必須完全依據的履歷與專案背景資訊】
          以下是 Kelvin 的完整官方履歷與精選專案细節，請百分之百結合這些內容來精準回答，絕不編造事實：
          \n${resumeContext || "（目前無法讀取參考資料，請溫和提醒稍後再試）"}
        `,
        temperature: 0.5,
        maxOutputTokens: 4096, // 提高上限至 4096 tokens，確保繁體中文字元（約 1.5~2.5 tokens/字）能完整輸出而不被腰斬
      },
    });

    // 7. 建立 Web ReadableStream 將 Chunk 逐字推送給前端
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    // 回傳 Chunked 串流回應
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Accel-Buffering": "no", // 🔥 關鍵：強制關閉 Vercel/Nginx 的快取機制，實現真正的即時串流
        "Cache-Control": "no-cache, no-transform",
      },
    });

  } catch (error: any) {
    console.error("Gemini Stream Error:", error);

    const errorMessage = error?.message || "";
    const isQuotaExceeded = error?.status === 429 ||
      errorMessage.includes("quota") ||
      errorMessage.includes("Quota exceeded") ||
      errorMessage.includes("429");

    if (isQuotaExceeded) {
      return new Response("【系統提示】您好，真是抱歉！由於目前體驗人數較多，Kelvin 的 AI 助理本日的免費額度（Quota）已經用光了 🥲。請您稍等一段時間（大約一天後）再來與我聊天，或者您可以稍後重新整理頁面再試試看。謝謝您的包容！", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    return new Response(`💥 伺服器內部錯誤，無法啟動 AI Agent: ${error.message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
