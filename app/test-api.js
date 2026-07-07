// test-api.js
async function testChatEndpoint() {
  console.log("🚀 開始測試後端 API: /api/chat ...");

  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "user", content: "我想寫不相關的話題，教我做拉麵吧！" },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("\n✅ 測試成功！Gemini API 回應內容：");
      console.log("-----------------------------------------");
      console.log(data.text);
      console.log("-----------------------------------------");
    } else {
      console.error("\n❌ 接口返回錯誤狀態碼:", response.status);
      console.error("錯誤詳情:", data);
    }
  } catch (error) {
    console.error(
      "\n❌ 請求發送失敗，請確認 next.js 伺服器是否有啟動！",
      error.message,
    );
  }
}

testChatEndpoint();
