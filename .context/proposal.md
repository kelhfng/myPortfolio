# 個人作品集網站開發企劃書 (Portfolio Website Proposal)

## 1. 專案目標

- 製作一個零運行成本（$0 月租費）的個人作品集網站，並部署至網際網路供招聘者檢閱。
- 核心定位：展現具備「Java 後端基礎」與「AI/全端開發能力」的現代軟體工程師形象。

## 2. 技術棧與基礎建設 (Tech Stack & Infrastructure)

- **前端與核心框架**：Next.js (App Router)。
- **UI 與樣式**：Tailwind CSS + Shadcn/ui。
- **網頁部署與託管**：Vercel (Hobby Tier, $0 成本)。
- **程式碼託管**：GitHub (Free)。
- **內容管理 (CMS)**：Git-based MDX (無資料庫的本地檔案架構)。
- **AI 互動後端**：Google AI Studio (Gemini API Free Tier) 結合 Vercel Serverless Functions。

## 3. 網站架構與核心頁面 (Pages Layout)

本網站採用多頁面 (Multi-page) 架構，包含以下五大核心模組：

1. **首頁 (Hero Section)**
   - 極簡專業風，包含個人定位（Java To AI Full-Stack）、大頭貼、靜態聯絡連結（GitHub, LinkedIn, Email）。
   - 特定技術標籤牆（Java, Spring Boot, Next.js, LlamaIndex, RAG）。

2. **精選專案 (Case Studies Gallery) 💡 [根據反饋更新]**
   - **`/projects` 主列表頁**：拒絕傳統空曠的卡片佈局，採用**【交錯式大圖文】**縱向排列。左邊為系統架構圖/截圖，右邊為深度摘要，上下專案左右交錯。
   - **`/projects/[slug]` 專屬詳情頁**：點擊摘要可進入獨立頁面，以技術報告（Case Study）形式呈現，內容維度固定為：
     - **專案背景**：開發此系統的初衷與應用場景。
     - **技術架構**：系統元件串接邏輯（如 Java 後端與 Next.js/AI 的協作）。
     - **核心挑戰**：開發過程中遇到的痛點與具體解決方案。
     - **收穫與展望**：專案帶來的技術沉澱與下一步優化方向。

3. **個人經歷 (Experience / Timeline)**
   - 時間軸設計，強調工作經歷、學歷與技術底蘊的累積。

4. **AI 履歷智慧對話分身 (AI Resume Agent)**
   - 具備完整 RAG (Retrieval-Augmented Generation) 互動的對話介面。
   - 內置防呆與邊界機制：僅依據私有履歷與專案文檔回答，拒絕回答與個人專業無關的問題。

5. **部落格 / 學習筆記 (Blog)**
   - 由 MDX 驅動的技術文章列表與內頁。方便未來持續輸出如「向量資料庫與 BLOB 的差異」等技術筆記。

## 4. 全域功能 (Global Features)

- 響應式設計 (RWD)，適配行動裝置與桌面版。
- 支援暗黑/明亮模式切換 (Dark/Light Mode Toggle)。
