import { skills, languages } from "@/lib/data/skills";

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-background">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-14 md:mb-20">
          <div>
            <div className="section-label mb-3">Tech Stack</div>
            <h2 className="font-headline text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              Skills &amp;
              <br />
              <span className="text-muted-foreground">technologies.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:pt-3 md:text-lg">
            Tools of the trade &mdash; what I&rsquo;ve shipped against, what I
            reach for, what&rsquo;s currently in the kit. The list evolves; the
            discipline doesn&rsquo;t.
          </p>
        </div>

        {/* Skills as grid of mono-tagged entries */}
        <div>
          <div className="flex items-end justify-between border-b border-border/80 pb-3 mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Toolkit</div>
            <div className="text-xs font-medium text-muted-foreground tabular-nums">
              {skills.length} tools
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-x-8 gap-y-0 md:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <li
                key={skill.name}
                className="group flex items-center justify-between gap-3 border-b border-border/80 py-5"
              >
                <div className="flex items-center gap-3">
                  <skill.icon
                    className="h-4 w-4 text-foreground/80"
                    strokeWidth={1.5}
                  />
                  <span className="font-medium">{skill.name}</span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div className="mt-20">
          <div className="flex items-end justify-between border-b border-border/80 pb-3 mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Languages</div>
            <div className="text-xs font-medium text-muted-foreground tabular-nums">
              {languages.length} spoken / written
            </div>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {languages.map((lang, index) => (
              <li
                key={lang}
                className="text-sm font-medium"
              >
                <span className="mr-2 text-muted-foreground/60 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
