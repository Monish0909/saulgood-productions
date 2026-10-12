"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-theme-line bg-theme-surface/80 px-4 py-2 text-xs backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95">
      <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-theme-muted">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            theme === "dark" ? "bg-amber-400" : "bg-emerald-500"
          }`}
        />
        THEME: {theme}
      </span>
      <button
        onClick={toggleTheme}
        type="button"
        className="cursor-pointer rounded-full bg-theme-accent px-2.5 py-1 text-[11px] font-semibold text-theme-bg uppercase tracking-wider transition-opacity hover:opacity-90"
        aria-label="Toggle visual theme"
      >
        SWITCH TO {theme === "dark" ? "LIGHT (A)" : "DARK (B)"}
      </button>
    </div>
  );
}
