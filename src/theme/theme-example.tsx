"use client";

import { Box, Card, Group, Stack, Text, Title } from "@mantine/core";
import { useTheme } from "./use-theme";

/**
 * Example component demonstrating proper theme usage
 * This shows how to access and use theme colors from the useTheme hook
 */
export function ThemeExample() {
  const { colors, themeMode, toggleTheme } = useTheme();
  
  return (
    <Stack gap="xl" p="md">
      <Title order={2}>Theme Usage Example</Title>
      
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Current Theme: {themeMode}</Title>
          
          <Box>
            <Text fw={500}>Primary Colors:</Text>
            <Group gap="xs" mt="xs" wrap="wrap">
              <Box style={{ 
                backgroundColor: colors.primaryLight,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c={colors.primary} fw={600} size="xs">Light</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.primarySoft,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c={colors.primary} fw={600} size="xs">Soft</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.primaryMuted,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c={colors.primary} fw={600} size="xs">Muted</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.primaryMedium,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c="white" fw={600} size="xs">Medium</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.primary,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c="white" fw={600} size="xs">Primary</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.primaryHover,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c="white" fw={600} size="xs">Hover</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.primaryBold,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c="white" fw={600} size="xs">Bold</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.primaryDark,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c="white" fw={600} size="xs">Dark</Text>
              </Box>
            </Group>
          </Box>
          
          <Box mt="xl">
            <Text fw={500}>Status Colors:</Text>
            <Group gap="xs" mt="xs" wrap="wrap">
              {/* Success colors */}
              <Box style={{ 
                backgroundColor: colors.successBg,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${colors.successLight}`
              }}>
                <Text c={colors.success} size="xs" fw={500}>Success BG</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.successLight,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c={colors.success} size="xs" fw={500}>Success Light</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.success,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c="white" size="xs" fw={500}>Success</Text>
              </Box>
              
              {/* Warning colors */}
              <Box style={{ 
                backgroundColor: colors.warningBg,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${colors.warningLight}`
              }}>
                <Text c={colors.warning} size="xs" fw={500}>Warning BG</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.warningLight,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c={colors.warning} size="xs" fw={500}>Warning Light</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.warning,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c="white" size="xs" fw={500}>Warning</Text>
              </Box>
              
              {/* Error colors */}
              <Box style={{ 
                backgroundColor: colors.errorBg,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${colors.errorLight}`
              }}>
                <Text c={colors.error} size="xs" fw={500}>Error BG</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.errorLight,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c={colors.error} size="xs" fw={500}>Error Light</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.error,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c="white" size="xs" fw={500}>Error</Text>
              </Box>
              
              {/* Info colors */}
              <Box style={{ 
                backgroundColor: colors.infoBg,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${colors.infoLight}`
              }}>
                <Text c={colors.info} size="xs" fw={500}>Info BG</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.infoLight,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c={colors.info} size="xs" fw={500}>Info Light</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.info,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text c="white" size="xs" fw={500}>Info</Text>
              </Box>
            </Group>
          </Box>
          
          <Box mt="xl">
            <Text fw={500}>Semantic Colors:</Text>
            <Group gap="xs" mt="xs" wrap="wrap">
              <Box style={{ 
                backgroundColor: colors.background,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text size="xs" fw={500}>BG</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.surface,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text size="xs" fw={500}>Surface</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.backgroundAlt,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text size="xs" fw={500}>BG Alt</Text>
              </Box>
              
              <Box style={{ 
                backgroundColor: colors.surfaceHover,
                width: 60, 
                height: 60, 
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text size="xs" fw={500}>Hover</Text>
              </Box>
            </Group>
          </Box>
          
          <Text mt="md">
            This component demonstrates how to use the theme colors from the useTheme hook.
            All colors are defined in the theme.ts file and accessed through the useTheme hook.
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
}

/**
 * Example of a server-compatible themed component
 * This component can be imported into server components
 */
export function ServerCompatibleThemedBox({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  
  return (
    <Box 
      p="md" 
      style={{ 
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: 8
      }}
    >
      {children}
    </Box>
  );
}
