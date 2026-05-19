import Nav from "@/components/Nav";
import HeroSection from "@/components/Hero/HeroSection";
import StatsSection from "@/components/Stats/StatsSection";
import ProjectsSection from "@/components/Projects/ProjectsSection";
import BriefSection from "@/components/Brief/BriefSection";
import FAQSection from "@/components/FAQ/FAQSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Nav />
      <main>
        <HeroSection />
        <StatsSection />
        <ProjectsSection />
        <BriefSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
