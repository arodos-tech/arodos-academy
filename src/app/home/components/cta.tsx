"use client";

import { Box, Container, Stack, Text, Title, Button, SimpleGrid, rem } from "@mantine/core";
import { IconArrowRight, IconCode, IconCertificate, IconRocket } from "@/assets/icons";
import Link from "next/link";
import { useIsMobile } from "@/hooks";

const CTA = () => {
  const isMobile = useIsMobile();

  return (
    <Box py={120}>
      <Container size="lg">
        <Box
          bg="primary.3"
          c="white"
          py={60}
          px={isMobile ? 30 : 60}
          style={{
            background:
              "linear-gradient(135deg, var(--mantine-color-primary-5) 0%, var(--mantine-color-primary-8) 100%)",
            borderRadius: "var(--mantine-radius-xl)",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
          }}
        >
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
            <Stack gap="md" justify="center">
              <Text fw={700} size="lg" tt="uppercase">
                JOIN OUR COMMUNITY
              </Text>
              <Title order={2} style={{ fontSize: rem(36), lineHeight: 1.2 }}>
                Ready to Launch Your Tech Career?
              </Title>
              <Text size="lg" style={{ opacity: 0.9, lineHeight: 1.6 }}>
                Join Arodos Academy today and take the first step towards a rewarding career in technology.
              </Text>
            </Stack>

            <Stack gap="md" justify="center" align={isMobile ? "center" : "flex-end"}>
              <Button
                size="xl"
                variant="white"
                c="primary"
                radius="xl"
                px={40}
                rightSection={<IconArrowRight size={20} />}
                component={Link}
                href="/contact"
              >
                Apply Now
              </Button>
              <Text size="sm" mt="xs" style={{ opacity: 0.8, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <IconRocket size={16} />
                Hands-on learning for real-world success
              </Text>
            </Stack>
          </SimpleGrid>

          {/* Decorative elements */}
          <Box
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              opacity: 0.05,
              pointerEvents: "none",
              transform: "rotate(10deg)",
            }}
          >
            <IconCode size={200} />
          </Box>

          <Box
            style={{
              position: "absolute",
              left: 20,
              top: 20,
              opacity: 0.05,
              pointerEvents: "none",
            }}
          >
            <IconCertificate size={100} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTA;
