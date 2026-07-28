"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { testimonials } from "@/lib/data/testimonials";
import { allReviews } from "@/lib/data/all-reviews";
import { Star, MessageSquare, ArrowUpRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TestimonialsSection = () => {
  return (
    <section id="reviews" className="bg-surface border-y border-border/80">
      <div className="container py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-14 md:mb-20">
          <div>
            <div className="section-label mb-3">Client Reviews</div>
            <h2 className="font-headline text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              Founder
              <br />
              <span className="text-muted-foreground">track record.</span>
            </h2>
          </div>

          <div className="md:pt-3">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Real feedback from clients across 15+ countries &mdash; game
              studios, AI founders, brand teams, and indie makers I&rsquo;ve shipped
              alongside. Every review is verifiable on Upwork or Fiverr.
            </p>

            <div className="mt-8 flex items-center gap-8 border-t border-border/80 pt-6">
              <div>
                <div className="text-xs font-medium text-muted-foreground">
                  Reviews
                </div>
                <div className="mt-1 font-headline text-2xl font-medium tabular-nums">
                  {allReviews.length}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground">
                  Avg rating
                </div>
                <div className="mt-1 font-headline text-2xl font-medium tabular-nums">5.0</div>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground">
                  Countries
                </div>
                <div className="mt-1 font-headline text-2xl font-medium tabular-nums">15+</div>
              </div>
            </div>
          </div>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-px">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-px md:basis-1/2 lg:basis-1/3"
              >
                <article className="flex h-full flex-col border border-border/80 bg-background p-6 md:p-7">
                  <div className="flex items-center gap-4 border-b border-border/80 pb-4">
                    <Avatar className="h-10 w-10 rounded-full">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        data-ai-hint="person"
                      />
                      <AvatarFallback className="rounded-full bg-surface font-mono text-xs">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium leading-tight">
                        {testimonial.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>

                  </div>

                  <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground/85 md:text-base md:leading-[1.65]">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-4">
                    <div className="flex gap-0.5 text-primary">
                      {[...Array(Math.round(testimonial.rating))].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">
                      Verified
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex items-center justify-between border-t border-border/80 pt-5">
            <CarouselPrevious className="static h-9 translate-y-0 rounded-lg border border-border/80 bg-transparent hover:bg-foreground hover:text-background" />
            <div className="text-xs font-medium text-muted-foreground">
              Drag &rarr;
            </div>
            <CarouselNext className="static h-9 translate-y-0 rounded-lg border border-border/80 bg-transparent hover:bg-foreground hover:text-background" />
          </div>
        </Carousel>

        {/* Show all reviews dialog */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-border/80 pt-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-lg border border-border/80 bg-transparent px-6 text-sm font-medium hover:bg-foreground hover:text-background"
              >
                <MessageSquare className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                Show All {allReviews.length} Reviews
                <ArrowUpRight className="ml-2 h-3.5 w-3.5" strokeWidth={1.5} />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="overflow-hidden border-border bg-background p-0 sm:max-w-3xl"
              onWheel={(e) => e.stopPropagation()}
            >
              <DialogHeader className="border-b border-border/80 px-6 py-5">
                <DialogTitle className="font-headline text-xl font-medium tracking-tight">
                  All Reviews
                </DialogTitle>
                <div className="mt-1 text-xs font-medium text-muted-foreground">
                  {allReviews.length} reviews · verified on Upwork &amp; Fiverr
                </div>
              </DialogHeader>
              <div className="overflow-y-auto overscroll-contain px-6 pb-6 pt-5 space-y-0 max-h-[65vh]">
                {allReviews.map((review, index) => (
                  <article
                    key={index}
                    className="border-b border-border/80 py-5 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 rounded-full">
                          <AvatarImage
                            src={`https://placehold.co/40x40.png?text=${review.author.charAt(0)}`}
                            alt={review.author}
                            data-ai-hint="person alphabet"
                          />
                          <AvatarFallback className="rounded-full bg-surface font-mono text-xs">
                            {review.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-tight">
                            {review.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {review.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-0.5 text-primary">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>

                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                      &ldquo;{review.review}&rdquo;
                    </p>
                  </article>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-xs font-medium text-muted-foreground">
            Verified on Upwork &amp; Fiverr — profiles linked in footer
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
