import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
// 1. 引入你剛剛建立的 ThemeProvider
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner"; // 引入全域監聽器

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. 更新你的網站標題與描述，讓它更有作品集的 vibe
export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "Java & AI Full-Stack Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. 改成 zh-HK 並加上 suppressHydrationWarning 防止亮暗模式切換時的瀏覽器警告
    <html
      lang="zh-HK"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-mono",
        jetbrainsMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* 4. 用 ThemeProvider 把 children 包起來 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow bg-background text-foreground">
            {children}
            <Toaster richColors position="top-right" /> {/* 👈 加上這行，富文本顏色與右上角彈出 */}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
