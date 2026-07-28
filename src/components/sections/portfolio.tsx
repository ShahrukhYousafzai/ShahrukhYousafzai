"use client";

import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projects } from "@/lib/data";
import Image from "next/image";
import { Package, Globe, Layers, Bot, ZoomIn, ExternalLink } from "lucide-react";

const PROJECTS_PER_PAGE = 6;

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => (
  <article className="group flat-card flex flex-col overflow-hidden">
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-video relative bg-[hsl(var(--surface))] cursor-pointer overflow-hidden border-b border-border/80">
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3"
            data-ai-hint={project.aiHint}
          />
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <ZoomIn className="h-6 w-6 text-background" strokeWidth={1.5} />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-border bg-background p-0">
        <DialogHeader>
          <DialogTitle className="sr-only">{project.title}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-contain p-4"
          />
        </div>
      </DialogContent>
    </Dialog>

    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full border border-border/80 px-2 py-0.5">{tag}</span>
        ))}
      </div>
      <h3 className="font-headline text-base font-medium leading-snug tracking-tight">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {project.description}
      </p>

      {project.linkText && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-foreground hover:text-primary transition-colors"
        >
          {project.linkText}
          <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
        </a>
      )}
    </div>
  </article>
);

const PaginatedProjects = ({
  projects,
  startIndex = 0,
}: {
  projects: Array<(typeof projects)[0]>;
  startIndex?: number;
}) => {
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
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (totalPages <= 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-px bg-border/80 sm:grid-cols-2 md:grid-cols-3 border border-border/80">
        {paginatedProjects.map((project, i) => (
          <div key={project.title} className="bg-background">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between border-t border-border/80 pt-6">            <div className="text-xs font-medium text-muted-foreground tabular-nums">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 rounded-lg border border-border/80 px-3 text-sm font-medium text-foreground hover:bg-surface disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 rounded-lg border border-border/80 px-3 text-sm font-medium text-foreground hover:bg-surface disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const PortfolioSection = () => {
  const [activeTab, setActiveTab] = useState("Games");
  const [gamePlatform, setGamePlatform] = useState("All");
  const [dimensionFilter, setDimensionFilter] = useState("All");
  const [animationDimensionFilter, setAnimationDimensionFilter] = useState("All");
  const [activeGameTag, setActiveGameTag] = useState("All");
  const [activeAppTag, setActiveAppTag] = useState("All");

  const categories = ["Games", "Apps", "Animations"];
  const allGameCategories = ["All", "AAA", "Action", "Sports", "Multiplayer", "Single Player", "Card Game", "Casino", "Board Game", "RPG", "Fighting", "Simulation", "Racing", "Shooting", "Battle Royale", "Tower Defense", "Endless Runner"];
  const allAppCategories = ["All", "AI", "Chatbot", "Productivity", "Creative Tools", "Social", "Web", "Mobile", "Windows"];

  const gameProjects = useMemo(() => projects.filter((p) => p.category === "Games"), []);
  const appProjects = useMemo(() => projects.filter((p) => p.category === "Apps"), []);
  const animationProjects = useMemo(() => projects.filter((p) => p.category === "Animations"), []);

  const filteredGameProjects = useMemo(
    () =>
      gameProjects.filter((p) => {
        const platformMatch = gamePlatform === "All" || p.platform === gamePlatform;
        const dimensionMatch = dimensionFilter === "All" || p.tags.includes(dimensionFilter);
        const tagMatch = activeGameTag === "All" || p.tags.includes(activeGameTag);
        return platformMatch && dimensionMatch && tagMatch;
      }),
    [gameProjects, gamePlatform, dimensionFilter, activeGameTag]
  );

  const filteredAppProjects = useMemo(
    () => appProjects.filter((p) => activeAppTag === "All" || p.tags.includes(activeAppTag)),
    [appProjects, activeAppTag]
  );

  const filteredAnimationProjects = useMemo(
    () =>
      animationProjects.filter(
        (p) => animationDimensionFilter === "All" || p.tags.includes(animationDimensionFilter)
      ),
    [animationProjects, animationDimensionFilter]
  );

  const availableGameCategories = useMemo(() => {
    const platformAndDimensionProjects = gameProjects.filter((p) => {
      const platformMatch = gamePlatform === "All" || p.platform === gamePlatform;
      const dimensionMatch = dimensionFilter === "All" || p.tags.includes(dimensionFilter);
      return platformMatch && dimensionMatch;
    });
    const availableTags = new Set(platformAndDimensionProjects.flatMap((p) => p.tags));
    return allGameCategories.filter((cat) => cat === "All" || availableTags.has(cat));
  }, [gameProjects, gamePlatform, dimensionFilter, allGameCategories]);

  const availableAppCategories = useMemo(() => {
    const availableTags = new Set(appProjects.flatMap((p) => p.tags));
    return allAppCategories.filter((cat) => cat === "All" || availableTags.has(cat));
  }, [appProjects, allAppCategories]);

  React.useEffect(() => {
    if (!availableGameCategories.includes(activeGameTag)) setActiveGameTag("All");
  }, [availableGameCategories, activeGameTag]);

  React.useEffect(() => {
    if (!availableAppCategories.includes(activeAppTag)) setActiveAppTag("All");
  }, [availableAppCategories, activeAppTag]);

  return (
    <section id="portfolio" className="bg-surface border-y border-border/80">
      <div className="container py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-14 md:mb-20">
          <div>
            <div className="section-label mb-3">Portfolio</div>
            <h2 className="font-headline text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              Products &amp;
              <br />
              <span className="text-muted-foreground">case studies.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:pt-3 md:text-lg">
            A curated selection from{" "}
            <span className="text-foreground font-medium">Efface Studios</span>{" "}
            and our agency delivery work. Basant Mela hit{" "}
            <span className="text-primary font-medium">1M+ organic downloads</span> and #4
            trending in Pakistan sports &mdash; most of these started as live
            products shipped to real users.
          </p>
        </div>

        <Tabs
          defaultValue="Games"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Primary category tabs */}
          <div className="flex flex-col gap-6 border-b border-border/80 pb-6 md:flex-row md:items-center md:justify-between">
            <TabsList className="border-0 bg-transparent p-0 gap-0">
              {categories.map((category, idx) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-lg border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:border-primary/30 data-[state=active]:bg-primary/5 data-[state=active]:text-primary hover:text-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="Games" className="mt-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Tabs value={gamePlatform} onValueChange={setGamePlatform}>
                <TabsList className="h-auto bg-transparent p-0 gap-1 flex-wrap">
                  {["All", "Web2", "Web3"].map((pid) => (
                    <TabsTrigger
                      key={pid}
                      value={pid}
                      className="rounded-lg border bg-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors data-[state=active]:border-primary/30 data-[state=active]:bg-primary/5 data-[state=active]:text-primary hover:border-muted-foreground/40 hover:text-foreground"
                    >
                      {pid === "All" ? "All Platforms" : pid}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Select value={dimensionFilter} onValueChange={setDimensionFilter}>
                <SelectTrigger className="h-9 w-auto min-w-[160px] rounded-lg border border-border/80 bg-transparent px-3 text-sm font-medium text-foreground">
                  <Layers className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                  <SelectValue placeholder="Dimension" />
                </SelectTrigger>
                <SelectContent className="border-border bg-background">
                  <SelectItem value="All">All Dimensions</SelectItem>
                  <SelectItem value="2D">2D</SelectItem>
                  <SelectItem value="3D">3D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={activeGameTag} onValueChange={setActiveGameTag}>
              <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
                {availableGameCategories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-lg border border-border/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors data-[state=active]:border-primary/30 data-[state=active]:bg-primary/5 data-[state=active]:text-primary hover:border-muted-foreground/40 hover:text-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-10">
              <PaginatedProjects projects={filteredGameProjects} />
            </div>
          </TabsContent>

          <TabsContent value="Apps" className="mt-8">
            <Tabs value={activeAppTag} onValueChange={setActiveAppTag}>
              <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
                {availableAppCategories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-lg border border-border/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors data-[state=active]:border-primary/30 data-[state=active]:bg-primary/5 data-[state=active]:text-primary hover:border-muted-foreground/40 hover:text-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="mt-10">
              <PaginatedProjects projects={filteredAppProjects} />
            </div>
          </TabsContent>

          <TabsContent value="Animations" className="mt-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Select
                value={animationDimensionFilter}
                onValueChange={setAnimationDimensionFilter}
              >
                <SelectTrigger className="h-9 w-auto min-w-[160px] rounded-lg border border-border/80 bg-transparent px-3 text-sm font-medium text-foreground">
                  <Layers className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                  <SelectValue placeholder="Dimension" />
                </SelectTrigger>
                <SelectContent className="border-border bg-background">
                  <SelectItem value="All">All Dimensions</SelectItem>
                  <SelectItem value="2D">2D</SelectItem>
                  <SelectItem value="3D">3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <PaginatedProjects projects={filteredAnimationProjects} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PortfolioSection;
