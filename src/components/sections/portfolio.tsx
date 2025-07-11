import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
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
);


const PortfolioSection = () => {
  const categories = ["Games", "Apps", "Animations"];
  const gameCategories = ["All", "Action", "Sports", "3D", "2D", "Multiplayer", "Single Player", "Card Game", "Board Game"];
  const gameProjects = projects.filter(p => p.category === 'Games');

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
          
          <TabsContent value="Games">
            <Tabs defaultValue="All" className="mt-8">
              <TabsList className="flex flex-wrap h-auto justify-center">
                {gameCategories.map((category) => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
              {gameCategories.map((gameCategory) => (
                <TabsContent key={gameCategory} value={gameCategory}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {gameProjects
                      .filter(p => gameCategory === 'All' || p.tags.includes(gameCategory))
                      .map((project) => (
                        <ProjectCard key={project.title} project={project} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="Apps">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {projects.filter(p => p.category === "Apps").map((project) => (
                 <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="Animations">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {projects.filter(p => p.category === "Animations").map((project) => (
                 <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PortfolioSection;
