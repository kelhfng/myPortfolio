import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
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

    // 3. 【Hard-Rule 安全過濾攔截】
    // 嚴格檢查是否與 Kelvin 的工作、專案、技術、背景相關
    const allowedKeywords = [
      // 1. 基本人稱與文件類 (已包含並優化)
      "kelvin", "ng", "hoifung", "hoi fung", "你", "您", "工程師", "擁有者",
      "cv", "resume", "履歷", "自薦", "背景", "學歷", "學位", "經歷", "工作", "職位", "職稱", "資歷",

      // 2. 任職機構與部門名稱 (精準對齊您的背景)
      "judiciary", "boc", "hkirc", "hkdnr", "司法機構", "中銀", "銀行", "法院", "審裁處", "互聯網註冊",

      // 3. 核心技術 - 程式語言與框架 (面試官最常直接丟技術名發問)
      "java", "spring", "boot", "mvc", "jsf", "primefaces", "php", "wordpress", "python",
      "javascript", "typescript", "jquery", "react", "angular", "html", "css", "tailwind", "shadcn",
      "sql", "oracle", "mysql", "dbms", "bash", "shell", "script", "unix", "linux", "putty", "apache", "jboss",

      // 4. 專案核心商業邏輯與專有名詞 (防止提及具體技術細節時被攔截)
      "專案", "project", "預約", "appointment", "iam smart", "智方便", "quota", "名額", "劃位", "鎖定",
      "破產", "distress", "遺產", "probate", "聆訊", "hearing", "報銷", "expense", "vendor", "供應商",
      "碳排放", "esg", "域名", "domain", "phishing", "釣魚", "promotional", "促銷", "結帳", "checkout",
      "vulnerability", "弱點", "掃描", "owasp", "zap", "漏洞", "修補", "patch", "crash", "當機", "崩潰",
      "web2social", "社群", "api", "restful", "json",

      // 5. 工程實踐、測試與支持術語
      "uat", "sit", "test", "測試", "case", "stress", "壓力測試", "併發", "concurrency",
      "log", "tracing", "日誌", "追蹤", "排查", "bug", "hacks", "deployment", "部署", "上線",
      "batch", "job", "排程", "排他", "衝突", "routing", "load balancer", "權限", "access control",

      // 6. 常見軟實力與問句關鍵字 (招聘者常用的開頭)
      "優勢", "強項", "專長", "會不會", "有沒有", "懂不懂", "做過", "負責", "解決", "處理", "溝通", "排錯"
    ];

    const hasMatched = allowedKeywords.some(keyword => lowerMessage.includes(keyword));

    // 如果完全沒有命中任何關鍵字，直接攔截，絕不呼叫 Gemini API 浪費 Token
    if (!hasMatched) {
      return NextResponse.json({
        text: "您好，我是 Kelvin 的 AI 履歷助理。我只能回答與 Kelvin 的工作經歷、技術專案或學經歷相關的問題。請問您想了解他的哪一段專案經驗呢？"
      });
    }

    // 4. 【Long-Context 讀取】直接用 Node.js fs 讀取根目錄下的 content/resume.md
    let resumeContext = "";
    try {
      const filePath = path.join(process.cwd(), "lib", "resume.md");
      resumeContext = fs.readFileSync(filePath, "utf8");
    } catch (fsError) {
      console.error("讀取 resume.md 失敗:", fsError);
      // 若檔案讀取失敗，依然交給已知人設處理，不中斷系統
    }

    // 5. 格式化歷史訊息符合官方 SDK 規範
    const formattedContents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // 6. 呼叫 Gemini API 進行文本生成
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // 採用當前主力高效能且高 Context 的 flash 模型
      contents: formattedContents,
      config: {
        systemInstruction: `
          你是一位專業的 AI 履歷特工 (AI Resume Agent)，正在主持此網站擁有者 Kelvin NG (Hoi Fung) 的個人作品集網站。
          你的任務是向招聘官、面試官或技術同好介紹這位工程師的優勢。
          
          【核心人設與語氣】
          1. 內斂、專業、硬核、有條理。不使用過度誇張的推銷詞彙，而是用技術實力與架構思維打動人。
          2. 回答時展現對 Java (Spring Boot, Oracle) 與 AI 整合開發的深刻理解。
          3. 預設使用繁體中文 (香港) 回答，稱呼本網站擁有者為 Kelvin。
          4. 限制回覆的內容精簡到位，長度在1000字內。

          【你必須完全依據的履歷與專案背景資訊】
          以下是 Kelvin 的完整官方履歷與精選專案细節，請百分之百結合這些內容來精準回答，絕不編造事實：
          ${resumeContext || "（目前無法讀取參考資料，請溫和提醒稍後再試）"}
        `,
        temperature: 0.5, // 降低隨機性，使其完全對齊履歷真實資料
        maxOutputTokens: 1000,
      },
    });

    // 7. 取得生成文字並回傳給前端
    const replyText = response.text;
    return NextResponse.json({ text: replyText });


  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // 偵測是否為 Quota Exceeded (429) 錯誤
    const errorMessage = error?.message || "";
    const isQuotaExceeded = error?.status === 429 ||
      errorMessage.includes("quota") ||
      errorMessage.includes("Quota exceeded") ||
      errorMessage.includes("429");

    if (isQuotaExceeded) {
      // 溫和地提示用戶，不顯示可怕的系統崩潰訊息
      return NextResponse.json({
        text: "【系統提示】您好，真是抱歉！由於目前體驗人數較多，Kelvin 的 AI 助理本日的免費額度（Quota）已經用光了 🥲。請您稍等一段時間（大約一天後）再來與我聊天，或者您可以稍後重新整理頁面再試試看。謝謝您的包容！"
      });
    }

    // 其他真正的伺服器內部錯誤才走 500
    return NextResponse.json(
      { error: "伺服器內部錯誤，無法啟動 AI Agent", details: error.message },
      { status: 500 }
    );
  }
}