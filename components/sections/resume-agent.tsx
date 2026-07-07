"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function ResumeAgentSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "你好！我是主人的 AI 履歷特工。我對主人的 Java 開發、Spring Boot 微服務、RAG 架構以及全端技術瞭若指掌。你想了解他的哪一部分專案經驗或技術實力呢？",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 50); // 這裡微調成 50ms 讓滾動反應更靈敏迅速
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    scrollToBottom();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("API 路由連線失敗");
      }

      const data = await response.json();

      if (data.text) {
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      } else {
        throw new Error("未預期的回應格式");
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "💥 報告指揮官，後端通訊線路似乎受到干擾，請稍後再試，或檢查主機 Console 紀錄！",
        },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4 flex flex-col justify-center">
      {/* 區段標題 */}
      <div className="mb-10 text-center">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
          AI Copilot / 履歷智慧助手
        </h2>
        <p className="mt-2 font-mono text-2xl font-bold text-slate-900 dark:text-slate-50">
          有疑問？直接與我的 AI 特工化身進行技術問答。
        </p>
      </div>

      <Card className="w-full border-neutral-200 dark:border-neutral-800 shadow-2xl backdrop-blur-sm bg-white/70 dark:bg-black/40 flex flex-col h-[550px]">
        {/* Card Header: Agent 身分看板 */}
        <CardHeader className="border-b border-neutral-100 dark:border-neutral-800 flex flex-row items-center gap-3 space-y-0 py-4">
          <div className="p-2 bg-neutral-900 text-white dark:bg-white dark:text-black rounded-xl">
            <Bot className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-lg font-mono font-bold tracking-tight">
              AI_RESUME_AGENT.exe
            </CardTitle>
            <CardDescription className="text-xs font-mono">
              Status: Online | Powered by Gemini 2.5 Flash
            </CardDescription>
          </div>
        </CardHeader>

        {/* Card Content: 滾動對話區域 */}
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full w-full p-6">
            <div className="space-y-4 pr-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 text-sm ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "model" && (
                    <div className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-sans leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === "user"
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-black rounded-tr-none font-medium"
                      : "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 rounded-tl-none border border-neutral-200/50 dark:border-neutral-800/50"
                      }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 text-sm justify-start">
                  <div className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center shrink-0">
                    <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
                  </div>
                  <div className="bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400 rounded-2xl rounded-tl-none px-4 py-2.5 border border-neutral-200/50 dark:border-neutral-800/50 font-mono text-xs flex items-center gap-2">
                    特工正在組織語言，調閱主人技術庫中...
                  </div>
                </div>
              )}
              <div ref={scrollRef} className="h-1" />
            </div>
          </ScrollArea>
        </CardContent>

        {/* Card Footer: 輸入表單區 */}
        <CardFooter className="p-4 border-t border-neutral-100 dark:border-neutral-800">
          <form
            onSubmit={handleSendMessage}
            className="flex w-full items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="例如：主人會用 Spring Boot 處理過什麼高併發場景嗎？"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 font-sans bg-neutral-50/50 dark:bg-neutral-900/50 focus-visible:ring-1 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-700"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black shrink-0 transition-all duration-200"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
