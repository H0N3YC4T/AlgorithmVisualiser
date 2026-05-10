import { SortAsc, Search, Share2, Zap } from "lucide-react";

export const HOME_CATEGORIES = [
  {
    id: "Sorting Algorithms",
    name: "Sorting Algorithms",
    icon: <SortAsc className="w-5 h-5" />,
    cols: 3,
  },
  {
    id: "Searching Algorithms",
    name: "Searching Algorithms",
    icon: <Search className="w-5 h-5" />,
    cols: 3,
  },
  {
    id: "Pathfinding Algorithms",
    name: "Pathfinding Algorithms",
    icon: <Share2 className="w-5 h-5" />,
    cols: 2,
  },
  {
    id: "Pattern Matching Algorithms",
    name: "Pattern Matching",
    icon: <Zap className="w-5 h-5" />,
    cols: 3,
  },
];
