import { Download, Star, Calendar, Layers, DollarSign } from "lucide-react";

export const stats = [
  {
    id: "downloads",
    value: "1M+",
    label: "App Downloads on Google Play",
    icon: Download,
  },
  {
    id: "reviews",
    value: "76+",
    label: "Verified Client Reviews Worldwide",
    icon: Star,
  },
  {
    id: "experience",
    value: `${new Date().getFullYear() - 2017}+`,
    label: "Years Shipping Production Software",
    icon: Calendar,
  },
  {
    id: "specialty",
    value: "Web2 · Web3 · AI",
    label: "Specialist Engineering Tracks",
    icon: Layers,
  },
  {
    id: "earnings",
    value: "$150K+",
    label: "Earned on Freelance Platforms",
    icon: DollarSign,
  },
];
