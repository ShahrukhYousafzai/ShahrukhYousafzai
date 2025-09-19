'use client';

import { about, socialLinks, skills, timeline, projects, stats } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Image from 'next/image';

const PrintablePortfolioPage = () => {
    
    const keyProjects = projects.filter(p => [
        'Combat Heroes',
        'RugDollz World',
        'MultiPlanetary Inus',
        'Solar Dominion',
        'Basant Mela',
        'Instant AI Video Maker',
        'AI Assignment Writer',
        'Flash 2.0 - AI Presentations Maker',
        'Multi-Avatar AI 3D Chatbot',
    ].includes(p.title));
    
    const testimonialsForPdf = [
        {
            name: 'AlexLee',
            title: 'Client on Upwork',
            comment: "If you're looking for an amazing talented Game developer who is is efficient yet meticulous at game development, then choose Shah. He also has outstanding blockchain skills which is invaluable…",
        },
        {
            name: 'Pascal',
            title: 'from France',
            comment: "Shah was very responsive to my messages and questions. He always completed the tasks on time and to my satisfaction. I was particularly impressed with Shah's attention to details. He always checked with me to make sure that I was happy with the work before submitting it. I really recommend this genius for your Unity projects !",
        },
        {
            name: 'Anatoliy',
            title: 'Client on Fiverr',
            comment: "Working with this seller has been an incredible experience. They have completely created my vision from paper to an actual video game. The seller is easy to communicate with when working on bugs and tweaking the game... Really you can put your trust in to this small team. Repeat client, absolutely.",
        }
    ];

    return (
        <div className="bg-background text-foreground font-body A4-sheet">
            <style jsx global>{`
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .printable-content {
                        background-color: #ffffff !important;
                        color: #000000 !important;
                    }
                    .A4-sheet {
                        margin: 0;
                        padding: 1.5rem;
                        box-shadow: none;
                        border: none;
                    }
                    .no-print {
                        display: none;
                    }
                    h1, h2, h3, h4, .font-headline {
                        font-family: 'Space Grotesk', sans-serif;
                    }
                    body, p, div, span, li {
                        font-family: 'Inter', sans-serif;
                    }
                    .section-title {
                        color: #000000 !important;
                        border-bottom-color: hsl(var(--primary)) !important;
                    }
                    .text-primary, .text-primary-dark {
                        color: hsl(var(--primary)) !important;
                    }
                    .bg-primary-light {
                        background-color: hsl(var(--primary) / 0.1) !important;
                    }
                    .text-muted-foreground {
                        color: #555555 !important;
                    }
                    .bg-secondary {
                        background-color: #f9f9f9 !important;
                    }
                    .border, .border-border, .border-primary\\/50 {
                        border-color: #dddddd !important;
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
                    border: 1px solid hsl(var(--border));
                    border-radius: 5px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
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
                    border-bottom: 2px solid hsl(var(--primary));
                }
                
                .text-primary { color: hsl(var(--primary)); }
                .text-primary-dark { color: hsl(var(--primary-foreground)); }
                .bg-primary-light { background-color: hsl(var(--primary) / 0.1); }

            `}</style>
            
            <div className="no-print fixed top-4 right-4 z-50">
                <Button onClick={() => window.print()}>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
                </Button>
            </div>
            
            <div className="printable-content">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-5xl font-bold font-headline">Shahrukh Yousafzai</h1>
                    <p className="text-2xl text-muted-foreground mt-2 font-headline">Game & App Developer</p>
                    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
                        <a href={`mailto:${about.email}`} className="hover:text-primary">{about.email}</a>
                        {socialLinks.map(link => (
                           <React.Fragment key={link.name}>
                             <span className="hidden sm:inline">|</span>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{link.name}</a>
                           </React.Fragment>
                        ))}
                    </div>
                </header>

                <Separator className="my-8 bg-border" />
                
                {/* About Section */}
                <section>
                    <h2 className="section-title">About Me</h2>
                    <p className="text-muted-foreground leading-relaxed">{about.description}</p>
                </section>

                <Separator className="my-8 bg-border" />

                {/* Stats Section */}
                <section>
                    <div className="grid grid-cols-3 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                            <p className="text-3xl font-bold font-headline text-primary">{stat.value}</p>
                            <p className="text-muted-foreground mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator className="my-8 bg-border" />
                
                {/* Skills Section */}
                <section>
                    <h2 className="section-title">Skills & Technologies</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <Badge key={skill.name} className="bg-primary-light text-primary-dark font-medium border border-primary/50 px-3 py-1">{skill.name}</Badge>
                        ))}
                    </div>
                </section>
                
                <Separator className="my-8 bg-border" />
                
                {/* Work Journey */}
                <section>
                    <h2 className="section-title">Work Journey</h2>
                    <div className="space-y-6">
                        {timeline.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-bold font-headline">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.date}</p>
                                </div>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                <Separator className="my-8 bg-border" />

                {/* Key Projects Section */}
                <section>
                    <h2 className="section-title">Key Projects</h2>
                    <div className="space-y-8">
                        {keyProjects.map(project => (
                            <div key={project.title} className="break-inside-avoid">
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border mb-4">
                                     <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold font-headline">{project.title} <span className="text-sm font-normal text-muted-foreground">- {project.category}</span></h3>
                                <p className="text-muted-foreground my-1">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator className="my-8 bg-border" />

                {/* Testimonials Section */}
                <section>
                    <h2 className="section-title">Testimonials</h2>
                    <div className="space-y-4">
                        {testimonialsForPdf.map((testimonial, index) => (
                            <div key={index} className="bg-secondary p-4 rounded-lg border border-border break-inside-avoid">
                                <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                                <p className="text-right font-semibold mt-2">- {testimonial.name}, {testimonial.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrintablePortfolioPage;
