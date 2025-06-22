"use client";

import { Paper, Title, Stack, Group, ThemeIcon, Text, Divider, Card, Badge, Box } from "@mantine/core";
import { IconClock, IconCurrencyRupee, IconCalendar, IconCertificate } from "@/assets/icons";
import Link from "next/link";

interface CourseDetailsSidebarProps {
  course: any;
  relatedCourses?: any[];
}

export default function CourseDetailsSidebar({ course, relatedCourses = [] }: CourseDetailsSidebarProps) {
  return (
    <div style={{ gridColumn: "span 4" }}>
      <Stack gap="xl">
        <CourseDetails course={course} />
        <RelatedCourses courseId={course?.id} relatedCourses={relatedCourses} />
      </Stack>
    </div>
  );
}

function CourseDetails({ course }: { course: any }) {
  return (
    <Paper withBorder p="xl" radius="md" shadow="sm">
      <Title order={3} mb="lg" c="var(--mantine-color-dark-7)">
        Course Details
      </Title>

      <Stack gap="md">
        <Group gap="md">
          <ThemeIcon color="primary" size={40} radius="md" variant="light">
            <IconClock size={24} />
          </ThemeIcon>
          <div>
            <Text size="sm" c="dimmed">
              Duration
            </Text>
            <Text fw={500}>{course?.duration}</Text>
          </div>
        </Group>

        <Divider color="gray.2" />

        <Group gap="md">
          <ThemeIcon color="primary" size={40} radius="md" variant="light">
            <IconCurrencyRupee size={24} />
          </ThemeIcon>
          <div>
            <Text size="sm" c="dimmed">
              Price
            </Text>
            <Text fw={500}>
              {!isNaN(Number(course?.price)) && Number(course?.price) > 0 ? 
                Number(course?.price).toLocaleString("en-IN") : "Free"}
            </Text>
          </div>
        </Group>

        <Divider color="gray.2" />

        <Group gap="md">
          <ThemeIcon color="primary" size={40} radius="md" variant="light">
            <IconCalendar size={24} />
          </ThemeIcon>
          <div>
            <Text size="sm" c="dimmed">
              Start Date
            </Text>
            <Text fw={500}>{course?.startDate ? course.startDate : "Flexible / Immediate Access"}</Text>
          </div>
        </Group>

        <Divider color="gray.2" />

        <Group gap="md">
          <ThemeIcon color="primary" size={40} radius="md" variant="light">
            <IconCertificate size={24} />
          </ThemeIcon>
          <div>
            <Text size="sm" c="dimmed">
              Certification
            </Text>
            <Text fw={500}>{course?.certification ? course.certification : "Certificate of Completion"}</Text>
          </div>
        </Group>
      </Stack>
    </Paper>
  );
}

function RelatedCourses({ courseId, relatedCourses = [] }: { courseId: string; relatedCourses?: any[] }) {
  // Filter out current course and limit to 3 related courses
  const filteredCourses = relatedCourses
    .filter((course) => course?.id !== courseId)
    .slice(0, 3);

  if (filteredCourses.length === 0) {
    return null;
  }

  return (
    <Paper withBorder p="xl" radius="md" shadow="sm">
      <Title order={3} mb="lg" c="var(--mantine-color-dark-7)">
        Related Courses
      </Title>

      <Stack gap="md">
        {filteredCourses.map((course, index) => (
          <Card 
            key={index} 
            p="md" 
            radius="md" 
            withBorder 
            component={Link} 
            href={`/courses/${course.id}`}
            style={{
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              '&:hover': {
                transform: "translateY(-4px)",
                boxShadow: "var(--mantine-shadow-md)"
              }
            }}
          >
            <Text fw={600} mb="xs">
              {course.name}
            </Text>
            <Text size="sm" lineClamp={2} mb="sm" c="dimmed">
              {course.description}
            </Text>
            <Group gap="xs">
              <Badge size="sm" color="primary" variant="light">
                {course.duration}
              </Badge>
              <Badge size="sm" color="primary" variant="light">
                {!isNaN(Number(course?.price)) && Number(course?.price) > 0
                  ? Number(course?.price).toLocaleString("en-IN")
                  : "Free"}
              </Badge>
            </Group>
          </Card>
        ))}
      </Stack>
    </Paper>
  );
}
