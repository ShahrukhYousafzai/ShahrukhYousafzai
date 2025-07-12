"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Package, Globe } from "lucide-react";

const PROJECTS_PER_PAGE = 6;

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => (
  <Card className="h-full flex flex-col overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-glow-primary">
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
    <div className="p-4 flex-grow flex flex-col">
      <CardTitle className="font-headline text-lg">{project.title}</CardTitle>
      <div className="flex flex-wrap gap-1 my-3">
        {project.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
        ))}
      </div>
      <CardDescription className="text-muted-foreground text-sm flex-grow">
        {project.description}
      </CardDescription>
    </div>
    <CardFooter className="p-4">
      <Button asChild className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          <project.linkIcon className="mr-2 h-4 w-4" /> {project.linkText}
        </a>
      </Button>
    </CardFooter>
  </Card>
);

const PaginatedProjects = ({ projects }: { projects: Array<(typeof projects)[0]>}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  React.useEffect(() => {
    setCurrentPage(1);
  }, [projects]);
  
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = projects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);
    
    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, currentPage + halfMaxPages);

    if (currentPage - halfMaxPages < 1) {
      endPage = Math.min(totalPages, maxPagesToShow);
    }
    if (currentPage + halfMaxPages > totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(<PaginationItem key="1"><PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink></PaginationItem>);
      if (startPage > 2) {
        pageNumbers.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={i === currentPage} onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>);
      }
      pageNumbers.push(<PaginationItem key={totalPages}><PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink></PaginationItem>);
    }

    return (
       <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}/>
          </PaginationItem>
          {pageNumbers}
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      {renderPagination()}
    </>
  );
};

const PortfolioSection = () => {
  const [activeGameTag, setActiveGameTag] = useState('All');
  const [gamePlatform, setGamePlatform] = useState('All');
  const categories = ["Games", "Apps", "Animations"];
  const gameCategories = ["All", "Action", "Sports", "3D", "2D", "Multiplayer", "Single Player", "Card Game", "Casino", "Board Game", "RPG", "Fighting", "Simulation", "Racing", "Shooting", "Battle Royale", "Tower Defense", "Endless Runner"];
  const appCategories = ["All", "AI", "Chatbot", "Productivity", "Creative Tools", "Social", "Web", "Mobile", "Windows"];

  const projectsByCategory = (category: string) => projects.filter(p => p.category === category);

  const gameProjectsByTag = (platform: string, tag: string) => {
    return projects.filter(p => {
      const isGame = p.category === 'Games';
      const platformMatch = platform === 'All' || p.platform === platform;
      const tagMatch = tag === 'All' || p.tags.includes(tag);
      return isGame && platformMatch && tagMatch;
    });
  };

  const appProjectsByTag = (tag: string) => projects.filter(p => p.category === 'Apps' && (tag === 'All' || p.tags.includes(tag)));
  
  const filteredGameProjects = gameProjectsByTag(gamePlatform, activeGameTag);

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
            <div className="mt-8">
              <Tabs value={gamePlatform} onValueChange={setGamePlatform}>
                <TabsList className="flex flex-wrap h-auto justify-center gap-2 bg-transparent p-0 mb-4">
                  <TabsTrigger value="All" className="rounded-full px-4 py-2 border border-transparent transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary hover:bg-primary/10">
                    <Globe className="mr-2 h-4 w-4" /> All Platforms
                  </TabsTrigger>
                  <TabsTrigger value="Web2" className="rounded-full px-4 py-2 border border-transparent transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary hover:bg-primary/10">
                    <Package className="mr-2 h-4 w-4" /> Web2
                  </TabsTrigger>
                  <TabsTrigger value="Web3" className="rounded-full px-4 py-2 border border-transparent transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary hover:bg-primary/10">
                    <Package className="mr-2 h-4 w-4" /> Web3/Blockchain
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Tabs value={activeGameTag} onValueChange={setActiveGameTag}>
                <TabsList className="flex flex-wrap h-auto justify-center gap-2 bg-transparent p-0">
                  {gameCategories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="rounded-full px-4 py-2 border border-transparent transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary hover:bg-primary/10"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <PaginatedProjects projects={filteredGameProjects} />
            </div>
          </TabsContent>

          <TabsContent value="Apps">
             <Tabs defaultValue="All" className="mt-8">
                <TabsList className="flex flex-wrap h-auto justify-center gap-2 bg-transparent p-0">
                  {appCategories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="rounded-full px-4 py-2 border border-transparent transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary hover:bg-primary/10"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {appCategories.map((appCategory) => (
                  <TabsContent key={appCategory} value={appCategory}>
                    <PaginatedProjects projects={appProjectsByTag(appCategory)} />
                  </TabsContent>
                ))}
              </Tabs>
          </TabsContent>

          <TabsContent value="Animations">
             <PaginatedProjects projects={projectsByCategory("Animations")} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PortfolioSection;
