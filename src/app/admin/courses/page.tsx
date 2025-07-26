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
  Paper,
  ScrollArea,
  Box,
  useMantineTheme,
  ActionIcon,
  Modal,
  Tooltip,
  NumberInput,
  Textarea,
  Card,
  SimpleGrid,
  rem,
} from "@mantine/core";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import sortBy from "lodash/sortBy";
import {
  IconAlertCircle,
  IconSearch,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCurrencyRupee,
  IconClock,
  IconCalendar,
  IconUsers,
  IconBook,
} from "@/assets/icons";
import { Course, getCourses, createCourse, updateCourse, deleteCourse } from "@/actions/courses";
import { useTheme } from "@/theme/use-theme";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const CoursesPage = () => {
  const { colors } = useTheme();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Course>>({
    columnAccessor: "priority",
    direction: "desc",
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  // Form state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [formData, setFormData] = useState<Course>({
    name: "",
    description: "",
    duration: "",
    price: "",
    tags: "",
    priority: 0,
  });
  const [formLoading, setFormLoading] = useState(false);

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Function to fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { courses: coursesData, error: fetchError } = await getCourses();
      if (fetchError) {
        console.error("Error fetching courses:", fetchError);
        setError(fetchError);
      } else {
        setCourses(coursesData || []);
        setError(null);
      }
    } catch (err: any) {
      console.error("Error in fetch operation:", err);
      setError(err.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  // Filter courses based on search term
  const filteredCourses = courses?.filter((course) => {
    return searchTerm
      ? course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
  });

  // Sort courses
  const sortedCourses = sortBy(filteredCourses, sortStatus.columnAccessor);
  if (sortStatus.direction === "desc") sortedCourses.reverse();

  // Paginate courses
  const paginatedCourses = sortedCourses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Handle form input change
  const handleInputChange = (field: keyof Course, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setFormLoading(true);
    try {
      if (formMode === "create") {
        const { success, error } = await createCourse(formData);
        if (success) {
          notifications.show({
            title: "Success",
            message: "Course created successfully",
            color: "green",
          });
          close();
          fetchCourses();
        } else {
          notifications.show({
            title: "Error",
            message: error || "Failed to create course",
            color: "red",
          });
        }
      } else {
        const { success, error } = await updateCourse(selectedCourse?.id as string, formData);
        if (success) {
          notifications.show({
            title: "Success",
            message: "Course updated successfully",
            color: "green",
          });
          close();
          fetchCourses();
        } else {
          notifications.show({
            title: "Error",
            message: error || "Failed to update course",
            color: "red",
          });
        }
      }
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: err.message || "An unexpected error occurred",
        color: "red",
      });
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete course
  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;

    setFormLoading(true);
    try {
      const { success, error } = await deleteCourse(selectedCourse.id as string);
      if (success) {
        notifications.show({
          title: "Success",
          message: "Course archived successfully",
          color: "green",
        });
        closeDeleteModal();
        fetchCourses(); // This will now fetch only non-deleted courses
      } else {
        notifications.show({
          title: "Error",
          message: error || "Failed to archive course",
          color: "red",
        });
      }
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: err.message || "An unexpected error occurred",
        color: "red",
      });
    } finally {
      setFormLoading(false);
    }
  };

  // Open create course modal
  const openCreateModal = () => {
    setFormMode("create");
    setFormData({
      name: "",
      description: "",
      duration: "",
      price: "",
      tags: "",
      priority: 0,
    });
    open();
  };

  // Open edit course modal
  const openEditModal = (course: Course) => {
    setFormMode("edit");
    setSelectedCourse(course);

    setFormData({
      name: course.name,
      description: course.description,
      duration: course.duration,
      price: course.price,
      tags: course.tags,
      priority: Number(course.priority),
    });
    open();
  };

  // Open delete confirmation modal
  const openDeleteConfirmation = (course: Course) => {
    setSelectedCourse(course);
    openDeleteModal();
  };

  // Render course as a card (for mobile view)
  const renderCourseCard = (course: Course, index: number) => (
    <Card key={course.id} shadow="sm" p="md" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="xs">
            <IconBook size={18} stroke={1.5} />
            <Text fw={700} size="lg">
              {course.name}
            </Text>
          </Group>
          <Badge size="sm">#{(page - 1) * PAGE_SIZE + index + 1}</Badge>
        </Group>

        <Text size="sm" lineClamp={2} c="dimmed">
          {course.description}
        </Text>

        <Group gap="xs">
          <IconClock size={16} />
          <Text size="sm">{course.duration}</Text>
        </Group>

        <Group gap="xs">
          <IconCurrencyRupee size={16} />
          <Text size="sm">
            {!isNaN(Number(course.price)) && Number(course.price) > 0
              ? Number(course.price).toLocaleString("en-IN")
              : "Free"}
          </Text>
        </Group>

        {course.tags && course.tags.trim() && (
          <Box>
            <Text fw={500} size="sm" mb="xs">
              Tags:
            </Text>
            <Group gap={4} wrap="wrap">
              {course.tags?.split(",").map(
                (tag: string, tagIndex: number) =>
                  tag.trim() && (
                    <Badge
                      key={tagIndex}
                      size="sm"
                      radius="sm"
                      style={{
                        textTransform: "none",
                        backgroundColor: colors.primaryLight,
                        color: colors.primary,
                        fontWeight: 600,
                        padding: "4px 8px",
                      }}
                    >
                      {tag.trim()}
                    </Badge>
                  )
              )}
            </Group>
          </Box>
        )}

        <Group justify="space-between" mt="xs">
          <Button variant="light" leftSection={<IconEdit size={16} />} onClick={() => openEditModal(course)}>
            Edit
          </Button>
          <Button
            variant="light"
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => openDeleteConfirmation(course)}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Card>
  );

  if (loading) {
    return (
      <Group justify="center" py="xl">
        <Loader size="lg" />
        <Text>Loading courses...</Text>
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
      <Box mb="xl">
        <Group justify="space-between">
          <TextInput
            placeholder="Search courses"
            leftSection={<IconSearch size={14} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "60%" }}
          />

          <Button leftSection={<IconPlus size={16} />} onClick={openCreateModal}>
            Add Course
          </Button>
        </Group>
      </Box>

      {!isMobile ? (
        // Desktop view (table)
        <Paper shadow="xs" p="md" radius="md" withBorder>
          <ScrollArea>
            <DataTable
              minHeight={300}
              columns={[
                {
                  accessor: "index",
                  title: "#",
                  width: 60,
                  render: (_, index) => (page - 1) * PAGE_SIZE + index + 1,
                },
                { accessor: "name", title: "Name", sortable: true },
                {
                  accessor: "description",
                  title: "Description",
                  sortable: true,
                  render: (course) => <Text lineClamp={2}>{course.description}</Text>,
                },
                {
                  accessor: "duration",
                  title: "Duration",
                  sortable: true,
                  render: (course) => <Text>{course.duration}</Text>,
                },
                {
                  accessor: "price",
                  title: "Price (₹)",
                  sortable: true,
                  render: (course) => (
                    <Text>
                      {!isNaN(Number(course.price)) && Number(course.price) > 0
                        ? Number(course.price).toLocaleString("en-IN")
                        : "Free"}
                    </Text>
                  ),
                },
                {
                  accessor: "tags",
                  title: "Tags",
                  render: (course) =>
                    course.tags && course.tags.trim() ? (
                      <Group gap={4}>
                        {course.tags?.split(",").map(
                          (tag: string, index: number) =>
                            tag.trim() && (
                              <Badge
                                key={index}
                                size="sm"
                                radius="sm"
                                style={{
                                  textTransform: "none",
                                  backgroundColor: colors.primaryLight,
                                  color: colors.primary,
                                  fontWeight: 600,
                                  padding: "4px 8px",
                                }}
                              >
                                {tag.trim()}
                              </Badge>
                            )
                        )}
                      </Group>
                    ) : (
                      <Text c="dimmed">-</Text>
                    ),
                },
                {
                  accessor: "priority",
                  title: "Priority",
                  sortable: true,
                  textAlign: "center",
                },
                {
                  accessor: "actions",
                  title: "Actions",
                  textAlign: "center",
                  render: (course) => (
                    <Group gap={4} justify="center">
                      <Tooltip label="Edit">
                        <ActionIcon variant="light" color="blue" onClick={() => openEditModal(course)}>
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon variant="light" color="red" onClick={() => openDeleteConfirmation(course)}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  ),
                },
              ]}
              records={paginatedCourses}
              withTableBorder
              borderRadius="sm"
              striped
              highlightOnHover
              noRecordsText="No courses found"
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}
            />
          </ScrollArea>
        </Paper>
      ) : (
        // Mobile view (cards)
        <Box>
          {paginatedCourses.length > 0 ? (
            <>
              <SimpleGrid cols={1} spacing="md">
                {paginatedCourses.map((course, index) => renderCourseCard(course, index))}
              </SimpleGrid>

              <Group justify="center" mt="xl">
                <Button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  variant="outline"
                >
                  Previous
                </Button>
                <Text>
                  Page {page} of {Math.ceil(sortedCourses.length / PAGE_SIZE)}
                </Text>
                <Button
                  disabled={page >= Math.ceil(sortedCourses.length / PAGE_SIZE)}
                  onClick={() => setPage((prev) => prev + 1)}
                  variant="outline"
                >
                  Next
                </Button>
              </Group>
            </>
          ) : (
            <Paper shadow="xs" p="xl" radius="md" withBorder ta="center">
              <Text c="dimmed">No courses found</Text>
            </Paper>
          )}
        </Box>
      )}

      {/* Course Form Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={formMode === "create" ? "Add New Course" : "Edit Course"}
        size="lg"
        zIndex={1100}
        padding="lg"
        centered
      >
        <Stack gap="md" pt="md">
          <TextInput
            label="Name"
            placeholder="Course name"
            required
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />

          <Textarea
            label="Description"
            placeholder="Course description"
            required
            minRows={3}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          <TextInput
            label="Duration"
            placeholder="e.g. 8 weeks, 3 months"
            required
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />

          <TextInput
            label="Price"
            placeholder="Course price"
            required
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            leftSection={<IconCurrencyRupee size={16} />}
          />

          <TextInput
            label="Tags"
            placeholder="Comma-separated tags"
            description="Enter tags separated by commas (e.g. JavaScript, React, Web Development)"
            value={formData.tags}
            onChange={(e) => handleInputChange("tags", e.target.value)}
          />

          <NumberInput
            label="Priority"
            placeholder="Display priority (higher numbers appear first)"
            required
            min={0}
            value={formData.priority}
            onChange={(value) => handleInputChange("priority", value)}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={formLoading}>
              {formMode === "create" ? "Create Course" : "Update Course"}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Confirm Archiving"
        size="sm"
        zIndex={1100}
        padding="lg"
        centered
      >
        <Stack gap="md" pt="md">
          <Text>
            Are you sure you want to archive the course "{selectedCourse?.name}"? This will hide it from the courses
            list.
          </Text>
          <Group justify="flex-end">
            <Button variant="outline" onClick={closeDeleteModal} disabled={formLoading}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDeleteCourse} loading={formLoading}>
              Archive
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default CoursesPage;
