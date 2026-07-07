import {
  VectorStoreIndex,
  SimpleDirectoryReader,
  storageContextFromDefaults,
} from "llamaindex";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("正在讀取 ./data 中的文檔...");

  // 1. 加載文檔 (將您的 PDF 或 MD 檔案放在 ./data 資料夾中)
  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData({ directoryPath: "./data" });

  // 2. 初始化存儲上下文 (預設存放在 ./storage)
  const storageContext = await storageContextFromDefaults({
    persistDir: "./storage",
  });

  // 3. 創建索引並持久化
  await VectorStoreIndex.fromDocuments(documents, { storageContext });

  console.log("✅ 資料向量化完成！索引已存儲至 ./storage");
}

main().catch((err) => console.error("資料導入失敗:", err));
