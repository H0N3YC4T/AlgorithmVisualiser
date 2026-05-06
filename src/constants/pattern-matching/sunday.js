import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const sunday = createAlgorithmPage({
  id: "sunday",

  // --- Metadata ---
  metadata: {
    type: "pattern-matching",
    VisualiserType: "pattern-matching",
    category: "Pattern Matching Algorithms",
    defaultInputs: { target: "A WILD LIT WILLOW", pattern: "WILLOW" },
  },

  homeCard: {
    name: "Sunday Search",
    difficulty: "Medium",
    description: "A fast substring search algorithm that uses a look-ahead character to determine shift values.",
    complexity: {
      timeBest: "Ω(n/m)",
      timeAvg: "Θ(n)",
      timeWorst: "O(nm)",
      timePre: "O(m + Σ)",
      space: "O(k)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Index: {currentIndex}",
      startButton: "Start Search",
      playbackSpeed: 500,
    },
    extendedDescription:
      'The Sunday Search algorithm is a variation of the Boyer-Moore algorithm. It is often faster in practice because it uses a simpler shift rule: it looks at the character in the text immediately following the current window. This "look-ahead" character alone determines the shift distance.',
    legendItems: [
      { label: "Unvisited", color: "bg-slate-800 border-slate-700" },
      { label: "Checking", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Match", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
      { label: "Mismatch", color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
    ],
    auxDataConfig: {
      header: "Shift Table",
      dataKey: "AuxShiftTableVisualiser",
      type: "map",
      description: "Stores the jump distance for the character immediately following the current window.",
    },
  },

  // --- Visual Steps & Code ---
  visualSteps: {
    READY: {
      title: "Ready",
      message:
        "Commencing Sunday Search: An optimized string matching algorithm.\n\n• Strategy: Utilizing a 'Look-Ahead' heuristic to maximize window translation distance.\n\n• Mechanism: Evaluating the character immediately following the search window to determine the next jump.",
      highlights: { pseudo: [1, 2, 3], javascript: [1, 2, 3, 4], python: [1, 2, 3], csharp: [1, 2, 3] },
    },
    START_PHASE: {
      title: "Starting Window",
      message:
        "Aligning Search Window.\n\n• Current Scope: '{targetRange}' starting at index {currentIndex}.\n\n• Objective: Initiating character-by-character verification from left to right.",
      highlights: { pseudo: [5, 6], javascript: [7, 8], python: 7, csharp: 8 },
    },
    CHAR_MATCH: {
      title: "Character Match",
      message:
        "Local Correspondence: '{targetChar}' == '{patternChar}'.\n\n• Correspondence validated at window offset {compIdx}.\n\n• Strategy: Advancing to verify the next character in the pattern.",
      highlights: { pseudo: 6, javascript: [8, 9], python: 7, csharp: 8 },
    },
    MISMATCH_DETECTED: {
      title: "Mismatch",
      message:
        "Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.\n\n• Character violation at global text index {textIdx}.\n\n• Action: Aborting current scan and querying the look-ahead character for shift resolution.",
      highlights: { pseudo: [10, 11, 12], javascript: 12, python: 10, csharp: 10 },
    },
    SUCCESS_MATCH_FOUND: {
      title: "Match Found ✓",
      message:
        "Pattern Instance Finalized!\n\n• Result: Successful validation for all {m} pattern characters.\n\n• Match identified at starting index {currentIndex}.",
      highlights: { pseudo: [7, 8, 9], javascript: 10, python: 8, csharp: 8 },
    },
    IDENTIFY_LOOKAHEAD: {
      title: "Lookahead Heuristic",
      message:
        "Heuristic Probe: Analyzing the look-ahead character.\n\n• Encountered: '{char}' at text index {lookAheadIdx}.\n\n• Strategy: Determining the shift based on this character's relative position in the pattern.",
      highlights: { pseudo: [11, 12], javascript: [12, 13], python: [12, 13], csharp: [12, 13] },
    },
    SEARCH_TERMINATED: {
      title: "Search Terminated",
      message:
        "Boundary Condition Encountered.\n\n• Look-ahead index {lookAheadIdx} is outside the text buffer.\n\n• Result: Execution terminated.",
      highlights: { pseudo: [11, 12], javascript: 12, python: 12, csharp: 13 },
    },
    LOOKUP_SHIFT: {
      title: "Lookup Shift",
      message:
        "Shift Calculation: {charStatus}.\n\n• Heuristic: Aligning the pattern's rightmost occurrence of '{char}' with the look-ahead position.\n\n• Jump Distance: {shiftValue} units.",
      highlights: { pseudo: 12, javascript: 13, python: 13, csharp: 14 },
    },
    EXECUTING_SHIFT: {
      title: "Executing Shift",
      message:
        "Window Translation Resolved.\n\n• Search origin moved {shiftValue} positions to index {nextPos}.\n\n• Strategy: Re-initiating character verification at the new alignment.",
      highlights: { pseudo: 12, javascript: 13, python: 13, csharp: 14 },
    },
  },

  codeSnippets: {
    pseudo: `SundaySearch(text, pattern):
  n = length(text), m = length(pattern)
  AuxShiftTableVisualiser = PrecomputeShifts(pattern)
  s = 0
  while s <= n - m:
    if Match(text[s...s+m-1], pattern):
      return s
    if s + m >= n: break
    s = s + AuxShiftTableVisualiser[text[s + m]]`,
    javascript: `function sundaySearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const AuxShiftTableVisualiser = buildShiftTable(pattern);
  let s = 0;

  while (s <= n - m) {
    let j = 0;
    while (j < m && pattern[j] === text[s + j]) j++;
    if (j === m) return s; // Found

    if (s + m >= n) break;
    s += AuxShiftTableVisualiser[text[s + m]] || (m + 1);
  }
  return -1;
}

function buildShiftTable(pattern) {
  const table = {};
  for (let i = 0; i < pattern.length; i++) {
    table[pattern[i]] = pattern.length - i;
  }
  return table;
}`,
    python: `def sunday_search(text, pattern):
    n, m = len(text), len(pattern)
    shift_table = {c: m - i for i, c in enumerate(pattern)}
    s = 0
    while s <= n - m:
        if text[s : s + m] == pattern:
            return s
        if s + m >= n:
            break
        s += shift_table.get(text[s + m], m + 1)
    return -1`,
    csharp: `public int SundaySearch(string text, string pattern) {
    int n = text.Length, m = pattern.Length;
    var AuxShiftTableVisualiser = new Dictionary<char, int>();
    for (int i = 0; i < m; i++) AuxShiftTableVisualiser[pattern[i]] = m - i;

    int s = 0;
    while (s <= n - m) {
        if (text.Substring(s, m) == pattern) return s;
        if (s + m >= n) break;
        s += AuxShiftTableVisualiser.ContainsKey(text[s + m]) ? AuxShiftTableVisualiser[text[s + m]] : m + 1;
    }
    return -1;
}`,
  },

  // --- Logic ---
  getPreprocessing: (target, pattern) => {
    const table = {};
    const m = pattern.length;
    for (let i = 0; i < m; i++) {
      table[pattern[i]] = m - i;
    }
    return { AuxShiftTableVisualiser: table };
  },

  getInitialState: (_target, _pattern) => {
    return {
      currentIndex: 0,
      compIdx: 0,
      phase: 1,
      mismatchFound: false,
      isFinished: false,
      accessedIndices: [],
      activeIndices: [],
      log: {
        title: "Sunday Search",
        type: "info",
        messageKey: "READY",
      },
    };
  },

  nextStep: (state, target, pattern, preprocessing) => {
    const { currentIndex, compIdx, phase } = state;
    const n = target.length;
    const m = pattern.length;
    const { AuxShiftTableVisualiser } = preprocessing;

    if (phase === 1) {
      // Starting window
      if (currentIndex > n - m) {
        return {
          ...state,
          isFinished: true,
          activeIndices: [],
          log: { title: "Not Found", type: "error", message: "Pattern not found in text." },
        };
      }
      return {
        ...state,
        phase: 2,
        compIdx: 0,
        activeIndices: [currentIndex],
        log: {
          title: "Starting Window",
          type: "info",
          messageKey: "START_PHASE",
          params: { currentIndex, targetRange: target.substr(currentIndex, m) },
        },
      };
    }

    if (phase === 2) {
      // Comparing
      if (target[currentIndex + compIdx] === pattern[compIdx]) {
        if (compIdx === m - 1) {
          return {
            ...state,
            isFinished: true,
            activeIndices: [...new Array(m).keys()].map((i) => currentIndex + i),
            log: {
              title: "Match Found ✓",
              type: "success",
              messageKey: "SUCCESS_MATCH_FOUND",
              params: { currentIndex, m },
            },
          };
        }
        return {
          ...state,
          compIdx: compIdx + 1,
          activeIndices: [currentIndex + compIdx + 1],
          log: {
            title: "Character Match",
            type: "match",
            messageKey: "CHAR_MATCH",
            params: { targetChar: target[currentIndex + compIdx], patternChar: pattern[compIdx], compIdx },
          },
        };
      } else {
        return {
          ...state,
          phase: 3,
          mismatchFound: true,
          activeIndices: [currentIndex + compIdx],
          log: {
            title: "Mismatch",
            type: "mismatch",
            messageKey: "MISMATCH_DETECTED",
            params: {
              targetChar: target[currentIndex + compIdx],
              patternChar: pattern[compIdx],
              textIdx: currentIndex + compIdx,
            },
          },
        };
      }
    }

    if (phase === 3) {
      // Identify Lookahead
      const lookAheadIdx = currentIndex + m;
      if (lookAheadIdx >= n) {
        return {
          ...state,
          isFinished: true,
          activeIndices: [],
          log: { title: "Search Terminated", type: "error", messageKey: "SEARCH_TERMINATED", params: { lookAheadIdx } },
        };
      }
      return {
        ...state,
        phase: 4,
        lookAheadIdx,
        activeIndices: [lookAheadIdx],
        log: {
          title: "Lookahead Heuristic",
          type: "info",
          messageKey: "IDENTIFY_LOOKAHEAD",
          params: { char: target[lookAheadIdx], lookAheadIdx },
        },
      };
    }

    if (phase === 4) {
      // Execute Shift
      const lookAheadChar = target[currentIndex + m];
      const shift = AuxShiftTableVisualiser[lookAheadChar] || m + 1;
      return {
        ...state,
        phase: 1,
        currentIndex: currentIndex + shift,
        mismatchFound: false,
        shiftValue: shift,
        log: {
          title: "Executing Shift",
          type: "shift",
          messageKey: "EXECUTING_SHIFT",
          params: { shiftValue: shift, nextPos: currentIndex + shift },
        },
      };
    }

    return state;
  },
});
