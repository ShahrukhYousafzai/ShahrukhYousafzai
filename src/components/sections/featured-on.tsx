import Image from "next/image";

const featuredOn = [
    {
        name: "United News of Bangladesh",
        url: "https://unb.com.bd/category/Tech/top-free-kite-flying-games-for-ios-and-android/90178",
        logo: "/Images/unb-logo.png",
        width: 160,
        height: 40,
    },
    {
        name: "Editorialge",
        url: "https://editorialge.com/kite-flying-games/",
        logo: "/Images/editorialge.gif",
        width: 180,
        height: 40,
    }
];

const FeaturedOnSection = () => {
    return (
        <section id="featured-on" className="py-12 bg-secondary/50">
            <div className="container">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">Featured On</h3>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-75">
                        {featuredOn.map((feature) => (
                             <a
                                key={feature.name}
                                href={feature.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all hover:opacity-100"
                            >
                                <Image
                                  src={feature.logo}
                                  alt={`${feature.name} Logo`}
                                  width={feature.width}
                                  height={feature.height}
                                  className="object-contain"
                                  unoptimized={feature.logo.endsWith('.gif')}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedOnSection;
