"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const STORAGE_KEY = "sgp-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // 1. Check URL param ?theme=
    const params = new URLSearchParams(window.location.search);
    const queryTheme = params.get("theme");

    let initialTheme: Theme = "dark";

    if (queryTheme === "light" || queryTheme === "dark") {
      initialTheme = queryTheme;
    } else {
      // 2. Check localStorage in try/catch
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
          initialTheme = stored;
        }
      } catch (err) {
        console.warn("Could not read theme from localStorage", err);
      }
    }

    setThemeState(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch (err) {
      console.warn("Could not save theme to localStorage", err);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
