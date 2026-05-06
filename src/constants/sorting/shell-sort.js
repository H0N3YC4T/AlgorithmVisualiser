/** Shell Sort Module */
import { createAlgorithmCard } from '../factory';

export const shellsort = createAlgorithmCard({
  id: 'shellsort',
  
  // --- Metadata ---
  metadata: {
    type: 'sorting',
    visualizerType: 'array',
    category: 'Sorting Algorithms',
    defaultInputs: { target: '23, 29, 15, 19, 31, 7, 9, 5, 2', pattern: '' },
  },

  homeCard: {
    name: 'Shell Sort',
    difficulty: 'Medium',
    description: 'Optimized insertion sort by using gaps to compare elements that are far apart.',
    complexity: {
      timeBest: 'Ω(n log n)',
      timeAvg: 'Θ(n(log n)^2)',
      timeWorst: 'O(n^2)',
      space: 'O(1)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Gap: {gap}',
      startButton: 'Start Sorting',
      playbackSpeed: 200
    },
    extendedDescription: 'Shell Sort is a generalization of insertion sort that allows the exchange of items that are far apart. The distance between elements decreases until it becomes 1 (standard insertion sort).',
    legendItems: [
      { label: 'Unsorted', color: 'bg-slate-800/40 border-slate-700/50' },
      { label: 'Checking', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Swap', color: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' },
      { label: 'Sorted', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
    ],
  },

  // --- Visual Steps ---
  visualSteps: {
    READY: {
      title: 'Ready',
      message: "Diminishing Increment Sort Initiated.\n\n• Principle: Perform insertion sort on sub-lists of elements spaced by a 'gap'.\n• Strategy: Gradually reduce the gap to 1 to finalize the sort.",
      highlights: { pseudo: [1], javascript: [1], python: [1] }
    },
    GAP_SIZE: {
      title: 'Gap Reduction',
      message: "Reducing gap size to {gap}.\n\n• Sub-lists are now defined by elements {gap} positions apart.\n• Performing insertion sort on these coarse-grained sub-lists.",
      highlights: { pseudo: [2], javascript: [2], python: [2] }
    },
    INSERTION_AT_GAP: {
      title: 'Insertion Scan',
      message: "Processing element {val} at index {i}.\n\n• Comparing with elements {gap} positions behind.",
      highlights: { pseudo: [3, 4], javascript: [3, 4], python: [3, 4] }
    },
    GAP_SWAP: {
      title: 'Gap Swap',
      message: "Swapping {valLeft} and {valRight} across gap {gap}.\n\n• Long-distance exchange reduces overall inversions quickly.",
      highlights: { pseudo: 5, javascript: 5, python: 5 }
    },
    SORT_COMPLETE: {
      title: 'Sorted ✓',
      message: "Shell Sort Finalized.\n\n• Final pass with gap=1 completed.\n• Array is fully sorted.",
      highlights: { pseudo: 6, javascript: 6, python: 6 }
    }
  },

  codeSnippets: {
    pseudo: `function shellSort(arr):
  n = arr.length
  gap = floor(n / 2)
  while gap > 0:
    for i from gap to n-1:
      temp = arr[i], j = i
      while j >= gap and arr[j - gap] > temp:
        arr[j] = arr[j - gap]
        j -= gap
      arr[j] = temp
    gap = floor(gap / 2)
  return arr`,
    javascript: `function shellSort(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
    python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`
  },
    const array = Array.isArray(t) ? t : [23, 29, 15, 19, 31, 7, 9, 5, 2];
    return {
      phase: 0, gap: Math.floor(array.length / 2), i: Math.floor(array.length / 2),
      j: Math.floor(array.length / 2), array,
      activeIndices: [], sortedIndices: [], swapIndices: [], comparisons: 0,
      log: { title: 'READY', type: 'info', messageKey: 'READY' }
    };
  },

  nextStep: (state) => {
    const { array, gap, i, j, phase } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      if (gap <= 0) {
        return {
          ...newState, isFinished: true, sortedIndices: [...new Array(n).keys()],
          log: { title: 'SORTED ✓', type: 'success', messageKey: 'SORT_COMPLETE' }
        };
      }
      return {
        ...newState, phase: 1, i: gap,
        log: { title: `GAP SIZE: ${gap}`, type: 'info', messageKey: 'GAP_SIZE', params: { gap } }
      };
    }

    if (phase === 1) {
      if (i >= n) {
        return {
          ...newState, phase: 0, gap: Math.floor(gap / 2),
          log: { title: 'PASS FINISHED', type: 'match', messageKey: 'PASS_FINISHED', params: { gap } }
        };
      }
      return {
        ...newState, phase: 2, j: i,
        log: { title: `INSERTION AT GAP`, type: 'info', messageKey: 'INSERTION_AT_GAP', params: { val: array[i], i } }
      };
    }

    if (phase === 2) {
      if (j < gap || array[j - gap] <= array[j]) {
        return {
          ...newState, phase: 1, i: i + 1, activeIndices: [j],
          log: { title: 'POSITION FOUND', type: 'match', messageKey: 'POSITION_FOUND', params: { j: j } }
        };
      }

      newState.comparisons += 1;
      newState.activeIndices = [j, j - gap];

      const newArray = [...array];
      [newArray[j], newArray[j - gap]] = [newArray[j - gap], newArray[j]];

      return {
        ...newState, array: newArray, j: j - gap, swapIndices: [j, j - gap],
        log: { title: 'GAP SWAP', type: 'shift', messageKey: 'GAP_SWAP', params: { valLeft: array[j - gap], valRight: array[j], gap } }
      };
    }

    return newState;
  }
});
