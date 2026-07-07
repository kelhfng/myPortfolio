# 專案當前進度與架構規範

## 1. 核心技術 (Tech Stack)

- 框架：Next.js (App Router, 無 src/ 資料夾)
- 語言：TypeScript (.tsx)
- UI 庫：Tailwind CSS + Shadcn/ui (包含 next-themes 亮暗模式)

## 2. 目前已完成功能

- 基礎建設：全域導覽列 (Navbar) 與亮暗模式切換 (ThemeProvider 融合於 app/layout.tsx)。
- 首頁 (Hero Section)：極簡技術文件風、等寬字型、個人技術標籤牆已完工。
- 後端 API：`app/api/chat/route.ts` 已打通，串接 Gemini API，具備 Resume Agent 的 System Instruction。
- 前端 UI：`app/resume-agent/page.tsx` 性感對話視窗已完工，支援打字動畫與自動滾動。
- 靜態頁面：聯絡我 (Contact) 頁面表單已完工，並修復了 Client Component (use client) 的事件監聽錯誤。

## 3. 下一步行動

## 3. 下一步行動

- **實作 Git-based MDX 部落格系統**：於根目錄建立 `content/blog/` 資料夾，設定 Next.js 的動態路由（Dynamic Routing）`app/blog/[slug]/page.tsx`，以原生讀檔（fs + gray-matter）或內建 MDX 支援讀取靜態 Markdown 文章，達成完全零成本、無外部 Database 的學習筆記內容輸出。
- **本地端全方位對話情境測試**：實測 AI Resume Agent 在本機運行的狀況，驗證以下場景：
  1. 輸入無關字句（如天氣、寫詩）是否能被 Hard-Rule 完美阻截並吐出友善提示。
  2. 輸入特定技術關鍵字（如 Java, UAT, Log Tracing）是否能精準帶出 `content/resume.md` 內的對應專案細節。
- **正式環境部署（Vercel Deployment）**：將專案推上 GitHub，並在 Vercel 託管平台完成 Hobby Tier 的部署。於 Vercel 後台正確設定 `GEMINI_API_KEY` 環境變數，確保線上運行環境正常。
