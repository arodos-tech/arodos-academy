"use client";

import { useState, useEffect } from "react";
import { Container, Title, Text, Card, Group, SimpleGrid, Paper, Loader, Box } from "@mantine/core";
import { IconUsers, IconSchool } from "@/assets/icons";
import { getApplications } from "@/actions/applications";

const AdminDashboardPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { applications: appData, error } = await getApplications();
        if (error) {
          console.error("Error fetching applications:", error);
        } else {
          setApplications(appData || []);
        }
      } catch (err) {
        console.error("Error in fetch operation:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate stats
  const totalApplications = applications?.length || 0;
  const uniqueCourses = new Set(applications?.flatMap((app) => app.courses || [])).size;

  return (
    <Box py="xl">
      <Container size="lg">
        <Title order={1} mb="lg">
          Admin Dashboard
        </Title>

        {loading ? (
          <Group justify="center" py="xl">
            <Loader size="lg" />
          </Group>
        ) : (
          <>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      Total Applications
                    </Text>
                    <Text size="xl" fw={700}>
                      {totalApplications}
                    </Text>
                  </div>
                  <IconUsers size={32} stroke={1.5} />
                </Group>
              </Card>

              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      Unique Courses
                    </Text>
                    <Text size="xl" fw={700}>
                      {uniqueCourses}
                    </Text>
                  </div>
                  <IconSchool size={32} stroke={1.5} />
                </Group>
              </Card>
            </SimpleGrid>

            <Paper shadow="xs" p="md" withBorder mt="xl">
              <Title order={2} mb="md">
                Recent Activity
              </Title>
              <Text c="dimmed">
                Welcome to the Arodos Academy Admin Dashboard. Use the navigation menu to manage applications and other
                administrative tasks.
              </Text>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default AdminDashboardPage;
