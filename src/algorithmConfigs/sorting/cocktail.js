/** Cocktail Shaker Sort Module */
import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const cocktail = createAlgorithmPage({
  id: "cocktail",

  // --- Metadata ---
  metadata: {
    type: "sorting",
    VisualiserType: "array",
    category: "Sorting Algorithms",
    defaultInputs: { target: "7, 1, 6, 2, 5, 3, 8, 4", pattern: "" },
  },

  homeCard: {
    name: "Cocktail Shaker Sort",
    difficulty: "Medium",
    description: "A variation of bubble sort that sorts in both directions each pass through the list.",
    complexity: {
      timeBest: "Ω(n)",
      timeAvg: "Θ(n^2)",
      timeWorst: "O(n^2)",
      space: "O(1)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Pass: {passes}",
      startButton: "Start",
      playbackSpeed: 200,
    },
    extendedDescription:
      "Cocktail Shaker Sort, also known as bidirectional bubble sort, improves upon bubble sort by traversing the list in both directions alternately.",
    legendItems: [
      { label: "Unsorted", color: "bg-slate-800 border-slate-700" },
      { label: "Checking", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Swap", color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
      { label: "Sorted", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
    ],
  },

  // --- Visual Steps ---
  visualSteps: {
    READY: {
      title: "Ready",
      message:
        "Bidirectional Sort Initiated.\n\n• Traverse forward to bubble the largest element.\n• Traverse backward to bubble the smallest element.",
      highlights: { pseudo: [1, 2], javascript: [2, 3], python: [2, 3] },
    },
    FORWARD_PASS: {
      title: "Forward Pass",
      message: "Bubbling largest element forward to index {end}.\n\n• Current scan k: {k}.\n• Target boundary: {end}.",
      highlights: { pseudo: [2, 3, 4], javascript: [4, 5, 6], python: [4, 5, 6] },
    },
    BACKWARD_PASS: {
      title: "Backward Pass",
      message:
        "Bubbling smallest element backward to index {start}.\n\n• Current scan k: {k}.\n• Target boundary: {start}.",
      highlights: { pseudo: [5, 6, 7], javascript: [8, 9, 10], python: [8, 9, 10] },
    },
    SWAPPED: {
      title: "Swapped",
      message:
        "Elements at {k} and {kPlusOne} swapped.\n\n• Local inversion resolved.\n• State marked as 'swapped' for convergence check.",
      highlights: { pseudo: 4, javascript: 7, python: 7 },
    },
    SORTED: {
      title: "Sorted ✓",
      message:
        "Sorting Complete.\n\n• No inversions found during bidirectional passes.\n• Array satisfies global sorted invariant.",
      highlights: { pseudo: 1, javascript: 1, python: 1 },
    },
  },

  codeSnippets: {
    pseudo: `function cocktailSort(arr):
  start = 0, end = arr.length - 1, swapped = true
  while swapped:
    swapped = false
    for i from start to end - 1:
      if arr[i] > arr[i + 1]:
        swap(arr[i], arr[i + 1])
        swapped = true
    if not swapped: break
    swapped = false
    end = end - 1
    for i from end - 1 down to start:
      if arr[i] > arr[i + 1]:
        swap(arr[i], arr[i + 1])
        swapped = true
    start = start + 1`,
    javascript: `function cocktailSort(arr) {
  let start = 0, end = arr.length - 1, swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    start++;
  }
}`,
    python: `def cocktail_shaker_sort(arr):
    start = 0
    end = len(arr) - 1
    swapped = True
    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped: break
        swapped = False
        end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1`,
  },

  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [7, 1, 6, 2, 5, 3, 8, 4];
    return {
      phase: 1,
      start: 0,
      end: array.length - 1,
      k: 0,
      swapped: false,
      direction: 1,
      passes: 1,
      array,
      activeIndices: [0, 1],
      sortedIndices: [],
      swapIndices: [],
      comparisons: 0,
      log: {
        title: "PASS 1",
        type: "info",
        messageKey: "READY",
        params: { val0: array[0], val1: array[1] },
      },
    };
  },

  nextStep: (state) => {
    const { array, start, end, k, swapped, direction, phase, sortedIndices, passes } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 1) {
      // Comparison
      const isDone = direction === 1 ? k >= end : k < start;

      if (isDone) {
        if (!swapped) {
          return {
            ...newState,
            isFinished: true,
            sortedIndices: [...new Array(n).keys()],
            log: { title: "SORTED ✓", type: "success", messageKey: "SORTED" },
          };
        }

        // Prepare next pass
        if (direction === 1) {
          const newEnd = end - 1;
          const nextK = newEnd - 1;
          return {
            ...newState,
            direction: -1,
            end: newEnd,
            k: nextK,
            swapped: false,
            passes: passes + 1,
            sortedIndices: [...sortedIndices, end],
            activeIndices: nextK >= start ? [nextK, nextK + 1] : [],
            log: {
              title: "BACKWARD PASS",
              type: "info",
              messageKey: "BACKWARD_PASS",
              params: { end: end, k: nextK, start: start },
            },
          };
        } else {
          const newStart = start + 1;
          const nextK = newStart;
          return {
            ...newState,
            direction: 1,
            start: newStart,
            k: nextK,
            swapped: false,
            passes: passes + 1,
            sortedIndices: [...sortedIndices, start],
            activeIndices: nextK < end ? [nextK, nextK + 1] : [],
            log: {
              title: "FORWARD PASS",
              type: "info",
              messageKey: "FORWARD_PASS",
              params: { start: start, k: nextK, end: end },
            },
          };
        }
      }

      newState.comparisons += 1;
      newState.activeIndices = [k, k + 1];

      if (array[k] > array[k + 1]) {
        return {
          ...newState,
          phase: 2,
          log: {
            title: "OUT OF ORDER",
            type: "mismatch",
            messageKey: "OUT_OF_ORDER",
            params: { k: k, valK: array[k], kPlusOne: k + 1, valKPlusOne: array[k + 1] },
          },
        };
      }

      const nextK = k + direction;
      return {
        ...newState,
        k: nextK,
        activeIndices: (direction === 1 ? nextK < end : nextK >= start) ? [nextK, nextK + 1] : [],
        log: {
          title: direction === 1 ? "FORWARD PASS" : "BACKWARD PASS",
          type: "match",
          messageKey: "IN_ORDER",
          params: { k: k, valK: array[k], kPlusOne: k + 1, valKPlusOne: array[k + 1] },
        },
      };
    }

    if (phase === 2) {
      // Swap
      const newArray = [...array];
      [newArray[k], newArray[k + 1]] = [newArray[k + 1], newArray[k]];
      const nextK = k + direction;
      const isKValid = direction === 1 ? nextK < end : nextK >= start;

      return {
        ...newState,
        array: newArray,
        phase: 1,
        swapped: true,
        swapIndices: [k, k + 1],
        k: nextK,
        activeIndices: isKValid ? [nextK, nextK + 1] : [],
        log: {
          title: "SWAPPED",
          type: "shift",
          messageKey: "SWAPPED",
          params: { k: k, kPlusOne: k + 1, valK: newArray[k], valKPlusOne: newArray[k + 1] },
        },
      };
    }

    return newState;
  },
});
