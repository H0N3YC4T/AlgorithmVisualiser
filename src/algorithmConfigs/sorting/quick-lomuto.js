import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const quicklomuto = createAlgorithmPage({
  id: "quicklomuto",

  // --- Metadata ---
  metadata: {
    type: "sorting",
    VisualiserType: "array",
    category: "Sorting Algorithms",
    defaultInputs: { target: "6, 2, 8, 4, 9, 3, 7, 5", pattern: "" },
  },

  homeCard: {
    name: "Quick Sort (Lomuto)",
    difficulty: "Medium",
    description: "An efficient divide-and-conquer sort that uses the Lomuto partition scheme with a fixed pivot.",
    complexity: {
      timeBest: "Ω(n log(n))",
      timeAvg: "Θ(n log(n))",
      timeWorst: "O(n^2)",
      space: "O(log(n))",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Segment: [{l}..{r}]",
      startButton: "Start",
      playbackSpeed: 200,
    },
    extendedDescription:
      "Quick Sort (Lomuto) is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays. The Lomuto partition scheme chooses a pivot that is typically the last element in the array. The algorithm maintains two pointers as it scans the array, one to track the boundary of the smaller elements and another to scan the array.",
    legendItems: [
      { label: "Unsorted", color: "bg-slate-800 border-slate-700" },
      { label: "Pivot", color: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" },
      { label: "Scanning", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Smaller", color: "bg-sky-500/60" },
      { label: "Sorted", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
    ],
  },

  // --- Visual Steps & Code ---
  visualSteps: {
    READY: {
      title: "Ready",
      message:
        "Initializing Quick Sort using the Lomuto Partition Scheme.\n\n• Strategy: Select a pivot and partition the array around it.\n\n• Optimization: Using fixed pivot (last element) for clarity in demonstrating basic partitioning.",
      highlights: {
        pseudo: [1, 2, 3, 4, 5],
        javascript: [1, 2, 3, 4, 5],
        python: [1, 2, 3, 4, 5],
        csharp: [1, 2, 3, 4, 5],
      },
    },
    START_PARTITION: {
      title: "Partitioning",
      message:
        "Partitioning subarray [{l}..{r}] with pivot {pivot}.\n\n• The boundary 'i' will track the tail of elements ≤ pivot.\n\n• Scan pointer 'j' will iterate through the segment.",
      highlights: {
        pseudo: [7, 8, 9, 10],
        javascript: [10, 11, 12, 13],
        python: [9, 10, 11, 12],
        csharp: [9, 10, 11, 12],
      },
    },
    SWAP_SMALLER: {
      title: "Swapping",
      message:
        "Element {val} < pivot ({pivot}).\n\n• Incrementing partition boundary 'i' to index {nextI}.\n\n• Performing in-place swap to move {val} into lower partition.",
      highlights: { pseudo: [11, 12, 13], javascript: [14, 15, 16], python: [13, 14, 15], csharp: [13, 14, 15, 16] },
    },
    KEEP_LARGER: {
      title: "Comparing",
      message:
        "Element {val} ≥ pivot ({pivot}).\n\n• This element belongs in the upper partition.\n\n• Advancing scan pointer 'j' without moving the boundary.",
      highlights: { pseudo: [11], javascript: [14], python: [13], csharp: [13] },
    },
    PLACE_PIVOT: {
      title: "Placing Pivot",
      message:
        "Partitioning segment scan complete.\n\n• Finalizing: Moving pivot {pivot} from index {r} to its resolved position at {pivotPos}.\n\n• This ensures all elements to the left are ≤ pivot.",
      highlights: { pseudo: 14, javascript: 19, python: 16, csharp: [18, 19, 20] },
    },
    PIVOT_PLACED: {
      title: "Pivot Placed",
      message:
        "Pivot successfully resolved at index {pivotPos}.\n\n• Invariant: The element at {pivotPos} is in its final sorted position.\n\n• Recursively applying the same logic to sub-segments.",
      highlights: { pseudo: 14, javascript: 19, python: 16, csharp: [18, 19, 20] },
    },
    SORTED: {
      title: "Sorted ✓",
      message:
        "All recursive partitions have been resolved.\n\n• Pivot invariants satisfied across the global array.\n\n• Sort execution completed successfully.",
      highlights: { pseudo: [1, 2, 3, 4, 5], javascript: 7, python: 7, csharp: 1 },
    },
  },

  codeSnippets: {
    pseudo: `QuickSort(A, low, high):
  if low < high:
    p = Partition(A, low, high)
    QuickSort(A, low, p - 1)
    QuickSort(A, p + 1, high)

Partition(A, low, high):
  pivot = A[high]
  i = low
  for j from low to high - 1:
    if A[j] < pivot:
      swap A[i] with A[j]
      i = i + 1
  swap A[i] with A[high]
  return i`,
    javascript: `function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  let pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}`,
    python: `def quick_sort(arr, left=0, right=None):
    if right is None: right = len(arr) - 1
    if left < right:
        pivot_index = partition(arr, left, right)
        quick_sort(arr, left, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, right)
    return arr

def partition(arr, left, right):
    pivot = arr[right]
    i = left - 1
    for j in range(left, right):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[right] = arr[right], arr[i + 1]
    return i + 1`,
    csharp: `public void QuickSort(int[] arr, int left, int right) {
    if (left < right) {
        int pivotIndex = Partition(arr, left, right);
        QuickSort(arr, left, pivotIndex - 1);
        QuickSort(arr, pivotIndex + 1, right);
    }
}

private int Partition(int[] arr, int left, int right) {
    int pivot = arr[right];
    int i = left - 1;
    for (int j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp2 = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = temp2;
    return i + 1;
}`,
  },

  // --- Logic ---
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [6, 2, 8, 4, 9, 3, 7, 5];
    const n = array.length;
    const calls = [{ low: 0, high: n - 1 }];
    return {
      array,
      calls,
      currentCall: null,
      phase: "READY",
      partitionState: null,
      activeIndices: [],
      pivotIndex: null,
      sortedIndices: [],
      swapIndices: [],
      comparisons: 0,
      log: { title: "Quick Sort (Lomuto)", type: "info", messageKey: "READY" },
    };
  },

  nextStep: (state) => {
    const { array, calls, phase, partitionState, currentCall, sortedIndices } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === "READY" || phase === "SORTED_SEGMENT") {
      if (calls.length === 0) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [...new Array(array.length).keys()],
          log: { title: "Sorted ✓", type: "success", messageKey: "SORTED" },
        };
      }

      const nextCall = calls.pop();
      if (nextCall.low >= nextCall.high) {
        if (nextCall.low === nextCall.high) newState.sortedIndices = [...sortedIndices, nextCall.low];
        return { ...newState, phase: "SORTED_SEGMENT" };
      }

      const pivot = array[nextCall.high];
      return {
        ...newState,
        phase: "PARTITIONING",
        currentCall: nextCall,
        partitionState: { i: nextCall.low, j: nextCall.low, pivot },
        activeIndices: [nextCall.high],
        pivotIndex: nextCall.high,
        log: {
          title: "Partitioning",
          type: "info",
          messageKey: "START_PARTITION",
          params: { l: nextCall.low, r: nextCall.high, pivot },
        },
      };
    }

    if (phase === "PARTITIONING") {
      const { high } = currentCall;
      const { i, j, pivot } = partitionState;

      if (j < high) {
        newState.comparisons += 1;
        if (array[j] < pivot) {
          const newArray = [...array];
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          return {
            ...newState,
            array: newArray,
            partitionState: { ...partitionState, i: i + 1, j: j + 1 },
            activeIndices: [i, j],
            swapIndices: [i, j],
            pivotIndex: high,
            log: {
              title: "Swapping",
              type: "match",
              messageKey: "SWAP_SMALLER",
              params: { val: array[j], pivot, nextI: i + 1 },
            },
          };
        } else {
          return {
            ...newState,
            partitionState: { ...partitionState, j: j + 1 },
            activeIndices: [j],
            pivotIndex: high,
            log: { title: "Comparing", type: "info", messageKey: "KEEP_LARGER", params: { val: array[j], pivot } },
          };
        }
      }

      // Final swap with pivot
      const newArray = [...array];
      [newArray[i], newArray[high]] = [newArray[high], newArray[i]];
      return {
        ...newState,
        array: newArray,
        phase: "PIVOT_PLACED_PHASE",
        pivotPos: i,
        activeIndices: [i, high],
        swapIndices: [i, high],
        log: {
          title: "Placing Pivot",
          type: "shift",
          messageKey: "PLACE_PIVOT",
          params: { pivot, r: high, pivotPos: i },
        },
      };
    }

    if (phase === "PIVOT_PLACED_PHASE") {
      const { low, high } = currentCall;
      const { pivotPos } = state;
      const newCalls = [...calls];
      newCalls.push({ low: pivotPos + 1, high: high });
      newCalls.push({ low: low, high: pivotPos - 1 });

      return {
        ...newState,
        phase: "SORTED_SEGMENT",
        calls: newCalls,
        sortedIndices: [...sortedIndices, pivotPos],
        pivotIndex: null,
        log: { title: "Pivot Placed", type: "success", messageKey: "PIVOT_PLACED", params: { pivotPos } },
      };
    }

    return newState;
  },
});
