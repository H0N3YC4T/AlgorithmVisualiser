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
      { label: 'Checking', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Found', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
      { label: 'Not Found', color: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' },
    ],
    visualSteps: {
      READY: {
        title: 'Ready',
        message: "Commencing Linear Search: The most fundamental search strategy.\n\n• Strategy: Sequential, exhaustive scan of the dataset.\n• Objective: Locating the target value '{targetValue}' by checking every element from index 0.",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      STARTING_SEARCH: {
        title: 'Starting Search',
        message: "Initiating Scan.\n\n• Action: Setting the initial probe pointer to index 0.\n• Strategy: Advancing one element at a time until the target is found or the end is reached.",
        highlights: { pseudo: [2], javascript: [2], python: [2] }
      },
      COMPARING: {
        title: 'Comparing',
        message: "Probe Evaluation: arr[{i}] = {val}.\n\n• Comparison: {val} == {targetValue}?\n• Action: If no match, incrementing the pointer and continuing the scan.",
        highlights: { pseudo: [3], javascript: [3], python: [3] }
      },
      VALUE_FOUND: {
        title: 'Match Found ✓',
        message: "Target Synchronized!\n\n• Result: Value '{targetValue}' located successfully at index {i}.\n• Note: Linear complexity O(n) scan concluded.",
        highlights: { pseudo: [4], javascript: [4], python: [4] }
      },
      NOT_FOUND: {
        title: 'Not Found',
        message: "Search Domain Exhausted.\n\n• Result: Full traversal completed without locating '{targetValue}'.\n• Conclusion: The value is not present in this dataset.",
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
