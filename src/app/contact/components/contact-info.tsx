"use client";

import { Box, Container, Text, Group, Stack, ThemeIcon, Anchor, rem, SimpleGrid } from "@mantine/core";
import { useTheme } from "@/theme/use-theme";
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
  const { colors, mantineTheme, themeMode } = useTheme();
  return (
    <Box
      py={rem(80)}
      style={{ backgroundColor: themeMode === "dark" ? mantineTheme.colors.dark[7] : mantineTheme.colors.gray[0] }}
    >
      <Container size="lg">
        <Box ta="center" mb={rem(40)}>
          <Text fw={700} fz={rem(36)} style={{ color: colors.textPrimary }} mb={rem(10)}>
            Get In Touch
          </Text>
          <Text size="lg" style={{ color: mantineTheme.white }} maw={700} mx="auto">
            We'd love to hear from you. Reach out to us through any of the channels below.
          </Text>
        </Box>
        <Box
          style={{
            background:
              themeMode === "dark"
                ? `linear-gradient(135deg, rgba(255,0,0,0.85) 0%, rgba(128,0,0,0.85) 100%)`
                : `linear-gradient(135deg, rgba(255,0,0,0.7) 0%, rgba(255,128,128,0.7) 100%)`,
            borderRadius: mantineTheme.radius.xl,
            padding: rem(60),
            color: mantineTheme.white,
            marginBottom: rem(40),
            boxShadow: themeMode === "dark" ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0, 0, 0, 0.1)",
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
              background: themeMode === "dark" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.05)",
              clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          />

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(60)}>
            <Group align="center" gap={rem(20)}>
              <ThemeIcon
                size={rem(64)}
                radius="xl"
                variant="outline"
                style={{ border: "2px solid white", boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
              >
                <IconMail size={32} stroke={1.5} color={mantineTheme.white} />
              </ThemeIcon>
              <Box>
                <Text fw={700} fz={rem(22)} mb={rem(8)} style={{ color: mantineTheme.white }}>
                  Email Us
                </Text>
                <Anchor
                  href="mailto:contact@arodos.com"
                  style={{ color: mantineTheme.white }}
                  // style={{ textDecoration: "none", fontSize: rem(18), fontWeight: 500, transition: "all 0.2s ease" }}
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
                variant="outline"
                style={{ border: "2px solid white", boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
              >
                <IconPhone size={32} stroke={1.5} color={mantineTheme.white} />
              </ThemeIcon>
              <Box>
                <Text fw={700} fz={rem(22)} mb={rem(8)} style={{ color: mantineTheme.white }}>
                  Call Us
                </Text>
                <Anchor
                  href="tel:+919876543210"
                  style={{ color: mantineTheme.white }}
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
