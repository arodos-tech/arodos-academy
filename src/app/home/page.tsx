import CTA from "@/app/home/components/cta";
import Courses from "@/app/home/components/courses";
import HomeHero from "@/app/home/components/home-hero";
import { Suspense } from "react";
import WhyUs from "@/app/home/components/why-us";
import { getCourses } from "@/actions/courses";

// Component to fetch and display courses
async function CourseSection() {
  const { courses, error } = await getCourses();
  return <Courses courses={courses} error={error} />;
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <WhyUs />
      <Suspense fallback={<div />}>
        <CourseSection />
      </Suspense>
      <CTA />
    </>
  );
}
