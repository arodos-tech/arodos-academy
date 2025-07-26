"use client";

import { useState, useEffect } from "react";
import {
  Text,
  Badge,
  Group,
  Button,
  Stack,
  Loader,
  Alert,
  TextInput,
  Select,
  Paper,
  ScrollArea,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import sortBy from "lodash/sortBy";
import { IconAlertCircle, IconSearch, IconEye } from "@/assets/icons";
import { getApplications } from "@/actions/applications";
import { getCourses } from "@/actions/courses";
import { useTheme } from "@/theme/use-theme";
import { useRouter } from "next/navigation";

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
  const { colors } = useTheme();
  const theme = useMantineTheme();
  const router = useRouter();
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Application>>({
    columnAccessor: "id",
    direction: "asc",
  });
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const [applications, setApplications] = useState<Application[]>([]);
  const [coursesList, setCoursesList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState<string | null>(null);

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
          setError(appError);
        } else if (coursesError) {
          console.error("Error fetching courses:", coursesError);
          setError(coursesError);
        } else {
          setApplications(appData || []);

          // Extract course names from the courses data
          const courseNames = coursesData?.map((course) => course.name) || [];
          setCoursesList(courseNames);

          setError(null);
        }
      } catch (err: any) {
        console.error("Error in fetch operation:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Sort applications
  const sortedApplications = sortBy(filteredApplications, sortStatus.columnAccessor) as Application[];
  if (sortStatus.direction === "desc") sortedApplications.reverse();

  // Paginate applications
  const paginatedApplications = sortedApplications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleViewDetails = (application: Application) => {
    // Navigate to the details page with the application ID
    router.push(`/admin/applications/${application.id}`);
  };

  if (loading) {
    return (
      <Group justify="center" py="xl">
        <Loader size="lg" />
        <Text>Loading applications...</Text>
      </Group>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color={theme.colors.error[8]}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Box className="search-filters" mb="md">
        <Group justify="space-between">
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
            data={coursesList}
            value={filterCourse}
            onChange={setFilterCourse}
            style={{ width: "35%" }}
          />
        </Group>
      </Box>

      <Paper shadow="xs" p="md" radius="md" withBorder>
        <ScrollArea>
          <DataTable
            minHeight={300}
            columns={[
              {
                accessor: "index",
                title: "S.No",
                width: 60,
                render: (_, index) => (page - 1) * PAGE_SIZE + index + 1,
              },
              { accessor: "name", title: "Name", sortable: true },
              { accessor: "email", title: "Email", sortable: true },
              { accessor: "phone", title: "Phone" },
              {
                accessor: "courses",
                title: "Course(s)",
                render: (application) => (
                  <Group gap={4}>
                    {application.courses?.map((course: string) => (
                      <Badge
                        key={course}
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
                        {course}
                      </Badge>
                    ))}
                  </Group>
                ),
              },
              {
                accessor: "created_at",
                title: "Date",
                sortable: true,
                render: (application) => new Date(application.created_at).toLocaleDateString(),
              },
              {
                accessor: "actions",
                title: "Actions",
                textAlign: "center",
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
            records={paginatedApplications}
            totalRecords={sortedApplications.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={setPage}
            withTableBorder
            borderRadius="sm"
            striped
            highlightOnHover
            noRecordsText="No applications found"
            loadingText="Loading applications..."
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
          />
        </ScrollArea>
      </Paper>
    </>
  );
};

export default ApplicationsPage;
