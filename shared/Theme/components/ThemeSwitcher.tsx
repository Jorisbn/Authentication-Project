"use client";

import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/ThemeTypes";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
        >
            <option
                className="dark:text-white dark:bg-black"
                value="light"
            >
                Light
            </option>
            <option
                className="dark:text-white dark:bg-black"
                value="dark"
            >
                Dark
            </option>
            <option
                className="dark:text-white dark:bg-black"
                value="system"
            >
                System
            </option>
        </select>
    );
}
