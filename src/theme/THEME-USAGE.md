# Arodos Academy Theme Usage Guidelines

This document provides guidelines for using the theme system in the Arodos Academy application.

## Overview

The theme system has been simplified to use Mantine's built-in theming capabilities as the single source of truth. This eliminates redundant color definitions and improves performance by leveraging Mantine's native theme system.

## Theme Structure

### Single Source of Truth

All colors are defined in `theme.ts` as part of the Mantine theme configuration:

- Full color palettes (primary, success, warning, error, info, neutral) with 10 shades each
- Semantic color roles for both light and dark modes

### Key Components

1. **`theme.ts`**: Defines all color palettes and semantic roles
2. **`use-theme.ts`**: Provides theme toggling and access to theme colors
3. **`theme-provider.tsx`**: Sets up the theme and syncs it with the global store
4. **`globals.css`**: Contains CSS variables for backward compatibility and utility classes

## How to Use Theme Colors

### In Client Components

```tsx
"use client";

import { useTheme } from '@/theme/use-theme';

function MyComponent() {
  const { colors, themeMode } = useTheme();
  
  return (
    <div style={{ 
      color: colors.textPrimary,
      backgroundColor: colors.background,
      border: `1px solid ${colors.border}`
    }}>
      Current theme: {themeMode}
    </div>
  );
}
```

### Using Mantine's Theme

```tsx
import { useMantineTheme } from '@mantine/core';

function MyComponent() {
  const theme = useMantineTheme();
  
  return (
    <div style={{ 
      color: theme.colors.primary[6],
      backgroundColor: theme.other.lightColors.background
    }}>
      Using Mantine theme directly
    </div>
  );
}
```

### In Server Components

For server components, you cannot use React hooks like `useTheme`. Instead, use one of these approaches:

#### 1. Use Mantine CSS Variables Directly

```tsx
// Server component
export default function ServerComponent() {
  return (
    <div style={{ 
      color: 'var(--mantine-color-primary-6)',
      backgroundColor: 'var(--mantine-color-gray-0)'
    }}>
      Server Component Content
    </div>
  );
}
```

#### 2. Extract UI Parts to Client Components

```tsx
// ClientPart.tsx
"use client";

import { useTheme } from '@/theme/use-theme';

export function ThemedUI({ children }) {
  const { colors } = useTheme();
  
  return (
    <div style={{ 
      color: colors.primary,
      backgroundColor: colors.background 
    }}>
      {children}
    </div>
  );
}

// ServerComponent.tsx
import { ThemedUI } from './ClientPart';

export default function ServerComponent() {
  // Server-side logic here
  
  return (
    <ThemedUI>
      Server Component Content
    </ThemedUI>
  );
}
```

## Theme Toggling

To toggle between light and dark mode:

```tsx
import { toggleTheme } from '@/theme/use-theme';

function ThemeToggleButton() {
  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}
```

## CSS Variables

While the primary source of truth is now Mantine's theme system, CSS variables are still available in `globals.css` for backward compatibility and utility classes. However, new components should use the theme hooks rather than CSS variables directly.

## Best Practices

1. **Use theme hooks**: Prefer `useTheme()` or `useThemeColors()` over direct CSS variable access
2. **Avoid inline styles with `var()`**: Use the theme hooks instead
3. **Use semantic color names**: Use semantic color names (e.g., `textPrimary`, `background`) instead of specific color values
4. **Consider accessibility**: Ensure sufficient contrast in both light and dark modes
5. **Maintain dark mode support**: Test components in both light and dark modes

## Migration Guide

When updating existing components:

1. Replace CSS variable usage with theme hooks
2. Replace manual color calculations with theme colors
3. Test in both light and dark modes

## Theme Color Reference

### Primary Colors
- `primary`: Main brand color
- `primaryHover`: Darker shade for hover states
- `primaryLight`: Lighter shade for backgrounds

### Semantic Colors
- `background`: Main background color
- `backgroundAlt`: Alternative background color
- `surface`: Surface/card background color
- `textPrimary`: Primary text color
- `textSecondary`: Secondary text color
- `textTertiary`: Tertiary text color
- `border`: Border color
- `borderFocus`: Border color for focused elements

### Status Colors
- `success`: Success state color
- `warning`: Warning state color
- `error`: Error state color
- `info`: Information state color

### Disabled State
- `disabledBg`: Background color for disabled elements
- `disabledText`: Text color for disabled elements
