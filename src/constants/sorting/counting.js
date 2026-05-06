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
      message: "Non-comparative Sort Initiated.\n\n• Principle: Map input values to indices in a count array.\n• Requirement: Input must be within a known, small range.",
      highlights: { pseudo: [1], javascript: [1] }
    },
    RECORDING_COUNT: {
      title: 'Recording Count',
      message: "Processing value {val}.\n\n• Incrementing countArray[{val}] to {newCountVal}.\n• Frequency mapping in progress.",
      highlights: { pseudo: [2, 3], javascript: [2, 3] }
    },
    ACCUMULATING: {
      title: 'Accumulating',
      message: "Calculating cumulative positions.\n\n• countArray[{i}] now represents the starting index for value {i}.",
      highlights: { pseudo: 4, javascript: 4 }
    },
    PLACING_ELEMENT: {
      title: 'Placing Element',
      message: "Mapping {val} to sorted position {pos}.\n\n• Determining stable position using the cumulative count.",
      highlights: { pseudo: 5, javascript: 5 }
    },
    SORT_COMPLETE: {
      title: 'Sorted ✓',
      message: "Counting Sort Complete.\n\n• All elements placed in output array.\n• Linear time complexity O(n+k) achieved.",
      highlights: { pseudo: 6, javascript: 6 }
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
