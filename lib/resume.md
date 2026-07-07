# Kelvin NG, Hoi Fung - Profile & Project Portfolio

## 個人簡介 (Summary)
擅長開發商業應用程式與系統解決方案，專長於維持系統高可用性與穩定性、技術疑難排錯，並能精準依據業務需求實現系統優化與功能擴充。具備大型金融機構與政府機構核心系統之全端開發、系統整合、資安防護與技術支持經驗。

## 技術 (Technical Skills)
- **Languages**: Java, PHP, Python, JavaScript, HTML, CSS, SQL, Bash
- **Frameworks & Libraries**: Spring Boot, Java Spring MVC, JSF (JavaServer Faces), Primefaces, jQuery, WordPress, React, Angular
- **Databases & Platforms**: Oracle, MySQL DBMS, Apache, JBoss, Unix / Linux Platforms, PuTTY
- **Tools & Methodologies**: OWASP ZAP (Cybersecurity Testing), RESTful API & JSON, UAT Preparation & Test Case Design, Stress Testing, Log Tracing, Vendor Management

## 教育背景 (Education)
- **資訊科技深造文憑 (Postgraduate Diploma in Information Technology)**
  The HKU School of Professional and Continuing Education (HKUSPACE) | 2022年10月 - 2023年10月
- **供應商管理工商管理學士（榮譽）學位 (BBA-SCM)**
  The Hang Seng University of Hong Kong (HSUHK) | 2016年9月 - 2020年6月
  * 榮譽：Dean's list (2019, 2020), Best Progress Award (2019)

## 專業證書 (Certificates)
- Google IT Automation with Python (Google / Coursera)
- Fundamentals of Digital Marketing (Google Digital Garage)

---

## 歷年精選專案 (Project Portfolio)

### 專案 1：全港法院電子預約與案件管理系統 (e-Appointment Platform)
- **任職機構**: 香港司法機構 (Hong Kong Judiciary)
- **職位**: Contract Programmer (2023年8月 - 2025年9月)
- **技術**: Java, JSF / Primefaces, Oracle DB, iAM Smart API, Apache / JBoss
- **專案描述**: 
  參與核心系統優化，開發與維護司法機構面向公眾的全新電子預約系統，包含「無律師代表親自遞交破產呈請（Self-bankruptcy Petition）」及「財物扣押令申請（Warrant of Distress）」兩大核心市民服務。
- **核心貢獻與複雜邏輯**:
  1. **Quota Pre-reservation (名額預留機制)**：針對每日法院登記處處理案件上限，設計了預先劃位留空機制，在市民開始填表前預留 2 小時鎖定名額，防止市民花費大量時間填表後陷入無名額的痛點。
  2. **效能優化與邊界驗證**：修復了因大量輸入欄位導致伺服器崩潰（Server Crash）與 Load Balancer 衝突的效能問題；並針對 Legacy 框架手寫自訂金額與格式驗證方法（Custom Validation）。
  3. **智方便 (iAM Smart) 整合測試**：負責測試並實現政府『智方便』API 整合，達成身分資料自動填入（Auto-fill）並繞過驗證碼，大幅優化填表體驗。
  4. **分散式排程防衝突**：針對因伺服器雙機調遷導致排程（Batch Job）重複執行的嚴重事故，設計了基於資料庫伺服器名稱識別（Host-naming Routing）的排程防衝突機制，完全消除重複執行風險。

### 專案 2：綜合法院案件管理與審裁處數據決策系統 (iCMS & CT-CMS)
- **任職機構**: 香港司法機構 (Hong Kong Judiciary)
- **職位**: Contract Programmer (2023年8月 - 2025年9月)
- **技術**: Java, Oracle DB, JSF / Primefaces, Data Transformation, Access Control
- **專案描述**: 
  參與核心綜合法院案件管理系統（iCMS）開發，將龐大的遺產承辦處（Probate Registry）舊有 Legacy 系統進行架構重構、優化並併入全新的 iCMS 模組。同時負責競爭事務審裁處（Competition Tribunal）個案管理系統的多項核心優化（Enhancement），包含新增遠距聆訊（Remote Hearing）等法庭特徵標記。
