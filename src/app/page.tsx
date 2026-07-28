import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";
import StudiosSection from "@/components/sections/studios-section";
import StatsSection from "@/components/sections/stats";
import AboutSection from "@/components/sections/about";
import ServicesSection from "@/components/sections/services";
import SkillsSection from "@/components/sections/skills";
import PortfolioSection from "@/components/sections/portfolio";
import WorkedWithSection from "@/components/sections/worked-with";
import TestimonialsSection from "@/components/sections/testimonials";
import AiRecommender from "@/components/sections/ai-recommender";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <StudiosSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <PortfolioSection />
        <WorkedWithSection />
        <TestimonialsSection />
        <AiRecommender />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
