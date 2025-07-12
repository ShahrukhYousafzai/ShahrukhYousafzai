import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Twitter } from "lucide-react";

const clients = [
  {
    name: "RugDollz",
    logo: "/Images/worked-with/rugdollz.webp",
    website: "https://rugdollz.com/",
    x: "https://x.com/RugdollzNFT",
    width: 200,
    height: 60,
  },
  {
    name: "Solar Studios",
    logo: "/Images/worked-with/SolarStudios.png",
    website: "https://solarstudios.co/",
    x: "https://x.com/solar_dex",
    width: 180,
    height: 50,
  },
  {
    name: "Toxic Skulls Club",
    logo: "/Images/worked-with/TSC.webp",
    website: "https://toxicskullsclub.io",
    x: "https://x.com/ToxicSkullsClub",
    width: 150,
    height: 60,
  },
];

const WorkedWithSection = () => {
  return (
    <section id="worked-with" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">Worked With</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            I've had the privilege of collaborating with some incredible teams in the Web3 space.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {clients.map((client) => (
            <Card key={client.name} className="flex flex-col justify-between items-center text-center p-6 bg-secondary/50 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-glow-primary">
              <CardContent className="flex-grow flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  width={client.width}
                  height={client.height}
                  className="object-contain"
                />
              </CardContent>
              <CardFooter className="flex gap-4 p-0">
                <Button variant="outline" asChild>
                  <a href={client.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" /> Website
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={client.x} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-4 w-4" /> X Profile
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkedWithSection;
