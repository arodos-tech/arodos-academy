"use client";

import { useEffect } from "react";
import { store } from "@/services/store";

// Type for theme mode
type ThemeMode = "light" | "dark";

/**
 * Toggle the theme between light and dark mode
 * This function can be imported and used by any component
 */
export function toggleTheme() {
  // Get current mode from store using get() method
  const currentMode = store.theme.get().mode;
  // Toggle the mode
  const newMode = currentMode === "light" ? "dark" : "light";
  // Update store using set() method
  store.theme.set({ mode: newMode });
  // Update HTML attribute for CSS variables
  document.documentElement.setAttribute("data-mantine-color-scheme", newMode);
}

/**
 * Get the current color scheme from the store
 */
export function getCurrentTheme(): ThemeMode {
  return store.theme.get().mode as ThemeMode;
}

/**
 * Custom hook for theme management
 * Handles syncing the theme state with the global store
 */
export function useTheme() {
  // Use the store directly - this will automatically subscribe to changes
  // and re-render the component when the theme changes
  const themeMode = store.theme()?.mode as ThemeMode;

  // Sync document's color scheme with global store whenever themeMode changes
  useEffect(() => {
    document.documentElement.setAttribute("data-mantine-color-scheme", themeMode);
  }, [themeMode]);

  return {
    themeMode,
    toggleTheme,
    getCurrentTheme,
  };
}
