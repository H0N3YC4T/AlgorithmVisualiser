import { createAlgorithmCard } from '../factory';

export const naive = createAlgorithmCard({
  id: 'naive',
  
  metadata: {
    type: 'pattern-matching',
    visualizerType: 'pattern-matching',
    category: 'Pattern Matching Algorithms',
    defaultInputs: { target: 'ABCABCD', pattern: 'ABCD' },
  },

  homeCard: {
    name: 'Naive Search',
    difficulty: 'Easy',
    description: 'A simple brute-force substring search that checks all possible positions.',
    complexity: {
      timeBest: 'Ω(n)',
      timeAvg: 'Θ(n + m)',
      timeWorst: 'O(nm)',
      space: 'O(1)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Index: {currentIndex}',
      startButton: 'Start Search',
      playbackSpeed: 300
    },
    extendedDescription: 'Naive Search (or Brute Force) is the simplest string-searching algorithm. It checks for the pattern at every possible position in the text. While simple, it can be inefficient for large texts or patterns with many repetitions.',
    legendItems: [
      { label: 'Unvisited', color: 'bg-slate-800/40 border-slate-700/50' },
      { label: 'Checking', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Match', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
      { label: 'Mismatch', color: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' },
    ],
    visualSteps: {
      READY: {
        title: 'Ready',
        message: "Naive Search initialized. Starting brute-force scan.",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      CHAR_MATCH: {
        title: 'Character Match',
        message: "Local Correspondence: '{targetChar}' == '{patternChar}'.",
        highlights: { pseudo: [2], javascript: [3], python: [3] }
      },
      MISMATCH: {
        title: 'Mismatch',
        message: "Inconsistency Detected: '{targetChar}' ≠ '{patternChar}' at index {idx}.",
        highlights: { pseudo: [3], javascript: [4], python: [4] }
      },
      MATCH_FOUND: {
        title: 'Match Found ✓',
        message: "Pattern Instance Found at starting index {idx}!",
        highlights: { pseudo: [4], javascript: [5], python: [5] }
      },
      SHIFTING: {
        title: 'Shifting',
        message: "Window translation from {currentIndex} to {nextPos}.",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      END_OF_TEXT: {
        title: 'End of Text',
        message: "Boundary condition reached. Scan terminated.",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      }
    }
  },

  getInitialState: (_target, _pattern) => ({
    currentIndex: 0,
    compIdx: 0,
    phase: 1,
    mismatchFound: false,
    activeIndices: [],
    log: {
      title: 'Ready',
      type: 'info',
      messageKey: 'READY'
    }
  }),

  nextStep: (state, target, pattern) => {
    const { currentIndex, phase, compIdx } = state;
    const m = pattern.length;
    const n = target.length;
    const newState = { ...state, activeIndices: [] };

    if (phase === 1) {
      const textIdx = currentIndex + compIdx;
      const targetChar = target[textIdx];
      const patternChar = pattern[compIdx];
      
      newState.activeIndices = [textIdx];

      if (targetChar !== patternChar) {
        return {
          ...newState,
          mismatchFound: true,
          phase: 2,
          log: {
            title: 'Mismatch',
            type: 'mismatch',
            messageKey: 'MISMATCH',
            params: { idx: textIdx, targetChar: targetChar, patternChar: patternChar }
          }
        };
      } else if (compIdx + 1 === m) {
        return {
          ...newState,
          isFinished: true,
          activeIndices: [...new Array(m).keys()].map(k => currentIndex + k),
          log: {
            title: 'Match Found ✓',
            type: 'success',
            messageKey: 'MATCH_FOUND',
            params: { m: m, idx: currentIndex }
          }
        };
      } else {
        return {
          ...newState,
          compIdx: compIdx + 1,
          log: {
            title: 'Match',
            type: 'match',
            messageKey: 'CHAR_MATCH',
            params: { targetChar: targetChar, patternChar: patternChar }
          }
        };
      }
    }

    if (phase === 2) {
      const nextPos = currentIndex + 1;
      if (nextPos + m > n) {
        return {
          ...newState,
          currentIndex: nextPos,
          isFinished: true,
          log: {
            title: 'End of Text',
            type: 'info',
            messageKey: 'END_OF_TEXT',
            params: { nextPos: nextPos }
          }
        };
      } else {
        return {
          ...newState,
          currentIndex: nextPos,
          phase: 1,
          compIdx: 0,
          mismatchFound: false,
          log: {
            title: 'Shifting',
            type: 'shift',
            messageKey: 'SHIFTING',
            params: { currentIndex: currentIndex, nextPos: nextPos }
          }
        };
      }
    }

    return newState;
  }
});

