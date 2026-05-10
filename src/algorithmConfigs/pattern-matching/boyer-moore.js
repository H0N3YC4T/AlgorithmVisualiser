import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const boyermoore = createAlgorithmPage({
  id: "boyermoore",

  metadata: {
    type: "pattern-matching",
    VisualiserType: "pattern-matching",
    category: "Pattern Matching Algorithms",
    defaultInputs: { target: "THE FASTEST FOX TESTS ALL", pattern: "TESTS" },
  },

  homeCard: {
    name: "Boyer-Moore",
    difficulty: "Hard",
    description: "An efficient search that compares right-to-left and uses the Bad Character rule to skip text.",
    complexity: {
      timeBest: "Ω(n/m)",
      timeAvg: "Θ(n)",
      timeWorst: "O(nm)",
      space: "O(k)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Index: {currentIndex}",
      startButton: "Start",
      playbackSpeed: 300,
    },
    extendedDescription:
      'Boyer-Moore is one of the most efficient string-searching algorithms. It compares the pattern against the text from right to left. Upon a mismatch, it uses the "Bad Character Rule" to shift the pattern by the maximum possible distance, often skipping large sections of the text.',
    legendItems: [
      { label: "Unvisited", color: "bg-slate-800 border-slate-700" },
      { label: "Checking", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Match", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
      { label: "Mismatch", color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
    ],
    auxDataConfig: {
      header: "Bad Character Table",
      dataKey: "badCharTable",
      type: "map",
      description: "Determines the shift based on the last occurrence of the mismatched character in the pattern.",
      logic: "Shift = max(1, j - last_occurrence)",
      defaultText: "Shift = m",
    },
    visualSteps: {
      READY: {
        title: "Ready",
        message:
          "Commencing Boyer-Moore Search: A high-performance string matching algorithm.\n\n• Strategy: Right-to-Left character verification combined with the 'Bad Character Heuristic'.\n• Optimization: Skipping redundant segments by aligning the mismatch character with its rightmost occurrence in the pattern.",
        highlights: { pseudo: [1, 2, 3], javascript: [1, 2, 3], python: [1, 2, 3] },
      },
      CHAR_MATCH: {
        title: "Right-to-Left Match",
        message:
          "Local Correspondence: '{targetChar}' == '{patternChar}'.\n\n• Alignment validated at the current offset.\n• Strategy: Moving LEFT to verify the preceding character in the pattern sequence.",
        highlights: { pseudo: 7, javascript: 8, python: 7 },
      },
      MISMATCH: {
        title: "Mismatch",
        message:
          "Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.\n\n• Character violation identified at text index {idx}.\n• Action: Executing the Bad Character heuristic to determine the maximum safe shift.",
        highlights: { pseudo: 8, javascript: 9, python: 9 },
      },
      BAD_CHAR_RULE: {
        title: "Bad Character Rule",
        message:
          "Bad Character Heuristic: '{badChar}' {foundStatus}.\n\n• Logic: Aligning the pattern's rightmost occurrence of '{badChar}' with the mismatched text character.\n• Shift Distance: {shiftValue} units.",
        highlights: { pseudo: 11, javascript: 12, python: 12 },
      },
      SHIFT_EXECUTED: {
        title: "Shift Executed",
        message:
          "Window Jump Resolved.\n\n• Search origin translated {shiftValue} positions to index {nextPos}.\n• Strategy: Resetting comparison pointers for the next right-to-left verification pass.",
        highlights: { pseudo: 11, javascript: 12, python: 12 },
      },
      MATCH_FOUND: {
        title: "Match Found ✓",
        message:
          "Pattern Instance Finalized!\n\n• Result: Successful right-to-left verification for all {m} pattern characters.\n• Match identified at starting index {idx}.",
        highlights: { pseudo: 9, javascript: 10, python: 10 },
      },
    },
  },
  codeSnippets: {
    pseudo: `function boyerMoore(text, pattern):
  n = text.length, m = pattern.length
  badCharTable = buildBadCharTable(pattern)
  s = 0
  while s <= n - m:
    j = m - 1
    while j >= 0 and pattern[j] == text[s + j]:
      j = j - 1
    if j < 0:
      return s
    else:
      s = s + max(1, j - badCharTable[text[s + j]])`,
    javascript: `function boyerMoore(text, pattern) {
  const n = text.length, m = pattern.length;
  const badCharTable = buildBadCharTable(pattern);
  let s = 0;
  while (s <= n - m) {
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[s + j]) j--;
    if (j < 0) return s;
    else s += Math.max(1, j - (badCharTable[text[s + j]] || -1));
  }
  return -1;
}`,
    python: `def boyer_moore(text, pattern):
    n, m = len(text), len(pattern)
    bad_char = build_bad_char(pattern)
    s = 0
    while s <= n - m:
        j = m - 1
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1
        if j < 0:
            return s
        else:
            s += max(1, j - bad_char.get(text[s + j], -1))
    return -1`,
  },
  getPreprocessing: (pattern, _target) => {
    const m = pattern.length;
    const table = {};
    for (let i = 0; i < m - 1; i++) {
      table[pattern[i]] = m - 1 - i;
    }
    return {
      badCharTable: table,
      getShift: (char) => table[char] || m,
    };
  },

  getInitialState: (pattern, target) => ({
    currentIndex: 0,
    compIdx: pattern.length - 1,
    phase: 1,
    mismatchFound: false,
    activeIndices: [],
    log: {
      title: "Ready",
      type: "info",
      messageKey: "READY",
    },
  }),

  nextStep: (state, target, pattern, preprocessing) => {
    const { currentIndex, phase, compIdx } = state;
    const { getShift, badCharTable } = preprocessing;
    const m = pattern.length;
    const n = target.length;
    const newState = { ...state, activeIndices: [] };

    if (phase === 1) {
      // Right-to-Left Comparison
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
            params: { idx: textIdx },
          },
        };
      } else if (compIdx === 0) {
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
          compIdx: compIdx - 1,
          log: {
            title: "Match",
            type: "match",
            messageKey: "CHAR_MATCH",
            params: { compIdx: compIdx },
          },
        };
      }
    }

    if (phase === 2) {
      // Bad Character Rule
      const badCharIdx = currentIndex + m - 1;
      const badChar = target[badCharIdx];
      const shiftValue = getShift(badChar);

      return {
        ...newState,
        phase: 3,
        activeIndices: [badCharIdx],
        log: {
          title: "Bad Character Rule",
          type: "shift",
          messageKey: "BAD_CHAR_RULE",
          params: {
            badChar,
            shiftValue,
            foundStatus: badCharTable[badChar] ? "exists in the pattern" : "is not in pattern",
          },
        },
      };
    }

    if (phase === 3) {
      // Execution
      const badChar = target[currentIndex + m - 1];
      const shiftValue = getShift(badChar);
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
        compIdx: m - 1,
        phase: 1,
        mismatchFound: false,
        log: {
          title: "Shift Executed",
          type: "shift",
          messageKey: "SHIFT_EXECUTED",
          params: { shiftValue, nextPos },
        },
      };
    }

    return newState;
  },
});
