
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
                <div className="text-center">
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">As Seen On</h3>
                    <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-2 items-center">
                        {featuredOn.map((feature) => (
                            <div key={feature.name} className="col-span-1 flex justify-center">
                                <a
                                    href={feature.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl font-bold font-headline text-foreground hover:text-primary transition-colors"
                                >
                                    {feature.name}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedOnSection;
