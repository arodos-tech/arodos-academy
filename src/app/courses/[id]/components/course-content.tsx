"use client";

import {
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Group,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import { IconCheck } from "@/assets/icons";

interface CourseContentProps {
  course: any;
}

export default function CourseContent({ course }: CourseContentProps) {
  const mantineTheme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  // Learning objectives from course data
  const objectives = course?.objectives ? course.objectives.split(",").map((obj: string) => obj.trim()) : [];

  // Requirements from course data
  const requirements = course?.requirements ? course.requirements.split(",").map((req: string) => req.trim()) : [];

  return (
    <Box pb={40} bg={colorScheme === "dark" ? mantineTheme.colors.dark[8] : mantineTheme.colors.gray[0]}>
      <Container size="lg">
        <Tabs defaultValue="overview" radius="md" color="primary">
          <Tabs.List mb="xl">
            <Tabs.Tab value="overview" fw={500}>
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="curriculum" fw={500}>
              Curriculum
            </Tabs.Tab>
            {course?.instructor && (
              <Tabs.Tab value="instructor" fw={500}>
                Instructor
              </Tabs.Tab>
            )}
          </Tabs.List>

          <Tabs.Panel value="overview">
            <Paper withBorder p="xl" radius="md" shadow="sm">
              <Title order={2} mb="xl">
                About This Course
              </Title>

              <Text size="md" mb="xl" style={{ lineHeight: 1.7 }} c="dimmed">
                {course?.description}
              </Text>

              {objectives.length > 0 && (
                <>
                  <Title order={3} mb="md">
                    What You'll Learn
                  </Title>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} mb="xl">
                    {objectives.map((objective: string, i: number) => (
                      <Group key={i} gap="sm" align="flex-start">
                        <ThemeIcon color="primary" variant="light" size={24} radius="xl">
                          <IconCheck size={16} />
                        </ThemeIcon>
                        <Text>{objective}</Text>
                      </Group>
                    ))}
                  </SimpleGrid>
                </>
              )}

              {requirements.length > 0 && (
                <>
                  <Title order={3} mb="md">
                    Requirements
                  </Title>
                  <List withPadding>
                    {requirements.map((requirement: string, i: number) => (
                      <List.Item key={i}>{requirement}</List.Item>
                    ))}
                  </List>
                </>
              )}
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="curriculum">
            <Paper withBorder p="xl" radius="md" shadow="sm">
              <Title order={2} mb="xl">
                Course Curriculum
              </Title>

              <Stack gap="md">
                {course?.modules &&
                  course.modules.map((module: any, i: number) => (
                    <Card key={i} withBorder radius="md" shadow="xs">
                      <Group justify="space-between" mb="xs">
                        <Group gap="md">
                          <ThemeIcon size={40} radius="md" color="primary" variant="light">
                            <Text fw={700}>{i + 1}</Text>
                          </ThemeIcon>
                          <Title order={4}>{module.title}</Title>
                        </Group>
                        <Badge size="lg" color="primary" variant="light">
                          {module.duration}
                        </Badge>
                      </Group>
                      <Text c="dimmed" ml={56}>
                        {module.description}
                      </Text>
                    </Card>
                  ))}
                {!course?.modules && (
                  <Text c="dimmed" ta="center" py="xl">
                    Curriculum details will be available soon.
                  </Text>
                )}
              </Stack>
            </Paper>
          </Tabs.Panel>

          {course?.instructor && (
            <Tabs.Panel value="instructor">
              <Paper withBorder p="xl" radius="md" shadow="sm">
                <Title order={2} mb="xl">
                  Meet Your Instructor
                </Title>

                <Group align="flex-start" mb="xl">
                  <Avatar size={100} radius="md" color="primary" src={course.instructor.avatar}>
                    {course.instructor.name?.charAt(0)}
                  </Avatar>

                  <div>
                    <Title order={3}>{course.instructor.name}</Title>
                    <Text c="dimmed" mb="md">
                      {course.instructor.title}
                    </Text>
                    <Text style={{ lineHeight: 1.7 }} c="dimmed">
                      {course.instructor.bio}
                    </Text>
                  </div>
                </Group>

                {course.instructor.badges && (
                  <Group gap="md">
                    {course.instructor.badges.map((badge: string, i: number) => (
                      <Badge key={i} size="lg" color="primary" variant="light">
                        {badge}
                      </Badge>
                    ))}
                  </Group>
                )}
              </Paper>
            </Tabs.Panel>
          )}
        </Tabs>
      </Container>
    </Box>
  );
}
