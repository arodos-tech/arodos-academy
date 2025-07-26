import { Box, Button, Container, Stack, Text, Title } from "@mantine/core";

import CourseCTA from "./components/course-cta";
import CourseContent from "./components/course-content";
// Import components
import CourseDetails from "./components/course-details";
import Link from "next/link";
import { Suspense } from "react";
import { getCourseById } from "@/actions/courses";
import { notFound } from "next/navigation";

// Using 'any' type as per project guidelines
type CoursePageProps = any;

// Component to fetch and display course details
async function CourseDetailsSection({ courseId }: { courseId: string }) {
  const { course, error } = await getCourseById(courseId);

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

  return (
    <>
      <CourseDetails course={course} />
      {/* <CourseContent course={course} /> */}
      {/* <CourseCTA courseName={course?.name} /> */}
    </>
  );
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <div>
      <Suspense fallback={<div />}>
        <CourseDetailsSection courseId={params.id} />
      </Suspense>
    </div>
  );
}
