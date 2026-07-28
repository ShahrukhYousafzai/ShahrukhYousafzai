import { ArrowDown, Building2, Gamepad2, Bot } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-grid-dots"
    >
      <div className="container relative z-10 flex min-h-[calc(100vh-4rem)] flex-col pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Top metadata strip */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Founder &amp; Creative Engineer
          </span>
          <span className="hidden sm:inline">Bahawalpur · Lahore</span>
          <span>Since 2017</span>
        </div>

        {/* Main statement */}
        <div className="mt-14 max-w-[1100px] md:mt-20">
          <h1 className="font-headline text-[2.75rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[4rem] md:text-[5rem] lg:text-[6.25rem]">
            Shahrukh
            <br />
            <span className="text-primary">Yousafzai</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Creative engineering founder shipping production-scale
            software across three studios — games, creative services, and AI products.
            1M+ downloads on Google Play. 76+ verified client reviews.
          </p>

          {/* Studios — chips */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://afscreativestudio.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              <Building2 className="h-4 w-4" />
              AFS Creative Studio
            </a>
            <a
              href="https://play.google.com/store/apps/developer?id=Efface+Studios&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/5 px-4 py-2 text-sm font-medium text-success hover:bg-success/10 transition-colors"
            >
              <Gamepad2 className="h-4 w-4" />
              Efface Studios
            </a>
            <a
              href="https://afs-agentics.github.io/afs-agentics-website/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/5 px-4 py-2 text-sm font-medium text-violet hover:bg-violet/10 transition-colors"
            >
              <Bot className="h-4 w-4" />
              AFS Agentics
            </a>
          </div>

          {/* CTA row */}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Let&rsquo;s Talk Business &rarr;
            </a>
            <a
              href="#portfolio"
              className="inline-flex h-12 items-center rounded-lg border border-border px-6 text-sm font-medium text-foreground hover:bg-surface transition-colors"
            >
              View Case Studies
            </a>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="mt-auto pt-20 flex items-center justify-center">
          <a
            href="#stats"
            className="flex flex-col items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll down"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
