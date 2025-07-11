import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { services } from "@/lib/data";

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">What I Do</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            I specialize in turning ideas into engaging digital experiences. Here are the services I offer.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group relative overflow-hidden text-center bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto w-fit rounded-full bg-primary/10 p-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/40">
                   <service.icon className="h-8 w-8 text-primary transition-all duration-300 group-hover:text-primary-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-bold font-headline">{service.title}</h3>
              </CardContent>
               <div className="absolute -bottom-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:h-32 group-hover:w-32 group-hover:bg-primary/20" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
