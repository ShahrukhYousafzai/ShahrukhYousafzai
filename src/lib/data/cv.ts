
import { socialLinks } from './social';
import { about } from './about';
import { Briefcase, School, Star, Download, Award } from "lucide-react";


export const cvData = {
    name: 'Shahrukh Yousafzai',
    title: 'Game & App Developer',
    contact: {
        email: about.email,
        portfolio: 'https://shahrukhyousafzai.netlify.app/',
        socials: socialLinks,
    },
    summary: "A highly motivated and experienced Game and App Developer with over 7 years of experience specializing in Unity3D and C#. Proven ability to manage the full project lifecycle, from concept to deployment, across 160+ successful freelance projects. Passionate about creating engaging, high-quality digital experiences by blending strong technical skills with a keen eye for design and user experience.",
    skills: {
      "Game Development": ["Unity", "C#", "Photon", "Firebase"],
      "App Development": ["Android", "iOS", ".NET", "XAML"],
      "Web Development": ["React", "HTML", "CSS", "JS", "TypeScript"],
      "Design Tools": ["Photoshop", "Figma"],
      "AI & Emerging Tech": ["AI Chatbots", "Blockchain/Web3"],
    },
    experience: [
        {
            date: "2017 - Present",
            title: "Freelance Developer",
            description: "Delivered over 160 projects for a diverse range of international clients on platforms like Fiverr and Upwork. Managed full project lifecycle including client communication, requirement gathering, and development using Unity, Firebase, and Photon. Achieved consistent 5-star ratings and generated over $148K in revenue."
        },
        {
            date: "2019 - 2024",
            title: "Game Developer at Efface Studios",
            description: "Founded Efface Studios and led the design, development, and launch of numerous games and applications. Responsible for system architecture, UI/UX implementation, and monetization strategies. Successfully launched titles that achieved over 500,000+ organic downloads on Google Play and media recognition."
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
    keyProjects: [
       { 
        title: 'Basant Mela',
        description: '(Unity3D, Simulation) – Achieved 500K+ organic downloads on Google Play and was featured in international media outlets like United News of Bangladesh.'
       },
       { 
        title: 'Combat Heroes',
        description: '(Unity3D, Multiplayer Shooter) – Developed a fast-paced 3D action game with a complete battle royale mode and single-player options.'
       },
       { 
        title: 'RugDollz World',
        description: '(Unity3D, Web3, MMO) – Led development on a large-scale Web3 mini-games library with PvP, racing, and NFT integration.'
       },
       { 
        title: 'Multi-Avatar AI 3D Chatbot',
        description: '(Unity3D, AI) – Created a customizable 3D chatbot with Wikipedia integration, TTS, voice recognition, and real-time translation.'
       },
    ],
    achievements: [
        {
            icon: Download,
            text: 'Attained 500K+ organic downloads on the Google Play Store for self-published games.'
        },
        {
            icon: Award,
            text: 'Games featured in tech publications like United News of Bangladesh & Editorialge.'
        },
        {
            icon: Briefcase,
            text: 'Over 7 years of freelance experience, successfully completing 160+ projects for international clients.'
        },
        {
            icon: Star,
            text: 'Earned over $148K on Fiverr/Upwork while maintaining a consistent 5-star rating.'
        }
    ]
};
