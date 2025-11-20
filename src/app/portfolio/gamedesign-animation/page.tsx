
'use client';

import { about, socialLinks, skills, timeline, projects as allProjects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Video } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Image from 'next/image';

const PrintableGameDesignPage = () => {
    
    const gameDesignSkills = skills.filter(s => [
        'Unity', 'Game Development', 'Game Design', 'Figma', '3D Animation', 'C#', '3D', '2D', 'Cinemachine', 'VFX', 'Animation'
    ].some(skillName => s.name.includes(skillName) || (s as any).tags?.includes(skillName as any)));

    const featuredProjects = allProjects.filter(p => 
        p.category === 'Games' || p.category === 'Animations'
    );

    return (
        <div className="bg-background text-foreground font-body A4-sheet">
            <style jsx global>{`
                body {
                    background-color: hsl(var(--background)) !important;
                }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .printable-content {
                        background-color: hsl(var(--background)) !important;
                        color: hsl(var(--foreground)) !important;
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
                        color: hsl(var(--foreground)) !important;
                        border-bottom-color: hsl(var(--primary)) !important;
                    }
                    .text-primary {
                        color: hsl(var(--primary)) !important;
                    }
                    .bg-primary-light {
                        background-color: hsl(var(--primary) / 0.1) !important;
                    }
                    .text-muted-foreground {
                        color: hsl(var(--muted-foreground)) !important;
                    }
                    .bg-secondary {
                        background-color: hsl(var(--secondary)) !important;
                    }
                    .border, .border-border, .border-primary\\/50 {
                        border-color: hsl(var(--border)) !important;
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
                    break-after: avoid;
                }
                
                .text-primary { color: hsl(var(--primary)); }
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
                    <h1 className="text-5xl font-bold font-headline">Shah Rukh Khan</h1>
                    <p className="text-2xl text-muted-foreground mt-2 font-headline">Game Designer & Animator</p>
                    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
                        <a href={`mailto:${about.email}`} className="hover:text-primary">{about.email}</a>
                        <span className="hidden sm:inline">|</span>
                        <a href="https://shahrukhyousafzai.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Portfolio</a>
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
                    <h2 className="section-title">Profile</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        A passionate and creative Game Designer and Animator with over 7 years of experience in the industry. Specializing in Unity3D, I bring game concepts to life through engaging mechanics and compelling narratives. My work spans from full-scale commercial games to captivating cinematic trailers and charming nursery rhymes, showcasing a versatile skill set in both 2D and 3D pipelines.
                    </p>
                </section>

                <Separator className="my-8 bg-border" />

                {/* Skills Section */}
                <section>
                    <h2 className="section-title">Design & Animation Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {gameDesignSkills.map(skill => (
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
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="space-y-8">
                        {featuredProjects.map(project => (
                            <div key={project.title} className="break-inside-avoid">
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border mb-4">
                                     <Image
                                        src={project.image.startsWith('http') ? project.image : project.image}
                                        alt={project.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold font-headline">{project.title} <span className="text-sm font-normal text-muted-foreground">- {project.category}</span></h3>
                                <p className="text-muted-foreground my-1">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">{tag}</Badge>
                                    ))}
                                </div>
                                {project.link && (
                                     <div className="mt-3">
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline break-all">
                                            <project.linkIcon className="h-4 w-4 shrink-0" />
                                            <span>{project.link}</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrintableGameDesignPage;
