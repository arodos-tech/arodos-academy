"use client";

import { Box, Container, Title, Text, Group, Button, Paper, ThemeIcon, Stack, Flex } from "@mantine/core";
import { IconArrowRight, IconCertificate, IconStar, IconSchool } from "@/assets/icons";
import Link from "next/link";

interface CourseCTAProps {
  courseName?: string;
}

export default function CourseCTA({ courseName }: CourseCTAProps) {
  return (
    <Box pb={60} pt={20} bg="var(--mantine-color-gray-0)">
      <Container size="lg">
        <Paper
          radius="md"
          p="xl"
          withBorder
          shadow="md"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, var(--mantine-color-gray-1) 0%, var(--mantine-color-gray-0) 100%)",
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
              background: "radial-gradient(circle, var(--mantine-color-primary-1) 0%, transparent 70%)",
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
              background: "radial-gradient(circle, var(--mantine-color-primary-2) 0%, transparent 70%)",
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
                  <Title order={2} c="var(--mantine-color-dark-7)">
                    Ready to Start Your Learning Journey?
                  </Title>
                  <Text size="lg" c="var(--mantine-color-gray-7)">
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
            <Paper p="md" radius="md" withBorder style={{ background: "rgba(255,255,255,0.7)" }}>
              <Group gap="xs">
                <ThemeIcon size="md" color="primary" variant="light" radius="xl">
                  <IconCertificate size={16} />
                </ThemeIcon>
                <Text size="sm" fw={500}>
                  Certification Included
                </Text>
              </Group>
            </Paper>
            <Paper p="md" radius="md" withBorder style={{ background: "rgba(255,255,255,0.7)" }}>
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
