/** Counting Sort Module */
import { createAlgorithmCard } from '../factory';

export const counting = createAlgorithmCard({
  id: 'counting',
  
  // --- Metadata ---
  metadata: {
    type: 'sorting',
    visualizerType: 'array',
    category: 'Sorting Algorithms',
    defaultInputs: { target: '4, 2, 6, 1, 3, 2, 5, 1', pattern: '' },
  },

  homeCard: {
    name: 'Counting Sort',
    difficulty: 'Medium',
    description: 'Counts the number of times an element occurs, then calculates its position in the output array.',
    complexity: {
      timeBest: 'Ω(n + k)',
      timeAvg: 'Θ(n + k)',
      timeWorst: 'O(n + k)',
      space: 'O(k)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Range: 0-{maxVal}',
      startButton: 'Start Sorting',
      playbackSpeed: 200
    },
    extendedDescription: 'Counting Sort is a non-comparative sorting algorithm that works by counting the number of objects having distinct key values.',
    legendItems: [
      { label: 'Unsorted', color: 'bg-slate-800/40 border-slate-700/50' },
      { label: 'Counting', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Sorted', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
    ],
  },

  // --- Visual Steps ---
  visualSteps: {
    READY: {
      title: 'Ready',
      message: "Commencing Counting Sort: A non-comparative integer sorting algorithm.\n\n• Mechanism: Mapping input values to indices in an auxiliary frequency array.\n• Requirement: Input domain must be constrained within a known, finite range [0, k].",
      highlights: { pseudo: [1], javascript: [1], python: [1] }
    },
    INITIALIZING: {
      title: 'Initializing',
      message: "Allocating auxiliary resources.\n\n• Action: Constructing a 'Count Array' of size {maxVal} + 1.\n• Purpose: To track the occurrence frequency of each unique element.",
      highlights: { pseudo: [2, 3], javascript: [2, 3], python: [2, 3] }
    },
    RECORDING_COUNT: {
      title: 'Recording Count',
      message: "Tallying Occurrence: {val}.\n\n• Action: Incrementing countArray[{val}] to {newCountVal}.\n• Strategy: Building a histogram of all input frequencies.",
      highlights: { pseudo: [4], javascript: [6], python: [7] }
    },
    COUNTING_COMPLETE: {
      title: 'Counting Complete',
      message: "Frequency Mapping Finalized.\n\n• State: The count array now contains the raw frequency of every input element.\n• Next Step: Converting frequencies to cumulative positions.",
      highlights: { pseudo: [4], javascript: [6], python: [7] }
    },
    ACCUMULATING: {
      title: 'Accumulating',
      message: "Calculating Cumulative Positions.\n\n• countArray[{i}] updated to {newCountI}.\n• Logic: Summing previous counts to determine the starting offset for value {i}.",
      highlights: { pseudo: [5], javascript: [7], python: [9] }
    },
    CUMULATIVE_DONE: {
      title: 'Prefix Sums Finalized',
      message: "Cumulative Map Ready.\n\n• Result: countArray now serves as a look-up table for the starting index of each element.\n• Strategy: Preparing for stable output generation.",
      highlights: { pseudo: [5], javascript: [7], python: [9] }
    },
    PLACING_ELEMENT: {
      title: 'Stable Placement',
      message: "Placing {val} into final position {pos}.\n\n• Action: Mapping the input element to its calculated offset and decrementing the tracker.\n• Stability: Processing from right-to-left to preserve original relative order.",
      highlights: { pseudo: [6, 7, 8], javascript: [8, 9, 10], python: [10, 11, 12] }
    },
    SORT_COMPLETE: {
      title: 'Sorted ✓',
      message: "Counting Sort Complete!\n\n• Result: Linear-time O(n+k) sort achieved without a single element comparison.\n• Array is fully stabilized.",
      highlights: { pseudo: [9], javascript: [12], python: [13] }
    }
  },
  codeSnippets: {
    pseudo: `function countingSort(arr):
  max = findMax(arr)
  count = array of zeros with size max + 1
  for x in arr: count[x]++
  for i from 1 to max: count[i] += count[i-1]
  for i from n-1 down to 0:
    output[count[arr[i]] - 1] = arr[i]
    count[arr[i]]--
  return output`,
    javascript: `function countingSort(arr) {
  let n = arr.length;
  let max = Math.max(...arr);
  let count = new Array(max + 1).fill(0);
  let output = new Array(n);
  for (let i = 0; i < n; i++) count[arr[i]]++;
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];
  for (let i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  return output;
}`,
    python: `def counting_sort(arr):
    n = len(arr)
    max_val = max(arr)
    count = [0] * (max_val + 1)
    output = [0] * n
    for x in arr:
        count[x] += 1
    for i in range(1, max_val + 1):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1
    return output`
  },
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [4, 2, 6, 1, 3, 2, 5, 1];
    const maxVal = array.length > 0 ? Math.max(...array) : 1;
    return {
      phase: 0, i: 0, array, countArray: [], maxVal,
      output: new Array(array.length).fill(null),
      activeIndices: [], sortedIndices: [], swapIndices: [],
      log: { title: 'READY', type: 'info', messageKey: 'READY' }
    };
  },

  nextStep: (state) => {
    const { array, i, phase, countArray, maxVal, output } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      return {
        ...newState, phase: 1, countArray: new Array(maxVal + 1).fill(0),
        log: { title: 'INITIALIZING', type: 'info', messageKey: 'INITIALIZING', params: { maxVal } }
      };
    }

    if (phase === 1) { // Count
      if (i >= array.length) {
        return {
          ...newState, phase: 2, i: 1,
          log: { title: 'COUNTING COMPLETE', type: 'match', messageKey: 'COUNTING_COMPLETE' }
        };
      }

      const val = array[i];
      const newCount = [...countArray];
      newCount[val]++;

      return {
        ...newState, countArray: newCount, i: i + 1, activeIndices: [i],
        log: { title: 'RECORDING COUNT', type: 'info', messageKey: 'RECORDING_COUNT', params: { i, val, newCountVal: newCount[val] } }
      };
    }

    if (phase === 2) { // Cumulative
      if (i > maxVal) {
        return {
          ...newState, phase: 3, i: array.length - 1,
          log: { title: 'CUMULATIVE DONE', type: 'match', messageKey: 'CUMULATIVE_DONE' }
        };
      }

      const newCount = [...countArray];
      newCount[i] += newCount[i - 1];

      return {
        ...newState, countArray: newCount, i: i + 1,
        log: { title: 'ACCUMULATING', type: 'info', messageKey: 'ACCUMULATING', params: { i, iMinusOne: i - 1, newCountI: newCount[i] } }
      };
    }

    if (phase === 3) { // Place
      if (i < 0) {
        return {
          ...newState, isFinished: true, array: output,
          sortedIndices: [...new Array(array.length).keys()],
          log: { title: 'SORTED ✓', type: 'success', messageKey: 'SORT_COMPLETE' }
        };
      }

      const val = array[i];
      const pos = countArray[val] - 1;
      const newCount = [...countArray];
      newCount[val]--;

      const newOutput = [...output];
      newOutput[pos] = val;

      return {
        ...newState, output: newOutput, countArray: newCount, i: i - 1, activeIndices: [i], swapIndices: [pos],
        log: { title: 'PLACING ELEMENT', type: 'shift', messageKey: 'PLACING_ELEMENT', params: { val, i, pos } }
      };
    }

    return newState;
  }
});
