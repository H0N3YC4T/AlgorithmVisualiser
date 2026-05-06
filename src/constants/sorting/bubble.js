/** Bubble Sort Module */
import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const bubble = createAlgorithmPage({
  id: "bubble",

  // --- Metadata ---
  metadata: {
    type: "sorting",
    VisualiserType: "array",
    category: "Sorting Algorithms",
    defaultInputs: { target: "6, 2, 8, 1, 9, 3, 7, 4", pattern: "" },
  },

  homeCard: {
    name: "Bubble Sort",
    difficulty: "Easy",
    description: "A simple comparison sort that repeatedly swaps adjacent elements if they are in the incorrect order.",
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
      startButton: "Start Sorting",
      playbackSpeed: 200,
    },
    extendedDescription:
      "Bubble Sort is the simplest sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.",
    legendItems: [
      { label: "Unsorted", color: "bg-slate-800 border-slate-700" },
      { label: "Checking", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Swap", color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
      { label: "Sorted", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
    ],
  },

  // --- Visual Steps & Code ---
  visualSteps: {
    READY: {
      title: "Ready",
      message:
        "Commencing Bubble Sort: A fundamental exchange-based sort.\n\n• Mechanism: Repeatedly swapping adjacent elements to 'bubble' the largest values to the end.\n\n• Invariant: After pass 'i', the i-th largest element is guaranteed to be in its terminal position.",
      highlights: { pseudo: [1, 2, 3], javascript: [2, 3, 4], python: [2, 3, 4], csharp: [2, 3, 4] },
    },
    IN_ORDER: {
      title: "Comparing",
      message:
        "Local Invariant Satisfied: {valJ} ≤ {valJPlusOne}.\n\n• No swap required for this pair.\n\n• Advancing scan pointers to the next adjacent candidate.",
      highlights: { pseudo: [4, 5], javascript: 5, python: 5, csharp: 5 },
    },
    OUT_OF_ORDER: {
      title: "Inversion Detected",
      message:
        "Inversion Detected: {valJ} > {valJPlusOne}.\n\n• The local sorted invariant is violated.\n\n• Preparing to perform an adjacent swap to resolve the inversion.",
      highlights: { pseudo: [4, 5], javascript: 5, python: 5, csharp: 5 },
    },
    SWAPPED: {
      title: "Swapping",
      message:
        "Adjacent Swap Executed.\n\n• Larger element moved towards the tail of the array.\n\n• Smaller element propagated towards the head.",
      highlights: { pseudo: 5, javascript: 7, python: 6, csharp: [7, 8, 9] },
    },
    PASS_DONE: {
      title: "Pass Complete",
      message:
        "Pass {nextPass} Initiated.\n\n• Previous pass successfully finalized index {idx} ({val}).\n\n• Scoping the current scan to the remaining {remaining} unsorted elements.",
      highlights: { pseudo: 2, javascript: 3, python: 3, csharp: 3 },
    },
    SORTED: {
      title: "Sorted ✓",
      message:
        "Convergence Reached.\n\n• Result: Array satisfies the global sorted invariant (arr[j] ≤ arr[j+1]).\n\n• No further inversions detected.",
      highlights: { pseudo: [1, 2, 3, 4, 5], javascript: 11, python: 9, csharp: [1, 2, 3, 4, 5] },
    },
  },

  codeSnippets: {
    pseudo: `BubbleSort(list):
  for i from 0 to n-1:
    for j from 0 to n-i-1:
      if list[j] > list[j+1]:
        swap(list[j], list[j+1])`,
    javascript: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    csharp: `public void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
  },

  // --- Logic ---
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [6, 2, 8, 1, 9, 3, 7, 4];
    return {
      phase: 1,
      i: 0,
      j: 0,
      swapped: false,
      array,
      activeIndices: [0, 1],
      sortedIndices: [],
      swapIndices: [],
      comparisons: 0,
      log: {
        title: "PASS 1",
        type: "info",
        messageKey: "READY",
        params: { totalPasses: array.length - 1, val0: array[0], val1: array[1] },
      },
    };
  },

  nextStep: (state) => {
    const { array, i, j, phase, sortedIndices } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 1) {
      if (j >= n - 1 - i) {
        const newSorted = [...sortedIndices, n - 1 - i];
        const nextI = i + 1;
        if (nextI >= n - 1) {
          return {
            ...newState,
            isFinished: true,
            sortedIndices: [...new Array(array.length).keys()],
            activeIndices: [],
            log: { title: "SORTED ✓", type: "success", messageKey: "SORTED", params: { nMinusOne: n - 1 } },
          };
        }
        return {
          ...newState,
          phase: 1,
          i: nextI,
          j: 0,
          swapped: false,
          sortedIndices: newSorted,
          activeIndices: [0, 1],
          comparisons: newState.comparisons,
          log: {
            title: `PASS ${nextI + 1}`,
            type: "info",
            messageKey: "PASS_DONE",
            params: {
              val: array[n - 1 - i],
              idx: n - 1 - i,
              nextPass: nextI + 1,
              totalPasses: n - 1,
              remaining: n - 1 - nextI,
              val0: array[0],
              val1: array[1],
            },
          },
        };
      }

      newState.comparisons += 1;
      newState.activeIndices = [j, j + 1];
      if (array[j] > array[j + 1]) {
        return {
          ...newState,
          phase: 2,
          log: {
            title: "OUT OF ORDER",
            type: "mismatch",
            messageKey: "OUT_OF_ORDER",
            params: { j: j, valJ: array[j], jPlusOne: j + 1, valJPlusOne: array[j + 1] },
          },
        };
      }
      const nextJ = j + 1;
      return {
        ...newState,
        j: nextJ,
        activeIndices: nextJ < n - 1 - i ? [nextJ, nextJ + 1] : [],
        log: {
          title: "IN ORDER",
          type: "match",
          messageKey: "IN_ORDER",
          params: { j: j, valJ: array[j], jPlusOne: j + 1, valJPlusOne: array[j + 1] },
        },
      };
    }

    if (phase === 2) {
      const newArray = [...array];
      [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
      const nextJ = j + 1;
      return {
        ...newState,
        array: newArray,
        phase: 1,
        j: nextJ,
        swapped: true,
        swapIndices: [j, j + 1],
        activeIndices: nextJ < n - 1 - i ? [nextJ, nextJ + 1] : [],
        log: {
          title: "SWAPPED",
          type: "shift",
          messageKey: "SWAPPED",
          params: { j: j, jPlusOne: j + 1, valNewJPlusOne: newArray[j + 1], valNewJ: newArray[j] },
        },
      };
    }
    return newState;
  },
});
