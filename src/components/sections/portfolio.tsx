"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";

const PROJECTS_PER_PAGE = 6;

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

const PaginatedProjects = ({ projects }: { projects: Array<typeof projects[0]>}) => {
  const [currentPage, setCurrentPage] = useState(1);
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
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
          </PaginationItem>
          {pageNumbers}
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8">
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      {renderPagination()}
    </>
  );
};


const PortfolioSection = () => {
  const categories = ["Games", "Apps", "Animations"];
  const gameCategories = ["All", "Action", "Sports", "3D", "2D", "Multiplayer", "Single Player", "Card Game", "Board Game", "RPG", "Fighting", "Simulation", "Racing", "Shooting"];
  
  const projectsByCategory = (category: string) => projects.filter(p => p.category === category);
  const gameProjectsByTag = (tag: string) => projects.filter(p => p.category === 'Games' && (tag === 'All' || p.tags.includes(tag)));

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
                  <PaginatedProjects projects={gameProjectsByTag(gameCategory)} />
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="Apps">
             <PaginatedProjects projects={projectsByCategory("Apps")} />
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
