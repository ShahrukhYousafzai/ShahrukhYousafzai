
'use client';

import React from 'react';
import { cvData } from '@/lib/data/cv';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Mail, Link as LinkIcon, Linkedin, Twitter as TwitterIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { IconFiverr, IconUpwork } from '@/components/icons';

const iconMap: { [key: string]: React.ElementType } = {
    Fiverr: IconFiverr,
    Upwork: IconUpwork,
    Twitter: TwitterIcon,
    LinkedIn: Linkedin,
};


const PrintableCvPage = () => {
    return (
        <div className="bg-white text-gray-800 font-sans">
            <style jsx global>{`
                body {
                  background-color: #fff !important;
                }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .A4-sheet {
                        margin: 0;
                        padding: 0;
                        box-shadow: none;
                        border: none;
                    }
                    .no-print {
                        display: none;
                    }
                    .printable-content {
                        color: #1f2937 !important;
                    }
                    .section-title {
                        color: #1f2937 !important;
                        border-bottom-color: #fb923c !important; /* Orange-400 */
                    }
                    .text-primary-cv {
                        color: #fb923c !important; /* Orange-400 */
                    }
                    .bg-primary-light-cv {
                        background-color: #fff7ed !important; /* Orange-50 */
                    }
                    .text-muted-cv {
                        color: #4b5563 !important; /* Gray-600 */
                    }
                    .border-cv {
                        border-color: #e5e7eb !important; /* Gray-200 */
                    }
                }
                @page {
                    size: A4;
                    margin: 0;
                }
                .A4-sheet {
                    width: 210mm;
                    min-height: 297mm;
                    padding: 1.5cm;
                    margin: 1cm auto;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    background: white;
                }
                .section-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #fb923c; /* Orange-400 */
                    font-family: 'Space Grotesk', sans-serif;
                }
                .text-primary-cv { color: #fb923c; }
                .bg-primary-light-cv { background-color: #fff7ed; }
                .text-muted-cv { color: #4b5563; }
                .border-cv { border-color: #e5e7eb; }

                h1, h2, h3, h4, h5, h6 {
                    font-family: 'Space Grotesk', sans-serif;
                }
                body, p, div, span, li, a {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>

            <div className="no-print fixed top-4 right-4 z-50">
                <Button onClick={() => window.print()}>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
                </Button>
            </div>

            <div className="A4-sheet printable-content">
                <header className="text-center mb-6">
                    <h1 className="text-4xl font-bold">{cvData.name}</h1>
                    <p className="text-xl text-primary-cv mt-1">{cvData.title}</p>
                    <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-muted-cv">
                        <a href={`mailto:${cvData.contact.email}`} className="flex items-center gap-1 hover:text-primary-cv">
                            <Mail className="h-4 w-4" /> {cvData.contact.email}
                        </a>
                        <a href={cvData.contact.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary-cv">
                            <LinkIcon className="h-4 w-4" /> Portfolio
                        </a>
                        {cvData.contact.socials.map(link => {
                           const Icon = iconMap[link.name];
                           return Icon ? (
                             <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary-cv">
                                <Icon className="h-4 w-4" /> {link.name}
                             </a>
                           ) : null;
                        })}
                    </div>
                </header>

                <main>
                    <section>
                        <h2 className="section-title">Professional Summary</h2>
                        <p className="text-muted-cv leading-relaxed text-sm">{cvData.summary}</p>
                    </section>
                    
                    <Separator className="my-6 border-cv" />

                    <section>
                        <h2 className="section-title">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {cvData.skills.map(skill => (
                                <Badge key={skill} className="bg-primary-light-cv text-orange-800 font-medium border border-orange-200 px-3 py-1 text-xs">{skill}</Badge>
                            ))}
                        </div>
                    </section>

                    <Separator className="my-6 border-cv" />

                    <section>
                        <h2 className="section-title">Work Experience</h2>
                        <div className="space-y-4">
                            {cvData.experience.map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-md font-bold">{item.title}</h3>
                                        <p className="text-xs text-muted-cv">{item.date}</p>
                                    </div>
                                    <p className="text-muted-cv text-sm mt-1">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <Separator className="my-6 border-cv" />

                    <section>
                        <h2 className="section-title">Education</h2>
                        <div className="space-y-3">
                            {cvData.education.map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-md font-bold">{item.degree}</h3>
                                        <p className="text-xs text-muted-cv">{item.date}</p>
                                    </div>
                                    <p className="text-muted-cv text-sm">{item.institution}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    <Separator className="my-6 border-cv" />

                    <section>
                        <h2 className="section-title">Key Projects</h2>
                        <div className="space-y-2 text-sm">
                            {cvData.keyProjects.map(project => (
                                <div key={project.title} className="flex justify-between">
                                    <p className="font-semibold">{project.title} <span className="font-normal text-muted-cv">- {project.category}</span></p>
                                    <p className="text-muted-cv text-right shrink-0 pl-4">{project.tags.slice(0, 3).join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default PrintableCvPage;
