
"use client";

import { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter as TableFooterComponent } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { recommendGame, type GameRecommendationOutput } from "@/ai/flows/game-recommendation";
import { generateGdd, type GddGeneratorOutput } from "@/ai/flows/gdd-generator";
import { calculateCost, type CostCalculatorOutput } from "@/ai/flows/cost-calculator";
import { splitIntoMilestones, type MilestoneSplitterOutput } from "@/ai/flows/milestone-splitter";
import { Bot, Sparkles, Loader2, Wand2, FileText, DollarSign, ArrowRight, Download, Milestone } from "lucide-react";
import { about, projects } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateDocx } from "@/app/actions";
import React from 'react';

const portfolioDescription = `${about.description} Key projects include: ${projects.map(p => p.title).join(", ")}.`;

type AiToolTab = "game-idea" | "gdd-generator" | "cost-calculator";

const GameIdeaGenerator = ({
  isLoading,
  recommendation,
  error,
  onSubmit,
  onGenerateGdd,
  preferences,
  setPreferences,
}: {
  isLoading: boolean;
  recommendation: GameRecommendationOutput | null;
  error: string | null;
  onSubmit: (preferences: string) => void;
  onGenerateGdd: () => void;
  preferences: string;
  setPreferences: (value: string) => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Wand2 /> Your Game Preferences</CardTitle>
        <CardDescription>e.g., "a cozy farming sim with magic" or "a fast-paced multiplayer shooter"</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid w-full gap-4">
          <Textarea
            placeholder="Tell me what you're looking for..."
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            rows={4}
            disabled={isLoading}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isLoading || !preferences.trim()} className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Idea...</> : <><Wand2 className="mr-2 h-4 w-4" /> Generate Game Idea</>}
          </Button>
        </form>
      </CardContent>
      {recommendation && (
        <CardFooter className="flex-col items-start gap-4 pt-4">
          <div className="animate-in fade-in duration-500 w-full">
            <Card className="bg-gradient-to-br from-secondary to-background border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">{recommendation.gameTitle}</CardTitle>
                <CardDescription>{recommendation.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg">Key Features:</h4>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground">
                    {recommendation.features.map((feature, i) => <li key={i}>{feature}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-muted-foreground">Reasoning:</h4>
                  <p className="mt-1">{recommendation.reasoning}</p>
                </div>
              </CardContent>
              <CardFooter>
                 <Button onClick={onGenerateGdd} className="w-full">
                  Generate GDD for this Idea <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

const GddGenerator = React.forwardRef<HTMLDivElement, {
  gdd: GddGeneratorOutput | null;
  isLoading: boolean;
  error: string | null;
  isDownloading: boolean;
  onSubmit: (idea: string, platform: string) => void;
  onDownload: () => void;
  onCalculateCost: () => void;
  gameIdea: string;
  setGameIdea: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
}>(({
  gdd,
  isLoading,
  error,
  isDownloading,
  onSubmit,
  onDownload,
  onCalculateCost,
  gameIdea,
  setGameIdea,
  platform,
  setPlatform,
}, ref) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(gameIdea, platform);
  };

  const platforms = ["Web", "Windows", "Mac", "Android", "iOS", "Desktop (All)", "Mobile (All)", "Cross-Platform (All)"];

  return (
     <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText /> GDD Generator</CardTitle>
        <CardDescription>Expand a game concept into a detailed Game Design Document.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid w-full gap-4">
          <Input
            placeholder="Enter your game idea..."
            value={gameIdea}
            onChange={(e) => setGameIdea(e.target.value)}
            disabled={isLoading || isDownloading}
          />
           <Select value={platform} onValueChange={setPlatform} disabled={isLoading || isDownloading}>
              <SelectTrigger>
                <SelectValue placeholder="Select Target Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isLoading || isDownloading || !platform || !gameIdea} className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating GDD...</> : <><FileText className="mr-2 h-4 w-4" /> Generate GDD</>}
          </Button>
        </form>
      </CardContent>
      {gdd && (
         <CardFooter className="flex-col items-start gap-4 pt-4">
          <div className="animate-in fade-in duration-500 w-full">
            <div ref={ref}>
                <Card className="bg-card text-card-foreground p-4">
                  <CardHeader className="p-2">
                    <CardTitle className="text-2xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">{gdd.title}</CardTitle>
                    <CardDescription>{gdd.overview}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-2">
                     <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold text-lg">Gameplay</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4 px-2">
                           <div className="whitespace-pre-line">
                              <h4 className="font-semibold">Core Mechanics</h4>
                              <p className="text-muted-foreground">{gdd.gameplay.coreMechanics}</p>
                           </div>
                            <div className="whitespace-pre-line">
                              <h4 className="font-semibold">Game Loop</h4>
                              <p className="text-muted-foreground">{gdd.gameplay.gameLoop}</p>
                           </div>
                            <div className="whitespace-pre-line">
                              <h4 className="font-semibold">Player Controls</h4>
                              <p className="text-muted-foreground">{gdd.gameplay.playerControls}</p>
                           </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold text-lg">Target Audience</AccordionTrigger>
                        <AccordionContent className="pt-4 px-2">
                          <p className="text-muted-foreground whitespace-pre-line">{gdd.targetAudience}</p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold text-lg">Art Style & Monetization</AccordionTrigger>
                         <AccordionContent className="space-y-4 pt-4 px-2">
                           <div className="whitespace-pre-line">
                              <h4 className="font-semibold">Art Style</h4>
                              <p className="text-muted-foreground">{gdd.artStyle}</p>
                           </div>
                            <div className="whitespace-pre-line">
                              <h4 className="font-semibold">Monetization Strategy</h4>
                              <p className="text-muted-foreground">{gdd.monetization}</p>
                           </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full pt-4">
            <Button onClick={onDownload} disabled={isDownloading} className="w-full">
                {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />} 
                Download as DOCX
            </Button>
            <Button onClick={onCalculateCost} className="w-full">
              Calculate Cost for this Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
});
GddGenerator.displayName = "GddGenerator";


const CostCalculator = React.forwardRef<HTMLDivElement, {
    estimation: CostCalculatorOutput | null;
    milestones: MilestoneSplitterOutput | null;
    isLoading: boolean;
    isSplitting: boolean;
    isDownloading: boolean;
    error: string | null;
    onSubmit: (idea: string) => void;
    onSplit: () => void;
    onDownloadQuote: () => void;
    onDownloadMilestones: () => void;
    gameIdea: string;
    setGameIdea: (value: string) => void;
}>(({
    estimation,
    milestones,
    isLoading,
    isSplitting,
    isDownloading,
    error,
    onSubmit,
    onSplit,
    onDownloadQuote,
    onDownloadMilestones,
    gameIdea,
    setGameIdea,
}, ref) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(gameIdea);
  };
  
  // Use React.useImperativeHandle to expose a ref for the content
  const quoteContentRef = useRef<HTMLDivElement>(null);
  const milestonesContentRef = useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    // This is a bit of a trick to handle multiple refs. We're only using one at a time for downloads.
    get quoteNode() {
      return quoteContentRef.current;
    },
    get milestonesNode() {
      return milestonesContentRef.current;
    },
    ...({} as HTMLDivElement) // Satisfy the type
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><DollarSign /> Get a Cost Estimate</CardTitle>
        <CardDescription>Provide a description or GDD of your game, and I'll generate an itemized quote.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid w-full gap-4">
          <Textarea
            placeholder="Describe your game concept, features, platform (PC/mobile), and style (2D/3D), or paste a GDD..."
            value={gameIdea}
            onChange={(e) => setGameIdea(e.target.value)}
            rows={6}
            disabled={isLoading || isSplitting || isDownloading}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isLoading || isSplitting || isDownloading || !gameIdea} className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...</> : <><DollarSign className="mr-2 h-4 w-4" /> Generate Quote</>}
          </Button>
        </form>
      </CardContent>
      {estimation && (
        <CardFooter className="flex-col items-start gap-4 pt-4">
          <div className="animate-in fade-in duration-500 w-full">
            <div ref={quoteContentRef}>
                <Card className="bg-card text-card-foreground p-4">
                    <CardTitle className="text-2xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))] mb-2">{estimation.quoteTitle}</CardTitle>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Module</TableHead>
                                <TableHead className="text-right">Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {estimation.items.map((item, index) => (
                               <TableRow key={index}>
                                    <TableCell>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-muted-foreground text-xs whitespace-pre-line">{item.description}</p>
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">${item.cost.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooterComponent>
                            <TableRow className="text-lg">
                                <TableCell className="font-bold">Total Estimated Cost</TableCell>
                                <TableCell className="text-right font-bold text-primary">${estimation.totalCost.toLocaleString()}</TableCell>
                            </TableRow>
                        </TableFooterComponent>
                    </Table>
                     <p className="text-xs text-muted-foreground mt-4 p-4 border rounded-md bg-background">{estimation.disclaimer}</p>
                </Card>
            </div>
          </div>
            <div className="w-full pt-4 flex flex-col sm:flex-row gap-2">
                <Button onClick={onDownloadQuote} disabled={isDownloading || isSplitting} className="w-full">
                    {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />} 
                    Download as DOCX
                </Button>
                 <Button onClick={onSplit} disabled={isSplitting || isDownloading} className="w-full">
                    {isSplitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Milestone className="mr-2 h-4 w-4" />}
                    Split into Milestones
                </Button>
            </div>
        </CardFooter>
      )}
      {milestones && (
          <CardFooter className="flex-col items-start gap-4 pt-4 w-full">
            <div className="animate-in fade-in duration-500 w-full">
                <div ref={milestonesContentRef}>
                     <Card className="bg-card text-card-foreground p-4">
                         <CardTitle className="text-2xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))] mb-4">Project Milestones</CardTitle>
                        <Accordion type="single" collapsible className="w-full">
                            {milestones.milestones.map((milestone, index) => (
                                 <AccordionItem value={`milestone-${index}`} key={index}>
                                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                                        <div className="flex justify-between w-full pr-4">
                                            <span>{milestone.name}</span>
                                            <span className="text-primary">${milestone.cost.toLocaleString()}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2">
                                         <p className="text-muted-foreground mb-4 px-2">{milestone.description}</p>
                                         <ul className="space-y-2 px-2">
                                            {milestone.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="text-sm border-l-2 border-primary/50 pl-3">
                                                    <p className="font-semibold">{item.name} - ${item.cost.toLocaleString()}</p>
                                                    <p className="text-muted-foreground text-xs">{item.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>
                </div>
            </div>
             <div className="w-full pt-4">
                <Button onClick={onDownloadMilestones} disabled={isDownloading} className="w-full">
                    {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />} 
                    Download as DOCX
                </Button>
            </div>
          </CardFooter>
      )}
    </Card>
  );
});
CostCalculator.displayName = "CostCalculator";

const AiRecommender = () => {
  const [activeTab, setActiveTab] = useState<AiToolTab>("game-idea");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  
  const [recommendation, setRecommendation] = useState<GameRecommendationOutput | null>(null);
  const [gdd, setGdd] = useState<GddGeneratorOutput | null>(null);
  const [estimation, setEstimation] = useState<CostCalculatorOutput | null>(null);
  const [milestones, setMilestones] = useState<MilestoneSplitterOutput | null>(null);

  const [gameIdeaPreferences, setGameIdeaPreferences] = useState("");
  const [gddGeneratorIdea, setGddGeneratorIdea] = useState("");
  const [gddPlatform, setGddPlatform] = useState("");
  const [costCalculatorIdea, setCostCalculatorIdea] = useState("");

  const gddContentRef = useRef<HTMLDivElement>(null);
  const costCalculatorRef = useRef<any>(null);


  const handleGenerateIdea = async (preferences: string) => {
    if (!preferences.trim()) {
      setError("Please describe what kind of game you'd like.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await recommendGame({ userPreferences: preferences, portfolioDescription });
      setRecommendation(result);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdeaToGdd = () => {
    if (recommendation) {
      const ideaForGdd = `${recommendation.gameTitle}: ${recommendation.description}`;
      setGddGeneratorIdea(ideaForGdd);
      setActiveTab("gdd-generator");
    }
  };
  
  const handleGenerateGdd = async (idea: string, platform: string) => {
    if (!idea.trim() || !platform) {
      setError("Please provide a game idea and select a platform.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGdd(null);
    try {
      const result = await generateGdd({ gameIdea: idea, platform, portfolioDescription });
      setGdd(result);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGddToCost = () => {
      if (gdd) {
          const ideaFromGdd = `Title: ${gdd.title}\nOverview: ${gdd.overview}\nPlatform: ${gdd.gameplay.playerControls}\nCore Mechanics: ${gdd.gameplay.coreMechanics}\nGame Loop: ${gdd.gameplay.gameLoop}\nPlayer Controls: ${gdd.gameplay.playerControls}\nTarget Audience: ${gdd.targetAudience}\nArt Style: ${gdd.artStyle}\nMonetization: ${gdd.monetization}`;
          setCostCalculatorIdea(ideaFromGdd);
          setActiveTab("cost-calculator");
      }
  };
  
  const handleCalculateCost = async (idea: string) => {
    if (!idea.trim()) {
      setError("Please describe your game idea.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setEstimation(null);
    setMilestones(null);
    try {
      const result = await calculateCost({ gameIdea: idea });
      setEstimation(result);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSplitMilestones = async () => {
    if (!estimation) return;
    setIsSplitting(true);
    setMilestones(null);
    try {
      const result = await splitIntoMilestones(estimation);
      setMilestones(result);
    } catch (err) {
       setError("Sorry, something went wrong while splitting milestones.");
       console.error(err);
    } finally {
      setIsSplitting(false);
    }
  };

  const handleDownload = async (type: 'gdd' | 'quote' | 'milestones') => {
    let contentEl;
    let title;

    switch (type) {
        case 'gdd':
            contentEl = gddContentRef.current;
            title = gdd?.title || "GDD";
            break;
        case 'quote':
            contentEl = costCalculatorRef.current?.quoteNode;
            title = estimation?.quoteTitle || "Quote";
            break;
        case 'milestones':
            contentEl = costCalculatorRef.current?.milestonesNode;
            title = "Project_Milestones";
            break;
    }

    if (!contentEl) return;
    
    setIsDownloading(true);
    setError(null);

    try {
      const base64 = await generateDocx(contentEl.innerHTML, title);
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
      
      saveAs(blob, `${title.replace(/ /g, "_")}.docx`);
    } catch (err) {
      setError("Failed to download the document. Please try again.");
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="ai-recommender" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-dot-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      <div className="container">
        <div className="text-center">
          <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Features
          </div>
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">Let AI Assist You</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Use my custom-built AI tools to brainstorm game ideas, generate a full Game Design Document, or get a cost estimate for your project.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AiToolTab)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="game-idea"><Wand2 className="mr-2"/>Idea Generator</TabsTrigger>
              <TabsTrigger value="gdd-generator"><FileText className="mr-2"/>GDD Generator</TabsTrigger>
              <TabsTrigger value="cost-calculator"><DollarSign className="mr-2"/>Cost Calculator</TabsTrigger>
            </TabsList>
            <TabsContent value="game-idea" className="mt-6">
              <GameIdeaGenerator 
                isLoading={isLoading}
                recommendation={recommendation}
                error={error}
                onSubmit={handleGenerateIdea}
                onGenerateGdd={handleIdeaToGdd}
                preferences={gameIdeaPreferences}
                setPreferences={setGameIdeaPreferences}
              />
            </TabsContent>
            <TabsContent value="gdd-generator" className="mt-6">
              <GddGenerator 
                ref={gddContentRef}
                gdd={gdd}
                isLoading={isLoading}
                isDownloading={isDownloading}
                error={error}
                onSubmit={handleGenerateGdd}
                onDownload={() => handleDownload('gdd')}
                onCalculateCost={handleGddToCost}
                gameIdea={gddGeneratorIdea}
                setGameIdea={setGddGeneratorIdea}
                platform={gddPlatform}
                setPlatform={setGddPlatform}
              />
            </TabsContent>
            <TabsContent value="cost-calculator" className="mt-6">
              <CostCalculator
                 ref={costCalculatorRef}
                 estimation={estimation}
                 milestones={milestones}
                 isLoading={isLoading}
                 isSplitting={isSplitting}
                 isDownloading={isDownloading}
                 error={error}
                 onSubmit={handleCalculateCost}
                 onSplit={handleSplitMilestones}
                 onDownloadQuote={() => handleDownload('quote')}
                 onDownloadMilestones={() => handleDownload('milestones')}
                 gameIdea={costCalculatorIdea}
                 setGameIdea={setCostCalculatorIdea}
               />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AiRecommender;
