import { createAlgorithmCard } from '../factory';

/**
 * Exponential Search Algorithm Module
 */
export const exponentialsearch = createAlgorithmCard({
  id: 'exponentialsearch',
  
  // --- Metadata ---
  metadata: {
    type: 'searching',
    visualizerType: 'array',
    category: 'Searching Algorithms',
    defaultInputs: { target: '47', pattern: '3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53' },
  },

  homeCard: {
    name: 'Exponential Search',
    difficulty: 'Medium',
    description: 'Finds a range where the target may exist by doubling the index, then performs binary search.',
    complexity: {
      timeBest: 'Ω(1)',
      timeAvg: 'Θ(log n)',
      timeWorst: 'O(log n)',
      space: 'O(1)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Index: {i}',
      startButton: 'Start Exponential Search',
      playbackSpeed: 300
    },
    extendedDescription: 'Exponential Search starts by checking index 0. If not found, it repeatedly doubles the index (1, 2, 4, 8...) until it finds an element greater than the target or hits the end. Finally, it runs Binary Search on the range between the last two indices.',
      legendItems: [
        { label: 'Unsorted', color: 'bg-slate-800/40 border-slate-700/50' },
        { label: 'Jump Point', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
        { label: 'Binary Search', color: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' },
        { label: 'Found', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
      ],
    visualSteps: {
      READY: {
        title: 'Ready',
        message: "Commencing Exponential Search: A dynamic range-finding strategy.\n\n• Prerequisite: The search space MUST be sorted.\n• Strategy: Finding an upper bound for the search range by exponentially increasing the index (1, 2, 4, 8...).",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      FOUND_AT_0: {
        title: 'Found at 0 ✓',
        message: "Target Synchronized at Origin!\n\n• Result: arr[0] == {targetValue}.\n• Action: Immediate termination; target located at the first element.",
        highlights: { pseudo: [2], javascript: [4], python: [4] }
      },
      STARTING_JUMPS: {
        title: 'Starting Jumps',
        message: "Origin Mismatch. Initiating Exponential Probing.\n\n• Action: Setting the initial jump pointer to index 1.\n• Objective: Doubling the index until an element greater than '{targetValue}' is encountered.",
        highlights: { pseudo: [3], javascript: [5], python: [5] }
      },
      DOUBLING_INDEX: {
        title: 'Doubling Index',
        message: "Exponential Leap: Checking index {i} (Value: {val}).\n\n• Observation: {val} ≤ {targetValue}.\n• Action: Doubling search pointer from {i} to {nextI}.",
        highlights: { pseudo: [4], javascript: [6, 7], python: [6, 7] }
      },
      BOUNDS_FOUND: {
        title: 'Bounds Found',
        message: "Search Window Isolated: [{left}, {right}].\n\n• Deduction: The target MUST reside within this specific sub-range.\n• Strategy: Switching to Binary Search for logarithmic refinement.",
        highlights: { pseudo: [5], javascript: [9], python: [9] }
      },
      BS_CALC_MID: {
        title: 'BS: Calc Mid',
        message: "Binary Refinement: Range [{l}, {r}].\n\n• Midpoint: {mid} (Value: {val}).\n• Strategy: Bisecting the isolated exponential window.",
        highlights: { pseudo: [6], javascript: [11], python: [11] }
      },
      BS_MATCH_FOUND: {
        title: 'Match Found ✓',
        message: "Target Synchronized!\n\n• Result: Value located at index {mid} during binary refinement.\n• Note: Highly efficient O(log i) performance achieved.",
        highlights: { pseudo: [7], javascript: [12], python: [12] }
      },
      BS_SEARCH_RIGHT: {
        title: 'BS: Search Right',
        message: "Target is Greater ({val} < {targetValue}).\n\n• Action: Shifting binary search window to the right half: [{midPlusOne}, {r}].",
        highlights: { pseudo: [8], javascript: [14], python: [14] }
      },
      BS_SEARCH_LEFT: {
        title: 'BS: Search Left',
        message: "Target is Smaller ({val} > {targetValue}).\n\n• Action: Shifting binary search window to the left half: [{l}, {midMinusOne}].",
        highlights: { pseudo: [9], javascript: [16], python: [16] }
      },
      BS_NOT_FOUND: {
        title: 'Not Found',
        message: "Search Domain Exhausted.\n\n• Result: Target value '{targetValue}' not found within the exponential window.\n• Conclusion: Value is not present in the dataset.",
        highlights: { pseudo: [10], javascript: [18], python: [18] }
      }
    }
  },
  codeSnippets: {
    pseudo: `function exponentialSearch(arr, target):
  if arr[0] == target: return 0
  i = 1
  while i < arr.length and arr[i] <= target:
    i = i * 2
  return binarySearch(arr, target, i/2, min(i, arr.length-1))`,
    javascript: `function exponentialSearch(arr, target) {
  if (arr[0] === target) return 0;
  let i = 1;
  while (i < arr.length && arr[i] <= target) {
    i = i * 2;
  }
  return binarySearch(arr, target, i/2, Math.min(i, arr.length - 1));
}`,
    python: `def exponential_search(arr, target):
    if arr[0] == target: return 0
    i = 1
    while i < len(arr) and arr[i] <= target:
        i = i * 2
    return binary_search(arr, target, i//2, min(i, len(arr)-1))`
  },
  // --- Logic ---
  getInitialState: (p, t) => {
    const rawArray = Array.isArray(t) ? t : [3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53];
    const array = [...rawArray].sort((a, b) => a - b);
    const targetValue = typeof p === 'number' ? p : (Number.parseInt(p, 10) || 47);
    return {
      phase: 0,
      i: 1,
      l: 0,
      r: 0,
      mid: -1,
      targetValue: targetValue,
      array: array,
      activeIndices: [],
      sortedIndices: [],
      pivotIndex: -1,
      comparisons: 0,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY',
        params: { targetValue: targetValue }
      }
    };
  },

  nextStep: (state) => {
    const { targetValue, phase, array, i, l, r, mid } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    if (phase === 0) { // CHECK ZERO
      newState.activeIndices = [0];
      newState.comparisons += 1;
      if (array[0] === targetValue) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [0],
          log: { title: 'FOUND AT 0', type: 'success', messageKey: 'FOUND_AT_0' }
        };
      }
      return {
        ...newState,
        phase: 1,
        i: 1,
        log: { title: 'STARTING EXPONENTIAL JUMPS', type: 'info', messageKey: 'STARTING_JUMPS', params: { targetValue } }
      };
    }

    if (phase === 1) { // JUMPS
      if (i < n && array[i] <= targetValue) {
        newState.activeIndices = [i];
        newState.comparisons += 1;
        const nextI = i * 2;
        return {
          ...newState,
          i: nextI,
          log: { title: 'DOUBLING INDEX', type: 'info', messageKey: 'DOUBLING_INDEX', params: { i, val: array[i], targetValue, nextI } }
        };
      }
      const left = i / 2;
      const right = Math.min(i, n - 1);
      return {
        ...newState,
        phase: 2,
        l: left,
        r: right,
        log: { title: 'BOUNDS FOUND', type: 'match', messageKey: 'BOUNDS_FOUND', params: { left, right } }
      };
    }

    if (phase === 2) { // BS CALC
      if (l > r) {
        return {
          ...newState,
          isFinished: true,
          log: { title: 'NOT FOUND', type: 'mismatch', messageKey: 'BS_NOT_FOUND', params: { targetValue } }
        };
      }
      const nextMid = Math.floor((l + r) / 2);
      newState.pivotIndex = nextMid;
      newState.activeIndices = [l, r];
      return {
        ...newState,
        phase: 3,
        mid: nextMid,
        log: { title: 'BS: CALC MID', type: 'info', messageKey: 'BS_CALC_MID', params: { l, r, mid: nextMid, val: array[nextMid] } }
      };
    }

    if (phase === 3) { // BS COMPARE
      newState.comparisons += 1;
      newState.pivotIndex = mid;
      if (array[mid] === targetValue) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [mid],
          log: { title: 'MATCH FOUND!', type: 'success', messageKey: 'BS_MATCH_FOUND', params: { mid } }
        };
      }
      if (array[mid] < targetValue) {
        return {
          ...newState,
          phase: 2,
          l: mid + 1,
          log: { title: 'BS: SEARCH RIGHT', type: 'match', messageKey: 'BS_SEARCH_RIGHT', params: { val: array[mid], targetValue, midPlusOne: mid + 1, r } }
        };
      }
      return {
        ...newState,
        phase: 2,
        r: mid - 1,
        log: { title: 'BS: SEARCH LEFT', type: 'mismatch', messageKey: 'BS_SEARCH_LEFT', params: { val: array[mid], targetValue, l, midMinusOne: mid - 1 } }
      };
    }

    return newState;
  }
});
