import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

/**
 * Sunday Search (l-gram Variant)
 *
 * An optimized substring search algorithm specifically effective for small alphabets (like DNA).
 * Instead of looking at a single look-ahead character, it evaluates a short sequence (l-gram)
 * to determine massive shifts.
 */

// --- Logic Helpers ---

const handleScanPhase = (state, target, pattern) => {
  const { currentIndex, compIdx } = state;
  const m = pattern.length;
  const textIdx = currentIndex + compIdx;

  if (target[textIdx] === pattern[compIdx]) {
    if (compIdx === m - 1) {
      const matchIndices = Array.from({ length: m }, (_, i) => currentIndex + i);
      return {
        ...state,
        isFinished: true,
        activeIndices: matchIndices,
        log: {
          title: "Match Found ✓",
          type: "success",
          messageKey: "SUCCESS_MATCH",
          params: { currentIndex },
        },
      };
    }
    return {
      ...state,
      compIdx: compIdx + 1,
      activeIndices: [textIdx],
      log: {
        title: "Character Match",
        type: "match",
        messageKey: "CHAR_MATCH",
        params: { char: target[textIdx], compIdx },
      },
    };
  }

  // Mismatch found
  return {
    ...state,
    phase: 2, // Heuristic Check
    mismatchFound: true,
    activeIndices: [textIdx],
    log: {
      title: "Mismatch",
      type: "mismatch",
      messageKey: "MISMATCH",
      params: { char: target[textIdx], patternChar: pattern[compIdx], textIdx },
    },
  };
};

const handleHeuristicPhase = (state, target, pattern, preprocessing) => {
  const { currentIndex } = state;
  const { l, lGrams } = preprocessing;
  const m = pattern.length;
  const n = target.length;

  // Look-ahead position is at the end of the window + lookahead
  const lookAheadStart = currentIndex + m - l + 1;

  if (lookAheadStart + l > n) {
    return {
      ...state,
      phase: 3,
      shiftValue: 1,
      mismatchFound: true,
      log: {
        title: "Boundary Reached",
        type: "info",
        messageKey: "BOUNDARY_REACHED",
      },
    };
  }

  const lookAheadGram = target.substring(lookAheadStart, lookAheadStart + l);
  const isFound = lGrams.has(lookAheadGram);

  const lookAheadIndices = Array.from({ length: l }, (_, i) => lookAheadStart + i);

  if (!isFound) {
    const shift = m - l + 2;
    return {
      ...state,
      phase: 3,
      shiftValue: shift,
      mismatchFound: true,
      showShiftArrow: true,
      activeIndices: lookAheadIndices,
      log: {
        title: "L-Gram Heuristic Hit",
        type: "shift",
        messageKey: "MASSIVE_SHIFT",
        params: { gram: lookAheadGram, shift, l },
      },
    };
  }

  return {
    ...state,
    phase: 3,
    shiftValue: 1,
    mismatchFound: true,
    showShiftArrow: true,
    activeIndices: lookAheadIndices,
    log: {
      title: "L-Gram Collision",
      type: "info",
      messageKey: "SINGLE_SHIFT",
      params: { gram: lookAheadGram, l },
    },
  };
};

const handleShiftPhase = (state, target, pattern) => {
  const { currentIndex, shiftValue } = state;
  const nextIdx = currentIndex + shiftValue;
  const m = pattern.length;
  const n = target.length;

  if (nextIdx + m > n) {
    return {
      ...state,
      currentIndex: nextIdx,
      isFinished: true,
      mismatchFound: false,
      showShiftArrow: false,
      log: { title: "Search Completed", type: "info", messageKey: "SEARCH_COMPLETED" },
    };
  }

  return {
    ...state,
    phase: 1,
    currentIndex: nextIdx,
    compIdx: 0,
    mismatchFound: false,
    showShiftArrow: false,
    activeIndices: [nextIdx],
    log: {
      title: "Shift Executed",
      type: "shift",
      messageKey: "SHIFT",
      params: { shift: shiftValue, nextIdx },
    },
  };
};

