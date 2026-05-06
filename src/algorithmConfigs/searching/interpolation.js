import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

/**
 * Interpolation Search Algorithm Module
 */
export const interpolationsearch = createAlgorithmPage({
  id: "interpolationsearch",

  // --- Metadata ---
  metadata: {
    type: "searching",
    VisualiserType: "array",
    category: "Searching Algorithms",
    defaultInputs: { target: "4, 9, 10, 11, 27, 43, 49, 55, 56 57, 63, 69", pattern: "27" },
  },

  homeCard: {
    name: "Interpolation Search",
    difficulty: "Medium",
    description:
      "An improved binary search for uniformly distributed sorted arrays that estimates the targets location.",
    complexity: {
      timeBest: "Ω(1)",
      timeAvg: "Θ(log log n)",
      timeWorst: "O(n)",
      space: "O(1)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Estimate: {pos}",
      startButton: "Start",
      playbackSpeed: 800,
    },
    extendedDescription:
      "Interpolation Search is an algorithm for searching for a key in an array that has been ordered by numerical values assigned to the keys. It parallels how humans search through a telephone book for a name: it estimates the position based on the value, rather than always checking the midpoint.",
    legendItems: [
      { label: "Unsorted", color: "bg-slate-800 border-slate-700" },
      { label: "Estimated Pos", color: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" },
      { label: "Range Bounds", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Found", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
    ],
    visualSteps: {
      READY: {
        title: "Ready",
        message:
          "Commencing Interpolation Search: A value-based estimation strategy.\n\n• Prerequisite: The search space MUST be sorted and ideally uniformly distributed.\n• Strategy: Estimating the target's position based on its magnitude relative to the range boundaries.",
        highlights: { pseudo: [1], javascript: [1], python: [1] },
      },
      OUT_OF_BOUNDS: {
        title: "Out of Bounds",
        message:
          "Search Domain Violation.\n\n• Observation: Target value '{targetValue}' is outside the range [{low}, {high}].\n• Result: Terminating search; the value cannot exist in this sorted segment.",
        highlights: { pseudo: [2], javascript: [4], python: [4] },
      },
      ESTIMATING_POSITION: {
        title: "Estimating Position",
        message:
          "Interpolating Probe Index.\n\n• Calculation: pos = low + [(target - arr[low]) * (high - low) / (arr[high] - arr[low])] = {pos}.\n• Strategy: Probing the array at the estimated location rather than the center.",
        highlights: { pseudo: [3], javascript: [5], python: [5] },
      },
      MATCH_FOUND: {
        title: "Match Found ✓",
        message:
          "Target Synchronized!\n\n• Result: Value '{targetValue}' located exactly at index {pos}.\n• Note: Highly efficient O(log log n) performance achieved for uniform data.",
        highlights: { pseudo: [4], javascript: [7], python: [7] },
      },
      ESTIMATE_TOO_LOW: {
        title: "Estimate Too Low",
        message:
          "Probe Value '{val}' < Target '{targetValue}'.\n\n• Deduction: The target must reside in the upper segment.\n• Action: Shifting the 'low' boundary to {low} (pos + 1).",
        highlights: { pseudo: [5], javascript: [9], python: [9] },
      },
      ESTIMATE_TOO_HIGH: {
        title: "Estimate Too High",
        message:
          "Probe Value '{val}' > Target '{targetValue}'.\n\n• Deduction: The target must reside in the lower segment.\n• Action: Shifting the 'high' boundary to {high} (pos - 1).",
        highlights: { pseudo: [6], javascript: [11], python: [11] },
      },
    },
  },
  codeSnippets: {
    pseudo: `function interpolationSearch(arr, target):
  low = 0, high = arr.length - 1
  while low <= high and target >= arr[low] and target <= arr[high]:
    pos = low + ((target - arr[low]) * (high - low) / (arr[high] - arr[low]))
    if arr[pos] == target: return pos
    if arr[pos] < target: low = pos + 1
    else: high = pos - 1
  return -1`,
    javascript: `function interpolationSearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    let pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,
    python: `def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and target >= arr[low] and target <= arr[high]:
        pos = low + ((target - arr[low]) * (high - low) // (arr[high] - arr[low]))
        if arr[pos] == target: return pos
        if arr[pos] < target: low = pos + 1
        else: high = pos - 1
    return -1`,
  },
  // --- Logic ---
  getInitialState: (p, t) => {
    const rawArray = Array.isArray(t) ? t : [3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69];
    const array = [...rawArray].sort((a, b) => a - b);
    const targetValue = typeof p === "number" ? p : Number.parseInt(p, 10) || 39;
    return {
      phase: 0,
      low: 0,
      high: array.length - 1,
      pos: -1,
      targetValue: targetValue,
      array,
      activeIndices: [],
      sortedIndices: [],
      pivotIndex: -1,
      comparisons: 0,
      log: {
        title: "Ready",
        type: "info",
        messageKey: "READY",
      },
    };
  },

  nextStep: (state) => {
    const { array, low, high, targetValue, phase } = state;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    // Phase 0: Calculate Position
    if (phase === 0) {
      if (low > high || targetValue < array[low] || targetValue > array[high]) {
        return {
          ...newState,
          isFinished: true,
          log: {
            title: "OUT OF BOUNDS",
            type: "mismatch",
            messageKey: "OUT_OF_BOUNDS",
            params: { targetValue, low, high },
          },
        };
      }

      // Formula: pos = low + [ (x - arr[low]) * (high - low) / (arr[high] - arr[low]) ]
      let pos;
      if (array[high] === array[low]) {
        pos = low;
      } else {
        pos = low + Math.floor(((targetValue - array[low]) * (high - low)) / (array[high] - array[low]));
      }

      return {
        ...newState,
        phase: 1,
        pos,
        pivotIndex: pos,
        activeIndices: [low, high],
        log: {
          title: "ESTIMATING POSITION",
          type: "info",
          messageKey: "ESTIMATING_POSITION",
          params: { pos: pos },
        },
      };
    }

    // Phase 1: Comparison
    if (phase === 1) {
      const { pos } = state;
      newState.comparisons += 1;
      newState.pivotIndex = pos;

      if (array[pos] === targetValue) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [pos],
          log: {
            title: "MATCH FOUND!",
            type: "success",
            messageKey: "MATCH_FOUND",
            params: { pos: pos },
          },
        };
      } else if (array[pos] < targetValue) {
        return {
          ...newState,
          phase: 0,
          low: pos + 1,
          log: {
            title: "ESTIMATE TOO LOW",
            type: "match",
            messageKey: "ESTIMATE_TOO_LOW",
            params: { pos: pos, val: array[pos], targetValue: targetValue },
          },
        };
      } else {
        return {
          ...newState,
          phase: 0,
          high: pos - 1,
          log: {
            title: "ESTIMATE TOO HIGH",
            type: "mismatch",
            messageKey: "ESTIMATE_TOO_HIGH",
            params: { pos: pos, val: array[pos], targetValue: targetValue },
          },
        };
      }
    }

    return newState;
  },
});
