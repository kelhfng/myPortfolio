"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // 精確對接你安裝好的 sonner

export default function ContactSection() {
  // 1. 宣告 Form 狀態管理
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // 2. 處理 Input 改變
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 3. 處理表單發送
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 💥 欄位驗證：使用優雅的 Sonner Toast
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Validation Error / 輸入錯誤", {
        description: "請填寫所有欄位，讓 Kelvin 能夠順利聯絡到您喔！",
        className: "font-mono text-xs",
      });
      return;
    }

    setStatus("loading");

    try {
      // 📡 真正串接我們剛才建立的 Resend 發信後端 API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // 如果後端傳回非 200 狀態碼（例如 400 或 500），直接丟出錯誤
      if (!response.ok) {
        throw new Error("API response error");
      }

      // 發送成功後重置表單
      setFormData({ name: "", email: "", message: "" });
      setStatus("success");

      // 🎉 發送成功：Sonner 綠色成功 Toast
      toast.success("Message Sent / 發送成功", {
        description: "您的留言已順利送出，信件已直達 Kelvin 的收件匣！",
        className: "font-mono text-xs",
      });

      // 3秒後恢復按鈕原始狀態
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("發送留言失敗:", error);
      setStatus("error");

      // ❌ 系統失敗：Sonner 紅色錯誤 Toast
      toast.error("System Error / 發送失敗", {
        description: "伺服器暫時沒有回應，請稍後再試，或直接經由 Email 聯絡 Kelvin。",
        className: "font-mono text-xs",
      });

      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-12 lg:py-24">
      {/* 頁面大標題 */}
      <div className="mb-16 max-w-2xl">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
          Connect / 聯絡方式
        </h2>
        <p className="mt-3 font-mono text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
          來聊聊科技或 AI 應用的無限可能吧
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
        {/* 左側：硬核工程師的 JSON 聯絡規格書 */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-6 font-mono text-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <span className="text-xs text-slate-400">
                ENDPOINT: /api/contact
              </span>
              <span className="inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                POST 200 OK
              </span>
            </div>

            {/* JSON 展示（即時動態連動，科技感十足） */}
            <pre className="mt-6 overflow-x-auto text-slate-700 dark:text-slate-300">
              <code>{`{
  "name": "${formData.name || "Your Name"}",
  "channels": {
    "email": "${formData.email || "sample@sample.com"}"
  },
  "timezone": "UTC+8 (HK)",
  "message": "${formData.message || "Hi, I want to know more about..."}"
}`}</code>
            </pre>
          </div>

          {/* 快捷直達連結 */}
          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <p className="text-xs text-slate-400 mb-3">// Quick Redirect</p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <a
                href="mailto:kelvinnghoifung@gmail.com"
                className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                Email &rarr;
              </a>

              <a
                href="https://www.linkedin.com/in/kelvin-hoi-fung/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                LinkedIn &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* 右側：極簡呼吸感留言區 */}
        <div className="flex flex-col justify-center">
          <p className="font-mono text-xs text-slate-400 mb-6">
            // Drop a message / 聯絡我
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                Name / 稱呼
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
                className="mt-2 block w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:indigo-500 dark:border-slate-800 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 disabled:opacity-50"
                placeholder="HR / Tech Lead"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                Email / 電郵地址
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
                className="mt-2 block w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:indigo-500 dark:border-slate-800 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 disabled:opacity-50"
                placeholder="contact@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                Message / 內容
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading"}
                className="mt-2 block w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:indigo-500 dark:border-slate-800 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 disabled:opacity-50"
                placeholder="想要邀請您進行面試，或是討論合作..."
              />
            </div>

            {/* 根據狀態動態調整按鈕文字 */}
            <Button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`w-full font-mono text-xs transition-all ${status === "success" ? "bg-emerald-600 hover:bg-emerald-600 text-white" : ""
                }`}
            >
              {status === "idle" && "send_message()"}
              {status === "loading" && "sending_to_gmail..."}
              {status === "success" && "email_dispatched_successfully! ✓"}
              {status === "error" && "failed_to_send_try_again_xf00"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}