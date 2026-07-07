"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, Terminal, Cpu, Database, Check } from "lucide-react";
import { projects, Project } from "@/lib/projects-data";

const CATEGORIES = [
  "All",
  "AI & RAG",
  "Java & Backend",
  "Frontend",
  "Security & Automation",
  "Cloud & DevOps",
];

const matchCategory = (project: Project, category: string) => {
  if (category === "All") return true;
  if (category === "AI & RAG") {
    return project.tags.some((tag) =>
      ["LangChain", "LlamaIndex", "Gemini API", "Vector DB"].includes(tag)
    );
  }
  if (category === "Java & Backend") {
    return project.tags.some((tag) =>
      ["Java", "Spring Boot", "Oracle DB", "PHP"].includes(tag)
    );
  }
  if (category === "Frontend") {
    return project.tags.some((tag) =>
      [
        "Next.js",
        "TypeScript",
        "JSF / Primefaces",
        "HTML5/CSS3",
        "jQuery",
        "JavaScript",
        "WordPress",
      ].includes(tag)
    );
  }
  if (category === "Security & Automation") {
    return project.tags.some((tag) =>
      ["OWASP ZAP", "Security Patching", "Python", "Shell Scripting"].includes(
        tag
      )
    );
  }
  if (category === "Cloud & DevOps") {
    return project.tags.some((tag) =>
      [
        "Stress Testing",
        "Log Tracing",
        "Cloud Platform",
        "Deployment",
        "Vendor Management",
        "System Integration",
        "UAT Testing",
      ].includes(tag)
    );
  }
  return true;
};

export default function ProjectsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter projects based on query and category
  const filteredProjects = projects.filter((project) => {
    const matchesQuery =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCat = matchCategory(project, selectedCategory);

    return matchesQuery && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-50/20 dark:bg-slate-950/20 pb-24">
      {/* 頂部導航 / 標題區 */}
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-6 sm:px-12">
        <Link href="/#projects">
          <Button
            variant="ghost"
            size="sm"
            className="mb-8 font-mono text-xs flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>back_to_homepage()</span>
          </Button>
        </Link>

        <div className="max-w-3xl space-y-4">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            Selected Works Archive / 專案完整歷程
          </h1>
          <p className="font-mono text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            這裡整理了我參與過的所有專案詳細資訊。包含企業級系統的數位轉型、AI 智慧應用，以及基礎架構排程與資安自動化，展現了技術落地的核心實踐與量化指標。
          </p>
        </div>
      </div>

      {/* 搜尋與篩選控制面板 */}
      <div className="sticky top-16 z-30 w-full border-y border-slate-200/80 bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 sm:px-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* 搜尋輸入 */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="搜尋技術、關鍵字或專案名稱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 font-mono text-xs text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
            />
          </div>

          {/* 類別篩選器 */}
          <div className="flex w-full overflow-x-auto pb-1 md:pb-0 scrollbar-none md:w-auto items-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[11px] font-medium transition-all cursor-pointer ${selectedCategory === category
                  ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900 shadow-sm"
                  : "border border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 專案列表 */}
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-12">
        {filteredProjects.length > 0 ? (
          <div className="flex flex-col gap-24 sm:gap-32">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  id={project.id}
                  className="scroll-mt-36 flex flex-col gap-8 lg:items-center lg:flex-row lg:odd:flex-row lg:even:flex-row-reverse"
                >
                  {/* 左/右側：技術圖形模擬區 */}
                  <div className="w-full lg:w-1/2">
                    <div
                      className={`aspect-[16/10] w-full rounded-2xl border border-slate-200 dark:border-slate-800 ${project.imagePlaceholder} flex flex-col items-center justify-center p-8 text-center shadow-lg relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(#8080800c_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      <div className="font-mono text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 tracking-widest">
                        [ SYSTEM ARCHITECTURE / INTERFACE ]
                      </div>
                      <div className="font-mono text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 max-w-sm px-4">
                        {project.techMetric}
                      </div>
                    </div>
                  </div>

                  {/* 右/左側：技術深度文案敘事區 */}
                  <div className="w-full lg:w-1/2 lg:px-6">
                    {/* 專案副標/定位 */}
                    <span className="font-mono text-xs font-semibold text-indigo-500 dark:text-indigo-400 tracking-wider">
                      {project.subtitle}
                    </span>

                    {/* 專案主標 */}
                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                      {project.title}
                    </h3>

                    {/* 硬核完整描述 */}
                    <p className="mt-4 font-mono text-sm leading-relaxed text-slate-600 dark:text-slate-400 text-justify">
                      {project.description}
                    </p>

                    {/* Badge 標籤牆 */}
                    <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-slate-200 bg-slate-50/50 px-2.5 py-0.5 text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 行動按鈕 */}
                    <div className="mt-8 flex items-center gap-4">
                      {/* 只有當 githubUrl 存在且不等於 "#" 時，才渲染這個 Link 和 Button */}
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <Link href={project.githubUrl}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="font-mono text-xs cursor-pointer"
                          >
                            view_code()
                          </Button>
                        </Link>
                      )}

                      {/* 只有當 demoUrl 存在且不等於 "#" 時，才渲染這個 Link 和 Button */}
                      {project.demoUrl && project.demoUrl !== "#" && (
                        <Link href={project.demoUrl}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="font-mono text-xs text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                          >
                            live_demo &rarr;
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 空狀態 */
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm">
            <Terminal className="h-10 w-10 text-slate-400 mb-4 animate-pulse" />
            <h3 className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              找不到相符的專案 / NO_RESULTS_FOUND
            </h3>
            <p className="font-mono text-xs text-slate-500 dark:text-slate-500 max-w-xs mb-6">
              沒有找到符合關鍵字 "{searchQuery}" 或分類 "{selectedCategory}" 的專案。
            </p>
            <Button
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="font-mono text-xs cursor-pointer"
            >
              重設篩選 / reset_filters()
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
