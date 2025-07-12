import { about } from "@/lib/data/about";
import { timeline } from "@/lib/data/timeline";
import { Briefcase, School } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">About Me</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{about.description}</p>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold font-headline text-center mb-8">My Journey</h3>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="hidden md:flex w-1/2 pr-8 justify-end">
                    {index % 2 === 0 && (
                      <div className="p-8 bg-card rounded-lg border w-full max-w-md">
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                        <h3 className="mt-2 text-xl font-bold font-headline">{item.title}</h3>
                        <p className="mt-2 text-muted-foreground">{item.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="hidden md:flex w-1/2 pl-8 justify-start">
                     {index % 2 !== 0 && (
                      <div className="p-8 bg-card rounded-lg border w-full max-w-md">
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                        <h3 className="mt-2 text-xl font-bold font-headline">{item.title}</h3>
                        <p className="mt-2 text-muted-foreground">{item.description}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile view */}
                  <div className="md:hidden w-full pl-12">
                    <div className="p-6 bg-card rounded-lg border w-full">
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                      <h3 className="mt-2 text-lg font-bold font-headline">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background border-4 border-primary flex items-center justify-center md:top-8 md:-translate-y-4">
                    <item.icon className="h-4 w-4 text-primary" />
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
