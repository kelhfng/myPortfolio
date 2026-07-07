export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  imagePlaceholder: string;
  techMetric: string;
  githubUrl: string;
  demoUrl: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "AI 智慧履歷特工分身系統 (本站)",
    subtitle: "基於 Long-Context 注入與安全防禦機制的零成本 AI Agent",
    description:
      "本作品集網站的核心全端 AI 應用，採用 Node.js 原生檔案系統（fs）實現輕量化 Long-Context 履歷文本動態注入。後端基於 Google 官方最新原生存取 SDK（@google/genai）串接 Gemini 2.5 Flash，並內建硬核的關鍵字安全防護防線（Hard-Rule Filter），在最前端直接過濾攔截與職業生涯無關的惡意或無效提問。系統不僅具備嚴格的防幻覺機制，更在 Vercel 託管環境下達成了完全的零運行成本與極致的響應效能。",
    tags: [
      "Next.js (App Router)",
      "TypeScript",
      "Google GenAI SDK",
      "Gemini 1.5 Flash",
      "Node.js File System",
      "Tailwind CSS",
    ],
    imagePlaceholder:
      "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5",
    techMetric: "自設前端關鍵字防線阻截惡意 Request，確保 Zero Token Waste / 直接 Read 本地 Markdown 做到 Real-time 資料同步",
    githubUrl: "#", // 如果您有開源可以放您的 GitHub 連結
    demoUrl: "#",
  },
  {
    id: "project-judiciary-eappointment",
    title: "香港法院登記處電子預約管理系統",
    subtitle: "基於 Java/JSF 的市民服務數位轉型、智方便整合與分散式排程優化",
    description:
      "主導開發與維護司法機構面向公眾的全新電子預約系統，包含「無律師代表親自遞交破產呈請（Self-bankruptcy Petition）」及「財物扣押令申請（Warrant of Distress）」兩大核心市民服務。針對每天法院登記處處理案件上限的嚴苛限制，參與設計了『預先劃位留空（Quota Pre-reservation）』機制，在填表前為市民預留 2 小時鎖定名額。開發中解決了因大量輸入欄位導致伺服器崩潰與 Load Balancer 衝突的高危效能問題，並針對框架自訂金額與格式驗證。同時整合政府『智方便 (iAM Smart)』API，實現身分資料自動填入（Auto-fill）並繞過驗證碼，大幅提升市民體驗。此外，針對因雙機調遷導致排程（Batch Job）重複執行的嚴重事故，設計了基於資料庫伺服器名稱識別（Host-naming Routing）的分散式排程防衝突機制。",
    tags: [
      "Java",
      "JSF / Primefaces",
      "Oracle DB",
      "iAM Smart API",
      "Apache / JBoss",
    ],
    imagePlaceholder:
      "bg-gradient-to-br from-cyan-600/10 to-blue-700/10 dark:from-cyan-600/5 dark:to-blue-700/5",
    techMetric: "整合智方便實現 Auto-fill 填表流程 / 導入伺服器節點識別技術消除 100% 分散式排程衝突",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    id: "project-judiciary-icms-ctcrs",
    title: "綜合法院案件管理與審裁處數據決策系統",
    subtitle: "iCMS 遺產承辦模組演進與競爭事務審裁處報表自主化系統",
    description:
      "參與全港最核心的綜合法院案件管理系統（iCMS）開發，將龐大的遺產承辦處（Probate Registry）舊有 Legacy 系統進行重構、優化並併入全新的 iCMS 模組。同時負責競爭事務審裁處（Competition Tribunal）個案管理系統的多項核心優化（Enhancement），包含新增遠距聆訊（Remote Hearing）等法庭特徵標記。為解決過往業務部門每月需人工向 IT 申請提取數據的流程瓶頸，將複雜 of 深層 SQL 數據清洗邏輯轉化為系統內建功能，並嚴格實施用戶組權限控管（User Group Access Control），實現端到端的報表自主化與高度數據安全。",
    tags: [
      "Java",
      "Oracle DB",
      "JSF / Primefaces",
      "Data Transformation",
      "Access Control",
    ],
    imagePlaceholder:
      "bg-gradient-to-br from-indigo-500/10 to-teal-500/10 dark:from-indigo-500/5 dark:to-teal-500/5",
    techMetric: "報表自主化上線後，直接減少 90% 以上的跨部門電郵溝通與高層審批時間",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    id: "project-bochk-travel-expense",
    title: "企業級電子商旅報銷與用戶管理系統",
    subtitle: "智慧辦公自動化、供應商管理與跨系統整合測試",
    description:
      "任職於智慧辦公促進部門，主導內部電子商旅報銷系統的供應商管理（Vendor Management）與系統整合測試（System Integration Test）。負責追蹤 Vendor 開發進度、規劃並建置 UAT 測試環境，同時針對用戶管理系統（User Management System）進行小型功能優化（Enhancement）。為確保系統穩定度，獨立編寫自動化 Health Check Batch Job 進行日常健康檢查，並負責正式環境的日常 Deployment 與技術支援。",
    tags: [
      "Vendor Management",
      "System Integration",
      "Shell Scripting",
      "UAT Testing",
      "Deployment",
    ],
    imagePlaceholder:
      "bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-blue-600/5 dark:to-indigo-600/5",
    techMetric: "成功協調跨團隊 UAT 環境建置 / 編寫自動化批次腳本實現系統健康狀態即時監控",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    id: "project-bochk-carbon-esg",
    title: "雲端碳排放管理與 UAT 高併發技術支援系統",
    subtitle: "企業 ESG 系統壓力測試與跨部門日誌追蹤（Log Tracing）",
    description:
      "負責中銀內部雲端碳排放管理系統（ESG 相關）的上線前準備工作，包含獨立撰寫壓力測試計畫書並實際執行 Stress Test，確保雲端架構在金融級高併發情境下的穩定性。在處理 UAT 期間，面對來自不同部門繁複的業務查詢與異常反饋，透過主動跨團隊協調，並深入應用伺服器分析日誌（Log Tracing）逆向追踪代碼源頭，精準定位 Vendor 開發缺陷，大幅提升 UAT 問題修復效率。",
    tags: [
      "Stress Testing",
      "Log Tracing",
      "Cloud Platform",
      "Technical Support",
      "Technical Documentation",
    ],
    imagePlaceholder:
      "bg-gradient-to-br from-emerald-500/10 to-green-500/10 dark:from-emerald-500/5 dark:to-green-500/5",
    techMetric: "完成雲端碳排放系統壓力測試規劃 / 透過 Log 日誌追蹤機制顯著縮短 UAT Bug 定位時間",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    id: "project-hkdnr-revamp",
    title: "hkdnr.hk 官方網站架構翻新與核心電商功能開發",
    subtitle: "遺留系統遷移 (JSP to Spring Boot/WordPress) 與增值營收模組開發",
    description:
      "參與官方網站的微服務架構翻新工程，將後端由舊有 JSP 遷移至 Spring Boot，前端整合至 WordPress 後台管理。獨立修復多項框架相容性 Bug，並透過優化陣列迴圈規則與重構 SQL 查詢語句，成功解決資料庫讀取造成的效能瓶頸。此外，主導開發 Anti-Phishing Domain（防釣魚域名推薦系統）與 Free Bundle 促銷模組，實現從用戶端到後端資料庫的完整交叉銷售結帳流程。",
    tags: [
      "Java",
      "Spring Boot",
      "WordPress",
      "PHP",
      "SQL",
      "jQuery",
      "JavaScript",
    ],
    imagePlaceholder:
      "bg-gradient-to-br from-blue-500/10 to-teal-500/10 dark:from-blue-500/5 dark:to-teal-500/5",
    techMetric: "優化 SQL 與迴圈邏輯使核心頁面載入速度提升 30% / 成功建構防釣魚域名交叉銷售機制",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    id: "project-security-automation",
    title: "自動化資訊安全檢測與核心漏洞修復系統",
    subtitle: "基於 OWASP ZAP 的漏洞掃描自動化與企業級弱點修補",
    description:
      "協助使用 .hk 域名的企業客戶進行大規模弱點掃描（Vulnerability Scanning）。為解決繁瑣的報告產出流程，利用 Python 撰寫自動化腳本，解析 OWASP ZAP 的 PDF 原始報告並自動轉換生成 company 格式的 Word 資安防護建議書。同時負責內部系統漏洞修復，成功識別並修補包含帳號外洩、越權登入等高危險性邏輯漏洞，升級過期依賴庫，並修復了可能引致應用程式伺服器當機的核心關鍵漏洞。",
    tags: [
      "Python",
      "OWASP ZAP",
      "Security Patching",
      "Linux/PuTTY",
      "Apache",
    ],
    imagePlaceholder:
      "bg-gradient-to-br from-red-500/10 to-amber-500/10 dark:from-red-500/5 dark:to-amber-500/5",
    techMetric: "導入 Python 自動化腳本大幅減少 80% 文書報告處理時間 / 成功修補高危越權與當機漏洞",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    id: "project-web2social-ba",
    title: "模組化 Web2Social 快速建站平台與商業情報系統",
    subtitle: "跨平台社群 API 整合與無 Flag 歷史數據逆向 Report 產出",
    description:
      "負責雙重核心任務。一方面開發面向中小企業的 Web2Social 快速建站系統，採用模組化 Frame 架構，串接整合 Facebook、Instagram 及 Google Maps 等多方社群平台 API，實現動態生成網站功能。另一方面擔任商業分析角色，面對早期系統設計未配置狀態旗標（No Flag）的限制，撰寫高複雜度的深層 SQL 查詢語句進行逆向數據推導與清洗，成功產出用戶訂閱、續約與流失的深度商業決策報表。",
    tags: [
      "SQL",
      "Social API",
      "PHP",
      "HTML5/CSS3",
      "Business Analysis",
    ],
    imagePlaceholder:
      "bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5",
    techMetric: "實現跨平台 API 數據同步建站方案 / 透過複雜 SQL 重構，成功逆向還原 100% 精準的用戶生命週期報表",
    githubUrl: "#",
    demoUrl: "#",
  },
];
