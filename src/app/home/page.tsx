import Hero from "@/app/home/components/hero";
import Courses from "@/app/home/components/courses";
import CTA from "@/app/home/components/cta";
import WhyUs from "@/app/home/components/why-us";
import { getCourses } from "@/actions/courses";

export default async function Home() {
  const { courses, error } = await getCourses();

  return (
    <>
      <Hero />
      <WhyUs />
      <Courses courses={courses} error={error} />
      <CTA />
    </>
  );
}