export const sundayLgram = createAlgorithmPage({
  id: "sunday-lgram",

  metadata: {
    type: "pattern-matching",
    VisualiserType: "pattern-matching",
    category: "Pattern Matching Algorithms",
    defaultInputs: { target: "ACTCTGTATAGCTAGCTAGCGTACGTA", pattern: "GTACGTA" },
  },

  homeCard: {
    name: "Sunday l-gram Search",
    difficulty: "Medium",
    description:
      "An advanced substring search optimized for DNA and small alphabets using l-gram look-ahead heuristics.",
    complexity: {
      timeBest: "Ω(n/m)",
      timeAvg: "Θ(n)",
      timeWorst: "O(nm)",
      space: "O(m)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Index: {currentIndex}",
      startButton: "Start",
      playbackSpeed: 400,
    },
    extendedDescription:
      "The Sunday l-gram algorithm improves upon standard Sunday search by looking at a sequence of 'l' characters instead of just one. In small alphabets like DNA, single character look-aheads often collide. By using l-grams, the algorithm can perform much larger jumps by identifying unique sequences that do not exist in the pattern.",
    legendItems: [
      { label: "Unvisited", color: "bg-slate-800 border-slate-700" },
      { label: "Checking", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Match", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
      { label: "Mismatch", color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
      { label: "Heuristic", color: "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" },
    ],
    auxDataConfig: {
      header: "l-gram Dictionary",
      type: "list",
      description: "Valid l-grams present in the pattern.",
    },
  },

  visualSteps: {
    READY: {
      title: "Ready",
      message:
        "Commencing Sunday l-gram Search: A high-performance DNA search variant.\n\n• Strategy: Utilizing a '{l}-gram' look-ahead heuristic to maximize window translation.\n• Optimization: Identifying unique character sequences that do not exist in the pattern to safely skip segments.",
      highlights: { pseudo: [1, 2, 3], javascript: [3, 4, 5], python: [1, 2, 3] },
    },
    CHAR_MATCH: {
      title: "Character Match",
      message: "Local Correspondence: '{char}' validated at pattern offset {compIdx}. Continuing scan...",
      highlights: { pseudo: 6, javascript: [10], python: 7 },
    },
    MISMATCH: {
      title: "Mismatch Detected",
      message:
        "Inconsistency Detected: Character violation at text index {textIdx}. '{char}' ≠ '{patternChar}'.\n\nTransitioning to Heuristic Look-ahead probe.",
      highlights: { pseudo: [10, 11, 12], javascript: [10], python: [10, 11] },
    },
    MASSIVE_SHIFT: {
      title: "L-Gram Heuristic Hit",
      message:
        "Heuristic Success: The {l}-gram '{gram}' is NOT in the pattern.\n\nResult: Safe translation of {shift} positions confirmed.",
      highlights: { pseudo: [11, 12], javascript: [15, 16], python: [12, 13] },
    },
    SINGLE_SHIFT: {
      title: "L-Gram Collision",
      message:
        "Heuristic Collision: The {l}-gram '{gram}' IS in the pattern.\n\nResult: Defaulting to a single character shift to ensure correctness.",
      highlights: { pseudo: 12, javascript: [20], python: 13 },
    },
    SHIFT: {
      title: "Shift Executed",
      message: "Window Jump Resolved: Search origin translated {shift} positions to index {nextIdx}.",
      highlights: { pseudo: 12, javascript: [8], python: 13 },
    },
    SUCCESS_MATCH: {
      title: "Match Found ✓",
      message: "Pattern Instance Finalized! Successful verification for all characters at index {currentIndex}.",
      highlights: { pseudo: [7, 8, 9], javascript: [11], python: 8 },
    },
    BOUNDARY_REACHED: {
      title: "Boundary Reached",
      message: "Boundary Condition: Not enough characters left for a full {l}-gram probe. Shifting to text end.",
      highlights: { pseudo: 12, javascript: [13], python: 13 },
    },
    SEARCH_COMPLETED: {
      title: "Search Terminated",
      message: "Text Domain Exhausted: Execution successfully terminated.",
      highlights: { pseudo: 12, javascript: [22], python: 13 },
    },
  },

  codeSnippets: {
    pseudo: `function sundayLgramSearch(text, pattern):
  n = length(text), m = length(pattern)
  l = max(1, floor(log4(m)) + 1)
  lGrams = buildLGramSet(pattern, l)
  i = 0
  while i <= n - m:
    if Match(text[i...i+m-1], pattern):
      return i
    if i + m - l + 1 + l <= n:
      gram = text[i + m - l + 1 ... i + m]
      if gram not in lGrams:
        i = i + (m - l + 2)
        continue
    i = i + 1
  return -1`,
    javascript: `function sundayLgramSearch(text, pattern) {
  const n = text.length, m = pattern.length;
  const l = Math.max(1, Math.floor(Math.log(m) / Math.log(4)) + 1);
  const lGrams = new Set();
  for (let i = 0; i <= m - l; i++) lGrams.add(pattern.substring(i, i + l));

  let i = 0;
  while (i <= n - m) {
    let j = 0;
    while (j < m && text[i + j] === pattern[j]) j++;
    if (j === m) return i;

    if (i + m - l + 1 + l <= n) {
      const gram = text.substring(i + m - l + 1, i + m + 1);
      if (!lGrams.has(gram)) {
        i += (m - l + 2);
        continue;
      }
    }
    i++;
  }
  return -1;
}`,
    python: `def sunday_lgram_search(text, pattern):
    n, m = len(text), len(pattern)
    l = max(1, int(math.log(m, 4)) + 1)
    lgrams = {pattern[i:i+l] for i in range(m-l+1)}
    i = 0
    while i <= n - m:
        if text[i:i+m] == pattern:
            return i
        if i + m - l + 1 + l <= n:
            gram = text[i+m-l+1:i+m+1]
            if gram not in lgrams:
                i += (m - l + 2)
                continue
        i += 1
    return -1`,
  },

  getPreprocessing: (pattern, _target) => {
    if (!pattern) return { l: 1, lGrams: new Set(), AuxData: [] };
    const m = pattern.length;
    // DNA-friendly l calculation
    const l = Math.max(1, Math.floor(Math.log(m) / Math.log(4)) + 1);
    const lGrams = new Set();
    for (let i = 0; i <= m - l; i++) {
      lGrams.add(pattern.substring(i, i + l));
    }
    return { l, lGrams, AuxData: Array.from(lGrams) };
  },

  getInitialState: (pattern, _target) => {
    const l = pattern ? Math.max(1, Math.floor(Math.log(pattern.length) / Math.log(4)) + 1) : 1;
    return {
      phase: 1, // Scan
      currentIndex: 0,
      compIdx: 0,
      shiftValue: 0,
      mismatchFound: false,
      showShiftArrow: false,
      isFinished: false,
      activeIndices: [0],
      log: {
        title: "Ready",
        type: "info",
        messageKey: "READY",
        params: { l },
      },
    };
  },

  nextStep: (state, target, pattern, preprocessing) => {
    const { phase } = state;
    if (phase === 1) return handleScanPhase(state, target, pattern);
    if (phase === 2) return handleHeuristicPhase(state, target, pattern, preprocessing);
    if (phase === 3) return handleShiftPhase(state, target, pattern);
    return state;
  },
});
