"use client";

import { Card, Text, Badge, Group, Button, Title, Stack, Box, rem } from "@mantine/core";
import Link from "next/link";
import {
  IconBook,
  IconClock,
  IconCurrencyRupee,
  IconArrowRight,
  IconCode,
  IconAppWindow,
  IconCertificate,
  IconSeo,
} from "@/assets/icons";

interface CourseProps {
  course: {
    id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    tags?: string;
    [key: string]: any;
  };
}

const CourseCard = ({ course }: CourseProps) => {
  // Select icon based on course name or id to ensure consistency
  const getIcon = () => {
    // Use the course id or name to determine which icon to show
    const courseId = Number(course?.id) || 0;

    switch (courseId % 3) {
      case 0:
        return <IconSeo size={48} color="var(--mantine-color-red-6)" />;
      case 1:
        return <IconCode size={48} color="var(--mantine-color-red-6)" />;
      case 2:
        return <IconCertificate size={48} color="var(--mantine-color-red-6)" />;
      default:
        return <IconBook size={48} color="var(--mantine-color-red-6)" />;
    }
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 150ms ease, box-shadow 150ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Group mb="md" align="center" wrap="nowrap">
        <Box
          p="md"
          style={{
            backgroundColor: "var(--mantine-color-red-0)",
            borderRadius: "var(--mantine-radius-md)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: rem(80),
            height: rem(80),
            flexShrink: 0,
          }}
        >
          {getIcon()}
        </Box>
        <Title order={4} lineClamp={2}>
          {course.name}
        </Title>
      </Group>

      <Stack gap="sm" style={{ flex: 1 }}>
        <Text size="sm" c="dimmed" lineClamp={3} style={{ minHeight: rem(60) }}>
          {course.description || "No description available"}
        </Text>

        <Group gap="xs" mt="lg">
          {course?.tags?.split(",").map((tag, i) => (
            <Badge
              key={i}
              size="sm"
              radius="sm"
              style={{
                textTransform: "none",
                backgroundColor: "var(--mantine-color-red-0)",
                color: "var(--mantine-color-red-6)",
                fontWeight: 600,
                padding: "4px 12px",
              }}
            >
              {tag?.trim()}
            </Badge>
          ))}
        </Group>

        <Group justify="space-between" mt="md">
          <Group gap="xs">
            <Group gap={4}>
              <IconClock size={16} />
              <Text size="sm">{course?.duration || "N/A"}</Text>
            </Group>
            <Text size="sm">•</Text>
            <Group gap={4}>
              <IconCurrencyRupee size={16} />
              <Text size="sm">
                {typeof course?.price === "number" || !isNaN(Number(course?.price))
                  ? Number(course?.price).toLocaleString("en-IN")
                  : "Free"}
              </Text>
            </Group>
          </Group>

          <Button
            variant="light"
            color="red"
            size="sm"
            rightSection={<IconArrowRight size={16} />}
            component={Link}
            href={`/courses/${course?.id}`}
          >
            View
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default CourseCard;
