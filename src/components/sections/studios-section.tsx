import { Building2, Gamepad2, Bot, ArrowUpRight } from "lucide-react";
import { about } from "@/lib/data/about";

const entityVisual = [
  {
    name: "AFS Creative Studio",
    code: "01 · Agency",
    role: "Creative services · managed engineering squads",
    long:
      "Binational technical delivery for funded startups and mid-market companies. Monthly retainers, white-label execution, and senior-architect oversight. The cash engine.",
    icon: Building2,
    href: "https://afscreativestudio.netlify.app",
    cta: "Visit the agency",
    accent: "border-primary/40 hover:border-primary",
    iconColor: "text-primary",
    ribbon: "Operational",
  },
  {
    name: "Efface Studios",
    code: "02 · Product",
    role: "Games product house · since 2017",
    long:
      "Founded in 2017 as a games-focused studio. Google Play publisher. Our own IP: Basant Mela hit 1M+ organic downloads and #4 trending in Pakistan sports. Also builds Web3 multiplayer titles for clients.",
    icon: Gamepad2,
    href: "https://play.google.com/store/apps/developer?id=Efface+Studios&hl=en",
    cta: "See live apps",
    accent: "border-success/40 hover:border-success",
    iconColor: "text-success",
    ribbon: "Since 2017",
  },
  {
    name: "AFS Agentics",
    code: "03 · Pre-launch",
    role: "AI product studio · InfiniteCode in private beta",
    long:
      "Founder-led AI product company. We don&rsquo;t sell consulting &mdash; we ship AI products. First: InfiniteCode, a free, ad-supported AI coding tool. Desktop today, CLI + Web playground next.",
    icon: Bot,
    href: "https://afs-agentics.github.io/afs-agentics-website/",
    cta: "Meet InfiniteCode",
    accent: "border-violet/40 hover:border-violet",
    iconColor: "text-violet",
    ribbon: "Pre-launch",
  },
];

const StudiosSection = () => {
  return (
    <section id="studios" className="bg-surface">
      <div className="container py-24 md:py-32">
        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-14 md:mb-20">
          <div>
            <div className="section-label mb-3">The Ecosystem</div>
            <h2 className="font-headline text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              One founder.
              <br />
              <span className="text-muted-foreground">Three studios.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:pt-3 md:text-lg">
            {about.headline} Efface Studios has been shipping games to Google
            Play since 2017. AFS Creative Studio is the creative services arm. AFS
            Agentics is where we take the swappable, open-weight AI playbook
            mainstream.
          </p>
        </div>

        {/* Bento grid: 1 large + 2 standard */}
        <div className="grid grid-cols-1 gap-px bg-border/80 md:grid-cols-3">
          {entityVisual.map((entity, i) => (
            <article
              key={entity.name}
              className={`group relative flex flex-col bg-background p-5 md:p-7 transition-colors duration-300 hover:bg-surface ${
                i === 0 ? "md:col-span-1" : ""
              } ${entity.accent} border-t md:border-t-0`}
            >
              {/* Top: label + icon */}
              <div className="flex items-start justify-between">
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {entity.code.replace(/^\d+ · /, "")}
                </div>
                <entity.icon
                  className={`h-5 w-5 ${entity.iconColor}`}
                  strokeWidth={1.5}
                />
              </div>

              {/* Name + role */}
              <div className="mt-8 md:mt-10">
                <h3 className="font-headline text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                  {entity.name}
                </h3>
                <p className="mt-3 text-sm font-medium text-muted-foreground">
                  {entity.role}
                </p>
              </div>

              {/* Body copy */}
              <p
                className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-[1.65]"
                dangerouslySetInnerHTML={{ __html: entity.long }}
              />

              {/* Bottom: ribbon + CTA */}
              <div className="mt-auto pt-8 flex items-end justify-between gap-4">
                <span className="text-xs font-medium text-foreground/60">
                  &#9670; {entity.ribbon}
                </span>
                <a
                  href={entity.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {entity.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudiosSection;
