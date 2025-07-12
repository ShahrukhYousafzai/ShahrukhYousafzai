import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/data/social";
import { ArrowDown } from "lucide-react";
import BackgroundBeams from "@/components/background-beams";

const HeroSection = () => {
  const fiverrLink = socialLinks.find(s => s.name === 'Fiverr');
  const upworkLink = socialLinks.find(s => s.name === 'Upwork');

  return (
    <section id="home" className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center gap-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Hi. I’m Shahrukh.
          <br />
          <span className="text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
            A Game Developer.
          </span>
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
          I’m also an app developer and general doodler with a keen eye for creating engaging products, and bringing them to life with code and design.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {fiverrLink && (
            <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              <a href={fiverrLink.url} target="_blank" rel="noopener noreferrer">
                Hire me on Fiverr
              </a>
            </Button>
          )}
          {upworkLink && (
            <Button size="lg" variant="secondary" asChild>
              <a href={upworkLink.url} target="_blank" rel="noopener noreferrer">
                Hire me on Upwork
              </a>
            </Button>
          )}
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </a>
      <BackgroundBeams />
    </section>
  );
};

export default HeroSection;
