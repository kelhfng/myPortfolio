"use client";

import { Button } from "@/components/ui/button";

export default function ContactSection() {
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
                ENDPOINT: /api/developer/contact
              </span>
              <span className="inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                GET 200 OK
              </span>
            </div>

            {/* JSON 展示 */}
            <pre className="mt-6 overflow-x-auto text-slate-700 dark:text-slate-300">
              <code>{`{
  "name": "Your Name",
  "role": "Full-Stack Engineer",
  "status": "Open for Opportunities",
  "channels": {
    "email": "[EMAIL_ADDRESS]",
    "github": "github.com/your-username",
    "linkedin": "linkedin.com/in/your-profile"
  },
  "timezone": "UTC+8 (HK)",
  "preferred_stack": ["Java","Next.js"]
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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                suppressHydrationWarning
                className="mt-2 block w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:indigo-500 dark:border-slate-800 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                placeholder="HR / Tech Lead"
              />
            </div>

            <div suppressHydrationWarning>
              <label
                htmlFor="email"
                className="block font-mono text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                Email / 電郵地址
              </label>
              <input
                type="email"
                id="email"
                suppressHydrationWarning
                className="mt-2 block w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:indigo-500 dark:border-slate-800 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                placeholder="contact@company.com"
              />
            </div>

            <div suppressHydrationWarning>
              <label
                htmlFor="message"
                className="block font-mono text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                Message / 內容
              </label>
              <textarea
                id="message"
                rows={4}
                suppressHydrationWarning
                className="mt-2 block w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:indigo-500 dark:border-slate-800 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                placeholder="想要邀請您進行面試，或是討論合作..."
              />
            </div>

            <Button type="submit" className="w-full font-mono text-xs">
              send_message()
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
