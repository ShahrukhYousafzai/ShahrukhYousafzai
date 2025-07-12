"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Package, Globe, Layers, Bot } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("Games");
  const [gamePlatform, setGamePlatform] = useState('All');
  const [dimensionFilter, setDimensionFilter] = useState('All');
  const [activeGameTag, setActiveGameTag] = useState('All');
  const [activeAppTag, setActiveAppTag] = useState('All');

  const categories = ["Games", "Apps", "Animations"];
  const allGameCategories = ["All", "Action", "Sports", "Multiplayer", "Single Player", "Card Game", "Casino", "Board Game", "RPG", "Fighting", "Simulation", "Racing", "Shooting", "Battle Royale", "Tower Defense", "Endless Runner"];
  const allAppCategories = ["All", "AI", "Chatbot", "Productivity", "Creative Tools", "Social", "Web", "Mobile", "Windows"];

  const gameProjects = useMemo(() => projects.filter(p => p.category === 'Games'), []);
  const appProjects = useMemo(() => projects.filter(p => p.category === 'Apps'), []);
  const animationProjects = useMemo(() => projects.filter(p => p.category === 'Animations'), []);

  const filteredGameProjects = useMemo(() => {
    return gameProjects.filter(p => {
      const platformMatch = gamePlatform === 'All' || p.platform === gamePlatform;
      const dimensionMatch = dimensionFilter === 'All' || p.tags.includes(dimensionFilter);
      const tagMatch = activeGameTag === 'All' || p.tags.includes(activeGameTag);
      return platformMatch && dimensionMatch && tagMatch;
    });
  }, [gameProjects, gamePlatform, dimensionFilter, activeGameTag]);
  
  const filteredAppProjects = useMemo(() => {
     return appProjects.filter(p => activeAppTag === 'All' || p.tags.includes(activeAppTag));
  }, [appProjects, activeAppTag]);

  const availableGameCategories = useMemo(() => {
    const platformAndDimensionProjects = gameProjects.filter(p => {
        const platformMatch = gamePlatform === 'All' || p.platform === gamePlatform;
        const dimensionMatch = dimensionFilter === 'All' || p.tags.includes(dimensionFilter);
        return platformMatch && dimensionMatch;
    });
    const availableTags = new Set(platformAndDimensionProjects.flatMap(p => p.tags));
    const categoriesWithProjects = allGameCategories.filter(cat => cat === 'All' || availableTags.has(cat));
    return categoriesWithProjects;
  }, [gameProjects, gamePlatform, dimensionFilter, allGameCategories]);

  const availableAppCategories = useMemo(() => {
    const availableTags = new Set(appProjects.flatMap(p => p.tags));
    const categoriesWithProjects = allAppCategories.filter(cat => cat === 'All' || availableTags.has(cat));
    return categoriesWithProjects;
  }, [appProjects, allAppCategories]);
  
  // Reset active tag if it's not in the available categories
  React.useEffect(() => {
    if (!availableGameCategories.includes(activeGameTag)) {
      setActiveGameTag('All');
    }
  }, [availableGameCategories, activeGameTag]);

  React.useEffect(() => {
    if (!availableAppCategories.includes(activeAppTag)) {
      setActiveAppTag('All');
    }
  }, [availableAppCategories, activeAppTag]);

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">My Portfolio</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A selection of projects I've worked on.
          </p>
        </div>
        <Tabs defaultValue="Games" value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="grid w-full grid-cols-3 md:w-1/2 mx-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="Games">
            <div className="mt-8">
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <Tabs value={gamePlatform} onValueChange={setGamePlatform}>
                    <TabsList className="flex-wrap h-auto bg-transparent p-0">
                      <TabsTrigger value="All" className="rounded-full px-4 py-2 border border-transparent transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary hover:bg-primary/10">
                        <Globe className="mr-2 h-4 w-4" /> All Platforms
                      </TabsTrigger>
                      <TabsTrigger value="Web2" className="rounded-full px-4 py-2 border border-transparent transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary hover:bg-primary/10">
                        <Package className="mr-2 h-4 w-4" /> Web2
                      </TabsTrigger>
                      <TabsTrigger value="Web3" className="rounded-full px-4 py-2 border border-transparent transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary hover:bg-primary/10">
                        <Bot className="mr-2 h-4 w-4" /> Web3/Blockchain
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Select value={dimensionFilter} onValueChange={setDimensionFilter}>
                    <SelectTrigger className="w-auto min-w-[180px] rounded-full px-4 py-2 border bg-muted/50 transition-all duration-300 hover:bg-muted data-[state=open]:ring-primary">
                       <Layers className="mr-2 h-4 w-4" />
                       <SelectValue placeholder="Select Dimension" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Dimensions</SelectItem>
                      <SelectItem value="2D">2D</SelectItem>
                      <SelectItem value="3D">3D</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
              
              <Tabs value={activeGameTag} onValueChange={setActiveGameTag}>
                <TabsList className="flex flex-wrap h-auto justify-center gap-2 bg-transparent p-0">
                  {availableGameCategories.map((category) => (
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
             <Tabs value={activeAppTag} onValueChange={setActiveAppTag} className="mt-8">
                <TabsList className="flex flex-wrap h-auto justify-center gap-2 bg-transparent p-0">
                  {availableAppCategories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="rounded-full px-4 py-2 border border-transparent transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:border-primary hover:bg-primary/10"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <PaginatedProjects projects={filteredAppProjects} />
              </Tabs>
          </TabsContent>

          <TabsContent value="Animations">
             <PaginatedProjects projects={animationProjects} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PortfolioSection;
