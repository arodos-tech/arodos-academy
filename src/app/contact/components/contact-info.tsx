"use client";

import { Box, Container, Text, Group, Stack, ThemeIcon, Anchor, rem, SimpleGrid } from "@mantine/core";
import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandInstagram,
  IconBrandYoutube,
} from "@/assets/icons";

const ContactInfo = () => {
  return (
    <Box py={rem(80)} style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
      <Container size="lg">
        <Box ta="center" mb={rem(40)}>
          <Text fw={700} fz={rem(36)} c="primary.5" mb={rem(10)}>
            Get In Touch
          </Text>
          <Text size="lg" c="dimmed" maw={700} mx="auto">
            We'd love to hear from you. Reach out to us through any of the channels below.
          </Text>
        </Box>
        <Box
          style={{
            background: "linear-gradient(135deg, var(--mantine-color-red-6) 0%, var(--mantine-color-red-8) 100%)",
            borderRadius: "var(--mantine-radius-xl)",
            padding: rem(60),
            color: "white",
            marginBottom: rem(40),
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "40%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.05)",
              clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          />

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)}>
            <Group align="center" gap={rem(20)}>
              <ThemeIcon
                size={rem(64)}
                radius="xl"
                color="white"
                variant="outline"
                style={{ border: "2px solid white", boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
              >
                <IconMail size={32} stroke={1.5} />
              </ThemeIcon>
              <Box>
                <Text fw={700} fz={rem(22)} mb={rem(8)}>
                  Email Us
                </Text>
                <Anchor
                  href="mailto:contact@arodos.com"
                  c="white"
                  style={{ textDecoration: "none", fontSize: rem(18), fontWeight: 500, transition: "all 0.2s ease" }}
                  className="hover-effect"
                >
                  contact@arodos.com
                </Anchor>
              </Box>
            </Group>

            <Group align="center" gap={rem(20)}>
              <ThemeIcon
                size={rem(64)}
                radius="xl"
                color="white"
                variant="outline"
                style={{ border: "2px solid white", boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
              >
                <IconPhone size={32} stroke={1.5} />
              </ThemeIcon>
              <Box>
                <Text fw={700} fz={rem(22)} mb={rem(8)}>
                  Call Us
                </Text>
                <Anchor
                  href="tel:+919876543210"
                  c="white"
                  style={{ textDecoration: "none", fontSize: rem(18), fontWeight: 500, transition: "all 0.2s ease" }}
                  className="hover-effect"
                >
                  +91 84020 85350
                </Anchor>
              </Box>
            </Group>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactInfo;
