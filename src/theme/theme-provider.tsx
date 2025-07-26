"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

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
  // Track previous theme to prevent unnecessary updates
  const prevThemeRef = useRef(currentTheme);

  // Handle theme change events
  const handleThemeChange = useCallback((event: Event) => {
    const customEvent = event as CustomEvent;
    const newTheme = customEvent.detail?.mode;

    if (newTheme && prevThemeRef.current !== newTheme) {
      prevThemeRef.current = newTheme;
    }
  }, []);

  // Set up the theme on initial load
  useEffect(() => {
    // Mark as mounted to avoid hydration mismatch
    setMounted(true);

    // Only update if the theme has actually changed
    if (prevThemeRef.current !== currentTheme) {
      // Set the data-mantine-color-scheme attribute on the document
      document.documentElement.setAttribute("data-mantine-color-scheme", currentTheme);
      prevThemeRef.current = currentTheme;
    }

    // Listen for theme change events
    if (typeof window !== "undefined") {
      window.addEventListener("themechange", handleThemeChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("themechange", handleThemeChange);
      }
    };
  }, [currentTheme, handleThemeChange]);

  // In Mantine v7, we don't need ColorSchemeProvider anymore
  // The color scheme is controlled via data-mantine-color-scheme attribute
  // and the MantineProvider in layout.tsx

  // Prevent hydration mismatch by only rendering children after client-side mount
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
