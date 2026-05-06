/** Radix Sort Module */
import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const radix = createAlgorithmPage({
  id: "radix",

  // --- Metadata ---
  metadata: {
    type: "sorting",
    VisualiserType: "array",
    category: "Sorting Algorithms",
    defaultInputs: { target: "53, 17, 82, 34, 91, 26, 45, 68", pattern: "" },
  },

  homeCard: {
    name: "Radix Sort",
    difficulty: "Hard",
    description:
      "A non-comparative sorting algorithm that avoids comparison by creating and distributing elements into buckets according to their radix.",
    complexity: {
      timeBest: "Ω(nk)",
      timeAvg: "Θ(nk)",
      timeWorst: "O(nk)",
      space: "O(n+k)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Digit: {exp}",
      startButton: "Start",
      playbackSpeed: 200,
    },
    extendedDescription:
      "Radix Sort processes digits from least significant to most significant (LSD), using a stable sub-sort (like Counting Sort) for each position.",
    legendItems: [
      { label: "Unsorted", color: "bg-slate-800 border-slate-700" },
      { label: "Digit Group", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Bucketing", color: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" },
      { label: "Sorted", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
    ],
  },

  // --- Visual Steps ---
  visualSteps: {
    READY: {
      title: "Ready",
      message:
        "LSD Radix Sort Initiated.\n\n• Principle: Distributing keys into buckets based on individual digits.\n• Strategy: Processing positions from Least Significant Digit (LSD) to Most Significant Digit (MSD).\n• Requirement: Utilizing a stable sub-sorting algorithm for each pass.",
      highlights: { pseudo: [1], javascript: [1], python: [1] },
    },
    PROCESSING_DIGIT: {
      title: "Processing Digit",
      message:
        "Targeting the {exp}s digit position.\n\n• Analysis: Isolating the digit at 10^{exp} place for every element.\n• Objective: Distributing elements into 10 decimal buckets (0-9).",
      highlights: { pseudo: [2, 3], javascript: [2, 3], python: [2, 3] },
    },
    BUCKETING: {
      title: "Bucketing",
      message:
        "Distribution: Value {val} → Bucket {digit}.\n\n• Calculation: floor({val} / {exp}) % 10 = {digit}.\n• Stability: Maintaining the relative order of elements with identical digits.",
      highlights: { pseudo: [4], javascript: [4], python: [4] },
    },
    DISTRIBUTION_COMPLETE: {
      title: "Distribution Complete",
      message:
        "Bucket Partitioning Finalized for {exp}s position.\n\n• Action: Preparing to reconstruct the array from buckets in sequential order.",
      highlights: { pseudo: [5], javascript: [5], python: [5] },
    },
    PASS_COMPLETE: {
      title: "Pass Complete",
      message:
        "Array Reconstructed.\n\n• State: The array is now stably sorted relative to the {exp}s digit position.\n• Strategy: Advancing to the next significant digit (x10).",
      highlights: { pseudo: [5], javascript: [5], python: [5] },
    },
    SORT_COMPLETE: {
      title: "Sorted ✓",
      message:
        "Radix Sort Finalized!\n\n• Result: All digit positions have been processed.\n• Complexity: O(nk) achieved non-comparatively.",
      highlights: { pseudo: [6], javascript: [6], python: [6] },
    },
  },
  codeSnippets: {
    pseudo: `function radixSort(arr):
  max = findMax(arr)
  exp = 1
  while max / exp > 0:
    countingSortByDigit(arr, exp)
    exp *= 10
function countingSortByDigit(arr, exp):
  n = arr.length
  output = array of size n
  count = array of size 10 (zeros)
  for x in arr:
    digit = (x / exp) % 10
    count[digit]++
  for i from 1 to 9: count[i] += count[i-1]
  for i from n-1 down to 0:
    digit = (arr[i] / exp) % 10
    output[count[digit] - 1] = arr[i]
    count[digit]--
  copy output to arr`,
    javascript: `function radixSort(arr) {
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortForRadix(arr, exp);
  }
  return arr;
}
function countingSortForRadix(arr, exp) {
  let n = arr.length;
  let output = new Array(n);
  let count = new Array(10).fill(0);
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  for (let i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }
  for (let i = 0; i < n; i++) arr[i] = output[i];
}`,
    python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_for_radix(arr, exp)
        exp *= 10
    return arr
def counting_sort_for_radix(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for x in arr:
        idx = (x // exp) % 10
        count[idx] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        idx = (arr[i] // exp) % 10
        output[count[idx] - 1] = arr[i]
        count[idx] -= 1
    for i in range(n):
        arr[i] = output[i]`,
  },
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [53, 17, 82, 34, 91, 26, 45, 68];
    return {
      phase: 0,
      exp: 1,
      array,
      maxVal: Math.max(...array),
      buckets: Array.from({ length: 10 }, () => []),
      i: 0,
      activeIndices: [],
      sortedIndices: [],
      swapIndices: [],
      log: { title: "READY", type: "info", messageKey: "READY" },
    };
  },

  nextStep: (state) => {
    const { array, exp, maxVal, phase, i, buckets } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      if (Math.floor(maxVal / exp) <= 0) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [...new Array(array.length).keys()],
          log: { title: "SORT COMPLETE", type: "success", messageKey: "SORT_COMPLETE" },
        };
      }

      return {
        ...newState,
        phase: 1,
        i: 0,
        buckets: Array.from({ length: 10 }, () => []),
        log: { title: `PROCESSING ${exp}s DIGIT`, type: "info", messageKey: "PROCESSING_DIGIT", params: { exp: exp } },
      };
    }

    if (phase === 1) {
      if (i >= array.length) {
        return {
          ...newState,
          phase: 2,
          log: {
            title: "DISTRIBUTION COMPLETE",
            type: "match",
            messageKey: "DISTRIBUTION_COMPLETE",
            params: { exp: exp },
          },
        };
      }

      const val = array[i];
      const digit = Math.floor((val / exp) % 10);
      const newBuckets = buckets.map((b, idx) => (idx === digit ? [...b, val] : b));

      return {
        ...newState,
        buckets: newBuckets,
        i: i + 1,
        activeIndices: [i],
        log: {
          title: "BUCKETING",
          type: "info",
          messageKey: "BUCKETING",
          params: { val: val, digit: digit, exp: exp },
        },
      };
    }

    if (phase === 2) {
      const flattened = buckets.flat();
      return {
        ...newState,
        array: flattened,
        phase: 0,
        exp: exp * 10,
        log: { title: "PASS COMPLETE", type: "shift", messageKey: "PASS_COMPLETE", params: { exp: exp } },
      };
    }

    return newState;
  },
});
