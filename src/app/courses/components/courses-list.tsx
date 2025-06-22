"use client";

import { Box, Container, Stack, Text, Title, Grid, rem, TextInput, Select, Group } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@/assets/icons";
import CourseCard from "@/app/home/components/course-card";

interface CoursesListProps {
  courses: any[];
  error: string | null;
}

const CoursesList = ({ courses, error }: CoursesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string | null>("priority");

  // Filter courses based on search query
  const filteredCourses =
    courses?.filter?.(
      (course) =>
        course?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course?.tags?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Sort courses based on selected option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityA = Number(a?.priority) || 0;
      const priorityB = Number(b?.priority) || 0;
      return priorityB - priorityA; // Higher priority first
    } else if (sortBy === "name-asc") {
      return (a?.name || "").localeCompare(b?.name || "");
    } else if (sortBy === "name-desc") {
      return (b?.name || "").localeCompare(a?.name || "");
    } else if (sortBy === "price-low") {
      return (Number(a?.price) || 0) - (Number(b?.price) || 0);
    } else if (sortBy === "price-high") {
      return (Number(b?.price) || 0) - (Number(a?.price) || 0);
    }
    return 0;
  });

  return (
    <Box py={40} bg="var(--mantine-color-gray-0)" c="var(--mantine-color-dark-9)">
      <Container size="lg">
        <Box mb={40}>
          <TextInput
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={20} />}
            size="lg"
            radius="md"
            mb={40}
            styles={{ input: { fontSize: rem(16) } }}
          />

          {error ? (
            <Stack align="center" py={40}>
              <Text size="lg" c="red">
                {error}
              </Text>
            </Stack>
          ) : sortedCourses.length === 0 ? (
            <Stack align="center" py={40}>
              <Text size="xl" fw={500}>No courses found. Please try a different search term.</Text>
            </Stack>
          ) : (
            <>
              <Title order={2} mb={30} size="h2">
                {filteredCourses.length} {filteredCourses.length === 1 ? "Course" : "Courses"} Available
              </Title>
              <Grid>
                {sortedCourses.map((course, index) => (
                  <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
                    <CourseCard course={course} />
                  </Grid.Col>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CoursesList;
