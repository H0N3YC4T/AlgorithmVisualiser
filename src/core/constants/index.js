/**
 * IAV Platform: Algorithm Registry (Public API)
 * This file serves as the single source of truth for all algorithm logic and metadata.
 */

import * as Sorting from "./sorting";
import * as Searching from "./searching";
import * as Pathfinding from "./pathfinding";
import * as PatternMatching from "./pattern-matching";

// Grouped exports for the Visualizer Factory and Dashboard
export const categories = {
  SORTING: Object.values(Sorting),
  SEARCHING: Object.values(Searching),
  PATHFINDING: Object.values(Pathfinding),
  PATTERN_MATCHING: Object.values(PatternMatching),
};

// Flattened list for the App Router to map IDs to logic
export const algorithms = [
  ...categories.SORTING,
  ...categories.SEARCHING,
  ...categories.PATHFINDING,
  ...categories.PATTERN_MATCHING,
];

// Individual exports for specific hook access if needed
export { Sorting, Searching, Pathfinding, PatternMatching };
