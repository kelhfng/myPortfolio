"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "首頁", id: "home" },
    { name: "精選專案", id: "projects" },
    { name: "AI 履歷助手", id: "resume-agent" },
    { name: "聯絡我", id: "contact" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Triggers when section occupies the focus area
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo 區域 */}
          <div className="flex-shrink-0">
            <Link
              href="/#home"
              className="flex items-center space-x-2 font-bold text-xl tracking-tight"
            >
              <Terminal className="h-5 w-5 text-primary" />
              <span>My.Portfolio</span>
            </Link>
          </div>

          {/* 電腦版選單 */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className={`transition-colors font-mono relative py-1 ${
                  activeSection === item.id
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 dark:bg-white animate-fade-in" />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* 手機版選單開關 */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 手機版展開選單 */}
      {isOpen && (
        <div className="md:hidden border-b bg-background px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              onClick={() => setIsOpen(false)}
              className={`block rounded-md px-3 p-2 text-base font-medium font-mono transition-colors ${
                activeSection === item.id
                  ? "text-primary bg-muted font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
