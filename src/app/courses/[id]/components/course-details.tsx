"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  Group,
  Button,
  SimpleGrid,
  ThemeIcon,
  Card,
  Title,
  Badge,
  Paper,
} from "@mantine/core";
import { IconClock, IconCurrencyRupee, IconCheck, IconCertificate, IconArrowLeft } from "@/assets/icons";

interface CourseDetailsProps {
  course: any;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  // Parse tags from course data
  const tags = course?.tags ? course.tags.split(",").map((tag: string) => tag.trim()) : [];

  return (
    <Box py={40} bg="var(--mantine-color-gray-0)">
      <Container size="lg">
        <Group mb="md">
          <Button
            component="a"
            href="/courses"
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            color="primary"
            size="sm"
          >
            Back to Courses
          </Button>
        </Group>
        <Paper shadow="sm" radius="md" p="xl" withBorder>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
            <div>
              {/* Course name */}
              <Title order={1} mb="md" style={{ lineHeight: 1.2 }} c="var(--mantine-color-dark-7)">
                {course?.name}
              </Title>

              {/* Course description */}
              <Text size="lg" mb="xl" style={{ lineHeight: 1.6 }} c="var(--mantine-color-gray-7)">
                {course?.description}
              </Text>

              {/* Course tags */}
              {tags.length > 0 && (
                <Group gap="xs" mb="xl">
                  {tags.map((tag: string, i: number) => (
                    <Badge key={i} size="lg" radius="sm" color="primary" variant="light">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              )}

              <Group gap="xl" mb="xl">
                <Group gap="xs">
                  <ThemeIcon size="md" variant="light" color="primary">
                    <IconClock size={16} />
                  </ThemeIcon>
                  <Text size="md">{course?.duration}</Text>
                </Group>

                <Group gap="xs">
                  <ThemeIcon size="md" variant="light" color="primary">
                    <IconCurrencyRupee size={16} />
                  </ThemeIcon>
                  <Text size="md" fw={600}>
                    {!isNaN(Number(course?.price)) && Number(course?.price) > 0
                      ? Number(course?.price).toLocaleString("en-IN")
                      : "Free"}
                  </Text>
                </Group>
              </Group>
            </div>

            <div>
              <Card shadow="sm" radius="md" p="lg" withBorder>
                <Stack>
                  <Group gap="md" align="center">
                    <ThemeIcon size={48} radius="md" color="primary" variant="light">
                      <IconCertificate size={28} />
                    </ThemeIcon>
                    <div>
                      <Text fw={700} size="lg">
                        Course Highlights
                      </Text>
                      <Text size="sm" c="var(--mantine-color-gray-6)">
                        Everything you need to know
                      </Text>
                    </div>
                  </Group>

                  <Stack gap="sm" mt="md">
                    {course?.duration && (
                      <Group gap="xs" align="flex-start">
                        <ThemeIcon color="primary" variant="light" size={24} radius="xl">
                          <IconCheck size={16} />
                        </ThemeIcon>
                        <Text fw={500}>{course.duration} of expert instruction</Text>
                      </Group>
                    )}
                    <Group gap="xs" align="flex-start">
                      <ThemeIcon color="primary" variant="light" size={24} radius="xl">
                        <IconCheck size={16} />
                      </ThemeIcon>
                      <Text fw={500}>Hands-on training</Text>
                    </Group>
                    <Group gap="xs" align="flex-start">
                      <ThemeIcon color="primary" variant="light" size={24} radius="xl">
                        <IconCheck size={16} />
                      </ThemeIcon>
                      <Text fw={500}>Certificate of completion</Text>
                    </Group>
                  </Stack>

                  <Button size="lg" fullWidth mt="md" radius="md" color="primary">
                    Enroll Now
                  </Button>
                </Stack>
              </Card>
            </div>
          </SimpleGrid>
        </Paper>
      </Container>
    </Box>
  );
}
