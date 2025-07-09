"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Badge,
  Group,
  Button,
  Modal,
  Image,
  Stack,
  Loader,
  Alert,
  TextInput,
  Select,
  Box,
  Paper,
  ScrollArea,
  rem,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { IconAlertCircle, IconSearch, IconEye } from "@/assets/icons";
import { getApplications } from "@/actions/applications";
import { IMAGE_URL } from "@/lib/constants";

interface Application {
  id: number;
  name: string;
  phone: string;
  email: string;
  qualification: string;
  semester: string;
  college: string;
  courses: string[];
  receipt: string;
  created_at: string;
  updated_at: string;
}

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { applications: appData, error: fetchError } = await getApplications();
        if (fetchError) {
          console.error("Error fetching applications:", fetchError);
          setError(fetchError);
        } else {
          setApplications(appData || []);
          setError(null);
        }
      } catch (err: any) {
        console.error("Error in fetch operation:", err);
        setError(err.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique courses for filter dropdown
  const uniqueCourses = Array.from(new Set(applications?.flatMap((app) => app.courses || []))).sort();

  // Filter applications based on search term and course filter
  const filteredApplications = applications?.filter((app) => {
    const matchesSearch = searchTerm
      ? app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm)
      : true;

    const matchesCourse = filterCourse ? app.courses?.includes(filterCourse) : true;

    return matchesSearch && matchesCourse;
  });

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setModalOpened(true);
  };

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Group justify="center" py="xl">
          <Loader size="lg" />
          <Text>Loading applications...</Text>
        </Group>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box py="xl">
      <Container size="lg">
        <Title order={1} mb="lg">
          Applications
        </Title>

        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search by name, email or phone"
            leftSection={<IconSearch size={14} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "60%" }}
          />

          <Select
            placeholder="Filter by course"
            clearable
            data={uniqueCourses}
            value={filterCourse}
            onChange={setFilterCourse}
            style={{ width: "35%" }}
          />
        </Group>

        <Paper shadow="xs" p="md" radius="md" withBorder>
          <ScrollArea>
            <DataTable
              minHeight={300}
              columns={[
                { accessor: 'id', title: 'ID', sortable: true, width: 60 },
                { accessor: 'name', title: 'Name', sortable: true },
                { accessor: 'email', title: 'Email', sortable: true },
                { accessor: 'phone', title: 'Phone' },
                {
                  accessor: 'courses',
                  title: 'Course(s)',
                  render: (application) => (
                    <Group gap={4}>
                      {application.courses?.map((course: string) => (
                        <Badge key={course} size="sm" variant="light" color="blue">
                          {course}
                        </Badge>
                      ))}
                    </Group>
                  ),
                },
                {
                  accessor: 'created_at',
                  title: 'Date',
                  sortable: true,
                  render: (application) => new Date(application.created_at).toLocaleDateString(),
                },
                {
                  accessor: 'actions',
                  title: 'Actions',
                  textAlign: 'center',
                  render: (application) => (
                    <Button
                      variant="light"
                      size="xs"
                      leftSection={<IconEye size={14} />}
                      onClick={() => handleViewDetails(application)}
                    >
                      View
                    </Button>
                  ),
                },
              ]}
              records={filteredApplications || []}
              withTableBorder
              borderRadius="sm"
              striped
              highlightOnHover
              noRecordsText="No applications found"
              loadingText="Loading applications..."
              initialSorting={[{ accessor: 'id', direction: 'asc' }]}
            />
          </ScrollArea>
        </Paper>

        {/* Application Details Modal */}
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title={
            <Text size="lg" fw={700}>
              Application Details
            </Text>
          }
          size="lg"
        >
          {selectedApplication && (
            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={500}>ID:</Text>
                <Text>{selectedApplication.id}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Name:</Text>
                <Text>{selectedApplication.name}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Email:</Text>
                <Text>{selectedApplication.email}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Phone:</Text>
                <Text>{selectedApplication.phone}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Qualification:</Text>
                <Text>{selectedApplication.qualification}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Semester:</Text>
                <Text>{selectedApplication.semester}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>College:</Text>
                <Text>{selectedApplication.college}</Text>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Course(s):</Text>
                <div>
                  {selectedApplication.courses?.map((course) => (
                    <Badge key={course} mr={5} mb={5}>
                      {course}
                    </Badge>
                  ))}
                </div>
              </Group>

              <Group justify="space-between">
                <Text fw={500}>Date:</Text>
                <Text>{new Date(selectedApplication.created_at).toLocaleString()}</Text>
              </Group>

              <Stack gap="xs">
                <Text fw={500}>Receipt:</Text>
                {selectedApplication.receipt && (
                  <Image src={`${IMAGE_URL}/${selectedApplication.receipt}`} alt="Receipt" height={200} fit="contain" />
                )}
              </Stack>
            </Stack>
          )}
        </Modal>
      </Container>
    </Box>
  );
};

export default ApplicationsPage;
