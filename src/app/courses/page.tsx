import CoursesList from "@/app/courses/components/courses-list";
import CourseHero from "@/app/courses/components/course-hero";
import { getCourses } from "@/actions/courses";

export default async function CoursesPage() {
  const { courses, error } = await getCourses();

  return (
    <>
      <CourseHero />
      <CoursesList courses={courses} error={error} />
    </>
  );
}
