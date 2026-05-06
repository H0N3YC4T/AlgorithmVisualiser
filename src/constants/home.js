import { HelpCircle } from "lucide-react";

export const homeDefaults = {
  hero: {
    badge: "INTERACTIVE Visualiser",
    title: "Introduction to",
    titleAccent: "Algorithms",
    description: "A visual guide to algorithmic complexity and performance.",
  },
  categoryMeta: {
    "Sorting Algorithms": "Layers",
    "Searching Algorithms": "Search",
    "Pathfinding Algorithms": "Map",
    "Pattern Matching Algorithms": "Zap",
    default: "HelpCircle",
  },
  difficultyColors: {
    Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    default: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  },
  difficultyMap: {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  },
  complexityColors: {
    elite: "text-emerald-400",
    excellent: "text-blue-400",
    good: "text-indigo-400",
    fair: "text-amber-400",
    poor: "text-rose-400",
    default: "text-slate-400",
  },
  complexityLabels: {
    best: "B:",
    avg: "A:",
    worst: "W:",
    prep: "PREP:",
    space: "SPACE:",
    examples: "EXAMPLES:",
  },
  footer: {
    copyright: "2026 INTERACTIVE Visualiser PLATFORM",
  },
};
