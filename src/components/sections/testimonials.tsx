"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { testimonials } from "@/lib/data/testimonials";
import { allReviews } from "@/lib/data/all-reviews";
import { Star, MessageSquare } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TestimonialsSection = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">What My Clients Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Feedback from people I've had the pleasure to work with.
          </p>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                 <div className="p-1">
                  <Card className="h-full flex flex-col justify-between bg-background/50 border-border/50">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person" />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(Math.round(testimonial.rating))].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                         {testimonial.rating < 5 && [...Array(5 - Math.round(testimonial.rating))].map((_, i) => (
                          <Star key={`empty-${i}`} className="h-5 w-5" />
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        <div className="mt-12 text-center">
           <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline">
                  <MessageSquare className="mr-2" />
                  Show All {allReviews.length} Reviews
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl">
                  <DialogHeader>
                      <DialogTitle className="text-2xl font-headline">All Reviews</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[70vh] pr-6">
                    <div className="space-y-6">
                      {allReviews.map((review, index) => (
                        <div key={index}>
                          <blockquote className="italic text-muted-foreground">"{review.review}"</blockquote>
                          <p className="mt-2 font-semibold text-right">{review.author}</p>
                          <p className="text-sm text-muted-foreground text-right">{review.country}</p>
                          {index < allReviews.length - 1 && <Separator className="mt-6" />}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
              </DialogContent>
            </Dialog>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
