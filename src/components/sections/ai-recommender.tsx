"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { recommendGame, type GameRecommendationOutput } from "@/ai/flows/game-recommendation";
import { generateGdd, type GddGeneratorOutput } from "@/ai/flows/gdd-generator";
import { Bot, Sparkles, Loader2, Wand2, FileText } from "lucide-react";
import { about, projects } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const portfolioDescription = `${about.description} Key projects include: ${projects.map(p => p.title).join(", ")}.`;

const GameIdeaGenerator = () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Bot /> Your Game Preferences</CardTitle>
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
                  Here's an idea!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg">{recommendation.gameRecommendation}</h4>
                </div>
                <div>
                  <h4 className="font-semibold text-muted-foreground">Reasoning:</h4>
                  <p className="mt-1">{recommendation.reasoning}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

const GddGenerator = () => {
  const [gameIdea, setGameIdea] = useState("");
  const [gdd, setGdd] = useState<GddGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameIdea.trim()) {
      setError("Please provide a basic game idea.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGdd(null);

    try {
      const result = await generateGdd({
        gameIdea: gameIdea,
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

  return (
     <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText /> Basic Game Idea</CardTitle>
        <CardDescription>e.g., "A puzzle game about a time-traveling cat" or "An open-world RPG with dragons"</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid w-full gap-4">
          <Input
            placeholder="Enter your game concept..."
            value={gameIdea}
            onChange={(e) => setGameIdea(e.target.value)}
            disabled={isLoading}
          />
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
            </Card>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};


const AiRecommender = () => {
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
            Use my custom-built AI tools to brainstorm game ideas or generate a full Game Design Document based on your concepts.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Tabs defaultValue="game-idea" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="game-idea"><Wand2 className="mr-2"/>Game Idea Generator</TabsTrigger>
              <TabsTrigger value="gdd-generator"><FileText className="mr-2"/>GDD Generator</TabsTrigger>
            </TabsList>
            <TabsContent value="game-idea" className="mt-6">
              <GameIdeaGenerator />
            </TabsContent>
            <TabsContent value="gdd-generator" className="mt-6">
              <GddGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AiRecommender;
