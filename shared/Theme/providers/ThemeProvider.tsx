"use client";

import { useEffect, useState } from "react";
import { Theme } from "../types/ThemeTypes";
import { ThemeContext } from "../context/ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") {
            return "system";
        }

        return (localStorage.getItem("theme") as Theme) ?? "system";
    });

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("dark");

        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const shouldUseDark = theme === "dark" || (theme === "system" && systemDark);

        if (shouldUseDark) {
            root.classList.add("dark");
        }
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
