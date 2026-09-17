# 專案當前進度 (Current Progress)

## 📅 更新日期：2024-05-20

### ✅ 已完成項目
- **基礎架構**：Next.js 14 App Router、Tailwind CSS、Shadcn UI 環境設置。
- **前端頁面**：
    - 首頁 (Hero Section)：完成技術標籤牆與極簡風設計。
    - AI 履歷助手介面：完成對話框、打字動畫及亮暗模式適配。
    - 聯絡頁面：完成表單驗證與 UI 佈局。
- **AI 核心整合**：
    - `app/api/chat/route.ts` 已成功串接 Gemini 1.5 Flash。
    - 整合 LlamaIndex 檢索邏輯，支援從本地 `./storage` 讀取向量數據。

### 🚧 進行中項目
- **資料工程 (Data Ingestion)**：
    - 正在實作 `scripts/ingest.ts` 腳本。
    - **修正中**：解決 `SimpleDirectoryReader` 模組導出報錯 (ts 2305)，需確保 `llamaindex` 版本為最新。

### 🚀 後續計劃
1. 執行 `npx tsx scripts/ingest.ts` 將個人履歷 (PDF) 與 Java 專案文檔向量化。
2. 測試 RAG 檢索準確度，優化 `systemInstruction` 提示詞。
3. 實作 /projects 頁面的交錯式大圖文佈局。
4. 部署至 Vercel 並配置環境變數。
