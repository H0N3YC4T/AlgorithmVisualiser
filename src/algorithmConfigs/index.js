/**
 * IAV Platform: Algorithm Registry — Single Source of Truth
 * Exports three canonical shapes for dashboard & routing consumption.
 */

import * as Sorting from "./sorting";
import * as Searching from "./searching";
import * as Pathfinding from "./pathfinding";
import * as PatternMatching from "./pattern-matching";

// Grouped by category — used by Dashboard's sectioned rendering
export const groupedAlgorithms = {
  "Sorting Algorithms": Object.values(Sorting),
  "Searching Algorithms": Object.values(Searching),
  "Pathfinding Algorithms": Object.values(Pathfinding),
  "Pattern Matching Algorithms": Object.values(PatternMatching),
};

// Flattened list — used by Router for ID-to-logic mapping
export const algorithms = [
  ...groupedAlgorithms["Sorting Algorithms"],
  ...groupedAlgorithms["Searching Algorithms"],
  ...groupedAlgorithms["Pathfinding Algorithms"],
  ...groupedAlgorithms["Pattern Matching Algorithms"],
];

// Derived Array of category strings — prevents iteration errors in the UI
export const categories = Object.keys(groupedAlgorithms);

// Individual namespace exports for specific hook access
export { Sorting, Searching, Pathfinding, PatternMatching };

