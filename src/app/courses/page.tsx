import CourseHero from "@/app/courses/components/course-hero";
import CoursesList from "@/app/courses/components/courses-list";
import { Suspense } from "react";
import { getCourses } from "@/actions/courses";

// Component to fetch and display courses
async function CoursesListSection() {
  const { courses, error } = await getCourses();
  return <CoursesList courses={courses} error={error} />;
}

export default function CoursesPage() {
  return (
    <>
      <CourseHero />
      <Suspense fallback={<div />}>
        <CoursesListSection />
      </Suspense>
    </>
  );
}
