"use client";

import { Card, Image, Text, Badge, Group, Button, Title, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CourseProps {
  course: {
    id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    tags?: string;
    [key: string]: any; // For any additional properties
  };
}

// Course card component for displaying individual courses
const CourseCard = ({ course }: CourseProps) => {
  const router = useRouter();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          borderColor: "var(--mantine-color-red-3)",
        },
      }}
    >
      <Card.Section>
        <Image
          src={`https://source.unsplash.com/random/800x450?${encodeURIComponent(course.name)}`}
          height={160}
          alt={course.name}
        />
      </Card.Section>

      <Stack style={{ flex: 1 }} mt="md" gap="xs">
        <Group justify="space-between" align="center" wrap="nowrap">
          <Title order={4} lineClamp={2} style={{ lineHeight: 1.3 }}>
            {course.name}
          </Title>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3} style={{ flex: 1 }}>
          {course.description}
        </Text>

        <Group mt="auto" pt="sm">
          <Badge color="red" variant="light">
            {course.duration}
          </Badge>
          {course.tags?.split(",").map((tag, i) => (
            <Badge key={i} color="gray" variant="outline">
              {tag.trim()}
            </Badge>
          ))}
        </Group>

        <Group justify="space-between" align="center" mt="md">
          <Text fw={700} size="lg">
            ${course.price}
          </Text>
          <Button variant="light" color="red" component={Link} href={`/courses/${course.id}`}>
            View Details
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default CourseCard;
