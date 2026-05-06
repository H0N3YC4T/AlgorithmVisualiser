import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const kmp = createAlgorithmPage({
  id: "kmp",

  metadata: {
    type: "pattern-matching",
    VisualiserType: "pattern-matching",
    category: "Pattern Matching Algorithms",
    defaultInputs: { target: "THE FASTEST FOX WINS ALL", pattern: "FAST" },
  },

  homeCard: {
    name: "KMP Search",
    difficulty: "Medium",
    description: "Uses the Longest Prefix Suffix (LPS) table to avoid redundant comparisons after a mismatch.",
    complexity: {
      timeBest: "Ω(n)",
      timeAvg: "Θ(n + m)",
      timeWorst: "O(n + m)",
      space: "O(m)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Index: {currentIndex}",
      startButton: "Start",
      playbackSpeed: 300,
    },
    extendedDescription:
      'The Knuth-Morris-Pratt (KMP) algorithm improves substring search by preprocessing the pattern to determine how much of it is a prefix of itself. When a mismatch occurs, the algorithm uses this "LPS" table to shift the pattern without re-comparing characters that are already known to match.',
    legendItems: [
      { label: "Unvisited", color: "bg-slate-800 border-slate-700" },
      { label: "Checking", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Match", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
      { label: "Mismatch", color: "bg-rose-500 shadow-[0_0_15_rgba(244,63,94,0.4)]" },
    ],
    auxDataConfig: {
      header: "Prefix Table (π)",
      dataKey: "pi",
      type: "failureFunction",
      description: "Stores the length of the longest proper prefix that is also a suffix.",
      logic: "If match: pi[i] = pi[i-1] + 1\nElse: backtrack using pi",
    },
    visualSteps: {
      READY: {
        title: "Ready",
        message:
          "Commencing Knuth-Morris-Pratt (KMP) Search.\n\n• Strategy: Utilizing a 'Partial Match Table' (failure function) to avoid redundant character comparisons.\n• Optimization: Skipping ahead by identifying the longest proper prefix that is also a suffix within the current match.",
        highlights: { pseudo: [1, 2, 3], javascript: [1, 2, 3, 4], python: [1, 2, 3] },
      },
      MATCH_FOUND: {
        title: "Match Found ✓",
        message:
          "Pattern Instance Finalized!\n\n• Result: Full character correspondence verified.\n• Match identified at starting index {idx}.",
        highlights: { pseudo: [11], javascript: [12], python: [11] },
      },
      CHAR_MATCH: {
        title: "Character Match",
        message:
          "Local Correspondence: '{targetChar}' == '{patternChar}'.\n\n• Alignment validated for current prefix segment.\n• Strategy: Extending the active match length to {newLen} characters.",
        highlights: { pseudo: [9], javascript: [11], python: [9] },
      },
      MISMATCH: {
        title: "Mismatch",
        message:
          "Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.\n\n• Character violation identified at global text index {idx}.\n• Action: Querying the prefix table for the next optimal alignment.",
        highlights: { pseudo: [7, 8], javascript: [9, 10], python: [7, 8] },
      },
      NO_PREFIX: {
        title: "No Prefix Matched",
        message:
          "Prefix Table Null: No usable symmetry identified.\n\n• Current match length has no proper prefix that is also a suffix.\n• Action: Shifting the search window by exactly 1 unit.",
        highlights: { pseudo: [7, 8], javascript: [9, 10], python: [7, 8] },
      },
      CONSULT_PI: {
        title: "Consulting π Table",
        message:
          "Consulting Prefix Table (pi[{piIdx}] = {newCompIdx}).\n\n• Result: Identifying a shift of {shiftValue} units that preserves {newCompIdx} existing character matches.\n• Objective: Minimize redundant comparisons.",
        highlights: { pseudo: [7, 8], javascript: [9, 10], python: [7, 8] },
      },
      SMART_SHIFT: {
        title: "Smart Shift",
        message:
          "Intelligent Shift Executed: Origin moved to {nextPos}.\n\n• Strategy: Resuming character verification from the first uncertain character.\n• Note: The first {newCompIdx} characters are mathematically guaranteed to match.",
        highlights: { pseudo: [1], javascript: [1], python: [1] },
      },
    },
  },
  codeSnippets: {
    pseudo: `function kmpSearch(text, pattern):
  n = text.length, m = pattern.length
  pi = computePrefix(pattern)
  q = 0
  for i from 0 to n-1:
    while q > 0 and pattern[q] != text[i]:
      q = pi[q-1]
    if pattern[q] == text[i]:
      q = q + 1
    if q == m:
      return i - m + 1
  return -1`,
    javascript: `function kmpSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const pi = computePrefixFunction(pattern);
  let q = 0;
  for (let i = 0; i < n; i++) {
    while (q > 0 && pattern[q] !== text[i]) {
      q = pi[q - 1];
    }
    if (pattern[q] === text[i]) q++;
    if (q === m) return i - m + 1;
  }
  return -1;
}`,
    python: `def kmp_search(text, pattern):
    n, m = len(text), len(pattern)
    pi = compute_prefix_function(pattern)
    q = 0
    for i in range(n):
        while q > 0 and pattern[q] != text[i]:
            q = pi[q-1]
        if pattern[q] == text[i]:
            q += 1
        if q == m:
            return i - m + 1
    return -1`,
  },
  getPreprocessing: (pattern, _target) => {
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
      title: "Ready",
      type: "info",
      messageKey: "READY",
    },
  }),

  nextStep: (state, target, pattern, _preprocessing) => {
    const { currentIndex, phase, compIdx } = state;
    const { pi } = _preprocessing;
    const m = pattern.length;
    const n = target.length;
    const newState = { ...state, activeIndices: [] };

    if (phase === 1) {
      // Comparison Phase
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
            params: { idx: currentIndex },
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
            params: { targetChar: targetChar, patternChar: patternChar, compIdx: compIdx + 1 },
          },
        };
      }
    }

    if (phase === 2) {
      // Consult PI Table Phase
      if (compIdx === 0) {
        return {
          ...newState,
          phase: 3,
          log: { title: "No Prefix Matched", type: "shift", messageKey: "NO_PREFIX" },
        };
      }
      const newCompIdx = pi[compIdx - 1];
      return {
        ...newState,
        phase: 3,
        log: {
          title: "Consulting π Table",
          type: "shift",
          messageKey: "CONSULT_PI",
          params: { compIdx, newCompIdx },
        },
      };
    }

    if (phase === 3) {
      // Shift Phase
      const newCompIdx = compIdx > 0 ? pi[compIdx - 1] : 0;
      const shiftValue = compIdx > 0 ? compIdx - newCompIdx : 1;
      const nextPos = currentIndex + shiftValue;

      if (nextPos + m > n) {
        return {
          ...newState,
          isFinished: true,
          currentIndex: nextPos,
          log: { title: "End of Text", type: "info", message: "Boundary condition reached." },
        };
      }

      return {
        ...newState,
        currentIndex: nextPos,
        compIdx: newCompIdx,
        phase: 1,
        mismatchFound: false,
        log: {
          title: "Smart Shift",
          type: "shift",
          messageKey: "SMART_SHIFT",
          params: { nextPos, newCompIdx },
        },
      };
    }

    return newState;
  },
});
