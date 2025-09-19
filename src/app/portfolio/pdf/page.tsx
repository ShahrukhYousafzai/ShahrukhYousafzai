
import { about, socialLinks, skills, timeline, projects, testimonials, stats } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const PrintablePortfolioPage = () => {
    
    const keyProjects = projects.filter(p => [
        'Combat Heroes',
        'RugDollz World',
        'MultiPlanetary Inus',
        'Solar Dominion',
        'Basant Mela',
        'Spark - AI Shorts Maker',
        'AI Assignment Writer',
        'Flash 2.0 - AI Presentations Maker',
        'Multi-Avatar AI 3D Chatbot',
    ].includes(p.title));

    return (
        <div className="bg-white text-black font-body A4-sheet">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap');
                
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .no-print {
                        display: none;
                    }
                    .A4-sheet {
                        margin: 0;
                        padding: 1.5rem;
                        box-shadow: none;
                        border: none;
                    }
                    h1, h2, h3, h4, .font-headline {
                        font-family: 'Space Grotesk', sans-serif;
                    }
                    body, p, div, span, li {
                        font-family: 'Inter', sans-serif;
                    }
                }

                @page {
                    size: A4;
                    margin: 0;
                }

                .A4-sheet {
                    width: 210mm;
                    min-height: 297mm;
                    padding: 2cm;
                    margin: 1cm auto;
                    border: 1px #D3D3D3 solid;
                    border-radius: 5px;
                    background: white;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    font-family: 'Inter', sans-serif;
                }
                
                h1, h2, h3, h4, .font-headline {
                    font-family: 'Space Grotesk', sans-serif;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #F59E0B; /* Orange accent */
                }
                
                .text-primary { color: #F59E0B; }
                .bg-primary-light { background-color: #FEF3C7; }
                .border-primary { border-color: #F59E0B; }

            `}</style>
            
            <div className="no-print fixed top-4 right-4">
                <Button onClick={() => window.print()}>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
                </Button>
            </div>

            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-5xl font-bold font-headline">Shahrukh Yousafzai</h1>
                <p className="text-2xl text-gray-600 mt-2 font-headline">Game & App Developer</p>
                <div className="flex justify-center gap-6 mt-4 text-sm text-gray-700">
                    <a href={`mailto:${about.email}`} className="hover:text-primary">{about.email}</a>
                    <span>|</span>
                    {socialLinks.map(link => (
                         <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{link.name}</a>
                    ))}
                </div>
            </header>

            <Separator className="my-8 bg-gray-200" />
            
            {/* About Section */}
            <section>
                <h2 className="section-title">About Me</h2>
                <p className="text-gray-700 leading-relaxed">{about.description}</p>
            </section>

             <Separator className="my-8 bg-gray-200" />

             {/* Stats Section */}
            <section>
                 <div className="grid grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index}>
                        <p className="text-3xl font-bold font-headline text-primary">{stat.value}</p>
                        <p className="text-gray-600 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Separator className="my-8 bg-gray-200" />
            
            {/* Skills Section */}
            <section>
                <h2 className="section-title">Skills & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <Badge key={skill.name} className="bg-primary-light text-primary-dark font-medium border border-primary/50 px-3 py-1">{skill.name}</Badge>
                    ))}
                </div>
            </section>
            
            <Separator className="my-8 bg-gray-200" />
            
            {/* Work Journey */}
            <section>
                <h2 className="section-title">Work Journey</h2>
                <div className="space-y-6">
                    {timeline.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-bold font-headline">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.date}</p>
                            </div>
                            <p className="text-gray-700">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <Separator className="my-8 bg-gray-200" />

            {/* Key Projects Section */}
            <section>
                <h2 className="section-title">Key Projects</h2>
                <div className="space-y-6">
                    {keyProjects.map(project => (
                        <div key={project.title} className="break-inside-avoid">
                            <h3 className="text-lg font-bold font-headline">{project.title} <span className="text-sm font-normal text-gray-500">- {project.category}</span></h3>
                            <p className="text-gray-700 my-1">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Separator className="my-8 bg-gray-200" />

            {/* Testimonials Section */}
            <section>
                <h2 className="section-title">Testimonials</h2>
                <div className="space-y-4">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 break-inside-avoid">
                            <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                            <p className="text-right font-semibold mt-2">- {testimonial.name}, {testimonial.title}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PrintablePortfolioPage;
