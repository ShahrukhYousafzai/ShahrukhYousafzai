import { stats } from "@/lib/data/stats";
import { cn } from "@/lib/utils";

const StatsSection = () => {
  const yearsOfExperience = new Date().getFullYear() - 2017;

  const dynamicStats = stats.map((stat) => {
    if (stat.id === "experience") {
      return { ...stat, value: `${yearsOfExperience}+` };
    }
    return stat;
  });

  return (
    <section id="stats" className="border-y border-border/80 bg-background">
      <div className="container py-16 md:py-20">
        {/* Header */}
        <div className="mb-10 grid grid-cols-1 items-end gap-6 md:mb-12 md:grid-cols-[1fr_2fr] md:gap-10">
          <div>
            <div className="section-label mb-3">Track Record</div>
            <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
              The numbers,
              <br />
              <span className="text-muted-foreground">verifiable.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:justify-self-end md:text-right md:text-base">
            Proof from the work itself — Google Play, global freelance platforms,
            and nine years of shipping production software.
          </p>
        </div>

        {/* Stats grid */}
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {dynamicStats.map((stat, idx) => {
            const isHero = stat.id === "downloads";
            const valueSize = isHero
              ? "text-4xl md:text-5xl"
              : stat.value.length > 6
                ? "text-2xl md:text-3xl"
                : "text-3xl md:text-4xl";

            return (
              <div
                key={stat.id}
                className={cn(
                  "group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/30 md:p-7",
                  isHero && "border-primary/30 bg-primary/5 hover:border-primary/50",
                )}
              >
                {/* Top row: icon + index/eyebrow */}
                <div
                  className={cn(
                    "mb-8 flex items-start justify-between md:mb-10",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg ring-1 transition-colors",
                      isHero
                        ? "bg-primary/15 ring-primary/20"
                        : "bg-primary/10 ring-primary/10 group-hover:bg-primary/15",
                    )}
                  >
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  {isHero ? (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-primary ring-1 ring-primary/20">
                      Top stat
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40"
                    >
                      {String(idx + 1).padStart(2, "0")}/
                      {String(dynamicStats.length).padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Value + label — dt visually below dd via flex-col-reverse */}
                <div className="flex flex-col-reverse gap-2">
                  <dt className="text-sm leading-snug text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd
                    className={cn(
                      "font-headline font-bold tabular-nums tracking-tight",
                      valueSize,
                    )}
                  >
                    {stat.value}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};

export default StatsSection;
