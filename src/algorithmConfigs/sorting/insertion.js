import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const insertion = createAlgorithmPage({
  id: "insertion",

  // --- Metadata ---
  metadata: {
    type: "sorting",
    VisualiserType: "array",
    category: "Sorting Algorithms",
    defaultInputs: { target: "7, 2, 9, 4, 1, 8, 3, 6", pattern: "" },
  },

  homeCard: {
    name: "Insertion Sort",
    difficulty: "Easy",
    description: "Builds the sorted array by taking an unsorted element and inserting it into its relative position.",
    complexity: {
      timeBest: "Ω(n)",
      timeAvg: "Θ(n^2)",
      timeWorst: "O(n^2)",
      space: "O(1)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Pass: {i}",
      startButton: "Start",
      playbackSpeed: 200,
    },
    extendedDescription:
      "Insertion Sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it provides several advantages: it is simple to implement, efficient for small data sets, and stable.",
    legendItems: [
      { label: "Unsorted", color: "bg-slate-800 border-slate-700" },
      { label: "Current", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Comparing", color: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" },
      { label: "Sorted", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
    ],
  },

  // --- Visual Steps & Code ---
  visualSteps: {
    READY: {
      title: "Ready",
      message:
        "Commencing Insertion Sort: An incremental, comparison-based sorting algorithm.\n\n• Strategy: Progressively build a sorted partition by inserting each unsorted element into its correct relative position.\n\n• Advantage: Highly efficient for small or nearly-sorted datasets (Ω(n) best-case).",
      highlights: { pseudo: [1, 2], javascript: [2, 3], python: [1, 2], csharp: [2, 3] },
    },
    NEXT_INSERT: {
      title: "Next Candidate",
      message:
        "Selecting Candidate: Value {val} from index {idx}.\n\n• Objective: Compare this element with the preceding sorted sequence to determine its final rank in the current partition.\n\n• State: The elements to the left of index {idx} are already sorted relative to each other.",
      highlights: { pseudo: [3, 4], javascript: [4, 5], python: [3, 4], csharp: [4, 5] },
    },
    SWAPPING: {
      title: "Shifting",
      message:
        "Shifting Element: {val1} > candidate.\n\n• Action: Moving {val1} one position to the right to clear a path for the candidate's insertion.\n\n• Progress: Scanning backward through the sorted segment until the correct insertion point is found.",
      highlights: { pseudo: [5, 6, 7], javascript: [6, 7, 8], python: [5, 6, 7], csharp: [6, 7, 8] },
    },
    SORT_COMPLETE: {
      title: "Sorted ✓",
      message:
        "Sorting Finalized: All elements successfully integrated.\n\n• Result: The entire array now satisfies the non-decreasing order invariant.\n\n• Final State: Global array is fully ordered.",
      highlights: { pseudo: [1, 2, 8], javascript: 12, python: 9, csharp: [1, 2, 3] },
    },
  },

  codeSnippets: {
    pseudo: `InsertionSort(A):
  for i from 1 to n-1:
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key:
      A[j + 1] = A[j]
      j = j - 1
    A[j + 1] = key`,
    javascript: `function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    csharp: `public void InsertionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
  },

  // --- Logic ---
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [7, 2, 9, 4, 1, 8, 3, 6];
    return {
      phase: 1,
      i: 1,
      j: 0,
      key: array[1],
      array,
      activeIndices: [1],
      sortedIndices: [0],
      swapIndices: [],
      comparisons: 0,
      log: {
        title: "Insertion Sort",
        type: "info",
        messageKey: "READY",
      },
    };
  },

  nextStep: (state) => {
    const { array, i, j, key, phase } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 1) {
      // Selecting key
      if (i >= n) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [...new Array(n).keys()],
          log: { title: "Sorted ✓", type: "success", messageKey: "SORT_COMPLETE" },
        };
      }
      return {
        ...newState,
        phase: 2,
        key: array[i],
        j: i - 1,
        activeIndices: [i],
        log: { title: "Next Candidate", type: "info", messageKey: "NEXT_INSERT", params: { val: array[i], idx: i } },
      };
    }

    if (phase === 2) {
      // Shifting
      if (j >= 0 && array[j] > key) {
        const newArray = [...array];
        newArray[j + 1] = newArray[j];
        return {
          ...newState,
          array: newArray,
          j: j - 1,
          activeIndices: [j, j + 1],
          swapIndices: [j, j + 1],
          log: { title: "Shifting", type: "shift", messageKey: "SWAPPING", params: { val1: array[j] } },
        };
      }
      // Placement
      const newArray = [...array];
      newArray[j + 1] = key;
      const nextI = i + 1;
      return {
        ...newState,
        array: newArray,
        phase: 1,
        i: nextI,
        sortedIndices: [...new Array(nextI).keys()],
        activeIndices: [j + 1],
        log: { title: "Inserted", type: "match", message: `Inserted ${key} at position ${j + 1}` },
      };
    }
    return newState;
  },
});
