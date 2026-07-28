import Image from "next/image";
import { Globe, Twitter, ShieldCheck } from "lucide-react";

const clients = [
  {
    name: "RugDollz / RugLabz",
    logo: "/Images/worked-with/rugdollz.webp",
    website: "https://rugdollz.com/",
    x: "https://x.com/RugdollzNFT",
    width: 200,
    height: 60,
    tag: "Web3 NFT Gaming",
  },
  {
    name: "Solar Studios",
    logo: "/Images/worked-with/SolarStudios.png",
    website: "https://solarstudios.co",
    x: "https://x.com/solar_dex",
    width: 180,
    height: 50,
    tag: "Web3 DEX & Tools",
  },
  {
    name: "Toxic Skulls Club",
    logo: "/Images/worked-with/TSC.png",
    website: "https://toxicskullsclub.io",
    x: "https://x.com/ToxicSkullsClub",
    width: 150,
    height: 60,
    tag: "Web3 NFT Collection",
  },
];

const WorkedWithSection = () => {
  return (
    <section id="worked-with" className="bg-surface">
      <div className="container py-24 md:py-32">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="section-label mb-3">Trusted By</div>
          <h2 className="font-headline text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
            Companies I&rsquo;ve
            <br />
            <span className="text-muted-foreground">shipped with.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Selected Web3 collaborators I&rsquo;ve built multiplayer infrastructure,
            smart-contract integrations, and production game backends for — 2022 to
            present.
          </p>
        </div>

        {/* Logo card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <article
              key={client.name}
              className="group relative flex flex-col items-center rounded-2xl border border-border/60 bg-background p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Verified badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-success/30 bg-success/5 px-2.5 py-1 text-[10px] font-semibold text-success">
                <ShieldCheck className="h-3 w-3" strokeWidth={2} />
                Verified
              </div>

              {/* Logo */}
              <div className="flex h-20 w-full items-center justify-center">
                <Image
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  width={client.width}
                  height={client.height}
                  className="object-contain opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                  unoptimized
                  sizes="200px"
                />
              </div>

              {/* Name & tag */}
              <div className="mt-6 text-center">
                <h3 className="font-headline text-lg font-semibold tracking-tight">
                  {client.name}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                  {client.tag}
                </p>
              </div>

              {/* Links */}
              <div className="mt-6 flex items-center gap-2">
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                  aria-label={`${client.name} website`}
                >
                  <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Website
                </a>
                <a
                  href={client.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                  aria-label={`${client.name} X profile`}
                >
                  <Twitter className="h-3.5 w-3.5" strokeWidth={1.5} />
                  X
                </a>
              </div>

              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkedWithSection;
