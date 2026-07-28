import { stats } from "@/lib/data/stats";

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
      <div className="container py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 md:gap-16 items-start">
          {/* Section label */}
          <div>
            <div className="section-label mb-3">Track Record</div>
            <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
              The numbers,
              <br />
              <span className="text-muted-foreground">verifiable.</span>
            </h2>
          </div>

          {/* The strip */}
          <ul className="divide-y divide-border/80 border-y border-border/80">
            {dynamicStats.map((stat) => (
              <li
                key={stat.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 md:py-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
                <div className="font-headline text-2xl font-bold tabular-nums md:text-3xl">
                  {stat.value}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
