import AboutHero from "@/app/about/components/about-hero";
import OurMission from "@/app/about/components/our-mission";
import Testimonials from "@/app/about/components/testimonials";
import CTA from "@/app/home/components/cta";

export default function About() {
  return (
    <>
      <AboutHero />
      <OurMission />
      {/* <OurValues /> */}
      {/* <OurTeam /> */}
      <Testimonials />
      <CTA />
    </>
  );
}
