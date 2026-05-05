export const homeDefaults = {
  hero: {
    badge: 'Educational Lab',
    title: 'Algorithm',
    titleAccent: 'Visualizer',
    description: 'Explore, visualize, and understand complex algorithms through interactive step-by-step animations. Master data structures and algorithms with precision.'
  },
  categoryMeta: {
    default: () => null,
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
    best: 'Best',
    avg: 'Avg',
    worst: 'Worst',
    prep: 'Prep',
    space: 'Space',
    examples: 'Ex:'
  },
  caseCards: [],
  bigONotations: [
    { label: 'O(1)', type: 'constant', name: 'Constant', desc: 'Execution time remains unchanged regardless of input size.', color: 'stroke-emerald-400', bg: 'bg-emerald-500/5' },
    { label: 'O(log n)', type: 'log', name: 'Logarithmic', desc: 'Time grows slowly; common in balanced trees and binary search.', color: 'stroke-blue-400', bg: 'bg-blue-500/5' },
    { label: 'O(n)', type: 'linear', name: 'Linear', desc: 'Time grows directly proportional to input size.', color: 'stroke-indigo-400', bg: 'bg-indigo-500/5' },
    { label: 'O(n log n)', type: 'nlog', name: 'Linearithmic', desc: 'Standard for efficient sorting algorithms like Merge Sort.', color: 'stroke-amber-400', bg: 'bg-amber-500/5' },
    { label: 'O(n²)', type: 'quadratic', name: 'Quadratic', desc: 'Common in nested loops; performance drops quickly.', color: 'stroke-rose-400', bg: 'bg-rose-500/5' },
    { label: 'O(2ⁿ)', type: 'exponential', name: 'Exponential', desc: 'Time doubles with each element; avoid for large inputs.', color: 'stroke-red-500', bg: 'bg-red-500/5' }
  ],
  spaceComplexities: [
    { label: 'O(1)', name: 'In-Place', desc: 'Algorithm uses a constant amount of extra memory regardless of input.', examples: 'Bubble Sort, Selection Sort' },
    { label: 'O(n)', name: 'Linear Space', desc: 'Memory usage grows proportionally with the input size.', examples: 'Merge Sort, Counting Sort' },
    { label: 'O(h)', name: 'Stack Space', desc: 'Memory usage depends on the recursion depth or tree height.', examples: 'DFS, Quick Sort' }
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
    copyright: '2026 Algorithm Visualizer Lab. All rights reserved.'
  }
};
