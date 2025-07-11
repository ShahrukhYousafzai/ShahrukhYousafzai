import { skills, languages } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">Skills & Technologies</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center gap-4 text-center">
                <div className="p-4 bg-secondary rounded-full transition-all duration-300 hover:bg-primary/10 hover:shadow-glow-primary">
                  <skill.icon className="h-10 w-10 text-primary" />
                </div>
                <p className="font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold font-headline">Languages</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {languages.map((lang, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm border-accent/50 bg-accent/10 text-accent-foreground hover:bg-accent/20 transition-colors">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
