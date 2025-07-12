"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { recommendGame, type GameRecommendationOutput } from "@/ai/flows/game-recommendation";
import { generateGdd, type GddGeneratorOutput } from "@/ai/flows/gdd-generator";
import { calculateCost, type CostCalculatorOutput } from "@/ai/flows/cost-calculator";
import { Bot, Sparkles, Loader2, Wand2, FileText, DollarSign, ArrowRight } from "lucide-react";
import { about, projects } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const portfolioDescription = `${about.description} Key projects include: ${projects.map(p => p.title).join(", ")}.`;

type AiToolTab = "game-idea" | "gdd-generator" | "cost-calculator";

type GameIdeaGeneratorProps = {
  setGeneratedIdea: (idea: string) => void;
};

const GameIdeaGenerator = ({ setGeneratedIdea }: GameIdeaGeneratorProps) => {
  const [preferences, setPreferences] = useState("");
  const [recommendation, setRecommendation] = useState<GameRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences.trim()) {
      setError("Please describe what kind of game you'd like.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await recommendGame({
        userPreferences: preferences,
        portfolioDescription: portfolioDescription,
      });
      setRecommendation(result);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateGdd = () => {
    if (recommendation) {
      const idea = `${recommendation.gameTitle}: ${recommendation.description}`;
      setGeneratedIdea(idea);
    }
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
          <Button type="submit" disabled={isLoading} className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Idea...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Game Idea
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {recommendation && (
        <CardFooter className="flex-col items-start gap-4 pt-4">
          <div className="animate-in fade-in duration-500 w-full">
            <Card className="bg-gradient-to-br from-secondary to-background border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
                  {recommendation.gameTitle}
                </CardTitle>
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
                 <Button onClick={handleGenerateGdd} className="w-full">
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

type GddGeneratorProps = {
  initialIdea: string;
  setGeneratedGdd: (gdd: GddGeneratorOutput) => void;
};

const GddGenerator = ({ initialIdea, setGeneratedGdd }: GddGeneratorProps) => {
  const [gameIdea, setGameIdea] = useState(initialIdea);
  const [platform, setPlatform] = useState("");
  const [gdd, setGdd] = useState<GddGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerGddGeneration = async (idea: string, plat: string) => {
    if (!idea.trim()) {
      setError("Please provide a basic game idea.");
      return;
    }
     if (!plat) {
      setError("Please select a target platform.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGdd(null);

    try {
      const result = await generateGdd({
        gameIdea: idea,
        platform: plat,
        portfolioDescription: portfolioDescription,
      });
      setGdd(result);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialIdea) {
      setGameIdea(initialIdea);
      // We don't auto-trigger here anymore. User needs to pick a platform.
    }
  }, [initialIdea]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerGddGeneration(gameIdea, platform);
  };
  
  const platforms = ["Web", "Windows", "Mac", "Android", "iOS", "Desktop (All)", "Mobile (All)", "Cross-Platform (All)"];

  const handleGenerateCost = () => {
    if (gdd) {
      setGeneratedGdd(gdd);
    }
  };


  return (
     <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText /> GDD Generator</CardTitle>
        <CardDescription>Expand a game concept into a detailed Game Design Document.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid w-full gap-4">
          <Input
            placeholder="Enter your game concept..."
            value={gameIdea}
            onChange={(e) => setGameIdea(e.target.value)}
            disabled={isLoading}
          />
           <Select value={platform} onValueChange={setPlatform} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select Target Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isLoading} className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating GDD...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate GDD
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {gdd && (
         <CardFooter className="flex-col items-start gap-4 pt-4">
          <div className="animate-in fade-in duration-500 w-full">
            <Card className="bg-gradient-to-br from-secondary to-background border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
                  {gdd.title}
                </CardTitle>
                <CardDescription>{gdd.overview}</CardDescription>
              </CardHeader>
              <CardContent>
                 <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold text-lg">Gameplay</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                       <div>
                          <h4 className="font-semibold">Core Mechanics</h4>
                          <p className="text-muted-foreground">{gdd.gameplay.coreMechanics}</p>
                       </div>
                        <div>
                          <h4 className="font-semibold">Game Loop</h4>
                          <p className="text-muted-foreground">{gdd.gameplay.gameLoop}</p>
                       </div>
                        <div>
                          <h4 className="font-semibold">Player Controls</h4>
                          <p className="text-muted-foreground">{gdd.gameplay.playerControls}</p>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold text-lg">Target Audience</AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <p className="text-muted-foreground">{gdd.targetAudience}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold text-lg">Art Style & Monetization</AccordionTrigger>
                     <AccordionContent className="space-y-4 pt-2">
                       <div>
                          <h4 className="font-semibold">Art Style</h4>
                          <p className="text-muted-foreground">{gdd.artStyle}</p>
                       </div>
                        <div>
                          <h4 className="font-semibold">Monetization Strategy</h4>
                          <p className="text-muted-foreground">{gdd.monetization}</p>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter>
                 <Button onClick={handleGenerateCost} className="w-full">
                   Calculate Cost for this Project <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
              </CardFooter>
            </Card>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

type CostCalculatorProps = {
  initialGdd: GddGeneratorOutput | null;
  setFinalCostIdea: (idea: string) => void;
};

const CostCalculator = ({ initialGdd, setFinalCostIdea }: CostCalculatorProps) => {
  const [gameIdea, setGameIdea] = useState("");
  const [estimation, setEstimation] = useState<CostCalculatorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerCostCalculation = async (idea: string) => {
    if (!idea.trim()) {
      setError("Please describe your game idea.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setEstimation(null);

    try {
      const result = await calculateCost({ gameIdea: idea });
      setEstimation(result);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialGdd) {
      const ideaFromGdd = `Title: ${initialGdd.title}\nOverview: ${initialGdd.overview}\nPlatform: ${initialGdd.gameplay.playerControls}\nCore Mechanics: ${initialGdd.gameplay.coreMechanics}\nArt Style: ${initialGdd.artStyle}\nTarget Audience: ${initialGdd.targetAudience}\nMonetization: ${initialGdd.monetization}`;
      setGameIdea(ideaFromGdd);
      triggerCostCalculation(ideaFromGdd);
    }
  }, [initialGdd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerCostCalculation(gameIdea);
  };
  
  useEffect(() => {
    setFinalCostIdea(gameIdea);
  }, [gameIdea]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><DollarSign /> Get a Cost Estimate</CardTitle>
        <CardDescription>Provide a description of your game idea, and I'll give you a rough cost estimate based on my experience.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid w-full gap-4">
          <Textarea
            placeholder="Describe your game concept, features, platform (PC/mobile), and style (2D/3D)..."
            value={gameIdea}
            onChange={(e) => setGameIdea(e.target.value)}
            rows={4}
            disabled={isLoading}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isLoading} className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <DollarSign className="mr-2 h-4 w-4" />
                Calculate Cost
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {estimation && (
        <CardFooter className="flex-col items-start gap-4 pt-4">
          <div className="animate-in fade-in duration-500 w-full">
            <Card className="bg-gradient-to-br from-secondary to-background border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
                  Cost Estimation
                </CardTitle>
                <CardDescription>This is a rough estimate. A detailed quote requires a full consultation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">Prototype Cost</h4>
                  <p className="text-2xl font-bold text-primary">{estimation.prototypeCost}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Full Development Cost Range</h4>
                  <p className="text-2xl font-bold text-primary">{estimation.fullDevelopmentCost}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-muted-foreground">Reasoning:</h4>
                  <p className="mt-1 text-sm">{estimation.reasoning}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

const AiRecommender = () => {
  const [activeTab, setActiveTab] = useState<AiToolTab>("game-idea");
  
  // State to pass data between components
  const [generatedIdea, setGeneratedIdea] = useState("");
  const [generatedGdd, setGeneratedGdd] = useState<GddGeneratorOutput | null>(null);
  const [finalCostIdea, setFinalCostIdea] = useState("");


  // Effect to switch to GDD tab when an idea is generated
  useEffect(() => {
    if (generatedIdea) {
      setActiveTab("gdd-generator");
    }
  }, [generatedIdea]);

  // Effect to switch to Cost Calculator tab when a GDD is generated
  useEffect(() => {
    if (generatedGdd) {
      setActiveTab("cost-calculator");
    }
  }, [generatedGdd]);

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
              <GameIdeaGenerator setGeneratedIdea={setGeneratedIdea} />
            </TabsContent>
            <TabsContent value="gdd-generator" className="mt-6">
              <GddGenerator 
                initialIdea={generatedIdea}
                setGeneratedGdd={setGeneratedGdd}
              />
            </TabsContent>
            <TabsContent value="cost-calculator" className="mt-6">
              <CostCalculator 
                initialGdd={generatedGdd}
                setFinalCostIdea={setFinalCostIdea}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AiRecommender;
