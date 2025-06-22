import CoursesList from "@/app/courses/components/courses-list";
import Hero from "@/app/courses/components/hero";
import { getCourses } from "@/actions/courses";

export default async function CoursesPage() {
  const { courses, error } = await getCourses();

  return (
    <>
      <Hero />
      <CoursesList courses={courses} error={error} />
    </>
  );
}
