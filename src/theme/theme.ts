"use client";
import { MantineThemeOverride } from "@mantine/core";

// Define the Mantine theme as the single source of truth for all colors
export const theme: MantineThemeOverride = {
  // Default color scheme set to light
  primaryColor: "primary",
  primaryShade: 6, // Using index 6 as our main primary color

  // Define custom colors used in the app
  colors: {
    // Primary color palette (red)
    primary: [
      "#fff5f5", // 0 - Lightest
      "#ffe5e5", // 1
      "#ffcccc", // 2
      "#ff9999", // 3
      "#ff6666", // 4
      "#ff3333", // 5
      "#ff0000", // 6 - Main primary color
      "#cc0000", // 7
      "#990000", // 8
      "#800000", // 9 - Darkest
    ],
    
    // Success color palette (green)
    success: [
      "#e8f5e9", // 0
      "#c8e6c9", // 1
      "#a5d6a7", // 2
      "#81c784", // 3
      "#66bb6a", // 4
      "#4CAF50", // 5 - Base success color
      "#43a047", // 6
      "#388e3c", // 7
      "#2e7d32", // 8
      "#1b5e20", // 9
    ],
    
    // Warning color palette (amber)
    warning: [
      "#fff8e1", // 0
      "#ffecb3", // 1
      "#ffe082", // 2
      "#ffd54f", // 3
      "#ffca28", // 4
      "#FFC107", // 5 - Base warning color
      "#ffb300", // 6
      "#ffa000", // 7
      "#ff8f00", // 8
      "#ff6f00", // 9
    ],
    
    // Error color palette (red)
    error: [
      "#ffebee", // 0
      "#ffcdd2", // 1
      "#ef9a9a", // 2
      "#e57373", // 3
      "#ef5350", // 4
      "#f44336", // 5
      "#e53935", // 6
      "#d32f2f", // 7
      "#c62828", // 8 - Base error color
      "#b71c1c", // 9
    ],
    
    // Info color palette (blue)
    info: [
      "#e1f5fe", // 0
      "#b3e5fc", // 1
      "#81d4fa", // 2
      "#4fc3f7", // 3
      "#29b6f6", // 4
      "#03A9F4", // 5 - Base info color
      "#039be5", // 6
      "#0288d1", // 7
      "#0277bd", // 8
      "#01579b", // 9
    ],
    
    // Neutral colors
    neutral: [
      "#ffffff", // 0 - White
      "#f9f9f9", // 1 - Off white
      "#f3f3f3", // 2 - Light gray
      "#e6e6e6", // 3
      "#cccccc", // 4
      "#aaaaaa", // 5 - Medium gray
      "#888888", // 6
      "#666666", // 7
      "#444444", // 8
      "#222222", // 9 - Dark gray
    ],
  },
  
  // Define semantic color roles
  other: {
    // Light mode semantic colors
    lightColors: {
      background: "#ffffff",
      backgroundAlt: "#f9f9f9",
      surface: "#ffffff",
      textPrimary: "#222222",
      textSecondary: "#444444",
      textTertiary: "#888888",
      border: "#e6e6e6",
      borderFocus: "#ff3333",
      disabledBg: "#e6e6e6",
      disabledText: "#888888",
    },
    
    // Dark mode semantic colors
    darkColors: {
      background: "#222222",
      backgroundAlt: "#333333",
      surface: "#333333",
      textPrimary: "#f3f3f3",
      textSecondary: "#cccccc",
      textTertiary: "#888888",
      border: "#444444",
      borderFocus: "#ff3333",
      disabledBg: "#333333",
      disabledText: "#666666",
    },
  },

  // Component specific overrides
  components: {
    TextInput: {
      styles: () => ({
        input: {
          fontSize: "var(--mantine-font-size-sm)",
        },
      }),
    },
    Button: {
      // Set default props for all buttons
      defaultProps: {
        color: "primary",
      },
      // Use classNames API instead of problematic attribute selectors
      classNames: {
        filled: "primaryFilledButton",
      },
      // Define styles using standard selectors
      styles: () => ({
        root: {
          "&.primaryFilledButton": {
            backgroundColor: "var(--mantine-color-primary-5)",
            "&:hover": {
              backgroundColor: "var(--mantine-color-primary-6)",
            },
          },
        },
      }),
    },
    ActionIcon: {
      // Set default props
      defaultProps: {
        color: "primary",
      },
      // Use classNames API instead of problematic attribute selectors
      classNames: {
        light: "themeToggleIcon",
      },
      styles: () => ({
        root: {
          "&.themeToggleIcon": {
            color: "var(--mantine-color-primary-6)",
            backgroundColor: "var(--mantine-color-default)",
            "&:hover": {
              backgroundColor: "var(--mantine-color-default-hover)",
            },
          },
        },
      }),
    },
    Paper: {
      // Use classNames for consistent styling approach
      classNames: {
        root: "themedPaper",
      },
      styles: () => ({
        root: {
          "&.themedPaper": {
            backgroundColor: "var(--mantine-color-body)",
            color: "var(--mantine-color-text)",
            boxShadow: "var(--mantine-shadow-sm)",
          },
        },
      }),
    },
  },
  fontFamily: "Inter, sans-serif",
};

export default theme;
