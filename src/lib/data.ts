import {
  Code,
  Gamepad2,
  Brush,
  Check,
  Users,
  Briefcase,
  School,
  Download,
  Play,
  Video,
  Github,
  Linkedin,
  Wallet,
  Network,
  Cpu,
} from "lucide-react";
import { IconFiverr, IconUpwork, IconUnity } from "@/components/icons";

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
    description: "I am a game developer with expertise in both Web3 (blockchain-integrated) and Web2 (traditional) game development, specializing in Unity to build immersive, high-quality games for PC, mobile, and web platforms. My skill set includes blockchain integration, NFT mechanics, wallet authentication, and cross-platform optimization, allowing me to develop innovative gaming experiences that seamlessly merge traditional and decentralized technologies.",
    email: "shahrukhyousafzaipk@gmail.com",
};

export const stats = [
    { value: "$128K+", label: "Total Earnings", icon: Check },
    { value: "166+", label: "Total Jobs", icon: Users },
    { value: "7+", label: "Years of Experience", icon: Briefcase },
];

export const timeline = [
    { date: "March 2017 - Jan 2023", title: "Senior Game Developer", description: "Efface Studios", icon: Briefcase },
    { date: "Jan 2017 - Present", title: "Freelancer", description: "Fiverr", icon: IconFiverr },
    { date: "April 2023 - July 2024", title: "Web3 Blockchain Unity Game Developer", description: "Efface Studios", icon: Cpu },
    { date: "2021 - 2025", title: "Bachelor of Business Administration (BBA)", description: "Islamia University of Bahawalpur", icon: School },
];

export const services = [
  { title: "Web2 & Traditional Game Development", icon: Gamepad2 },
  { title: "Web3 & Blockchain Game Integration", icon: Wallet },
  { title: "Cross-Platform Development", icon: Network },
  { title: "Game Systems & Mechanics", icon: Cpu },
];

export const skills = [
  { name: "Unity", icon: IconUnity },
  { name: "C#", icon: Code },
  { name: "Game Development", icon: Gamepad2 },
  { name: "Game Design", icon: Brush },
  { name: "Android App Development", icon: Cpu },
  { name: "iOS Development", icon: Cpu },
];

export const languages = ["English", "Urdu", "Hindi", "Punjabi"];

export const projects = [
  {
    title: 'Crazy Punch',
    description: 'A hyper-casual brawler with wild ragdoll physics on floating islands. Knock opponents off to be the last one standing!',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'brawler game',
    tags: ['Unity3D', 'C#', 'Hyper-casual', 'Action', '3D', 'Single Player'],
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
    tags: ['Unity3D', 'Multiplayer', 'Photon', '3D', 'Action'],
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
    tags: ['Unity3D', 'Card Game', 'Multiplayer', '2D'],
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
    tags: ['Unity3D', 'Mobile', 'Simulation', 'Sports', '3D', 'Single Player'],
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
    tags: ['Unity3D', 'MMORPG', 'Networking', 'Multiplayer', '3D', 'Action'],
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
    tags: ['Unity3D', 'Board Game', 'Casual', 'Multiplayer', '2D'],
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
        name: 'RugDollz World Game',
        title: 'Upwork Client',
        comment: "If you're looking for an amazing talented Game developer who is is efficient yet meticulous at game development, then choose Shah. He also has outstanding blockchain skills which is invaluable…",
        avatar: 'https://placehold.co/100x100.png',
        rating: 5,
    },
    {
        name: 'video + images + updates',
        title: 'Upwork Client',
        comment: "Been a joy working with him. Responds and works quickly and efficiently. Any updates I have he accomplishes them and does a great job",
        avatar: 'https://placehold.co/100x100.png',
        rating: 5,
    },
    {
        name: 'Battle royal Game',
        title: 'Upwork Client',
        comment: "Did a really great job! Done as requested and did updates asap as well, will continue working with him",
        avatar: 'https://placehold.co/100x100.png',
        rating: 5,
    },
    {
        name: 'Collisions map/objects + Interactions',
        title: 'Upwork Client',
        comment: "Shah have completed the job successfully as usual and he explained to me everything. The work was delivered on time.",
        avatar: 'https://placehold.co/100x100.png',
        rating: 5,
    },
    {
        name: '3D Monster hunt & Kingdom Defense',
        title: 'Upwork Client',
        comment: "It's been great working with you. Probably we can both do a little better in communication as we have done some things twice. Overall experience has been great.",
        avatar: 'https://placehold.co/100x100.png',
        rating: 4.7,
    }
];
