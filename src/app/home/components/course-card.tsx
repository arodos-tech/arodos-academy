"use client";

import { Badge, Box, Button, Card, Group, Stack, Text, Title, rem } from "@mantine/core";
import {
  IconArrowRight,
  IconBook,
  IconCertificate,
  IconClock,
  IconCode,
  IconCurrencyRupee,
  IconSeo,
} from "@/assets/icons";

import Link from "next/link";
import { useTheme } from "@/theme/use-theme";

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
  const { colors, themeMode, mantineTheme } = useTheme();

  // Select icon based on course name or id to ensure consistency
  const getIcon = () => {
    // Use the course id or name to determine which icon to show
    const courseId = Number(course?.id) || 0;

    switch (courseId % 3) {
      case 0:
        return <IconSeo size={48} color={colors.primary} />;
      case 1:
        return <IconCode size={48} color={colors.primary} />;
      case 2:
        return <IconCertificate size={48} color={colors.primary} />;
      default:
        return <IconBook size={48} color={colors.primary} />;
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
            backgroundColor: colors.primaryLight,
            borderRadius: mantineTheme.radius.md,
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
        <Title order={3} lineClamp={2} style={{ fontSize: rem(20), color: colors.textPrimary }}>
          {course.name}
        </Title>
      </Group>

      <Stack gap="sm" style={{ flex: 1 }}>
        <Text size="md" lineClamp={3} style={{ minHeight: rem(70), fontSize: rem(15), color: colors.textSecondary }}>
          {course.description || "No description available"}
        </Text>

        {course?.tags && course.tags.trim() && (
          <Group gap="xs" mt="lg">
            {course.tags.split(",").map(
              (tag, i) =>
                tag.trim() && (
                  <Badge
                    key={i}
                    size="sm"
                    radius="sm"
                    style={{
                      textTransform: "none",
                      backgroundColor: colors.primaryLight,
                      color: colors.primary,
                      fontWeight: 600,
                      padding: "4px 12px",
                    }}
                  >
                    {tag.trim()}
                  </Badge>
                )
            )}
          </Group>
        )}

        <Group justify="space-between" mt="md">
          <Group gap="xs">
            <Group gap={4}>
              <IconClock size={18} />
              <Text size="md">{course?.duration || "N/A"}</Text>
            </Group>
            <Text size="sm">•</Text>
            <Group gap={4}>
              <IconCurrencyRupee size={18} />
              <Text size="md">
                {typeof course?.price === "number" || !isNaN(Number(course?.price))
                  ? Number(course?.price).toLocaleString("en-IN")
                  : "Free"}
              </Text>
            </Group>
          </Group>

          <Button
            variant="light"
            color={colors.primary}
            size="md"
            rightSection={
              <IconArrowRight size={18} style={{ color: themeMode === "dark" ? colors.textPrimary : undefined }} />
            }
            component={Link}
            href={`/courses/${course?.id}`}
            styles={(theme) => ({
              root: {
                color: themeMode === "dark" ? colors.textPrimary : undefined,
              },
            })}
          >
            View
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default CourseCard;
