import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal, Cpu, Database, Code2 } from "lucide-react";

export default function HeroSection() {
  const techStacks = [
    {
      category: "Backend & Systems",
      skills: [
        "Java (Spring Boot / MVC)",
        "JSF / PrimeFaces",
        "PHP (WordPress)",
        "Python (Automation)",
        "Shell Scripting",
        "Oracle DB / MySQL"
      ],
    },
    {
      category: "AI & Fullstack Development",
      skills: [
        "Next.js (App Router)",
        "TypeScript / JavaScript",
        "React.js",
        "Google GenAI SDK",
        "Gemini API",
        "Long-Context Engineering"
      ],
    },
    {
      category: "DevOps, Security & Testing",
      skills: [
        "Apache / JBoss",
        "Unix / Linux Platforms",
        "OWASP ZAP (Security Patching)",
        "UAT / SIT Management",
        "Stress Testing",
        "Log Tracing / Debugging"
      ],
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* 背景微光裝飾 - 營造高級 SaaS 產品的科技氛圍 */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="max-w-3xl w-full text-center space-y-8 relative z-10">
        {/* 狀態宣告區（System Status） */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 text-xs font-mono shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span>STATUS: READY_TO_EXPLORE_THE_FUTURE</span>
        </div>

        {/* 核心意圖：主標題與動態定位 */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-sans tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            Hi，我是{" "} Kelvin
          </h1>

          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
            經歷過大型企業傳統技術環境的磨練，我選擇保持開放態度，<br />
            積極擁抱
            {" "}<span className="text-foreground font-medium">現代開發技術</span>{" "}
            與
            {" "}<span className="text-foreground font-medium">AI科技發展</span>{" "}。<br />
            現在，我透過AI工具輔助，將豐富的開發經驗注入全新的{" "}
            <span className="text-foreground font-medium">Full-Stack</span>{" "}
            應用中。這裡記錄了我對新技術探索的熱忱與實踐。
          </p>
        </div>

        {/* 行動呼籲 (Call to Action) */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="font-sans bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black shadow-lg transition-all duration-200"
          >
            <Link href="#projects" className="flex items-center gap-2">
              瀏覽精選專案 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="font-sans border-neutral-200 dark:border-neutral-800 backdrop-blur-sm bg-white/50 dark:bg-black/50 transition-all duration-200"
          >
            <Link href="#resume-agent" className="flex items-center gap-2">
              <Terminal className="h-4 w-4" /> 與我的 AI 特工聊聊
            </Link>
          </Button>
        </div>

        {/* 極簡硬核技術標籤牆 */}
        <div className="pt-8 border-t border-neutral-100 dark:border-neutral-900 max-w-2xl mx-auto space-y-4 text-left">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 text-center mb-6">
            // Technical Blueprint & Arsenal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {techStacks.map((stack, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50 dark:border-neutral-900 dark:bg-neutral-950/40 backdrop-blur-sm shadow-sm flex flex-col space-y-3"
              >
                <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-bold">
                  {stack.category === "Backend" && (
                    <Database className="h-3.5 w-3.5 text-neutral-500" />
                  )}
                  {stack.category === "AI & Data" && (
                    <Cpu className="h-3.5 w-3.5 text-neutral-500" />
                  )}
                  {stack.category === "Frontend" && (
                    <Code2 className="h-3.5 w-3.5 text-neutral-500" />
                  )}
                  {stack.category}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {stack.skills.map((skill, j) => (
                    <Badge
                      key={j}
                      variant="secondary"
                      className="font-mono text-[10px] px-2 py-0.5 bg-white text-neutral-600 border border-neutral-200/60 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800/80 shadow-none"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
