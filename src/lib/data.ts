import {
  Code,
  Gamepad2,
  Brush,
  Search,
  Check,
  Users,
  Briefcase,
  School,
  Download,
  Play,
  Video,
  Link as LinkIcon,
  Github,
  Linkedin,
} from "lucide-react";
import { IconFiverr, IconUpwork, IconUnity, IconVisualStudio, IconFigma, IconPhotoshop, IconAdobeXD } from "@/components/icons";

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export const socialLinks = [
    { name: 'Fiverr', url: 'https://www.fiverr.com/users/shahrukhkhan9/', icon: IconFiverr },
    { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~01d270e621d61cf22f', icon: IconUpwork },
    { name: 'GitHub', url: 'https://github.com', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
];

export const about = {
    description: "A talented and experienced game developer with a passion for creating innovative and engaging games & apps. With a portfolio of many successful projects, Shahrukh Yousafzai has a proven track record of delivering high-quality and user-friendly solutions. With a strong background in app & game development, I have the expertise to bring your ideas to life.",
    email: "shahrukhyousafzaipk@gmail.com",
};

export const stats = [
    { value: "100+", label: "Projects Completed", icon: Check },
    { value: "100+", label: "Happy Clients", icon: Users },
    { value: "5+", label: "Years of Experience", icon: Briefcase },
];

export const timeline = [
    { date: "2018", title: "Started Learning Development", description: "Began my journey into the world of programming, focusing on C# and game development fundamentals.", icon: School },
    { date: "2019", title: "First Freelance Project", description: "Landed my first client project, developing a small mobile game and kickstarting my freelance career.", icon: Briefcase },
    { date: "2021", title: "Launched 'Basant Mela'", description: "Released 'Basant Mela', which became a trending game on the Play Store with over 500k downloads.", icon: Gamepad2 },
    { date: "2023 - Present", title: "AAA & AI Projects", description: "Started working on large-scale AAA game projects and developing applications with integrated AI features.", icon: Code },
];

export const services = [
  { title: "App Development", icon: Code },
  { title: "Game Development", icon: Gamepad2 },
  { title: "Web Development / SEO", icon: Search },
  { title: "Graphic Designing", icon: Brush },
];

export const skills = [
  { name: "Unity3D", icon: IconUnity },
  { name: "Visual Studio", icon: IconVisualStudio },
  { name: "Figma", icon: IconFigma },
  { name: "Photoshop", icon: IconPhotoshop },
  { name: "Adobe XD", icon: IconAdobeXD },
  { name: "Photon", icon: Gamepad2 },
];

export const languages = ["C#", "JavaScript", "Python", "HTML", "CSS", "XAML", "JSON"];

export const projects = [
  {
    title: 'Crazy Punch',
    description: 'A hyper-casual brawler with wild ragdoll physics on floating islands. Knock opponents off to be the last one standing!',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'brawler game',
    tags: ['Unity3D', 'C#', 'Hyper-casual'],
    link: 'https://drive.google.com/file/d/1Ww0gwXKG3slvU7sB3i2Gkdj87PdDxvER/view?usp=sharing',
    linkText: 'Download Now',
    linkIcon: Download,
    category: 'Games',
  },
  {
    title: 'Fall of Cars: Multiplayer',
    description: 'Maneuver your car to the correct color block before time runs out. Features real-time multiplayer battles.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'car game',
    tags: ['Unity3D', 'Multiplayer', 'Photon'],
    link: 'https://www.dropbox.com/scl/fi/qi35thnupym0fhwir6sry/Fallofcars.apk?rlkey=upylas6l84xmoum8gkrbi74dy&dl=0',
    linkText: 'Download Now',
    linkIcon: Download,
    category: 'Games',
  },
  {
    title: 'Casino Clash - Multiplayer',
    description: 'A competitive multiplayer & offline card game where players aim to win by using cards of different colors and values.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'casino game',
    tags: ['Unity3D', 'Card Game', 'Multiplayer'],
    link: 'https://drive.google.com/file/d/1iWDQ_spIK8w3p53_94lfTg_A_n8WVmFs/view',
    linkText: 'Download Now',
    linkIcon: Download,
    category: 'Games',
  },
  {
    title: 'Basant Mela',
    description: 'Realistic Kite Flying and Fighting Simulator. Reached #4 trending in sports on Google Play with 500K+ downloads.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'kite game',
    tags: ['Unity3D', 'Mobile', 'Simulation'],
    link: 'https://play.google.com/store/apps/details?id=com.EffaceStudios.BasantMela',
    linkText: 'Play Store',
    linkIcon: Play,
    category: 'Games',
  },
  {
    title: 'World of Gods - MMORPG',
    description: 'A massively multiplayer online role-playing game with classes, guilds, crafting, and a huge world to explore.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'fantasy rpg',
    tags: ['Unity3D', 'MMORPG', 'Networking'],
    link: 'https://www.youtube.com/watch?v=ndsaZBDBJRw',
    linkText: 'Watch Video',
    linkIcon: Video,
    category: 'Games',
  },
  {
    title: 'Checkers Fall',
    description: 'A casual Checkers game with a unique twist - pieces fall with each move. Features multiplayer for endless fun.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'board game',
    tags: ['Unity3D', 'Board Game', 'Casual'],
    link: 'https://www.crazygames.com/game/checkers-fall',
    linkText: 'Play Now',
    linkIcon: Play,
    category: 'Games',
  },
  {
    title: 'Efface AI Chatbot Builder',
    description: 'Create a fully customized chatbot for your website in just a few clicks, completely offline.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'chatbot builder',
    tags: ['Windows', '.NET', 'AI'],
    link: 'https://youtu.be/RO68HhppuRg',
    linkText: 'Watch Video',
    linkIcon: Video,
    category: 'Apps',
  },
  {
    title: 'Flash - AI Presentation Maker',
    description: 'A revolutionary app that uses AI similar to GPT-4 to automate the creation of professional presentations.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'presentation maker',
    tags: ['Android', 'AI', 'Productivity'],
    link: 'https://play.google.com/store/apps/details?id=com.effacestudios.flashpresentationmaker',
    linkText: 'Download Now',
    linkIcon: Download,
    category: 'Apps',
  },
  {
    title: 'DocAdvisor - Your AI Doctor',
    description: 'Your trusted AI doctor, providing personalized and reliable treatment recommendations for a variety of symptoms.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'medical app',
    tags: ['Android', 'AI', 'Health'],
    link: 'https://play.google.com/store/apps/details?id=com.effacestudios.docadvisor',
    linkText: 'Download Now',
    linkIcon: Download,
    category: 'Apps',
  },
  {
    title: 'Instant - AI Video Maker',
    description: 'A next-level video creator that automates the process of searching, adding & finalizing video creation and editing.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'video editor',
    tags: ['Android', 'AI', 'Video Editing'],
    link: 'https://www.youtube.com/embed/bbBeo480n2M',
    linkText: 'Watch Video',
    linkIcon: Video,
    category: 'Apps',
  },
  {
    title: 'Planet of Inus - Cinematic',
    description: 'Cinematic trailer for an ambitious NFT Blockchain based MMORPG project.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cinematic trailer',
    tags: ['Unity3D', 'Cinemachine', 'VFX'],
    link: 'https://www.youtube.com/watch?v=6qkWtXEh9b0',
    linkText: 'Watch on YouTube',
    linkIcon: Video,
    category: 'Animations',
  },
  {
    title: 'UFO.KO - Cinematic Trailer',
    description: 'Promotional cinematic trailer for the fun and competitive game UFO Knockout.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'game trailer',
    tags: ['Unity3D', 'Animation', 'Marketing'],
    link: 'https://www.youtube.com/watch?v=Vv1W0IwO42s',
    linkText: 'Watch on YouTube',
    linkIcon: Video,
    category: 'Animations',
  },
  {
    title: 'Short Animated Film',
    description: 'An example of a short animated story created using Unity for real-time rendering.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'animated short',
    tags: ['Unity3D', 'Storytelling', 'Real-time'],
    link: 'https://www.youtube.com/watch?v=vsW-VaQBH5k',
    linkText: 'Watch on YouTube',
    linkIcon: Video,
    category: 'Animations',
  },
];

export const testimonials = [
    {
        name: 'John Doe',
        title: 'CEO, GameStorm Inc.',
        comment: 'Shahrukh is an exceptionally talented developer. He delivered high-quality work on time and was a pleasure to collaborate with. His skills in Unity are top-notch.',
        avatar: 'https://placehold.co/100x100.png'
    },
    {
        name: 'Jane Smith',
        title: 'Indie Game Producer',
        comment: "Working with Shahrukh was a fantastic experience. He brought our vision to life with creativity and technical expertise. Highly recommended for any game development project.",
        avatar: 'https://placehold.co/100x100.png'
    },
    {
        name: 'Mike Johnson',
        title: 'Lead Designer, Appify',
        comment: "Shahrukh's ability to tackle complex problems and deliver robust solutions is impressive. He's a reliable and skilled developer who can handle both game and app development with ease.",
        avatar: 'https://placehold.co/100x100.png'
    },
    {
        name: 'Emily Chen',
        title: 'Project Manager',
        comment: "He is a great communicator and a proactive team member. The project's success was largely due to his dedication and problem-solving abilities. Will definitely hire again.",
        avatar: 'https://placehold.co/100x100.png'
    }
];
