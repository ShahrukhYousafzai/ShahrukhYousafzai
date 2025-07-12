
const featuredOn = [
    {
        name: "United News of Bangladesh",
        url: "https://unb.com.bd/category/Tech/top-free-kite-flying-games-for-ios-and-android/90178",
        followers: "700K+ followers"
    },
    {
        name: "Editorialge",
        url: "https://editorialge.com/kite-flying-games/",
        followers: "68K+ followers"
    }
];

const FeaturedOnSection = () => {
    return (
        <section id="featured-on" className="py-12 bg-background">
            <div className="container">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">As Seen On</h3>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
                        {featuredOn.map((feature) => (
                             <a
                                key={feature.name}
                                href={feature.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-muted-foreground hover:text-primary transition-colors"
                            >
                                {feature.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedOnSection;
