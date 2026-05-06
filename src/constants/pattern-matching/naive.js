import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const naive = createAlgorithmPage({
  id: "naive",

  metadata: {
    type: "pattern-matching",
    VisualiserType: "pattern-matching",
    category: "Pattern Matching Algorithms",
    defaultInputs: { target: "ABCABCD", pattern: "ABCD" },
  },

  homeCard: {
    name: "Naive Search",
    difficulty: "Easy",
    description: "A simple brute-force substring search that checks all possible positions.",
    complexity: {
      timeBest: "Ω(n)",
      timeAvg: "Θ(n + m)",
      timeWorst: "O(nm)",
      space: "O(1)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Index: {currentIndex}",
      startButton: "Start Search",
      playbackSpeed: 300,
    },
    extendedDescription:
      "Naive Search (or Brute Force) is the simplest string-searching algorithm. It checks for the pattern at every possible position in the text. While simple, it can be inefficient for large texts or patterns with many repetitions.",
    legendItems: [
      { label: "Unvisited", color: "bg-slate-800 border-slate-700" },
      { label: "Checking", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Match", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
      { label: "Mismatch", color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
    ],
    visualSteps: {
      READY: {
        title: "Ready",
        message:
          "Commencing Naive (Brute-Force) Search.\n\n• Strategy: Exhaustive character-by-character validation at every possible window alignment.\n• Note: A simple but robust baseline for substring search comparisons.",
        highlights: { pseudo: [1, 2, 3], javascript: [1, 2, 3, 4], python: [1, 2, 3] },
      },
      CHAR_MATCH: {
        title: "Character Match",
        message:
          "Local Correspondence: '{targetChar}' == '{patternChar}'.\n\n• Alignment validated for the current pattern offset.\n• Strategy: Advancing to the next character in the pattern sequence.",
        highlights: { pseudo: [4, 5], javascript: [7, 8], python: [5] },
      },
      MISMATCH: {
        title: "Mismatch",
        message:
          "Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.\n\n• Violation identified at global text index {idx}.\n• Action: Aborting current scan and shifting the window by exactly 1 position.",
        highlights: { pseudo: [6], javascript: [8], python: [6] },
      },
      MATCH_FOUND: {
        title: "Match Found ✓",
        message:
          "Pattern Instance Finalized!\n\n• Result: Full character-by-character correspondence verified.\n• Match identified at starting index {idx}.",
        highlights: { pseudo: [7], javascript: [9], python: [7] },
      },
      SHIFTING: {
        title: "Shifting",
        message:
          "Sliding Window: Origin translated from {currentIndex} to {nextPos}.\n\n• Strategy: Resetting comparison pointers for the next exhaustive scan pass.",
        highlights: { pseudo: [3], javascript: [5], python: [3] },
      },
      END_OF_TEXT: {
        title: "End of Text",
        message: "Search Domain Exhausted.\n\n• Final window alignment processed.\n• Result: Execution terminated.",
        highlights: { pseudo: [8], javascript: [10], python: [8] },
      },
    },
  },
  codeSnippets: {
    pseudo: `function naiveSearch(text, pattern):
  n = text.length, m = pattern.length
  for i from 0 to n - m:
    for j from 0 to m - 1:
      if text[i + j] != pattern[j]:
        break
    if j == m: return i
  return -1`,
    javascript: `function naiveSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  for (let i = 0; i <= n - m; i++) {
    let j;
    for (j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) break;
    }
    if (j === m) return i;
  }
  return -1;
}`,
    python: `def naive_search(text, pattern):
    n, m = len(text), len(pattern)
    for i in range(n - m + 1):
        match = True
        for j in range(m):
            if text[i + j] != pattern[j]:
                match = False
                break
        if match: return i
    return -1`,
  },
  getInitialState: (_target, _pattern) => ({
    currentIndex: 0,
    compIdx: 0,
    phase: 1,
    mismatchFound: false,
    activeIndices: [],
    log: {
      title: "Ready",
      type: "info",
      messageKey: "READY",
    },
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
            title: "Mismatch",
            type: "mismatch",
            messageKey: "MISMATCH",
            params: { idx: textIdx, targetChar: targetChar, patternChar: patternChar },
          },
        };
      } else if (compIdx + 1 === m) {
        return {
          ...newState,
          isFinished: true,
          activeIndices: [...new Array(m).keys()].map((k) => currentIndex + k),
          log: {
            title: "Match Found ✓",
            type: "success",
            messageKey: "MATCH_FOUND",
            params: { m: m, idx: currentIndex },
          },
        };
      } else {
        return {
          ...newState,
          compIdx: compIdx + 1,
          log: {
            title: "Match",
            type: "match",
            messageKey: "CHAR_MATCH",
            params: { targetChar: targetChar, patternChar: patternChar },
          },
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
            title: "End of Text",
            type: "info",
            messageKey: "END_OF_TEXT",
            params: { nextPos: nextPos },
          },
        };
      } else {
        return {
          ...newState,
          currentIndex: nextPos,
          phase: 1,
          compIdx: 0,
          mismatchFound: false,
          log: {
            title: "Shifting",
            type: "shift",
            messageKey: "SHIFTING",
            params: { currentIndex: currentIndex, nextPos: nextPos },
          },
        };
      }
    }

    return newState;
  },
});
