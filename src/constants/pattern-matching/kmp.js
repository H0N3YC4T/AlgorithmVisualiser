import { createAlgorithmCard } from '../factory';

export const kmp = createAlgorithmCard({
  id: 'kmp',
  
  metadata: {
    type: 'pattern-matching',
    visualizerType: 'pattern-matching',
    category: 'Pattern Matching Algorithms',
    defaultInputs: { target: 'AABAACAADAABAABA', pattern: 'AABA' },
  },

  homeCard: {
    name: 'KMP Search',
    difficulty: 'Medium',
    description: 'Uses the Longest Prefix Suffix (LPS) table to avoid redundant comparisons after a mismatch.',
    complexity: {
      timeBest: 'Ω(n)',
      timeAvg: 'Θ(n + m)',
      timeWorst: 'O(n + m)',
      space: 'O(m)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Index: {currentIndex}',
      startButton: 'Start Search',
      playbackSpeed: 300
    },
    extendedDescription: 'The Knuth-Morris-Pratt (KMP) algorithm improves substring search by preprocessing the pattern to determine how much of it is a prefix of itself. When a mismatch occurs, the algorithm uses this "LPS" table to shift the pattern without re-comparing characters that are already known to match.',
    legendItems: [
      { label: 'Unvisited', color: 'bg-slate-800/40 border-slate-700/50' },
      { label: 'Checking', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Match', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
      { label: 'Mismatch', color: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' },
    ],
    visualSteps: {
      READY: {
        title: 'Ready',
        message: "KMP Search initialized. π Table precomputed.",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      CHAR_MATCH: {
        title: 'Character Match',
        message: "Local Correspondence: '{targetChar}' == '{patternChar}'. Moving to index {compIdx}.",
        highlights: { pseudo: [2], javascript: [3], python: [3] }
      },
      MISMATCH: {
        title: 'Mismatch',
        message: "Inconsistency Detected: '{targetChar}' ≠ '{patternChar}' at index {idx}.",
        highlights: { pseudo: [3], javascript: [4], python: [4] }
      },
      CONSULT_PI: {
        title: 'Consulting π Table',
        message: "Mismatch at pattern index {compIdx}. Consultation suggests partial prefix match of length {newCompIdx}.",
        highlights: { pseudo: [4], javascript: [5], python: [5] }
      },
      NO_PREFIX: {
        title: 'No Prefix Matched',
        message: "No shared prefix-suffix found. Shifting pattern by 1.",
        highlights: { pseudo: [4], javascript: [5], python: [5] }
      },
      SMART_SHIFT: {
        title: 'Smart Shift',
        message: "Window translation to {nextPos}. Resuming from pattern offset {newCompIdx}.",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      MATCH_FOUND: {
        title: 'Match Found ✓',
        message: "Pattern Instance Found at starting index {idx}!",
        highlights: { pseudo: [4], javascript: [5], python: [5] }
      }
    }
  },

  getPreprocessing: (pattern) => {
    const m = pattern.length;
    const pi = new Array(m).fill(0);
    let k = 0;
    for (let q = 1; q < m; q++) {
      while (k > 0 && pattern[k] !== pattern[q]) k = pi[k - 1];
      if (pattern[k] === pattern[q]) k++;
      pi[q] = k;
    }
    return { pi };
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

  nextStep: (state, target, pattern, preprocessing) => {
    const { currentIndex, phase, compIdx } = state;
    const { pi } = preprocessing;
    const m = pattern.length;
    const n = target.length;
    const newState = { ...state, activeIndices: [] };

    if (phase === 1) { // Comparison Phase
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
            params: { idx: currentIndex }
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
            params: { targetChar: targetChar, patternChar: patternChar, compIdx: compIdx + 1 }
          }
        };
      }
    }

    if (phase === 2) { // Consult PI Table Phase
      if (compIdx === 0) {
        return {
          ...newState,
          phase: 3,
          log: { title: 'No Prefix Matched', type: 'shift', messageKey: 'NO_PREFIX' }
        };
      }
      const newCompIdx = pi[compIdx - 1];
      return {
        ...newState,
        phase: 3,
        log: {
          title: 'Consulting π Table',
          type: 'shift',
          messageKey: 'CONSULT_PI',
          params: { compIdx, newCompIdx }
        }
      };
    }

    if (phase === 3) { // Shift Phase
      const newCompIdx = compIdx > 0 ? pi[compIdx - 1] : 0;
      const shiftValue = compIdx > 0 ? compIdx - newCompIdx : 1;
      const nextPos = currentIndex + shiftValue;

      if (nextPos + m > n) {
        return {
          ...newState,
          isFinished: true,
          currentIndex: nextPos,
          log: { title: 'End of Text', type: 'info', message: 'Boundary condition reached.' }
        };
      }

      return {
        ...newState,
        currentIndex: nextPos,
        compIdx: newCompIdx,
        phase: 1,
        mismatchFound: false,
        log: {
          title: 'Smart Shift',
          type: 'shift',
          messageKey: 'SMART_SHIFT',
          params: { nextPos, newCompIdx }
        }
      };
    }

    return newState;
  }
});
