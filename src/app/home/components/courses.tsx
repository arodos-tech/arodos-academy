"use client";

import { Box, Container, Stack, Text, Title, Button, SimpleGrid, rem } from "@mantine/core";
import { IconArrowRight } from "@/assets/icons";
import Link from "next/link";
import CourseCard from "./course-card";
import { useTheme } from "@/theme/use-theme";

interface CourseSectionProps {
  courses: any[];
  error: string | null;
}

const Courses = ({ courses, error }: CourseSectionProps) => {
  const { colors, themeMode, mantineTheme } = useTheme();

  return (
    <Box id="courses" py={120} style={{ backgroundColor: colors.backgroundAlt, color: colors.textPrimary }}>
      <Container size="lg">
        <Stack align="center" gap="xl" mb={80}>
          <Text c={colors.primary} fw={700} size="lg" tt="uppercase" ta="center">
            BECOME IN DEMAND
          </Text>
          <Title
            order={2}
            style={{
              fontSize: rem(36),
              textAlign: "center",
              maxWidth: rem(700),
              margin: "0 auto",
            }}
          >
            Master Skills That Matter in Today's Job Market
          </Title>
          <Text size="lg" ta="center" c="dimmed" maw={800} mx="auto" style={{ color: mantineTheme.colors.gray[6] }}>
            Choose from our range of programs designed to take you from beginner to job-ready professional.
          </Text>
        </Stack>

        {error ? (
          <Stack align="center" py={40}>
            <Text size="lg" c={colors.primary}>
              {error}
            </Text>
          </Stack>
        ) : (
          <Box mb={80}>
            {/* <Title order={3} mb={30} ta="center">
              All Courses
            </Title> */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {courses?.map?.((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </SimpleGrid>
          </Box>
        )}

        <Box ta="center" mt={60}>
          <Button
            variant="outline"
            size="xl"
            radius="xl"
            px={40}
            rightSection={
              <IconArrowRight size={20} style={{ color: themeMode === "dark" ? colors.textPrimary : colors.primary }} />
            }
            component={Link}
            href="/courses"
            color={colors.primary}
            styles={(theme) => ({
              root: {
                borderColor: themeMode === "dark" ? colors.textPrimary : colors.primary,
                color: themeMode === "dark" ? colors.textPrimary : colors.primary,
                "&:hover": {
                  backgroundColor: themeMode === "dark" ? colors.surfaceHover : colors.primaryLight,
                  color: themeMode === "dark" ? colors.textPrimary : colors.primaryDark,
                },
              },
            })}
          >
            View All Courses
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Courses;
