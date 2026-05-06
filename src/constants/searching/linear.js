import { createAlgorithmCard } from '../factory';

/**
 * Linear Search Algorithm Module
 */
export const linear = createAlgorithmCard({
  id: 'linear',
  
  // --- Metadata ---
  metadata: {
    type: 'searching',
    visualizerType: 'array',
    category: 'Searching Algorithms',
    defaultInputs: { target: '13', pattern: '12, 5, 14, 8, 4, 11, 8, 15, 4, 6, 13, 10' },
  },

  homeCard: {
    name: 'Linear Search',
    difficulty: 'Easy',
    description: 'A basic search algorithm that checks every element in the list sequentially until a match is found.',
    complexity: {
      timeBest: 'Ω(1)',
      timeAvg: 'Θ(n)',
      timeWorst: 'O(n)',
      space: 'O(1)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Index: {i}',
      startButton: 'Start Search',
      playbackSpeed: 400
    },
    extendedDescription: 'Linear Search is the simplest search algorithm. It traverses the array from the first element to the last, comparing each element with the target value until a match is found or the end of the array is reached.',
    legendItems: [
      { label: 'Unvisited', color: 'bg-slate-800 border-slate-700' },
      { label: 'Checking', color: 'bg-indigo-500' },
      { label: 'Match', color: 'bg-emerald-500' },
      { label: 'Not Found', color: 'bg-rose-500' },
    ],
    visualSteps: {
      READY: {
        title: 'Ready',
        message: "Linear Search initialized. Preparing to scan the array for target value {targetValue}.",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      STARTING_SEARCH: {
        title: 'Starting Search',
        message: "Commencing sequential scan from index 0.",
        highlights: { pseudo: [2], javascript: [2], python: [2] }
      },
      COMPARING: {
        title: 'Comparing',
        message: "Comparing element at index {i} ({val}) with target {targetValue}.",
        highlights: { pseudo: [3], javascript: [3], python: [3] }
      },
      VALUE_FOUND: {
        title: 'Match Found ✓',
        message: "Target value {targetValue} located at index {i}!",
        highlights: { pseudo: [4], javascript: [4], python: [4] }
      },
      NOT_FOUND: {
        title: 'Not Found',
        message: "Value {targetValue} was not found in the array after a full scan.",
        highlights: { pseudo: [5], javascript: [5], python: [5] }
      }
    }
  },

  codeSnippets: {
    pseudo: `function linearSearch(list, target):
  for each element in list:
    if element == target:
      return its index
  return not found`,
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`
  },

  // --- Logic ---
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [12, 5, 14, 8, 4, 11, 8, 15, 4, 6, 13, 10];
    const targetValue = typeof p === 'number' ? p : (Number.parseInt(p, 10) || 13);
    
    return {
      phase: 0,
      i: 0,
      targetValue: targetValue,
      array: array,
      activeIndices: [],
      sortedIndices: [],
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
    const { array, i, targetValue, phase } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [] };

    if (phase === 0) {
      return {
        ...newState,
        phase: 1,
        i: 0,
        activeIndices: [0],
        log: {
          title: 'STARTING SEARCH',
          type: 'info',
          messageKey: 'STARTING_SEARCH',
          params: { targetValue: targetValue }
        }
      };
    }

    if (phase === 1) {
      if (i >= n) {
        return {
          ...newState,
          isFinished: true,
          log: {
            title: 'NOT FOUND',
            type: 'mismatch',
            messageKey: 'NOT_FOUND',
            params: { targetValue: targetValue }
          }
        };
      }

      newState.comparisons += 1;
      newState.activeIndices = [i];

      if (array[i] === targetValue) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [i],
          log: {
            title: 'VALUE FOUND!',
            type: 'success',
            messageKey: 'VALUE_FOUND',
            params: { i: i, targetValue: targetValue }
          }
        };
      } else {
        const nextI = i + 1;
        return {
          ...newState,
          i: nextI,
          activeIndices: nextI < n ? [nextI] : [],
          log: {
            title: 'COMPARING',
            type: 'info',
            messageKey: 'COMPARING',
            params: { i: i, val: array[i], targetValue: targetValue }
          }
        };
      }
    }

    return newState;
  }
});
