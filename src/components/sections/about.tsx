import { about } from "@/lib/data/about";
import { timeline } from "@/lib/data/timeline";
import { MapPin } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-background">
      <div className="container py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-16 md:mb-24">
          <div>
            <div className="section-label mb-3">The Founder</div>
            <h2 className="font-headline text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              About
              <br />
              <span className="text-muted-foreground">the founder.</span>
            </h2>
          </div>
          <div className="md:pt-3">
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg md:leading-[1.65]">
              {about.description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {about.location}
            </div>
          </div>
        </div>

        {/* Timeline — flat editorial */}
        <div>
          <div className="flex items-end justify-between border-b border-border/80 pb-3 mb-10">
            <div className="section-label">The Journey</div>
            <div className="text-xs font-medium text-muted-foreground tabular-nums">
              {timeline.length} milestones · 2017 — {new Date().getFullYear()}
            </div>
          </div>

          <ol className="divide-y divide-border/80">
            {timeline.map((item, index) => (
              <li
                key={`${item.date}-${index}`}
                className="grid grid-cols-[120px_1fr_140px] items-baseline gap-6 py-7 md:gap-10 md:py-8"
              >
                <div className="text-sm font-semibold text-primary">
                  {item.date}
                </div>
                <div>
                  <h3 className="font-headline text-lg font-medium leading-snug tracking-tight md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.description}
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-end text-muted-foreground/70">
                  <item.icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
