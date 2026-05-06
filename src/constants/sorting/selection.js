import { createAlgorithmCard } from '../factory';

export const selection = createAlgorithmCard({
  id: 'selection',
  
  // --- Metadata ---
  metadata: {
    type: 'sorting',
    visualizerType: 'array',
    category: 'Sorting Algorithms',
    defaultInputs: { target: '5, 3, 8, 1, 9, 2, 7, 4', pattern: '' },
  },

  homeCard: {
    name: 'Selection Sort',
    difficulty: 'Easy',
    description: 'Repeatedly finds the minimum element from the unsorted part and moves it to the beginning.',
    complexity: {
      timeBest: 'Ω(n^2)',
      timeAvg: 'Θ(n^2)',
      timeWorst: 'O(n^2)',
      space: 'O(1)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Iteration: {i}',
      startButton: 'Start Sorting',
      playbackSpeed: 200
    },
    extendedDescription: 'Selection Sort is a simple comparison-based sorting algorithm. The algorithm divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly finds the smallest (or largest) element in the unsorted part and swaps it with the first element of the unsorted part.',
      legendItems: [
      { label: 'Unsorted', color: 'bg-slate-800 border-slate-700' },
      { label: 'Minimum', color: 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' },
      { label: 'Current', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Sorted', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
    ],
  },

  // --- Visual Steps & Code ---
  visualSteps: {
    READY: {
      title: 'Ready',
      message: "Commencing Selection Sort: A comparison-based in-place sort.\n\n• Mechanism: Iteratively identifying the minimum element from the unsorted partition.\n\n• Note: Performance is O(n²) regardless of initial order due to consistent linear scans.",
      highlights: { pseudo: [1, 2], javascript: [2, 3], python: [2, 3], csharp: [2, 3] }
    },
    COMPARING: {
      title: 'Comparing',
      message: "Comparison: Evaluating {val} against current candidate {minVal}.",
      highlights: { pseudo: [4, 5], javascript: 5, python: 5, csharp: 6 }
    },
    NEW_MINIMUM: {
      title: 'New Minimum',
      message: "Candidate Update: {val} < current minimum ({oldVal}).\n\n• Redefining the local minimum candidate to index {j}.\n\n• Continuing scan for potential smaller elements.",
      highlights: { pseudo: [5, 6], javascript: 6, python: 6, csharp: 7 }
    },
    MINIMUM_FOUND: {
      title: 'Minimum Found',
      message: "Linear Scan Resolved.\n\n• Identified global minimum in current unsorted segment: {val}.\n\n• Ready to perform index stabilization at index {i}.",
      highlights: { pseudo: 7, javascript: 4, python: 4, csharp: 5 }
    },
    SWAP_EXECUTED: {
      title: 'Swapping',
      message: "In-place Swap Complete.\n\n• Value {val} is now stabilized at index {i}.\n\n• This index is now part of the final sorted partition.",
      highlights: { pseudo: 7, javascript: 10, python: 8, csharp: [10, 11, 12] }
    },
    SORTED: {
      title: 'Sorted ✓',
      message: "Selection Chain Complete.\n\n• Global array invariant satisfied: Fully Ordered.",
      highlights: { pseudo: [1, 2, 7], javascript: 13, python: 9, csharp: [1, 2] }
    }
  },

  codeSnippets: {
    pseudo: `SelectionSort(A):
  for i from 0 to n-2:
    minIdx = i
    for j from i+1 to n-1:
      if A[j] < A[minIdx]:
        minIdx = j
    swap(A[i], A[minIdx])`,
    javascript: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // Swap arr[i] and arr[minIdx]
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    csharp: `public void SelectionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`
  },

  // --- Logic ---
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [5, 3, 8, 1, 9, 2, 7, 4];
    return {
      phase: 1, i: 0, j: 1, minIdx: 0,
      array, activeIndices: [0, 1], sortedIndices: [], swapIndices: [], comparisons: 0,
      log: {
        title: 'Selection Sort',
        type: 'info',
        messageKey: 'READY',
      }
    };
  },

  nextStep: (state) => {
    const { array, i, j, minIdx, phase, sortedIndices } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 1) { // Scanning for minimum
      if (j >= n) {
        return { 
          ...newState, phase: 2, activeIndices: [i, minIdx],
          log: { title: 'Minimum Found', type: 'match', messageKey: 'MINIMUM_FOUND', params: { val: array[minIdx], i } } 
        };
      }

      newState.comparisons += 1;
      newState.activeIndices = [j, minIdx];
      if (array[j] < array[minIdx]) {
        return { 
          ...newState, minIdx: j, j: j + 1, activeIndices: [j],
          log: { title: 'New Minimum', type: 'mismatch', messageKey: 'NEW_MINIMUM', params: { val: array[j], oldVal: array[minIdx], j } } 
        };
      }
      return { 
        ...newState, j: j + 1,
        log: { title: 'Comparing', type: 'info', messageKey: 'COMPARING', params: { val: array[j], minVal: array[minIdx] } } 
      };
    }

    if (phase === 2) { // Swapping
      const newArray = [...array];
      [newArray[i], newArray[minIdx]] = [newArray[minIdx], newArray[i]];
      const nextI = i + 1;
      const newSorted = [...sortedIndices, i];

      if (nextI >= n - 1) {
        return { 
          ...newState, array: newArray, isFinished: true, 
          sortedIndices: [...new Array(n).keys()], activeIndices: [],
          log: { title: 'Sorted ✓', type: 'success', messageKey: 'SORTED' } 
        };
      }

      return {
        ...newState, array: newArray, phase: 1, i: nextI, j: nextI + 1, minIdx: nextI,
        sortedIndices: newSorted, swapIndices: [i, minIdx], activeIndices: [nextI, nextI + 1],
        log: { title: 'Swapped', type: 'shift', messageKey: 'SWAP_EXECUTED', params: { val: newArray[i], i } }
      };
    }
    return newState;
  }
});
