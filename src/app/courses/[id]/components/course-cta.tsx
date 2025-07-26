"use client";

import { Box, Button, Container, Flex, Group, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconArrowRight, IconCertificate, IconSchool, IconStar } from "@/assets/icons";

import Link from "next/link";
import { showLoadingOverlay } from "@/components/shared/loading-overlay";
import { useRouter } from "next/navigation";
import { useTheme } from "@/theme/use-theme";

interface CourseCTAProps {
  courseName?: string;
}

export default function CourseCTA({ courseName }: CourseCTAProps) {
  const { colors, mantineTheme, themeMode } = useTheme();
  const router = useRouter();
  const paperBg = themeMode === "dark" ? mantineTheme.colors.dark[6] : mantineTheme.white;

  const handleEnrollClick = () => {
    showLoadingOverlay(true);
    router.push("/contact#reg-form");
  };

  return (
    <Box pb={60} pt={20} bg={themeMode === "dark" ? mantineTheme.colors.dark[8] : mantineTheme.colors.gray[0]}>
      <Container size="lg">
        <Paper
          radius="md"
          p="xl"
          withBorder
          shadow="md"
          style={{
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${mantineTheme.colors.gray[1]} 0%, ${mantineTheme.colors.gray[0]} 100%)`,
          }}
        >
          {/* Decorative elements */}
          <Box
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${mantineTheme.colors.primary[1]} 0%, transparent 70%)`,
              opacity: 0.6,
              zIndex: 0,
            }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${mantineTheme.colors.primary[2]} 0%, transparent 70%)`,
              opacity: 0.5,
              zIndex: 0,
            }}
          />

          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap="xl"
            style={{ position: "relative", zIndex: 1 }}
          >
            <Stack style={{ flex: 1, alignItems: "center" }} className="md:items-start">
              <Group gap="md">
                <ThemeIcon size={56} radius="xl" color="primary" variant="light">
                  <IconSchool size={30} />
                </ThemeIcon>
                <div>
                  <Title style={{ color: colors.textPrimary }} order={2}>
                    Ready to Start Your Learning Journey?
                  </Title>
                  <Text style={{ color: colors.textSecondary }} size="lg" c="dimmed">
                    {courseName
                      ? `Enroll in ${courseName} today and take the first step towards advancing your career.`
                      : "Enroll in this course today and take the first step towards advancing your career."}
                  </Text>
                </div>
              </Group>
            </Stack>

            <Group justify="center" gap="md">
              <Button variant="filled" color="primary" size="lg" radius="md" onClick={handleEnrollClick}>
                Enroll Now
              </Button>
              <Button
                variant="outline"
                color="primary"
                size="lg"
                radius="md"
                rightSection={<IconArrowRight size={20} />}
                component={Link}
                href="/courses"
              >
                Browse More Courses
              </Button>
            </Group>
          </Flex>

          {/* Achievement icons */}
          <Group mt="xl" justify="center" style={{ position: "relative", zIndex: 1 }}>
            <Paper
              p="md"
              radius="md"
              withBorder
              style={{ background: themeMode === "dark" ? mantineTheme.colors.dark[7] : mantineTheme.colors.gray[0] }}
            >
              <Group gap="xs">
                <ThemeIcon size="md" color="primary" variant="light" radius="xl">
                  <IconCertificate size={16} />
                </ThemeIcon>
                <Text style={{ color: colors.textSecondary }} size="sm" fw={500}>
                  Certification Included
                </Text>
              </Group>
            </Paper>
            <Paper
              p="md"
              radius="md"
              withBorder
              style={{ background: themeMode === "dark" ? mantineTheme.colors.dark[7] : mantineTheme.colors.gray[0] }}
            >
              <Group gap="xs">
                <ThemeIcon size="md" color="primary" variant="light" radius="xl">
                  <IconStar size={16} />
                </ThemeIcon>
                <Text style={{ color: colors.textSecondary }} size="sm" fw={500}>
                  Expert Instructors
                </Text>
              </Group>
            </Paper>
          </Group>
        </Paper>
      </Container>
    </Box>
  );
}
