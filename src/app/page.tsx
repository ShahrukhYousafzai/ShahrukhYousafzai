import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";
import StatsSection from "@/components/sections/stats";
import FeaturedOnSection from "@/components/sections/featured-on";
import WorkedWithSection from "@/components/sections/worked-with";
import AboutSection from "@/components/sections/about";
import ServicesSection from "@/components/sections/services";
import SkillsSection from "@/components/sections/skills";
import PortfolioSection from "@/components/sections/portfolio";
import AiRecommender from "@/components/sections/ai-recommender";
import TestimonialsSection from "@/components/sections/testimonials";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <PortfolioSection />
        <FeaturedOnSection />
        <WorkedWithSection />
        <AiRecommender />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
