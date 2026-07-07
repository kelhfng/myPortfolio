import { NextResponse } from "next/server";
import { Resend } from "resend";

// 初始化 Resend，會自動讀取我們剛才設定的環境變數
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // 後端基礎防禦：確保數據不是空的
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Validation failed: Missing fields" },
                { status: 400 }
            );
        }

        // 調用 Resend 發送郵件到你的 Gmail
        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // 免費帳號預設只能用這個發件人
            to: ["kelvinnghoifung@gmail.com"], // 接收你個人網站留言的 Gmail
            subject: `💼 來自作品集的新留言：${name}`,
            html: `
        <h3>您的個人網站收到了一則新的訊息：</h3>
        <p><strong>稱呼 / Name:</strong> ${name}</p>
        <p><strong>電郵 / Email:</strong> ${email}</p>
        <p><strong>訊息內容 / Message:</strong></p>
        <div style="padding: 12px; background: #f4f4f5; border-radius: 6px; font-family: monospace;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <br>
        <hr />
        <p style="font-size: 12px; color: #71717a;">本郵件由您的 Next.js Portfolio + Resend 自動轉發。</p>
      `,
        });

        if (error) {
            console.error("Resend 服務出錯:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (err: any) {
        console.error("API 路由發生未預期錯誤:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}