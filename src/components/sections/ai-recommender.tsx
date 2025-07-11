"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { recommendGame } from "@/ai/flows/game-recommendation";
import { Bot, Sparkles, Loader2, Wand2 } from "lucide-react";
import { about, projects } from "@/lib/data";

const AiRecommender = () => {
  const [preferences, setPreferences] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const portfolioDescription = `${about.description} Key projects include: ${projects.map(p => p.title).join(", ")}.`;

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
    <section id="ai-recommender" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-dot-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      <div className="container">
        <div className="text-center">
           <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Feature
          </div>
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">Get a Custom Game Idea</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Not sure what you want? Describe your dream game and my AI assistant will brainstorm an idea tailored to my skills.
          </p>
        </div>
        <div className="mt-12 max-w-2xl mx-auto">
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
          </Card>

          {recommendation && (
            <div className="mt-8 animate-in fade-in duration-500">
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
          )}
        </div>
      </div>
    </section>
  );
};

export default AiRecommender;
