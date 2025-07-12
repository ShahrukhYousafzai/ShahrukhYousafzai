import {
  Code,
  Gamepad2,
  Brush,
  Cpu,
  Globe,
  Monitor,
  Smartphone,
  Server,
  Palette,
  Layout,
  FileCode,
  Bot
} from "lucide-react";
import { IconUnity, IconVisualStudio, IconFigma, IconPhotoshop, IconCSharp } from "@/components/icons";

export const skills = [
  { name: "Unity", icon: IconUnity },
  { name: "C#", icon: IconCSharp },
  { name: "Game Development", icon: Gamepad2 },
  { name: "Game Design", icon: Brush },
  { name: "Android App Development", icon: Smartphone },
  { name: "iOS Development", icon: Smartphone },
  { name: "Visual Studio", icon: IconVisualStudio },
  { name: "Figma", icon: IconFigma },
  { name: "Photoshop", icon: IconPhotoshop },
  { name: "HTML", icon: FileCode },
  { name: "CSS", icon: Palette },
  { name: "JavaScript", icon: Code },
  { name: "Python", icon: Cpu },
];

export const languages = ["English", "Urdu", "Hindi", "Punjabi"];
