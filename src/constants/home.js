import { Search, BarChart3, AlertTriangle, Cpu, Layers, Zap, ArrowUpRight, ArrowDownRight, Database, GitBranch, Repeat, Target } from "lucide-react";

export const homeDefaults = {
  hero: {
    badge: 'INTERACTIVE VISUALIZER',
    title: 'Introduction to',
    titleAccent: 'Algorithms',
    description: 'A visual guide to algorithmic complexity and performance.'
  },
  categoryMeta: {
    'Sorting Algorithms': 'Layers',
    'Searching Algorithms': 'Search',
    'Pathfinding Algorithms': 'Map',
    'Pattern Matching Algorithms': 'Zap',
    default: 'HelpCircle',
  },
  difficultyColors: {
    'Easy': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Medium': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Hard': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    default: 'bg-slate-500/10 text-slate-500 border-slate-500/20'
  },
  difficultyMap: {
    'Easy': 1,
    'Medium': 2,
    'Hard': 3
  },
  complexityColors: {
    elite: 'text-emerald-400',
    excellent: 'text-blue-400',
    good: 'text-indigo-400',
    fair: 'text-amber-400',
    poor: 'text-rose-400',
    default: 'text-slate-400'
  },
  complexityLabels: {
    best: 'B:',
    avg: 'A:',
    worst: 'W:',
    prep: 'PREP:',
    space: 'SPACE:',
    examples: 'EXAMPLES:'
  },
  caseCards: [
    { label: 'BEST CASE', icon: Search, color: 'text-emerald-400', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', desc: 'The minimum time required for an algorithm to finish (e.g., searching for the first element in an array).' },
    { label: 'AVERAGE CASE', icon: BarChart3, color: 'text-amber-400', bg: 'bg-amber-500/5', border: 'border-amber-500/20', desc: 'The statistical expectation of time over all possible inputs. Calculated as the sum of cases divided by n (e.g. n/2 for Linear Search).' },
    { label: 'WORST CASE', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/5', border: 'border-rose-500/20', desc: 'The absolute maximum time an algorithm can take. Essential for critical system safety and guarantees.' },
    { label: 'SPACE COMPLEXITY', icon: Cpu, color: 'text-blue-400', bg: 'bg-blue-500/5', border: 'border-blue-500/20', desc: 'The amount of extra memory an algorithm needs to run as the input size grows. Goal is to minimize memory footprint.' },
    { label: 'STABILITY', icon: Layers, color: 'text-indigo-400', bg: 'bg-indigo-500/5', border: 'border-indigo-500/20', desc: 'A property where equal elements maintain their relative order after sorting. Vital for multi-key sorting operations.' },
    { label: 'ADAPTIVE', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/5', border: 'border-purple-500/20', desc: 'An algorithm is adaptive if its performance improves when the input is already partially sorted (e.g., Insertion Sort).' },
    { label: 'UPPER BOUND (O)', icon: ArrowUpRight, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/5', border: 'border-fuchsia-500/20', desc: 'The mathematical "ceiling" of an algorithm\'s growth rate. Guarantees the algorithm will never perform worse than this.' },
    { label: 'LOWER BOUND (Ω)', icon: ArrowDownRight, color: 'text-pink-400', bg: 'bg-pink-500/5', border: 'border-pink-500/20', desc: 'The mathematical "floor" of an algorithm\'s growth rate. Represents the minimum time an algorithm will ever take.' },
    { label: 'IN-PLACE', icon: Database, color: 'text-violet-400', bg: 'bg-violet-500/5', border: 'border-violet-500/20', desc: 'An algorithm that transforms input without using auxiliary data structures, maintaining O(1) extra space complexity.' },
    { label: 'DIVIDE & CONQUER', icon: GitBranch, color: 'text-cyan-400', bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', desc: 'A paradigm that breaks a problem into smaller sub-problems, solves them recursively, and combines results.' },
    { label: 'ITERATIVE', icon: Repeat, color: 'text-teal-400', bg: 'bg-teal-500/5', border: 'border-teal-500/20', desc: 'An incremental approach that processes elements one by one using loops, often simpler than recursive paradigms.' },
    { label: 'GREEDY STRATEGY', icon: Target, color: 'text-lime-400', bg: 'bg-lime-500/5', border: 'border-lime-500/20', desc: 'An approach that makes the locally optimal choice at each step with the hope of finding a global optimum.' }
  ],
  bigONotations: [
    { label: 'O(1)', type: 'constant', name: 'CONSTANT', desc: 'No matter the input size, it always takes the same time.', color: 'stroke-emerald-400', bg: 'bg-emerald-500/5' },
    { label: 'O(log n)', type: 'log', name: 'LOGARITHMIC', desc: 'Execution time grows slowly as input size increases.', color: 'stroke-blue-400', bg: 'bg-blue-500/5' },
    { label: 'O(n)', type: 'linear', name: 'LINEAR', desc: 'Time grows in direct proportion to the input size.', color: 'stroke-indigo-400', bg: 'bg-indigo-500/5' },
    { label: 'O(n log n)', type: 'nlog', name: 'LINEARITHMIC', desc: 'Slightly slower than linear. Common in efficient sorting.', color: 'stroke-amber-400', bg: 'bg-amber-500/5' },
    { label: 'O(n²)', type: 'quadratic', name: 'QUADRATIC', desc: 'Time grows exponentially with input size doubled...', color: 'stroke-rose-400', bg: 'bg-rose-500/5' },
    { label: 'O(2ⁿ)', type: 'exponential', name: 'EXPONENTIAL', desc: 'Time doubles with each new element. Very inefficient.', color: 'stroke-red-500', bg: 'bg-red-500/5' }
  ],
  spaceComplexities: [
    { label: 'O(1) Space', name: 'IN-PLACE', desc: 'Uses a fixed amount of extra memory regardless of input size.', examples: 'Bubble Sort, Selection Sort' },
    { label: 'O(log n) Space', name: 'RECURSIVE', desc: 'Memory grows with the depth of the recursion tree.', examples: 'Quick Sort (recursive stack)' },
    { label: 'O(n) Space', name: 'LINEAR EXTRA', desc: 'Needs extra memory proportional to the input size.', examples: 'Merge Sort, Counting Sort' }
  ],
  charts: {
    constant: "M2 18 L18 18",
    log: "M2 18 Q10 16 18 12",
    linear: "M2 18 L18 2",
    nlog: "M2 18 Q8 12 18 2",
    quadratic: "M2 18 Q12 18 18 2",
    exponential: "M2 18 Q16 18 18 2"
  },
  footer: {
    copyright: '2026 INTERACTIVE VISUALIZER PLATFORM'
  }
};
