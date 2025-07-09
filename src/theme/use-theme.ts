"use client";

import { useEffect } from "react";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { store } from "@/services/store";

// Type for theme mode
export type ThemeMode = "light" | "dark";

/**
 * Toggle the theme between light and dark mode
 * This function can be imported and used by any component
 */
export function toggleTheme() {
  // Get current mode from store using get() method
  const currentMode = store.theme.get().mode;
  // Toggle the mode
  const newMode = currentMode === "light" ? "dark" : "light";
  // Update store using set() method - this will automatically persist via the store adapter
  store.theme.set({ mode: newMode });
  // Update HTML attribute for CSS variables
  document.documentElement.setAttribute("data-mantine-color-scheme", newMode);
}

/**
 * Get the current color scheme from the store
 */
export function getCurrentTheme(): ThemeMode {
  // The store adapter automatically handles persistence and hydration
  return store.theme.get().mode as ThemeMode;
}

/**
 * Custom hook for theme management
 * Handles syncing the theme state with the global store and Mantine's color scheme
 */
export function useTheme() {
  // Use the store directly - this will automatically subscribe to changes
  // and re-render the component when the theme changes
  const themeMode = store.theme()?.mode as ThemeMode;
  
  // Get Mantine's color scheme controller
  const { setColorScheme } = useMantineColorScheme();
  
  // Get access to the theme object
  const mantineTheme = useMantineTheme();

  // Sync document's color scheme with global store whenever themeMode changes
  useEffect(() => {
    document.documentElement.setAttribute("data-mantine-color-scheme", themeMode);
    // Also update Mantine's color scheme
    setColorScheme(themeMode);
  }, [themeMode, setColorScheme]);

  // Get semantic colors based on current theme
  const getSemanticColor = (colorName: string) => {
    const colorSet = themeMode === 'dark' ? mantineTheme.other.darkColors : mantineTheme.other.lightColors;
    return colorSet[colorName as keyof typeof colorSet];
  };

  return {
    themeMode,
    toggleTheme,
    getCurrentTheme,
    // Provide direct access to theme colors
    colors: {
      // Primary colors with more semantic names
      primary: mantineTheme.colors.primary[6],
      primaryHover: mantineTheme.colors.primary[7],
      primaryLight: mantineTheme.colors.primary[1], // Much lighter shade
      primarySoft: mantineTheme.colors.primary[2],  // Soft background
      primaryMuted: mantineTheme.colors.primary[3], // Muted version
      primaryMedium: mantineTheme.colors.primary[4],
      primaryBold: mantineTheme.colors.primary[8],  // Bolder version
      primaryDark: mantineTheme.colors.primary[9],  // Darkest shade
      
      // Semantic colors based on theme
      background: getSemanticColor('background'),
      backgroundAlt: getSemanticColor('backgroundAlt'),
      surface: getSemanticColor('surface'),
      surfaceHover: getSemanticColor('surface'), // Fallback to surface if not defined
      
      // Text colors
      textPrimary: getSemanticColor('textPrimary'),
      textSecondary: getSemanticColor('textSecondary'),
      textTertiary: getSemanticColor('textTertiary'),
      
      // Status colors with variations
      success: mantineTheme.colors.success[5],
      successLight: mantineTheme.colors.success[1],
      successBg: mantineTheme.colors.success[0],
      
      warning: mantineTheme.colors.warning[5],
      warningLight: mantineTheme.colors.warning[1],
      warningBg: mantineTheme.colors.warning[0],
      
      error: mantineTheme.colors.error[8],
      errorLight: mantineTheme.colors.error[1],
      errorBg: mantineTheme.colors.error[0],
      
      info: mantineTheme.colors.info[5],
      infoLight: mantineTheme.colors.info[1],
      infoBg: mantineTheme.colors.info[0],
      
      // Border colors
      border: getSemanticColor('border'),
      borderFocus: getSemanticColor('borderFocus'),
      borderLight: getSemanticColor('border'), // Fallback to border if not defined
      
      // Disabled state
      disabledBg: getSemanticColor('disabledBg'),
      disabledText: getSemanticColor('disabledText'),
    },
    // Provide access to the full Mantine theme
    mantineTheme,
  };
}
