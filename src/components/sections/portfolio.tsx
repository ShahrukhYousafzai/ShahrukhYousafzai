import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const PortfolioSection = () => {
  const categories = ["Games", "Apps", "Animations"];

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">My Portfolio</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A selection of projects I've worked on.
          </p>
        </div>
        <Tabs defaultValue="Games" className="mt-12">
          <TabsList className="grid w-full grid-cols-3 md:w-1/2 mx-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full mt-8"
              >
                <CarouselContent>
                  {projects.filter(p => p.category === category).map((project, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card className="h-full flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                           <CardHeader className="p-0">
                             <div className="aspect-video relative">
                              <Image 
                                src={project.image} 
                                alt={project.title} 
                                fill
                                className="object-cover"
                                data-ai-hint={project.aiHint}
                              />
                             </div>
                           </CardHeader>
                          <div className="p-6 flex-grow flex flex-col">
                            <CardTitle className="font-headline">{project.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 my-4">
                              {project.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                            <CardDescription className="text-muted-foreground flex-grow">
                              {project.description}
                            </CardDescription>
                          </div>
                          <CardFooter>
                            <Button asChild className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                               <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <project.linkIcon className="mr-2 h-4 w-4" /> {project.linkText}
                               </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default PortfolioSection;
