import { about } from "@/lib/data/about";
import { timeline } from "@/lib/data/timeline";
import { Briefcase, School } from "lucide-react";
import { cn } from "@/lib/utils";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">About Me</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{about.description}</p>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold font-headline text-center mb-12">My Journey</h3>
          <div className="relative">
            {/* The vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative grid grid-cols-[auto_1fr] md:grid-cols-2 md:gap-x-12 items-start">
                   <div 
                    className={cn(
                      "flex flex-col items-center",
                      index % 2 === 0 ? "md:order-1" : "md:order-2 md:items-end"
                    )}
                  >
                    <div className="absolute left-4 md:left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>

                  <div 
                    className={cn(
                      "pl-12 md:pl-0 md:pr-0",
                       index % 2 === 0 ? "md:order-2" : "md:order-1"
                    )}
                  >
                     <div 
                      className={cn(
                        "p-6 bg-card rounded-lg border",
                        index % 2 === 0 ? "md:ml-6" : "md:mr-6 md:text-right"
                      )}
                    >
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                      <h3 className="mt-2 text-xl font-bold font-headline">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
