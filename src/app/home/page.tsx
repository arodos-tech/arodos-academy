import Api from "@/services/frontql/Api";
import Hero from "@/app/home/components/hero";
import Courses from "@/app/home/components/courses";
import CTA from "@/app/home/components/cta";
import Features from "@/app/home/components/features";

export default async function Home() {
  // Fetch courses data from API
  const res = await Api.get("/courses", {
    sort: "-priority",
  });

  // Process the courses data
  const coursesList = res?.result || [];

  // Sort by priority if available
  const courses = [...coursesList].sort((a, b) => {
    const priorityA = Number(a?.priority) || 0;
    const priorityB = Number(b?.priority) || 0;
    return priorityB - priorityA; // Higher priority first
  });

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