- **核心貢獻與複雜邏輯**:
  - **報表功能產品化（Self-Service Tool）**：為解決過往業務部門每月需人工向 IT 申請提取數據的流程瓶頸，將高複雜度的深層 SQL 數據清洗與提取邏輯轉化為系統內建功能，並嚴格實施用戶組權限控管（User Group Access Control），上線後直接減少 90% 以上的跨部門電郵溝通與審批時間。

### 專案 3：企業級電子商旅報銷與用戶管理系統 (Travel Expense System)
- **任職機構**: 中銀香港 (Bank of China (Hong Kong) Limited)
- **職位**: Contract Analyst Programmer (2022年12月 - 2023年8月)
- **技術**: Vendor Management, System Integration, Shell Scripting, UAT Testing, Deployment
- **專案描述**: 
  任職於智慧辦公促進部門，主導內部電子商旅報銷系統的供應商管理（Vendor Management）與系統整合測試（SIT）。負責追蹤 Vendor 開發進度、規劃並建置 UAT 測試環境，同時針對用戶管理系統（User Management System）進行小型功能優化（Enhancement）。編寫自動化 Health Check Batch Job 進行日常健康檢查，並負責正式環境的日常 Deployment 與技術支援。

### 專案 4：雲端碳排放管理與 UAT 高併發技術支援系統
- **任職機構**: 中銀香港 (Bank of China (Hong Kong) Limited)
- **職位**: Contract Analyst Programmer (2022年12月 - 2023年8月)
- **技術**: Stress Testing, Log Tracing, Cloud Platform, Technical Support, Technical Documentation
- **專案描述**: 
  負責中銀內部雲端碳排放管理系統（ESG 相關）的上線前準備工作，包含獨立撰寫壓力測試計畫書並實際執行 Stress Test，確保雲端架構在金融級高併發情境下的穩定性。在處理 UAT 期間，面對跨部門繁複的業務查詢，透過深入應用伺服器分析日誌（Log Tracing）逆向追踪代碼源頭，精準定位 Vendor 開發缺陷，大幅提升 UAT Bug 修復效率。

### 專案 5：hkdnr.hk 官方網站架構翻新與核心電商功能開發
- **任職機構**: 香港互聯網註冊管理有限公司 (HKIRC)
- **職位**: Web Developer (2022年6月 - 2022年12月)
- **技術**: Java Spring Boot, WordPress, PHP, SQL, jQuery, JavaScript
- **專案描述**: 
  參與官方網站的微服務架構翻新工程，將後端由舊有 JSP 遷移至 Spring Boot，前端整合至 WordPress 後台管理。獨立修復多項框架相容性 Bug，並透過優化陣列迴圈（Looping）規則與重構 SQL 查詢語句，成功解決資料庫讀取造成的頁面載入緩慢效能瓶頸。此外，主導開發 Anti-Phishing Domain（防釣魚域名推薦系統，如 KELVINNG.HK 與 KEIVINNG.HK 之交叉銷售推薦）與 Free Bundle 促銷模組（買 .hk 送 .香港），實現從用戶端到後端資料庫的完整電商結帳流程。

### 專案 6：自動化資訊安全檢測與核心漏洞修復系統
- **任職機構**: 香港互聯網註冊管理有限公司 (HKIRC)
- **職位**: Cyber Security Trainee / Web Developer (2021年5月 - 2022年12月)
- **技術**: Python, OWASP ZAP, Security Patching, Linux/PuTTY, Apache
- **專案描述**: 
  協助使用 .hk 域名的企業客戶進行大規模弱點掃描（Vulnerability Scanning）。利用 Python 撰寫自動化腳本，解析 OWASP ZAP 的 PDF 原始報告並自動轉換生成公司格式的 Word 資安防護建議書，大幅減少 80% 文書報告處理時間。同時負責內部系統漏洞修復與 Web 測試，成功識別並修補包含帳號外洩、越權登入等高危險性邏輯漏洞，升級過期依賴庫，並修復了可能引致應用程式伺服器當機的核心關鍵漏洞。

### 專案 7：模組化 Web2Social 快速建站平台
- **任職機構**: 香港互聯網註冊管理有限公司 (HKIRC)
- **職位**: Web Developer (2022年6月 - 2022年12月)
- **技術**: SQL, Social API (Facebook, Instagram, Google Maps), PHP, HTML5/CSS3
- **專案描述**: 
  開發面向中小企業的 Web2Social 快速建站系統，採用模組化 Frame 架構，串接整合 Facebook、