"use client";
import { MantineThemeOverride } from "@mantine/core";

// Define color constants for easy reference
export const PRIMARY_COLOR = "#FF0000";

export const COLORS = {
  // Colors used throughout the app
  background: {
    light: "#FFFFFF",
    dark: "#000000",
  },
  text: {
    light: "#000000",
    dark: "#FFFFFF",
  },
  primary: {
    main: PRIMARY_COLOR,
    light: "#FF3333",
    dark: "#CC0000",
  },
  paper: {
    light: "#FFFFFF",
    dark: "#000000",
  },
  primaryArray: [
    "#FFE5E5", // 0
    "#FFCCCC", // 1
    "#FF9999", // 2
    "#FF6666", // 3
    "#FF3333", // 4
    "#FF0000", // 5 - Main primary color
    "#CC0000", // 6
    "#990000", // 7
  ],
};

// Define the Mantine theme
export const theme: MantineThemeOverride = {
  // Default color scheme set to light
  // Set primary color
  primaryColor: "primary",
  primaryShade: 5,

  // Define custom colors used in the app
  colors: {
    // Define primary color palette (red)
    primary: [
      "#FFE5E5", // 0
      "#FFCCCC", // 1
      "#FFC0C4", // 2
      "#FFABB0", // 3
      "#FF969C", // 4
      "#EF575D", // 5 - PRIMARY_COLOR
      "#D64D52", // 6
      "#BD4448", // 7
      "#A43A3D", // 8
      "#8B3033", // 9
    ],
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
            backgroundColor: PRIMARY_COLOR,
            "&:hover": {
              backgroundColor: "#D64D52", // Slightly darker shade
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
            // Use CSS variables for theme compatibility
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
