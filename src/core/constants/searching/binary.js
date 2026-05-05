import { createAlgorithmCard } from "../factory";

/**
 * Binary Search Algorithm Module
 */
export const binarysearch = createAlgorithmCard({
  id: "binarysearch",

  // --- Metadata ---
  metadata: {
    type: "searching",
    visualizerType: "array",
    category: "Searching Algorithms",
    defaultInputs: { target: "26", pattern: "3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53" },
  },

  homeCard: {
    name: "Binary Search",
    difficulty: "Easy",
    description: "An efficient search algorithm for sorted lists that repeatedly halves the search interval.",
    complexity: {
      timeBest: "Ω(1)",
      timeAvg: "Θ(log n)",
      timeWorst: "O(log n)",
      space: "O(1)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Range: [{l}, {r}]",
      startButton: "Start Binary Search",
      playbackSpeed: 300,
    },
    extendedDescription:
      "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
      legendItems: [
        { label: "Unsorted", color: "bg-slate-800/40 border-slate-700/50" },
        { label: "Range Bounds", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
        { label: "Midpoint", color: "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" },
        { label: "Found", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
      ],
    visualSteps: {
      READY: {
        title: "Ready",
        message: "Binary Search initialized. Searching for {targetValue} in a sorted array.",
        highlights: { pseudo: [1], javascript: [1], python: [1] },
      },
      INITIALIZING: {
        title: "Initializing",
        message: "Setting search boundaries: Left=0, Right={lenMinusOne}.",
        highlights: { pseudo: [2, 3], javascript: [2, 3], python: [2, 3] },
      },
      CALCULATING_MID: {
        title: "Calculating Mid",
        message: "Current range [{l}, {r}]. Midpoint at index {mid} (value: {val}).",
        highlights: { pseudo: [5], javascript: [6], python: [6] },
      },
      MATCH_FOUND: {
        title: "Match Found ✓",
        message: "Target value found at midpoint index {mid}!",
        highlights: { pseudo: [7, 8], javascript: [9, 10], python: [9, 10] },
      },
      SEARCH_RIGHT: {
        title: "Search Right",
        message: "{val} < {targetValue}. Searching the right half: [{midPlusOne}, {r}].",
        highlights: { pseudo: [9, 10], javascript: [11, 12], python: [11, 12] },
      },
      SEARCH_LEFT: {
        title: "Search Left",
        message: "{val} > {targetValue}. Searching the left half: [{l}, {midMinusOne}].",
        highlights: { pseudo: [11, 12], javascript: [13, 14], python: [13, 14] },
      },
      NOT_FOUND: {
        title: "Not Found",
        message: "Range exhausted. Value {targetValue} is not in the array.",
        highlights: { pseudo: [13], javascript: [17], python: [17] },
      },
    },
  },

  codeSnippets: {
    pseudo: `function binarySearch(arr, target):
  low = 0, high = arr.length - 1
  while low <= high:
    mid = (low + high) / 2
    if arr[mid] == target:
      return mid
    else if arr[mid] < target:
      low = mid + 1
    else:
      high = mid - 1
  return -1`,
    javascript: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
  },

  // --- Logic ---
  getInitialState: (p, t) => {
    const rawArray = Array.isArray(t) ? t : [3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53];
    const array = [...rawArray].sort((a, b) => a - b);
    const targetValue = typeof p === "number" ? p : Number.parseInt(p, 10) || 26;
    return {
      phase: 0,
      l: 0,
      r: array.length - 1,
      mid: -1,
      targetValue,
      array,
      activeIndices: [],
      sortedIndices: [],
      pivotIndex: -1,
      comparisons: 0,
      log: {
        title: "Ready",
        type: "info",
        messageKey: "READY",
        params: { targetValue: targetValue },
      },
    };
  },

  nextStep: (state) => {
    const { phase, array, l, r, targetValue, mid } = state;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    if (phase === 0) {
      // INITIALIZING
      return {
        ...newState,
        phase: 1,
        l: 0,
        r: array.length - 1,
        log: {
          title: "INITIALIZING",
          type: "info",
          messageKey: "INITIALIZING",
          params: { targetValue: targetValue, lenMinusOne: array.length - 1 },
        },
      };
    }

    if (phase === 1) {
      // CALCULATING_MID
      if (l > r) {
        return {
          ...newState,
          isFinished: true,
          log: {
            title: "NOT FOUND",
            type: "mismatch",
            messageKey: "NOT_FOUND",
            params: { targetValue: targetValue },
          },
        };
      }

      const nextMid = Math.floor((l + r) / 2);
      return {
        ...newState,
        phase: 2,
        mid: nextMid,
        pivotIndex: nextMid,
        activeIndices: [l, r],
        log: {
          title: "CALCULATING MID",
          type: "info",
          messageKey: "CALCULATING_MID",
          params: { l: l, r: r, mid: nextMid, val: array[nextMid] },
        },
      };
    }

    if (phase === 2) {
      // COMPARE
      newState.comparisons += 1;
      newState.pivotIndex = mid;

      if (array[mid] === targetValue) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [mid],
          log: {
            title: "MATCH FOUND!",
            type: "success",
            messageKey: "MATCH_FOUND",
            params: { mid: mid },
          },
        };
      }

      if (array[mid] < targetValue) {
        return {
          ...newState,
          phase: 1,
          l: mid + 1,
          log: {
            title: "SEARCH RIGHT",
            type: "match",
            messageKey: "SEARCH_RIGHT",
            params: { val: array[mid], targetValue: targetValue, midPlusOne: mid + 1, r: r },
          },
        };
      }

      return {
        ...newState,
        phase: 1,
        r: mid - 1,
        log: {
          title: "SEARCH LEFT",
          type: "mismatch",
          messageKey: "SEARCH_LEFT",
          params: { val: array[mid], targetValue: targetValue, midMinusOne: mid - 1, l: l },
        },
      };
    }

    return newState;
  },
});
