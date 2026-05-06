import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const merge = createAlgorithmPage({
  id: "merge",

  // --- Metadata ---
  metadata: {
    type: "sorting",
    VisualiserType: "array",
    category: "Sorting Algorithms",
    defaultInputs: { target: "5, 2, 8, 3, 9, 1, 7, 4", pattern: "" },
  },

  homeCard: {
    name: "Merge Sort",
    difficulty: "Hard",
    description: "A stable divide-and-conquer sort that recursively divides the array and merges sorted halves.",
    complexity: {
      timeBest: "Ω(n log(n))",
      timeAvg: "Θ(n log(n))",
      timeWorst: "O(n log(n))",
      space: "O(n)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Segment: [{l}..{r}]",
      startButton: "Start Sorting",
      playbackSpeed: 200,
    },
    extendedDescription: "Merge Sort is a stable, comparison-based, divide and conquer sorting algorithm.",
    legendItems: [
      { label: "Unsorted", color: "bg-slate-800 border-slate-700" },
      { label: "Dividing", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Comparing", color: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" },
      { label: "Writing", color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
      { label: "Sorted", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
    ],
  },

  // --- Visual Steps & Code ---
  visualSteps: {
    READY: {
      title: "Ready",
      message:
        "Commencing Merge Sort: A stable Divide & Conquer algorithm.\n\n• Phase 1: Recursively decompose the array into unit-length sub-problems.\n\n• Phase 2: Systematically merge sorted segments to reconstruct the solution.",
      highlights: {
        pseudo: [1, 2, 3, 4, 5, 6],
        javascript: [1, 2, 3, 4, 5, 6, 7],
        python: [1, 2, 3, 4, 5, 6],
        csharp: [1, 2, 3, 4, 5, 6, 7],
      },
    },
    DIVIDING: {
      title: "Dividing",
      message:
        "Decomposing Range [{l}..{r}].\n\n• Split Point: Index {mid}.\n\n• Creating sub-problems: [{l}..{mid}] and [{midPlusOne}..{r}].",
      highlights: { pseudo: [3, 4, 5], javascript: [3, 4, 5, 6], python: [3, 4, 5], csharp: [3, 4, 5, 6] },
    },
    MERGING_SEGMENTS: {
      title: "Merging",
      message:
        "Merging segments [{l}..{mid}] and [{midPlusOne}..{r}].\n\n• Using a two-pointer approach to compare the leading elements.\n\n• Aiming to maintain the stable sort property.",
      highlights: {
        pseudo: [8, 9, 10, 11],
        javascript: [10, 11, 12, 13, 14, 15],
        python: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        csharp: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      },
    },
    TAKING_LEFT: {
      title: "Taking Left",
      message:
        "Comparison Result: Left[{val}] is the next candidate.\n\n• Moving {val} into the temporary sorted buffer.\n\n• Advancing the left-segment pointer.",
      highlights: { pseudo: 11, javascript: 12, python: [11, 12, 13, 14], csharp: 13 },
    },
    TAKING_RIGHT: {
      title: "Taking Right",
      message:
        "Comparison Result: Right[{val}] is the next candidate.\n\n• Moving {val} into the temporary sorted buffer.\n\n• Advancing the right-segment pointer.",
      highlights: { pseudo: 11, javascript: 13, python: [15, 16, 17], csharp: 14 },
    },
    COPYING_BACK: {
      title: "Finalizing Merge",
      message:
        "Segment Merge Resolved: Buffer contains sorted values for [{l}..{r}].\n\n• Finalizing: Overwriting the original segment with sorted results.\n\n• This step completes the 'conquer' part of the recursion.",
      highlights: { pseudo: 11, javascript: 15, python: [18, 19, 20], csharp: [16, 17, 18, 19] },
    },
    WRITING_VALUE: {
      title: "Memory Update",
      message: "Memory Update: Writing value {val} to primary array index {idx}.",
      highlights: { pseudo: 11, javascript: 15, python: [18, 19, 20], csharp: [16, 17, 18, 19] },
    },
    SORTED: {
      title: "Sorted ✓",
      message:
        "Global Merge Chain Complete.\n\n• All recursive call stacks have popped.\n\n• Array has been fully reconstructed into its sorted state.",
      highlights: { pseudo: [1, 2, 3, 4, 5, 6], javascript: 7, python: 7, csharp: 1 },
    },
  },

  codeSnippets: {
    pseudo: `MergeSort(A, p, r):
  if p < r:
    q = floor((p + r) / 2)
    MergeSort(A, p, q)
    MergeSort(A, q + 1, r)
    Merge(A, p, q, r)

Merge(A, p, q, r):
  L = A[p..q], R = A[q+1..r]
  Merge sorted L and R back into A[p..r]`,
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    python: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    csharp: `public int[] MergeSort(int[] arr) {
    if (arr.Length <= 1) return arr;
    int mid = arr.Length / 2;
    int[] left = MergeSort(arr.Take(mid).ToArray());
    int[] right = MergeSort(arr.Skip(mid).ToArray());
    return Merge(left, right);
}

private int[] Merge(int[] left, int[] right) {
    List<int> result = new List<int>();
    int i = 0, j = 0;
    while (i < left.Length && j < right.Length) {
        if (left[i] < right[j]) result.Add(left[i++]);
        else result.Add(right[j++]);
    }
    result.AddRange(left.Skip(i));
    result.AddRange(right.Skip(j));
    return result.ToArray();
}`,
  },

  // --- Logic ---
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [5, 2, 8, 3, 9, 1, 7, 4];
    const n = array.length;
    const steps = [];

    // Generate steps recursively
    const generateSteps = (l, r) => {
      if (l >= r) return;
      const mid = Math.floor((l + r) / 2);
      steps.push({ type: "DIVIDE", l, r, mid });
      generateSteps(l, mid);
      generateSteps(mid + 1, r);
      steps.push({ type: "MERGE", l, mid, r });
    };

    generateSteps(0, n - 1);

    return {
      array,
      originalArray: [...array],
      steps,
      stepPtr: 0,
      phase: "READY",
      l: 0,
      r: n - 1,
      mid: Math.floor((n - 1) / 2),
      activeIndices: [],
      sortedIndices: [],
      comparisons: 0,
      log: {
        title: "Merge Sort",
        type: "info",
        messageKey: "READY",
      },
    };
  },

  nextStep: (state) => {
    const { array, steps, stepPtr, phase } = state;
    if (stepPtr >= steps.length && phase === "DONE") return { ...state, isFinished: true };

    const currentStep = steps[stepPtr];
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === "READY" || phase === "DONE") {
      if (stepPtr >= steps.length) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [...new Array(array.length).keys()],
          log: { title: "Sorted ✓", type: "success", messageKey: "SORTED" },
        };
      }

      if (currentStep.type === "DIVIDE") {
        return {
          ...newState,
          phase: "DIVIDING",
          l: currentStep.l,
          r: currentStep.r,
          mid: currentStep.mid,
          activeIndices: [currentStep.l, currentStep.r, currentStep.mid],
          log: {
            title: "Dividing",
            type: "info",
            messageKey: "DIVIDING",
            params: { l: currentStep.l, r: currentStep.r, mid: currentStep.mid, midPlusOne: currentStep.mid + 1 },
          },
        };
      }

      if (currentStep.type === "MERGE") {
        const leftArr = array.slice(currentStep.l, currentStep.mid + 1);
        const rightArr = array.slice(currentStep.mid + 1, currentStep.r + 1);
        return {
          ...newState,
          phase: "MERGING",
          l: currentStep.l,
          r: currentStep.r,
          mid: currentStep.mid,
          leftArr,
          rightArr,
          i: 0,
          j: 0,
          k: currentStep.l,
          tempArr: [],
          activeIndices: [currentStep.l, currentStep.r],
          log: {
            title: "Merging",
            type: "info",
            messageKey: "MERGING_SEGMENTS",
            params: { l: currentStep.l, mid: currentStep.mid, midPlusOne: currentStep.mid + 1, r: currentStep.r },
          },
        };
      }
    }

    if (phase === "DIVIDING") {
      return { ...newState, phase: "DONE", stepPtr: stepPtr + 1 };
    }

    if (phase === "MERGING") {
      const { leftArr, rightArr, i, j, tempArr, l, mid, r } = state;

      if (i < leftArr.length && j < rightArr.length) {
        newState.comparisons += 1;
        if (leftArr[i] <= rightArr[j]) {
          const val = leftArr[i];
          return {
            ...newState,
            i: i + 1,
            tempArr: [...tempArr, val],
            activeIndices: [l + i, mid + 1 + j],
            log: { title: "Taking Left", type: "match", messageKey: "TAKING_LEFT", params: { val } },
          };
        } else {
          const val = rightArr[j];
          return {
            ...newState,
            j: j + 1,
            tempArr: [...tempArr, val],
            activeIndices: [l + i, mid + 1 + j],
            log: { title: "Taking Right", type: "mismatch", messageKey: "TAKING_RIGHT", params: { val } },
          };
        }
      }

      if (i < leftArr.length) {
        const val = leftArr[i];
        return {
          ...newState,
          i: i + 1,
          tempArr: [...tempArr, val],
          activeIndices: [l + i],
          log: { title: "Taking Left", type: "info", messageKey: "TAKING_LEFT", params: { val } },
        };
      }

      if (j < rightArr.length) {
        const val = rightArr[j];
        return {
          ...newState,
          j: j + 1,
          tempArr: [...tempArr, val],
          activeIndices: [mid + 1 + j],
          log: { title: "Taking Right", type: "info", messageKey: "TAKING_RIGHT", params: { val } },
        };
      }

      // Copy temp back to array
      const newArray = [...array];
      for (let x = 0; x < tempArr.length; x++) {
        newArray[l + x] = tempArr[x];
      }
      return {
        ...newState,
        array: newArray,
        phase: "DONE",
        stepPtr: stepPtr + 1,
        activeIndices: [...new Array(tempArr.length).keys()].map((x) => l + x),
        log: { title: "Copying Back", type: "shift", messageKey: "COPYING_BACK", params: { l, r } },
      };
    }

    return newState;
  },
});
