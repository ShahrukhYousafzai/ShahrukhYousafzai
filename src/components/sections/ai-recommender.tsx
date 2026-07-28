"use client";

import { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { recommendGame, type GameRecommendationOutput } from "@/ai/flows/game-recommendation";
import { generateGdd, type GddGeneratorOutput } from "@/ai/flows/gdd-generator";
import { generateQuote, type QuoteGeneratorOutput } from "@/ai/flows/quote-generator";
import { splitIntoMilestones, type MilestoneSplitterOutput } from "@/ai/flows/milestone-splitter";
import {
  Bot,
  Loader2,
  Wand2,
  FileText,
  DollarSign,
  ArrowRight,
  Download,
  Milestone,
  Globe,
  Monitor,
  Smartphone,
  Apple,
} from "lucide-react";
import { about, projects } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateDocx } from "@/app/actions";
import React from "react";

const portfolioDescription = `${about.description} Key projects include: ${projects.map((p) => p.title).join(", ")}.`;

type AiToolTab = "game-idea" | "gdd-generator" | "quote-generator";

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
  onSubmit: () => void;
  onGenerateGdd: () => void;
  preferences: string;
  setPreferences: (value: string) => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-5">          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">01 / Game Idea</div>
            <div className="mt-1 font-headline text-lg font-medium tracking-tight">
              Your Game Preferences
            </div>
          </div>
          <Wand2 className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
        </div>
        <Textarea
          placeholder='e.g. "a cozy farming sim with magic" or "a fast-paced multiplayer shooter"'
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          rows={6}
          disabled={isLoading}
          className="border-border bg-background"
        />
        {error && <p className="font-mono text-xs text-destructive">{error}</p>}
        <Button
          type="submit"
          disabled={isLoading || !preferences.trim()}
          className="h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={1.5} />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" strokeWidth={1.5} />
              Generate Game Idea
            </>
          )}
        </Button>
      </form>

      {/* Output */}
      <div className="border-l border-border/80 pl-8 md:pl-10">
        {!recommendation ? (
          <div className="flex h-full items-center justify-center text-xs font-medium text-muted-foreground">
            <div className="text-center">
              <div className="mb-3 opacity-60">— output appears here —</div>
              <div>Run the model to see results.</div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-up">
            <div className="flex items-baseline justify-between border-b border-border/80 pb-3">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Output</div>
              <div className="text-xs font-medium text-primary">
                Live
              </div>
            </div>
            <h3 className="mt-5 font-headline text-2xl font-medium leading-tight tracking-tight">
              {recommendation.gameTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {recommendation.description}
            </p>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">Key Features</div>
              <ul className="space-y-2">
                {recommendation.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 text-xs text-muted-foreground tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border/80 pt-5">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Reasoning</div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {recommendation.reasoning}
              </p>
            </div>

            <Button
              onClick={onGenerateGdd}
              className="mt-6 h-11 rounded-lg border border-border/80 bg-transparent px-5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background"
            >
              Generate GDD for this Idea
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const GddGenerator = React.forwardRef<
  HTMLDivElement,
  {
    gdd: GddGeneratorOutput | null;
    isLoading: boolean;
    error: string | null;
    isDownloading: boolean;
    onSubmit: () => void;
    onDownload: () => void;
    onGenerateQuote: () => void;
    gameIdea: string;
    setGameIdea: (value: string) => void;
    platforms: string[];
    onPlatformChange: (platform: string, checked: boolean) => void;
  }
>(
  (
    {
      gdd,
      isLoading,
      error,
      isDownloading,
      onSubmit,
      onDownload,
      onGenerateQuote,
      gameIdea,
      setGameIdea,
      platforms: selectedPlatforms,
      onPlatformChange,
    },
    ref
  ) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit();
    };

    const platformOptions = [
      { id: "web", name: "Web", icon: Globe },
      { id: "windows", name: "Windows", icon: Monitor },
      { id: "mac", name: "Mac", icon: Apple },
      { id: "linux", name: "Linux", icon: Monitor },
      { id: "android", name: "Android", icon: Smartphone },
      { id: "ios", name: "iOS", icon: Smartphone },
    ];

    return (
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">02 / Game Design Document</div>
              <div className="mt-1 font-headline text-lg font-medium tracking-tight">
                GDD Generator
              </div>
            </div>
            <FileText className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
          </div>

          <Textarea
            placeholder="Enter your game idea..."
            value={gameIdea}
            onChange={(e) => setGameIdea(e.target.value)}
            disabled={isLoading || isDownloading}
            rows={5}
            className="border-border bg-background"
          />

          <div>
            <Label className="text-sm font-medium text-foreground">
              Target Platforms
            </Label>
            <div className="mt-3 grid grid-cols-2 gap-px border border-border/80 bg-border/80 sm:grid-cols-3">
              {platformOptions.map((p) => (
                <Label
                  key={p.id}
                  htmlFor={p.id}
                  className="flex cursor-pointer items-center gap-2 bg-background p-3 transition-colors hover:bg-surface has-[button[data-state=checked]]:bg-foreground has-[button[data-state=checked]]:text-background"
                >
                  <Checkbox
                    id={p.id}
                    checked={selectedPlatforms.includes(p.name)}
                    onCheckedChange={(checked) => onPlatformChange(p.name, !!checked)}
                    disabled={isLoading || isDownloading}
                    className="border-current"
                  />
                  <p.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span className="text-xs font-medium">
                    {p.name}
                  </span>
                </Label>
              ))}
            </div>
          </div>

          {error && <p className="font-mono text-xs text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={
              isLoading || isDownloading || selectedPlatforms.length === 0 || !gameIdea
            }
            className="h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                Generating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                Generate GDD
              </>
            )}
          </Button>
        </form>

        <div className="border-l border-border/80 pl-8 md:pl-10">
          {!gdd ? (
            <div className="flex h-full items-center justify-center text-xs font-medium text-muted-foreground">
              <div className="text-center">
                <div className="mb-3 opacity-60">— output appears here —</div>
                <div>Run the model to see the GDD.</div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-up" ref={ref}>                <div className="flex items-baseline justify-between border-b border-border/80 pb-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Output</div>
                  <div className="text-xs font-medium text-primary">
                    Live
                  </div>
                </div>
              <h3 className="mt-5 font-headline text-2xl font-medium leading-tight tracking-tight">
                {gdd.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {gdd.overview}
              </p>

              <Accordion
                type="single"
                collapsible
                className="mt-6 w-full"
                defaultValue="item-1"
              >
                <AccordionItem
                  value="item-1"
                  className="border-b border-border/80"
                >
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Gameplay
                  </AccordionTrigger>
                  <AccordionContent className="space-y-5 pt-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Core Mechanics</div>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                        {gdd.gameplay.coreMechanics}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Game Loop</div>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                        {gdd.gameplay.gameLoop}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Player Controls</div>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                        {gdd.gameplay.playerControls}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-border/80">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Target Audience
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                      {gdd.targetAudience}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Art Style &amp; Monetization
                  </AccordionTrigger>
                  <AccordionContent className="space-y-5 pt-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Art Style</div>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                        {gdd.artStyle}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Monetization Strategy</div>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                        {gdd.monetization}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-8 flex flex-col gap-3 border-t border-border/80 pt-5 sm:flex-row">
                <Button
                  onClick={onDownload}
                  disabled={isDownloading}
                  className="h-11 flex-1 rounded-none border border-border/80 bg-transparent font-mono text-[11px] uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background"
                >
                  {isDownloading ? (
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  ) : (
                    <Download className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                  )}
                  Download DOCX
                </Button>
                <Button
                  onClick={onGenerateQuote}
                  className="h-11 flex-1 rounded-none bg-foreground font-mono text-[11px] uppercase tracking-[0.18em] text-background hover:bg-primary hover:text-primary-foreground"
                >
                  Generate Quote
                  <ArrowRight className="ml-2 h-3.5 w-3.5" strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
GddGenerator.displayName = "GddGenerator";

const QuoteGenerator = React.forwardRef<
  any,
  {
    estimation: QuoteGeneratorOutput | null;
    milestones: MilestoneSplitterOutput | null;
    isLoading: boolean;
    isSplitting: boolean;
    isDownloading: boolean;
    error: string | null;
    onSubmit: () => void;
    onSplit: () => void;
    onDownloadQuote: () => void;
    onDownloadMilestones: () => void;
    gameIdea: string;
    setGameIdea: (value: string) => void;
  }
>(
  (
    {
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
    },
    ref
  ) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit();
    };

    const quoteContentRef = useRef<HTMLDivElement>(null);
    const milestonesContentRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      get quoteNode() {
        return quoteContentRef.current;
      },
      get milestonesNode() {
        return milestonesContentRef.current;
      },
    }));

    return (
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">03 / Quote</div>
              <div className="mt-1 font-headline text-lg font-medium tracking-tight">
                Get a Quote
              </div>
            </div>
            <DollarSign className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
          </div>

          <Textarea
            placeholder="Describe your game concept, features, platform (PC/mobile), style (2D/3D), or paste a GDD..."
            value={gameIdea}
            onChange={(e) => setGameIdea(e.target.value)}
            rows={6}
            disabled={isLoading || isSplitting || isDownloading}
            className="border-border bg-background"
          />

          {error && <p className="font-mono text-xs text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading || isSplitting || isDownloading || !gameIdea}
            className="h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                Generating...
              </>
            ) : (
              <>
                <DollarSign className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                Generate Quote
              </>
            )}
          </Button>
        </form>

        <div className="border-l border-border/80 pl-8 md:pl-10">
          {!estimation ? (
            <div className="flex h-full items-center justify-center text-xs font-medium text-muted-foreground">
              <div className="text-center">
                <div className="mb-3 opacity-60">— output appears here —</div>
                <div>Run the model to see the quote.</div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-up space-y-6">
              <div ref={quoteContentRef}>
                <div className="flex items-baseline justify-between border-b border-border/80 pb-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Output · Quote</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    Live
                  </div>
                </div>
                <h3 className="mt-5 font-headline text-2xl font-medium leading-tight tracking-tight">
                  {estimation.quoteTitle}
                </h3>

                <Table className="mt-6">
                  <TableHeader>
                    <TableRow className="border-b border-border/80 hover:bg-transparent">
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        Module
                      </TableHead>
                      <TableHead className="text-right text-xs font-semibold text-muted-foreground">
                        Cost
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estimation.items.map((item, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-border/80 hover:bg-transparent"
                      >
                        <TableCell>
                          <p className="font-medium">{item.name}</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
                            {item.description}
                          </p>
                        </TableCell>
                        <TableCell className="text-right font-mono tabular-nums">
                          ${item.cost.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2 border-foreground hover:bg-transparent">
                      <TableCell className="text-sm font-semibold">
                        Total Estimated Cost
                      </TableCell>
                      <TableCell className="text-right font-headline text-xl tabular-nums">
                        ${estimation.totalCost.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <p className="mt-5 rounded-lg border border-border/80 bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
                  {estimation.disclaimer}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-border/80 pt-5 sm:flex-row">
                <Button
                  onClick={onDownloadQuote}
                  disabled={isDownloading || isSplitting}
                  className="h-11 flex-1 rounded-none border border-border/80 bg-transparent font-mono text-[11px] uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background"
                >
                  {isDownloading ? (
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  ) : (
                    <Download className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                  )}
                  Download DOCX
                </Button>
                <Button
                  onClick={onSplit}
                  disabled={isSplitting || isDownloading}
                  className="h-11 flex-1 rounded-none bg-foreground font-mono text-[11px] uppercase tracking-[0.18em] text-background hover:bg-primary hover:text-primary-foreground"
                >
                  {isSplitting ? (
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  ) : (
                    <Milestone className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                  )}
                  Split into Milestones
                </Button>
              </div>

              {milestones && (
                <div ref={milestonesContentRef} className="border-t border-border/80 pt-6">
                  <div className="flex items-baseline justify-between border-b border-border/80 pb-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Output · Milestones</div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                      Live
                    </div>
                  </div>
                  <h3 className="mt-5 font-headline text-xl font-medium tracking-tight">
                    Project Milestones
                  </h3>

                  <div className="mt-5 divide-y divide-border/80 border-b border-border/80">
                    {milestones.milestones.map((milestone, index) => (
                      <div key={index} className="py-5">
                        <div className="flex items-baseline justify-between">
                          <div className="flex items-baseline gap-3">
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="font-medium">{milestone.name}</span>
                          </div>
                          <span className="font-mono tabular-nums text-foreground">
                            ${milestone.cost.toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {milestone.description}
                        </p>
                        <ul className="mt-3 space-y-2 border-l border-border/80 pl-4">
                          {milestone.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm leading-relaxed">
                              <span className="font-medium">{item.name}</span>
                              <span className="ml-2 font-mono text-xs tabular-nums text-muted-foreground">
                                ${item.cost.toLocaleString()}
                              </span>
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                {item.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={onDownloadMilestones}
                    disabled={isDownloading}
                    className="mt-6 h-11 w-full rounded-none border border-border/80 bg-transparent font-mono text-[11px] uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background"
                  >
                    {isDownloading ? (
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                    ) : (
                      <Download className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                    )}
                    Download Milestones DOCX
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
QuoteGenerator.displayName = "QuoteGenerator";

const AiRecommender = () => {
  const [activeTab, setActiveTab] = useState<AiToolTab>("game-idea");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);

  const [recommendation, setRecommendation] = useState<GameRecommendationOutput | null>(null);
  const [gdd, setGdd] = useState<GddGeneratorOutput | null>(null);
  const [estimation, setEstimation] = useState<QuoteGeneratorOutput | null>(null);
  const [milestones, setMilestones] = useState<MilestoneSplitterOutput | null>(null);

  const [gameIdeaPreferences, setGameIdeaPreferences] = useState("");
  const [gddGeneratorIdea, setGddGeneratorIdea] = useState("");
  const [gddPlatforms, setGddPlatforms] = useState<string[]>([]);
  const [quoteGeneratorIdea, setQuoteGeneratorIdea] = useState("");

  const gddContentRef = useRef<HTMLDivElement>(null);
  const quoteGeneratorRef = useRef<any>(null);

  const handleGenerateIdea = async () => {
    if (!gameIdeaPreferences.trim()) {
      setError("Please describe what kind of game you'd like.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await recommendGame({
        userPreferences: gameIdeaPreferences,
        portfolioDescription,
      });
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

  const handleGddPlatformChange = (platform: string, checked: boolean) => {
    setGddPlatforms((prev) =>
      checked ? [...prev, platform] : prev.filter((p) => p !== platform)
    );
  };

  const handleGenerateGdd = async () => {
    if (!gddGeneratorIdea.trim() || gddPlatforms.length === 0) {
      setError("Please provide a game idea and select at least one platform.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGdd(null);
    try {
      const result = await generateGdd({
        gameIdea: gddGeneratorIdea,
        platform: gddPlatforms.join(", "),
        portfolioDescription,
      });
      setGdd(result);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGddToQuote = () => {
    if (gdd) {
      const ideaFromGdd = `Title: ${gdd.title}\nOverview: ${gdd.overview}\nPlatform: ${gdd.gameplay.playerControls}\nCore Mechanics: ${gdd.gameplay.coreMechanics}\nGame Loop: ${gdd.gameplay.gameLoop}\nPlayer Controls: ${gdd.gameplay.playerControls}\nTarget Audience: ${gdd.targetAudience}\nArt Style: ${gdd.artStyle}\nMonetization: ${gdd.monetization}`;
      setQuoteGeneratorIdea(ideaFromGdd);
      setActiveTab("quote-generator");
    }
  };

  const handleGenerateQuote = async () => {
    if (!quoteGeneratorIdea.trim()) {
      setError("Please describe your game idea.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setEstimation(null);
    setMilestones(null);
    try {
      const result = await generateQuote({ gameIdea: quoteGeneratorIdea });
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

  const handleDownload = async (type: "gdd" | "quote" | "milestones") => {
    let contentEl;
    let title;

    switch (type) {
      case "gdd":
        contentEl = gddContentRef.current;
        title = gdd?.title || "GDD";
        break;
      case "quote":
        contentEl = quoteGeneratorRef.current?.quoteNode;
        title = estimation?.quoteTitle || "Quote";
        break;
      case "milestones":
        contentEl = quoteGeneratorRef.current?.milestonesNode;
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
      const blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(blob, `${title.replace(/ /g, "_")}.docx`);
    } catch (err) {
      setError("Failed to download the document. Please try again.");
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="ai-recommender" className="bg-background">
      <div className="container py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-12">
          <div>
            <div className="section-label mb-3">AI Tools</div>
            <h2 className="font-headline text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              Try our
              <br />
              <span className="text-muted-foreground">AI tools.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:pt-3 md:text-lg">
            Built and run out of our AI studio. Use these to brainstorm a game
            idea, generate a full Game Design Document, or get a scoped quote
            you can hand to a delivery team. The output is yours.
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as AiToolTab)}
          className="w-full"
        >
          <div className="flex items-end justify-between border-b border-border/80 pb-3">
            <TabsList className="border-0 bg-transparent p-0 gap-0">
              {[
                { value: "game-idea", label: "Idea Generator" },
                { value: "gdd-generator", label: "GDD Generator" },
                { value: "quote-generator", label: "Quote Generator" },
              ].map((t, idx) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="rounded-lg border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:border-primary/30 data-[state=active]:bg-primary/5 data-[state=active]:text-primary hover:text-foreground"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Bot className="h-3.5 w-3.5" strokeWidth={1.5} />
              InfiniteCode
            </div>
          </div>

          <TabsContent value="game-idea" className="mt-10">
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

          <TabsContent value="gdd-generator" className="mt-10">
            <GddGenerator
              ref={gddContentRef}
              gdd={gdd}
              isLoading={isLoading}
              isDownloading={isDownloading}
              error={error}
              onSubmit={handleGenerateGdd}
              onDownload={() => handleDownload("gdd")}
              onGenerateQuote={handleGddToQuote}
              gameIdea={gddGeneratorIdea}
              setGameIdea={setGddGeneratorIdea}
              platforms={gddPlatforms}
              onPlatformChange={handleGddPlatformChange}
            />
          </TabsContent>

          <TabsContent value="quote-generator" className="mt-10">
            <QuoteGenerator
              ref={quoteGeneratorRef}
              estimation={estimation}
              milestones={milestones}
              isLoading={isLoading}
              isSplitting={isSplitting}
              isDownloading={isDownloading}
              error={error}
              onSubmit={handleGenerateQuote}
              onSplit={handleSplitMilestones}
              onDownloadQuote={() => handleDownload("quote")}
              onDownloadMilestones={() => handleDownload("milestones")}
              gameIdea={quoteGeneratorIdea}
              setGameIdea={setQuoteGeneratorIdea}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AiRecommender;
