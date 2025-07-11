import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "@/lib/data";

const StatsSection = () => {
  return (
    <section id="stats" className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-background/50 border-border/50 text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit">
                  <stat.icon className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold font-headline">{stat.value}</p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
