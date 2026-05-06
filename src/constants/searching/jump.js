import { createAlgorithmCard } from '../factory';

/**
 * Jump Search Algorithm Module
 */
export const jumpsearch = createAlgorithmCard({
  id: 'jumpsearch',
  
  // --- Metadata ---
  metadata: {
    type: 'searching',
    visualizerType: 'array',
    category: 'Searching Algorithms',
    defaultInputs: { target: '30', pattern: '3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53' },
  },

  homeCard: {
    name: 'Jump Search',
    difficulty: 'Easy',
    description: 'An algorithm for sorted arrays that jumps ahead by fixed steps and then performs a linear search.',
    complexity: {
      timeBest: 'Ω(1)',
      timeAvg: 'Θ(√n)',
      timeWorst: 'O(√n)',
      space: 'O(1)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Index: {prev}',
      startButton: 'Start Jump Search',
      playbackSpeed: 300
    },
    extendedDescription: 'Jump Search works on sorted arrays. It checks elements at fixed intervals (jumps) of size √n. Once it finds a block where the target might be, it performs a linear search within that block to find the exact position.',
      legendItems: [
        { label: 'Unsorted', color: 'bg-slate-800/40 border-slate-700/50' },
        { label: 'Jump Point', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
        { label: 'Linear Scan', color: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' },
        { label: 'Found', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
      ],
    visualSteps: {
      READY: {
        title: 'Ready',
        message: "Commencing Jump Search: A block-based searching strategy.\n\n• Prerequisite: The search space MUST be sorted.\n• Strategy: Jumping ahead by fixed intervals (steps) to isolate a candidate block of size √n ≈ {step}.",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      JUMPING: {
        title: 'Jumping',
        message: "Evaluating Jump Point {currentJump} (Value: {val}).\n\n• Observation: {val} < {targetValue}.\n• Action: Skipping the current block and jumping to index {nextI}.",
        highlights: { pseudo: [2, 3], javascript: [4, 5], python: [4, 5] }
      },
      BLOCK_IDENTIFIED: {
        title: 'Block Identified',
        message: "Candidate Segment Isolated: [{prev}, {curr}].\n\n• Deduction: The target '{targetValue}' must reside within this specific block.\n• Strategy: Switching to a sequential linear scan to locate the exact position.",
        highlights: { pseudo: [4], javascript: [7], python: [7] }
      },
      LINEAR_SCAN: {
        title: 'Linear Scan',
        message: "Probing Segment Sequentially.\n\n• Action: Checking index {prev} in the identified block.\n• Objective: Performing final character-by-character validation.",
        highlights: { pseudo: [5], javascript: [8], python: [8] }
      },
      MATCH_FOUND: {
        title: 'Match Found ✓',
        message: "Target Synchronized!\n\n• Result: Value '{targetValue}' located successfully at index {prev}.\n• Note: O(√n) performance achieved through balanced jumping and scanning.",
        highlights: { pseudo: [6], javascript: [9], python: [9] }
      },
      NOT_FOUND: {
        title: 'Not Found',
        message: "Search Domain Exhausted.\n\n• Result: Linear scan of the candidate block completed without locating '{targetValue}'.\n• Conclusion: The value is not present in this dataset.",
        highlights: { pseudo: [7], javascript: [11], python: [11] }
      }
    }
  },
  codeSnippets: {
    pseudo: `function jumpSearch(arr, target):
  n = arr.length, step = sqrt(n)
  prev = 0
  while arr[min(step, n)-1] < target:
    prev = step
    step += sqrt(n)
    if prev >= n: return -1
  while arr[prev] < target:
    prev += 1
    if prev == min(step, n): return -1
  if arr[prev] == target: return prev
  return -1`,
    javascript: `function jumpSearch(arr, target) {
  let n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }
  if (arr[prev] === target) return prev;
  return -1;
}`,
    python: `import math
def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n)-1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n: return -1
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n): return -1
    if arr[prev] == target: return prev
    return -1`
  },
  // --- Logic ---
  getInitialState: (p, t) => {
    const rawArray = Array.isArray(t) ? t : [3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53];
    const array = [...rawArray].sort((a, b) => a - b);
    const targetValue = typeof p === 'number' ? p : (Number.parseInt(p, 10) || 30);
    const step = Math.floor(Math.sqrt(array.length));
    return {
      phase: 0,
      i: 0,
      prev: 0,
      step,
      targetValue: targetValue,
      array,
      activeIndices: [],
      sortedIndices: [],
      pivotIndex: -1,
      comparisons: 0,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY',
        params: { step }
      }
    };
  },

  nextStep: (state) => {
    const { array, i, prev, step, targetValue, phase } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    // Phase 0: Jumping
    if (phase === 0) {
      const currentJump = Math.min(i, n - 1);
      newState.activeIndices = [currentJump];
      newState.comparisons += 1;

      if (array[currentJump] < targetValue && i < n) {
        return {
          ...newState,
          prev: i,
          i: i + step,
          log: {
            title: 'JUMPING',
            type: 'info',
            messageKey: 'JUMPING',
            params: { currentJump: currentJump, val: array[currentJump], targetValue: targetValue, step: step, nextI: i + step }
          }
        };
      } else {
        return {
          ...newState,
          phase: 1,
          i: Math.min(i, n - 1),
          log: {
            title: 'BLOCK IDENTIFIED',
            type: 'match',
            messageKey: 'BLOCK_IDENTIFIED',
            params: { prev: prev, curr: Math.min(i, n - 1), targetValue }
          }
        };
      }
    }

    // Phase 1: Linear Search within block
    if (phase === 1) {
      if (prev > i) {
        return {
          ...newState,
          isFinished: true,
          log: {
            title: 'NOT FOUND',
            type: 'mismatch',
            messageKey: 'NOT_FOUND',
            params: { targetValue }
          }
        };
      }

      newState.activeIndices = [prev];
      newState.comparisons += 1;

      if (array[prev] === targetValue) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [prev],
          log: {
            title: 'MATCH FOUND!',
            type: 'success',
            messageKey: 'MATCH_FOUND',
            params: { prev: prev }
          }
        };
      } else {
        return {
          ...newState,
          prev: prev + 1,
          log: {
            title: 'LINEAR SCAN',
            type: 'info',
            messageKey: 'LINEAR_SCAN',
            params: { prev: prev }
          }
        };
      }
    }

    return newState;
  }
});
