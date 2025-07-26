"use client";

import { Box, Button, Container, Stack, Text, Title } from "@mantine/core";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container size="lg">
      <Box py={100}>
        <Stack align="center" gap="md">
          <Title order={1}>Something went wrong</Title>
          <Text size="lg" mb="xl">
            We apologize for the inconvenience. Please try again.
          </Text>
          <Button onClick={() => reset()} size="lg">
            Try again
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
