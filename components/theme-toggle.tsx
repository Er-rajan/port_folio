"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-border/70 bg-surface/80 px-3 py-2 text-sm text-muted backdrop-blur transition hover:border-accent/60 hover:text-text"
      aria-label="Toggle theme"
      type="button"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
