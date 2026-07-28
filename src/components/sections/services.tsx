import { services } from "@/lib/data/services";

const ServicesSection = () => {
  return (
    <section id="services" className="bg-surface border-y border-border/80">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-14 md:mb-20">
          <div>
            <div className="section-label mb-3">Capabilities</div>
            <h2 className="font-headline text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              Studios &amp;
              <br />
              <span className="text-muted-foreground">capabilities.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:pt-3 md:text-lg">
            Production tracks operated across all three entities. Each track is
            run with senior-architect oversight and direct founder
            accountability &mdash; the same accountability we extend to every
            client engagement.
          </p>
        </div>

        <ol className="divide-y divide-border/80 border-y border-border/80">
          {services.map((service, index) => (
            <li
              key={service.title}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-6 py-7 md:grid-cols-[1fr_2fr] md:gap-10 md:py-9 transition-colors hover:bg-background"
            >
              <div>
                <div className="flex items-center gap-3">
                  <service.icon
                    className="h-4 w-4 text-foreground/80"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-headline text-lg font-medium tracking-tight md:text-xl">
                    {service.title}
                  </h3>
                </div>
              </div>
              <p className="col-span-1 mt-2 text-sm leading-relaxed text-muted-foreground md:mt-0 md:text-base md:leading-[1.65]">
                {service.description}
              </p>

            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServicesSection;
