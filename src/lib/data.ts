import { games } from "./data/games";
import { apps } from "./data/apps";
import { animations } from "./data/animations";

export { navLinks } from "./data/nav";
export { socialLinks } from "./data/social";
export { about } from "./data/about";
export { stats } from "./data/stats";
export { timeline } from "./data/timeline";
export { services } from "./data/services";
export { skills, languages } from "./data/skills";
export { testimonials } from "./data/testimonials";


export const projects = [...games, ...apps, ...animations];
