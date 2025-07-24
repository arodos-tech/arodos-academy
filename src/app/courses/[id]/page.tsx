import { getCourseById, getCourses } from "@/actions/courses";
import { notFound } from "next/navigation";
import { Box, Container, Stack, Text, Title, Button } from "@mantine/core";
import Link from "next/link";

// Import components
import CourseDetails from "./components/course-details";
import CourseContent from "./components/course-content";
import CourseCTA from "./components/course-cta";

// Using 'any' type as per project guidelines
type CoursePageProps = any;

export default async function CoursePage({ params }: CoursePageProps) {
  // Get the current course
  const { course, error } = await getCourseById(params.id);

  // If course doesn't exist, return 404
  if (!course && !error) {
    notFound();
  }

  // Handle error state
  if (error) {
    return (
      <Box py={80}>
        <Container size="lg">
          <Stack align="center">
            <Title order={2} c="primary">
              Error
            </Title>
            <Text size="lg" mb="xl">
              {error}
            </Text>
            <Button variant="filled" color="primary" component={Link} href="/courses">
              Back to Courses
            </Button>
          </Stack>
        </Container>
      </Box>
    );
  }

  // Get all courses for related courses section
  const { courses } = await getCourses();

  return (
    <div>
      <CourseDetails course={course} />
      <CourseContent course={course} />
      <CourseCTA courseName={course?.name} />
    </div>
  );
}
