import Link from "next/link";
import { MapPin } from "lucide-react";
import { socialLinks } from "@/lib/data/social";

const Footer = () => {
  const entityLinks = socialLinks.filter((s) => s.isEntity);
  const channelLinks = socialLinks.filter((s) => !s.isEntity);

  return (
    <footer className="border-t border-border/80 bg-background">
      <div className="container py-16 md:py-20">
        {/* Top: name and tagline */}
        <div className="grid grid-cols-1 gap-10 border-b border-border/80 pb-10 md:grid-cols-[1fr_auto]">
          <div>
            <div className="font-headline text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Shahrukh Yousafzai
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Founder of a creative engineering operation based in Pakistan, shipping worldwide. Efface
              Studios (games product house since 2017, started in Bahawalpur), AFS Creative Studio (creative
              agency), and AFS Agentics (AI product studio — InfiniteCode in
              private beta).
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />
              Bahawalpur · Lahore
            </div>
          </div>
        </div>

        {/* Middle: columns */}
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-3 md:gap-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">The Studios</div>
            <ul className="divide-y divide-border/80">
              {entityLinks.map((entity) => (
                <li key={entity.name}>
                  <a
                    href={entity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-4 py-3 hover:text-primary transition-colors"
                  >
                    <span className="flex items-center gap-2 font-headline text-sm font-medium">
                      <entity.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {entity.name}
                    </span>

                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="https://www.upwork.com/agencies/1704225235961491456/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline justify-between gap-4 py-3 hover:text-primary transition-colors"
                >
                  <span className="font-headline text-sm font-medium">
                    Upwork Agency
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    &rarr;
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">Resources</div>
            <ul className="divide-y divide-border/80">
              {[
                { href: "/cv", label: "Printable CV", note: "PDF" },
                {
                  href: "/portfolio/pdf",
                  label: "Printable Portfolio",
                  note: "PDF",
                },
                {
                  href: "/portfolio/gamedesign-animation",
                  label: "Game Design",
                  note: "Web",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-baseline justify-between gap-4 py-3 hover:text-primary transition-colors"
                  >
                    <span className="font-headline text-sm font-medium">
                      {link.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {link.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">Channels</div>
            <ul className="divide-y divide-border/80">
              {channelLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex items-baseline justify-between gap-4 py-3 hover:text-primary transition-colors"
                  >
                    <span className="flex items-center gap-2 font-headline text-sm font-medium">
                      <social.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {social.name}
                    </span>

                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: signature */}
        <div className="flex flex-col gap-3 border-t border-border/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Shahrukh Yousafzai · Founder of Efface Studios · AFS Creative Studio · AFS Agentics
          </p>
          <p className="text-xs text-muted-foreground/70">
            Built with rigor · Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
