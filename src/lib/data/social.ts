import { Twitter, Linkedin, Mail, Gamepad2, Briefcase, Bot } from "lucide-react";
import { IconFiverr, IconUpwork } from "@/components/icons";

export const socialLinks = [
    { name: 'AFS Creative Studio', url: 'https://afscreativestudio.netlify.app', icon: Briefcase, isEntity: true },
    { name: 'Efface Studios', url: 'https://play.google.com/store/apps/developer?id=Efface+Studios&hl=en', icon: Gamepad2, isEntity: true },
    { name: 'AFS Agentics', url: 'https://afs-agentics.github.io/afs-agentics-website/', icon: Bot, isEntity: true },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shahrukh-yousafzai-pk/', icon: Linkedin },
    { name: 'Twitter / X', url: 'https://x.com/SRKYousafzaiPK', icon: Twitter },
    { name: 'Fiverr', url: 'https://www.fiverr.com/users/shahrukhkhan9/', icon: IconFiverr },
    { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~01d270e621d61cf22f', icon: IconUpwork },
    { name: 'Email', url: 'mailto:shahrukhyousafzaipk@gmail.com', icon: Mail },
];
