"use client";

import { Box, Button, Container, Flex, Group, Paper, Stack, Text, ThemeIcon, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import Link from "next/link";

import { IconArrowRight, IconCertificate, IconSchool, IconStar } from "@/assets/icons";

interface CourseCTAProps {
  courseName?: string;
}

export default function CourseCTA({ courseName }: CourseCTAProps) {
  const mantineTheme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const paperBg = colorScheme === "dark" ? mantineTheme.colors.dark[6] : mantineTheme.white;

  return (
    <Box pb={60} pt={20} bg={colorScheme === "dark" ? mantineTheme.colors.dark[8] : mantineTheme.colors.gray[0]}>
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
                  <Title order={2}>
                    Ready to Start Your Learning Journey?
                  </Title>
                  <Text size="lg" c="dimmed">
                    {courseName
                      ? `Enroll in ${courseName} today and take the first step towards advancing your career.`
                      : "Enroll in this course today and take the first step towards advancing your career."}
                  </Text>
                </div>
              </Group>
            </Stack>

            <Group justify="center" gap="md">
              <Button variant="filled" color="primary" size="lg" radius="md">
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
            <Paper p="md" radius="md" withBorder style={{ background: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)' }}>
              <Group gap="xs">
                <ThemeIcon size="md" color="primary" variant="light" radius="xl">
                  <IconCertificate size={16} />
                </ThemeIcon>
                <Text size="sm" fw={500}>
                  Certification Included
                </Text>
              </Group>
            </Paper>
            <Paper p="md" radius="md" withBorder style={{ background: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)' }}>
              <Group gap="xs">
                <ThemeIcon size="md" color="primary" variant="light" radius="xl">
                  <IconStar size={16} />
                </ThemeIcon>
                <Text size="sm" fw={500}>
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
