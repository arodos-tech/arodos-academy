import { getCourseById, getCourses } from "@/actions/courses";
import { notFound } from "next/navigation";
import { Box, Container, Stack, Text, Title, Button } from "@mantine/core";
import Link from "next/link";

// Import components
import CourseHero from "./components/course-hero";
import CourseContent from "./components/course-content";
import CourseDetailsSidebar from "./components/course-details-sidebar";
import CourseCTA from "./components/course-cta";

interface CoursePageProps {
  params: {
    id: string;
  };
}

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
            <Title order={2} c="red.7">
              Error
            </Title>
            <Text size="lg" mb="xl">
              {error}
            </Text>
            <Button variant="filled" color="red" component={Link} href="/courses">
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
      <CourseHero course={course} />
      <CourseContent course={course} />
      {/* <CourseDetailsSidebar cour  `se={course} relatedCourses={courses} /> */}
      <CourseCTA courseName={course?.name} />
    </div>
  );
}
