
import { socialLinks } from './social';
import { about } from './about';
import { skills } from './skills';
import { projects } from './data';

export const cvData = {
    name: 'Shahrukh Yousafzai',
    title: 'Game & App Developer',
    contact: {
        email: about.email,
        portfolio: 'https://shahrukhyousafzai.netlify.app/',
        socials: socialLinks,
    },
    summary: "A highly motivated and experienced Game and App Developer with over 7 years of experience specializing in Unity3D and C#. Proven ability to manage the full project lifecycle, from concept to deployment, across 160+ successful freelance projects. Passionate about creating engaging, high-quality digital experiences by blending strong technical skills with a keen eye for design and user experience.",
    skills: skills.map(s => s.name),
    experience: [
        {
            date: "2017 - Present",
            title: "Freelance Developer",
            description: "Delivered over 160 projects for a diverse range of international clients. Managed full project lifecycle including client communication, requirement gathering, development, testing, and deployment. Specialized in creating cross-platform games, multiplayer systems, and Web3 integrations."
        },
        {
            date: "2019 - 2024",
            title: "Game Developer at Efface Studios",
            description: "Led the design and development of numerous games and applications. Responsible for core game mechanics, system architecture, UI/UX implementation, and integration of third-party services like Photon and Firebase. Successfully launched titles that achieved over 500,000+ downloads on Google Play."
        },
    ],
    education: [
        {
            date: "2021 - 2025",
            degree: "BS Digital Marketing",
            institution: "Islamia University of Bahawalpur"
        },
        {
            date: "2019 - 2021",
            degree: "ICS (Intermediate in Computer Science)",
            institution: "Superior Group of Colleges, Bahawalpur"
        },
        {
            date: "2017 - 2019",
            degree: "Matriculation (Computer Science)",
            institution: "Allied School, Usmania Campus (Private)"
        }
    ],
    keyProjects: projects.filter(p => [
        'Combat Heroes',
        'RugDollz World',
        'Solar Dominion',
        'Basant Mela',
        'Instant AI Video Maker',
        'Multi-Avatar AI 3D Chatbot',
    ])
};
