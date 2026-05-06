import { createAlgorithmCard } from '../factory';

/**
 * Quickselect Algorithm Module
 * Used to find the k-th smallest element in an unordered list.
 */
export const quickselect = createAlgorithmCard({
  id: 'quickselect',
  
  // --- Metadata ---
  metadata: {
    type: 'searching',
    visualizerType: 'array',
    category: 'Searching Algorithms',
    defaultInputs: { target: '3', pattern: '5, 2, 8, 3, 9, 1, 7, 4' },
  },

  homeCard: {
    name: 'Quickselect',
    difficulty: 'Medium',
    description: 'A selection algorithm to find the k-th smallest element in an unordered list.',
    complexity: {
      timeBest: 'Ω(n)',
      timeAvg: 'Θ(n)',
      timeWorst: 'O(n²)',
      space: 'O(1)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'K: {targetK}',
      startButton: 'Start Quickselect',
      playbackSpeed: 300
    },
    extendedDescription: 'Quickselect is a selection algorithm related to the QuickSort sorting algorithm. It has average-case linear time complexity. Like QuickSort, it is efficient in practice and has good cache performance.',
    legendItems: [
        { label: "Unsorted", color: "bg-slate-800 border-slate-700" },
        { label: "Pivot", color: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" },
        { label: "Scanning", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
        { label: "Found", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
      ],
    visualSteps: {
      INITIALIZING: {
        title: 'Initializing',
        message: "Commencing Quickselect: A selection algorithm with average linear time complexity.\n\n• Objective: Identifying the {targetK}-th smallest element (Target Index: {k}).\n• Mechanism: Utilizing partitioning logic similar to Quicksort to isolate the k-th position.",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      START_PARTITION: {
        title: 'Start Partition',
        message: "Isolating Domain [{l}, {r}].\n\n• Strategy: Choosing pivot '{pivot}' from the current segment.\n• Objective: Rearranging elements so that those smaller than the pivot reside on its left.",
        highlights: { pseudo: [2], javascript: [4], python: [4] }
      },
      SWAP_SMALLER: {
        title: 'Swap Smaller',
        message: "Partitioning: {val} < {pivot}.\n\n• Action: Moving '{val}' to the 'smaller' partition at index {i}.\n• Strategy: Building the left-side segment of elements smaller than the pivot.",
        highlights: { pseudo: [3], javascript: [6], python: [6] }
      },
      CONTINUE_SCAN: {
        title: 'Continue Scan',
        message: "Partitioning: {val} ≥ {pivot}.\n\n• Logic: Element '{val}' belongs to the 'larger' partition.\n• Action: Continuing scan at the next index.",
        highlights: { pseudo: [3], javascript: [7], python: [7] }
      },
      PIVOT_PLACED: {
        title: 'Pivot Placed',
        message: "Pivot Alignment Finalized.\n\n• Result: Pivot '{pivot}' moved to its final sorted position at index {i}.\n• Note: All elements to the left are smaller, and all to the right are larger.",
        highlights: { pseudo: [4], javascript: [9], python: [9] }
      },
      FOUND: {
        title: 'Match Found ✓',
        message: "Target Synchronized!\n\n• Result: The pivot landed exactly at index {k}.\n• Conclusion: The {kPlusOne}-th smallest element is confirmed as {val}.",
        highlights: { pseudo: [5], javascript: [11], python: [11] }
      },
      SEARCH_LEFT: {
        title: 'Search Left',
        message: "Strategic Branching: pivotIndex ({pivotIdx}) > k ({k}).\n\n• Deduction: The target {targetK}-th element must reside in the LEFT partition.\n• Action: Pruning the right partition and recursing into [{l}, {pivotIdxMinusOne}].",
        highlights: { pseudo: [6], javascript: [13], python: [13] }
      },
      SEARCH_RIGHT: {
        title: 'Search Right',
        message: "Strategic Branching: pivotIndex ({pivotIdx}) < k ({k}).\n\n• Deduction: The target {targetK}-th element must reside in the RIGHT partition.\n• Action: Pruning the left partition and recursing into [{pivotIdxPlusOne}, {r}].",
        highlights: { pseudo: [7], javascript: [15], python: [15] }
      },
      ERROR: {
        title: 'Error',
        message: "Domain Violation: Search space exhausted without locating the target index.",
        highlights: { pseudo: [], javascript: [], python: [] }
      }
    }
  },
  codeSnippets: {
    pseudo: `function quickselect(list, left, right, k):
  if left == right: return list[left]
  pivotIndex = partition(list, left, right)
  if k == pivotIndex: return list[k]
  else if k < pivotIndex:
    return quickselect(list, left, pivotIndex - 1, k)
  else:
    return quickselect(list, pivotIndex + 1, right, k)`,
    javascript: `function quickselect(arr, left, right, k) {
  if (left === right) return arr[left];
  let pivotIndex = partition(arr, left, right);
  if (k === pivotIndex) return arr[k];
  else if (k < pivotIndex) return quickselect(arr, left, pivotIndex - 1, k);
  else return quickselect(arr, pivotIndex + 1, right, k);
}`,
    python: `def quickselect(arr, left, right, k):
    if left == right: return arr[left]
    pivot_index = partition(arr, left, right)
    if k == pivot_index: return arr[k]
    elif k < pivot_index:
        return quickselect(arr, left, pivot_index - 1, k)
    else:
        return quickselect(arr, pivot_index + 1, right, k)`
  },

  // --- Logic ---
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? [...t] : [5, 2, 8, 3, 9, 1, 7, 4];
    let kInput = p;
    if (Array.isArray(p)) kInput = p[0];
    const parsedK = typeof kInput === 'number' ? kInput : Number.parseInt(kInput, 10);
    const targetK = Number.isNaN(parsedK) ? 3 : parsedK;
    const k = Math.max(0, targetK - 1); 

    return {
      phase: 0,
      k: k,
      targetK: targetK,
      l: 0,
      r: array.length - 1,
      array: array,
      activeIndices: [],
      sortedIndices: [],
      pivotIndex: -1,
      isFinished: false,
      comparisons: 0,
      log: {
        title: 'INITIALIZING',
        type: 'info',
        messageKey: 'INITIALIZING',
        params: { k: k, targetK: targetK }
      }
    };
  },

  nextStep: (state) => {
    const { array, l, r, k, phase } = state;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    if (l > r) {
      return { ...newState, isFinished: true, log: { title: 'ERROR', type: 'mismatch', messageKey: 'ERROR' } };
    }

    if (phase === 0) {
      const pivot = array[r];
      return {
        ...newState,
        phase: 1,
        pivot,
        pivotIndex: r,
        i: l,
        j: l,
        log: {
          title: 'START PARTITION',
          type: 'info',
          messageKey: 'START_PARTITION',
          params: { l: l, r: r, pivot: pivot, k: k }
        }
      };
    }

    if (phase === 1) {
      const { i, j, pivot } = state;
      if (j < r) {
        newState.activeIndices = [j, r];
        if (array[j] < pivot) {
          const newArray = [...array];
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          return {
            ...newState,
            array: newArray,
            i: i + 1,
            j: j + 1,
            log: {
              title: 'SWAP SMALLER',
              type: 'match',
              messageKey: 'SWAP_SMALLER',
              params: { val: array[j], pivot: pivot, i: i }
            }
          };
        } else {
          return {
            ...newState,
            j: j + 1,
            log: {
              title: 'CONTINUE SCAN',
              type: 'info',
              messageKey: 'CONTINUE_SCAN',
              params: { val: array[j], pivot: pivot }
            }
          };
        }
      } else {
        const newArray = [...array];
        [newArray[i], newArray[r]] = [newArray[r], newArray[i]];
        return {
          ...newState,
          array: newArray,
          phase: 2,
          pivotIndex: i,
          log: {
            title: 'PIVOT PLACED',
            type: 'shift',
            messageKey: 'PIVOT_PLACED',
            params: { i: i }
          }
        };
      }
    }

    if (phase === 2) {
      const pivotIdx = state.pivotIndex;
      if (pivotIdx === k) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [pivotIdx],
          log: {
            title: 'FOUND ✓',
            type: 'success',
            messageKey: 'FOUND',
            params: { k: k, kPlusOne: k + 1, val: array[pivotIdx] }
          }
        };
      } else if (pivotIdx > k) {
        return {
          ...newState,
          phase: 0,
          l,
          r: pivotIdx - 1,
          log: {
            title: 'SEARCH LEFT',
            type: 'shift',
            messageKey: 'SEARCH_LEFT',
            params: { pivotIdx: pivotIdx, k: k, l: l, pivotIdxMinusOne: pivotIdx - 1 }
          }
        };
      } else {
        return {
          ...newState,
          phase: 0,
          l: pivotIdx + 1,
          r,
          log: {
            title: 'SEARCH RIGHT',
            type: 'shift',
            messageKey: 'SEARCH_RIGHT',
            params: { pivotIdx: pivotIdx, k: k, pivotIdxPlusOne: pivotIdx + 1, r: r }
          }
        };
      }
    }

    return newState;
  }
});
