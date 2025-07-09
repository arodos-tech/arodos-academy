"use client";

import { ReactNode, useEffect, useState } from "react";
import { getCurrentTheme } from "./use-theme";

/**
 * ThemeProvider component
 * Sets up the theme and syncs it with the store
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Use state to track client-side rendering
  const [mounted, setMounted] = useState(false);
  // Get the current theme from the store
  const currentTheme = getCurrentTheme();

  // Set up the theme on initial load
  useEffect(() => {
    // Mark as mounted to avoid hydration mismatch
    setMounted(true);
    
    // Set the data-mantine-color-scheme attribute on the document
    document.documentElement.setAttribute("data-mantine-color-scheme", currentTheme);
  }, [currentTheme]);

  // In Mantine v7, we don't need ColorSchemeProvider anymore
  // The color scheme is controlled via data-mantine-color-scheme attribute
  // and the MantineProvider in layout.tsx
  
  // Prevent hydration mismatch by only rendering children after client-side mount
  if (!mounted) {
    return null;
  }
  
  return <>{children}</>;
}
