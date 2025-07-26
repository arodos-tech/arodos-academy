import { Box, Button, Container, Stack, Text, Title } from "@mantine/core";

import Link from "next/link";

export default function NotFound() {
  return (
    <Container size="lg">
      <Box py={100}>
        <Stack align="center" gap="md">
          <Title order={1}>404 - Page Not Found</Title>
          <Text size="lg" mb="xl">
            The page you are looking for does not exist or has been moved.
          </Text>
          <Button component={Link} href="/home" size="lg">
            Go to Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
