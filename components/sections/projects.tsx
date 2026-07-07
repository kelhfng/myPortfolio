"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects-data";

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeProject = projects[currentIndex];

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleGoTo = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Autoplay Logic
  // 💡 優化後的 Autoplay 邏輯：使用單次 setTimeout 完美契合 React 渲染週期
  useEffect(() => {
    // 如果沒有在播放，或者目前正在跑切換動畫，就先不建立下一個計時器
    if (!isPlaying || isAnimating) return;

    const timer = setTimeout(() => {
      handleNext();
    }, 2000); // 這裡維持你的 1 秒切換

    // 清除機制：不論是滑鼠移入(isPlaying變更)或是切換到下一張(currentIndex變更)，都乾淨地清除
    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, isAnimating]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-12 lg:py-24">
      {/* 頁面大標題 */}
      <div className="mb-12 max-w-2xl">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
          Selected Works / 精選專案
        </h2>
        <p className="mt-3 font-mono text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
          這裡的專案不多，但都記錄了我從零出發、逐步探索網頁與 AI 科技的過程。
        </p>
      </div>

      {/* 幻燈片容器 */}
      <div
        className="relative group"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* 主要卡片 */}
        <div
          className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-6 sm:p-10 shadow-xl transition-opacity duration-300 ${isAnimating ? "opacity-40" : "opacity-100"
            }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 左側：技術圖形模擬區 */}
            <div className="w-full">
              <div
                className={`aspect-[16/10] w-full rounded-xl border border-slate-200 dark:border-slate-800 ${activeProject.imagePlaceholder} flex flex-col items-center justify-center p-6 text-center shadow-inner relative overflow-hidden`}
              >
                {/* 裝飾背景格線 */}
                <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                <div className="font-mono text-[10px] sm:text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 tracking-widest z-10">
                  [ SYSTEM ARCHITECTURE / INTERFACE ]
                </div>
                <div className="font-mono text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 max-w-xs z-10 px-4">
                  {activeProject.techMetric}
                </div>
              </div>
            </div>

            {/* 右側：技術深度文案敘事區 */}
            <div className="w-full flex flex-col justify-between">
              <div>
                {/* 專案副標/定位 */}
                <span className="font-mono text-xs font-semibold text-indigo-500 dark:text-indigo-400 tracking-wider">
                  {activeProject.subtitle}
                </span>

                {/* 專案主標 */}
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {activeProject.title}
                </h3>

                {/* 硬核文案描述（只顯示部分文字，避免太長，並有 View Details 指引） */}
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400 text-justify line-clamp-4">
                  {activeProject.description}
                </p>

                {/* Badge 標籤牆 */}
                <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px]">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-slate-200 bg-slate-50/50 px-2.5 py-0.5 text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 行動按鈕 */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {/* 只有當 githubUrl 存在且不等於 "#" 時，才渲染這個 Link 和 Button */}
                {activeProject.githubUrl && activeProject.githubUrl !== "#" && (
                  <Link href={activeProject.githubUrl}>
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
                {activeProject.demoUrl && activeProject.demoUrl !== "#" && (
                  <Link href={activeProject.demoUrl}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="font-mono text-xs text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
                    >
                      live_demo &rarr;
                    </Button>
                  </Link>
                )}
                <Link href={`/projects#${activeProject.id}`} className="ml-auto">
                  <Button
                    size="sm"
                    variant="link"
                    className="font-mono text-xs text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 p-0 cursor-pointer"
                  >
                    完整細節 / full_details() &rarr;
                  </Button>
                </Link>

              </div>
            </div>
          </div>
        </div>

        {/* 幻燈片控制鈕 (左右箭頭) - 浮動在卡片兩側 */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-md backdrop-blur-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300 dark:hover:bg-slate-900 hover:scale-105 active:scale-95 z-20 cursor-pointer md:opacity-0 md:group-hover:opacity-100 duration-200"
          aria-label="Previous Project"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-md backdrop-blur-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300 dark:hover:bg-slate-900 hover:scale-105 active:scale-95 z-20 cursor-pointer md:opacity-0 md:group-hover:opacity-100 duration-200"
          aria-label="Next Project"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* 底部導航 (Dots) 及 點按區 */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleGoTo(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                ? "w-8 bg-indigo-500 dark:bg-indigo-400"
                : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* 前往全部專案頁面的大按鈕 */}
        <div>
          <Link href="/projects">
            <Button
              variant="outline"
              className="font-mono text-xs border-indigo-200/60 hover:bg-indigo-50 text-indigo-600 dark:border-indigo-900/60 dark:hover:bg-indigo-950/30 dark:text-indigo-400 cursor-pointer flex items-center gap-2"
            >
              <span>查看所有專案 / View All Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
