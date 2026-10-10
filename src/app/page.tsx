import Nav from "@/components/Nav";
import HeroSection from "@/components/Hero/HeroSection";
import StatsSection from "@/components/Stats/StatsSection";
import ProjectsSection from "@/components/Projects/ProjectsSection";
import BriefSection from "@/components/Brief/BriefSection";
import FAQSection from "@/components/FAQ/FAQSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import FadeSection from "@/components/FadeSection";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Nav />
      <main>
        <HeroSection />
        <FadeSection>
          <StatsSection />
        </FadeSection>
        <FadeSection>
          <ProjectsSection />
        </FadeSection>
        <FadeSection>
          <BriefSection />
        </FadeSection>
        <FadeSection>
          <FAQSection />
        </FadeSection>
      </main>
      <FadeSection>
        <Footer />
      </FadeSection>
    </>
  );
}
