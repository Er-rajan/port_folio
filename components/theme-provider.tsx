"use client";

import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    root.classList.toggle("dark", isDark);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-surface" />;
  }

  return <>{children}</>;
}
