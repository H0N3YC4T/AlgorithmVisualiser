/** Radix Sort Module */
import { createAlgorithmCard } from '../factory';

export const radix = createAlgorithmCard({
  id: 'radix',
  
  // --- Metadata ---
  metadata: {
    type: 'sorting',
    visualizerType: 'array',
    category: 'Sorting Algorithms',
    defaultInputs: { target: '53, 17, 82, 34, 91, 26, 45, 68', pattern: '' },
  },

  homeCard: {
    name: 'Radix Sort',
    difficulty: 'Hard',
    description: 'A non-comparative sorting algorithm that avoids comparison by creating and distributing elements into buckets according to their radix.',
    complexity: {
      timeBest: 'Ω(nk)',
      timeAvg: 'Θ(nk)',
      timeWorst: 'O(nk)',
      space: 'O(n+k)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Digit: {exp}',
      startButton: 'Start Sorting',
      playbackSpeed: 200
    },
    extendedDescription: 'Radix Sort processes digits from least significant to most significant (LSD), using a stable sub-sort (like Counting Sort) for each position.',
    legendItems: [
      { label: 'Unsorted', color: 'bg-slate-800/40 border-slate-700/50' },
      { label: 'Checking', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Sorted', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
    ],
  },

  // --- Visual Steps ---
  visualSteps: {
    READY: {
      title: 'Ready',
      message: "LSD Radix Sort Initiated.\n\n• Principle: Sort by each digit position starting from the ones digit.\n• Dependency: Requires a stable sub-sorting algorithm.",
      highlights: { pseudo: [1], javascript: [1], python: [1] }
    },
    PROCESSING_DIGIT: {
      title: 'Processing Digit',
      message: "Analyzing {exp}s digit position.\n\n• Distributing elements into 10 buckets (0-9).\n• Maintaining relative order for stability.",
      highlights: { pseudo: [2, 3], javascript: [2, 3], python: [2, 3] }
    },
    BUCKETING: {
      title: 'Bucketing',
      message: "Value {val} placed in Bucket {digit}.\n\n• Radix calculation: floor({val} / {exp}) % 10 = {digit}.",
      highlights: { pseudo: 4, javascript: 4, python: 4 }
    },
    PASS_COMPLETE: {
      title: 'Pass Complete',
      message: "Collected elements from buckets.\n\n• Reconstructed array is now sorted by the {exp}s digit.\n• Moving to the next power of 10.",
      highlights: { pseudo: 5, javascript: 5, python: 5 }
    },
    SORT_COMPLETE: {
      title: 'Sorted ✓',
      message: "Radix Sort Finalized.\n\n• All digit positions processed.\n• Array is fully sorted non-comparatively.",
      highlights: { pseudo: 6, javascript: 6, python: 6 }
    }
  },

  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [53, 17, 82, 34, 91, 26, 45, 68];
    return {
      phase: 0, exp: 1, array, maxVal: Math.max(...array),
      buckets: Array.from({ length: 10 }, () => []),
      i: 0, activeIndices: [], sortedIndices: [], swapIndices: [],
      log: { title: 'READY', type: 'info', messageKey: 'READY' }
    };
  },

  nextStep: (state) => {
    const { array, exp, maxVal, phase, i, buckets } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      if (Math.floor(maxVal / exp) <= 0) {
        return {
          ...newState, isFinished: true, sortedIndices: [...new Array(array.length).keys()],
          log: { title: 'SORT COMPLETE', type: 'success', messageKey: 'SORT_COMPLETE' }
        };
      }
      
      return {
        ...newState, phase: 1, i: 0, buckets: Array.from({ length: 10 }, () => []),
        log: { title: `PROCESSING ${exp}s DIGIT`, type: 'info', messageKey: 'PROCESSING_DIGIT', params: { exp: exp } }
      };
    }

    if (phase === 1) {
      if (i >= array.length) {
        return {
          ...newState, phase: 2,
          log: { title: 'DISTRIBUTION COMPLETE', type: 'match', messageKey: 'DISTRIBUTION_COMPLETE', params: { exp: exp } }
        };
      }

      const val = array[i];
      const digit = Math.floor((val / exp) % 10);
      const newBuckets = buckets.map((b, idx) => idx === digit ? [...b, val] : b);

      return {
        ...newState, buckets: newBuckets, i: i + 1, activeIndices: [i],
        log: { title: 'BUCKETING', type: 'info', messageKey: 'BUCKETING', params: { val: val, digit: digit, exp: exp } }
      };
    }

    if (phase === 2) {
      const flattened = buckets.flat();
      return {
        ...newState, array: flattened, phase: 0, exp: exp * 10,
        log: { title: 'PASS COMPLETE', type: 'shift', messageKey: 'PASS_COMPLETE', params: { exp: exp } }
      };
    }

    return newState;
  }
});
