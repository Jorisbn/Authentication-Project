import { createContext } from "react";
import { ThemeContextType } from "../types/ThemeTypes";

export const ThemeContext = createContext<ThemeContextType | null>(null);
