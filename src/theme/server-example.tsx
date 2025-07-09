import { Box, Card, Stack, Text, Title } from "@mantine/core";
import { ServerCompatibleThemedBox } from "./theme-example";

/**
 * Example server component that uses Mantine CSS variables directly
 * and also incorporates client components for themed parts
 */
export default function ServerComponentExample() {
  return (
    <Stack gap="xl" p="md">
      <Title order={2}>Server Component Theme Example</Title>
      
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Server Component</Title>
          
          {/* Using Mantine CSS variables directly in a server component */}
          <Box
            p="md"
            style={{
              backgroundColor: 'var(--mantine-color-gray-0)',
              border: '1px solid var(--mantine-color-gray-3)',
              borderRadius: 'var(--mantine-radius-md)'
            }}
          >
            <Text>
              This box uses Mantine CSS variables directly in a server component.
              No hooks are used here, making it compatible with server components.
            </Text>
          </Box>
          
          {/* Using a client component for themed parts */}
          <ServerCompatibleThemedBox>
            <Text>
              This box is rendered by a client component that uses the useTheme hook.
              This pattern allows server components to use themed UI elements.
            </Text>
          </ServerCompatibleThemedBox>
          
          <Text mt="md" c="dimmed" size="sm">
            Server components cannot use React hooks like useTheme directly.
            Instead, either use Mantine CSS variables or extract themed parts to client components.
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
}
