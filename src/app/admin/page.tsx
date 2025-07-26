"use client";

import { Box, Card, Container, Group, Loader, Paper, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { IconSchool, IconUsers } from "@/assets/icons";
import { useEffect, useState } from "react";

import { getApplications } from "@/actions/applications";
import { getCourses } from "@/actions/courses";
import { useTheme } from "@/theme/use-theme";

const AdminDashboardPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useMantineTheme();
  const { colors } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch applications
        const { applications: appData, error: appError } = await getApplications();

        // Fetch courses
        const { courses: coursesData, error: coursesError } = await getCourses();

        if (appError) {
          console.error("Error fetching applications:", appError);
        } else if (coursesError) {
          console.error("Error fetching courses:", coursesError);
        } else {
          setApplications(appData || []);
          setCourses(coursesData || []);
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
  const totalCourses = courses?.length || 0;

  return (
    <>
      {loading ? (
        <Group justify="center" py="xl">
          <Loader size="lg" />
        </Group>
      ) : (
        <>
          <Box className="dashboard-stats" mb="md">
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
                      Available Courses
                    </Text>
                    <Text size="xl" fw={700}>
                      {totalCourses}
                    </Text>
                  </div>
                  <IconSchool size={32} stroke={1.5} />
                </Group>
              </Card>
            </SimpleGrid>
          </Box>

          <Paper shadow="xs" p="md" withBorder mt="xl">
            <Text size="lg" fw={700} mb="md">
              Recent Activity
            </Text>
            <Text c="dimmed">
              Welcome to the Arodos Academy Admin Dashboard. Use the navigation menu to manage applications and other
              administrative tasks.
            </Text>
          </Paper>
        </>
      )}
    </>
  );
};

export default AdminDashboardPage;
