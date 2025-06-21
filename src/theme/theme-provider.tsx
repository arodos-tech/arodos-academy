"use client";

import { useTheme } from "./use-theme";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // This will handle the theme setup on the client side
  useTheme();
  
  return <>{children}</>;
}
