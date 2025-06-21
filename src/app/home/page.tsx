import Api from "@/services/frontql/Api";
import Hero from "@/app/home/components/hero";
import Courses from "@/app/home/components/courses";
import CTA from "@/app/home/components/cta";
import Features from "@/app/home/components/features";

// Function to group courses by tags
const groupCoursesByTags = (coursesList: any[]) => {
  const groupedCourses: Record<string, any[]> = {};

  coursesList?.forEach?.((course: any) => {
    if (!course?.tags) return;

    // Get only the first tag
    const firstTag = course?.tags?.split?.(";")?.shift?.()?.split?.(",")?.shift?.()?.trim?.();

    if (firstTag) {
      // Initialize array if this tag doesn't exist yet
      if (!groupedCourses?.[firstTag]) {
        groupedCourses[firstTag] = [];
      }

      // Add course to the tag group
      groupedCourses?.[firstTag]?.push?.(course);
    }
  });

  return groupedCourses;
};

// Server component that fetches data
export default async function Home() {
  // Fetch courses data from API
  const res = await Api.get("/courses", {
    sort: "-created_at",
  });

  const courses = res?.result || [];
  const error = res?.err ? (typeof res?.err === "string" ? res?.err : "Error fetching courses") : null;

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Courses Section */}
      <Courses courses={courses} error={error} />

      {/* CTA Section */}
      <CTA />
    </>
  );
}
