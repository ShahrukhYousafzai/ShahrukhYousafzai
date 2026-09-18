import { games } from "./data/games";
import { apps } from "./data/apps";
import { animations } from "./data/animations";
import React from "react";

export interface Project {
  title: string;
  description: string;
  image: string;
  aiHint: string;
  tags: string[];
  link: string;
  linkText: string;
  linkIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  category: string;
  platform?: string;
}

export { navLinks } from "./data/nav";
export { socialLinks } from "./data/social";
export { about } from "./data/about";
export { stats } from "./data/stats";
export { timeline } from "./data/timeline";
export { services } from "./data/services";
export { skills, languages } from "./data/skills";
export { testimonials } from "./data/testimonials";
export { allReviews } from "./data/all-reviews";


export const projects: Project[] = [...games, ...apps, ...animations];
