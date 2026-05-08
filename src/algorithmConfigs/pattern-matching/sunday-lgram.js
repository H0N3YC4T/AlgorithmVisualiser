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
      const matchIndices = new Set();
      for (let i = 0; i < m; i++) matchIndices.add(currentIndex + i);
      return {
        ...state,
        isFinished: true,
        activeIndices: matchIndices,
        log: {
          title: "MATCH FOUND",
          type: "success",
          messageKey: "SUCCESS_MATCH",
          params: { currentIndex },
        },
      };
    }
    return {
      ...state,
      compIdx: compIdx + 1,
      activeIndices: new Set([textIdx]),
      log: {
        title: "CHARACTER MATCH",
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
    activeIndices: new Set([textIdx]),
    log: {
      title: "MISMATCH",
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
      log: {
        title: "BOUNDARY REACHED",
        type: "info",
        messageKey: "BOUNDARY_REACHED",
      },
    };
  }

  const lookAheadGram = target.substring(lookAheadStart, lookAheadStart + l);
  const isFound = lGrams.has(lookAheadGram);

  const lookAheadIndices = new Set();
  for (let i = 0; i < l; i++) lookAheadIndices.add(lookAheadStart + i);

  if (!isFound) {
    const shift = m - l + 2;
    return {
      ...state,
      phase: 3,
      shiftValue: shift,
      activeIndices: lookAheadIndices,
      log: {
        title: "L-GRAM HIT",
        type: "shift",
        messageKey: "MASSIVE_SHIFT",
        params: { gram: lookAheadGram, shift },
      },
    };
  }

  return {
    ...state,
    phase: 3,
    shiftValue: 1,
    activeIndices: lookAheadIndices,
    log: {
      title: "L-GRAM MISSED",
      type: "info",
      messageKey: "SINGLE_SHIFT",
      params: { gram: lookAheadGram },
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
      log: { title: "SEARCH COMPLETED", type: "info", messageKey: "SEARCH_COMPLETED" },
    };
  }

  return {
    ...state,
    phase: 1,
    currentIndex: nextIdx,
    compIdx: 0,
    mismatchFound: false,
    activeIndices: new Set([nextIdx]),
    log: {
      title: "SHIFTING",
      type: "info",
      messageKey: "SHIFT",
      params: { shift: shiftValue, nextIdx },
    },
  };
};

export const sundayLgram = createAlgorithmPage({
  id: "sunday-lgram",

  metadata: {
    type: "pattern-matching",
    visualiserType: "pattern-matching",
    category: "Pattern Matching Algorithms",
    defaultInputs: { target: "ACTGCTAGCTAGCTAGCGTACGT", pattern: "GTACGT" },
  },

  homeCard: {
    name: "Sunday l-gram Search",
    difficulty: "Hard",
    description: "An advanced substring search optimized for DNA and small alphabets using l-gram look-ahead heuristics.",
    complexity: {
      timeBest: "Ω(n/m)",
      timeAvg: "Θ(n)",
      timeWorst: "O(nm)",
      space: "O(m)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Current Index: {currentIndex}",
      startButton: "Start Search",
      playbackSpeed: 400,
    },
    extendedDescription:
      "The Sunday l-gram algorithm improves upon standard Sunday search by looking at a sequence of 'l' characters instead of just one. In small alphabets like DNA, single character look-aheads often collide. By using l-grams, the algorithm can perform much larger jumps by identifying unique sequences that do not exist in the pattern.",
    legendItems: [
      { label: "Unvisited", color: "bg-slate-800 border-slate-700" },
      { label: "Scanning", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Match", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
      { label: "Mismatch", color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
      { label: "Look-ahead", color: "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" },
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
        "Commencing Sunday l-gram Search.\n\n• Target: DNA/Small Alphabet optimization.\n• Strategy: Using sequences of length {l} (l-grams) to maximize skip distance.",
      highlights: { javascript: [3, 4, 5] },
    },
    CHAR_MATCH: {
      title: "Character Match",
      message: "Validated '{char}' at pattern offset {compIdx}. Continuing scan...",
      highlights: { javascript: [10] },
    },
    MISMATCH: {
      title: "Mismatch Detected",
      message: "Character violation at index {textIdx}. '{char}' ≠ '{patternChar}'.\n\nTransitioning to Heuristic Look-ahead.",
      highlights: { javascript: [10] },
    },
    MASSIVE_SHIFT: {
      title: "Massive Shift!",
      message: "Heuristic Hit: The {l}-gram '{gram}' is NOT in the pattern.\n\nResult: We can safely jump {shift} positions!",
      highlights: { javascript: [15, 16] },
    },
    SINGLE_SHIFT: {
      title: "L-gram Collision",
      message: "Heuristic Miss: The l-gram '{gram}' IS in the pattern.\n\nResult: Defaulting to a single character shift.",
      highlights: { javascript: [20] },
    },
    SHIFT: {
      title: "Shifting Window",
      message: "Translating search window by {shift} to index {nextIdx}.",
      highlights: { javascript: [8] },
    },
    SUCCESS_MATCH: {
      title: "Success!",
      message: "Pattern fully synchronized at index {currentIndex}. Match confirmed.",
      highlights: { javascript: [11] },
    },
    BOUNDARY_REACHED: {
      title: "Boundary Reached",
      message: "Not enough characters left for a full l-gram look-ahead. Shifting to end.",
      highlights: { javascript: [13] },
    },
    SEARCH_COMPLETED: {
      title: "Search Completed",
      message: "Text domain exhausted. Execution terminated.",
      highlights: { javascript: [22] },
    },
  },

  codeSnippets: {
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
  },

  getPreprocessing: (target, pattern) => {
    const m = pattern.length;
    // DNA-friendly l calculation
    const l = Math.max(1, Math.floor(Math.log(m) / Math.log(4)) + 1);
    const lGrams = new Set();
    for (let i = 0; i <= m - l; i++) {
      lGrams.add(pattern.substring(i, i + l));
    }
    return { l, lGrams, AuxData: Array.from(lGrams) };
  },

  getInitialState: (p) => {
    return {
      phase: 1, // Scan
      currentIndex: 0,
      compIdx: 0,
      shiftValue: 0,
      mismatchFound: false,
      isFinished: false,
      activeIndices: new Set([0]),
      log: { title: "Ready", type: "info", messageKey: "READY", params: { l: p ? Math.max(1, Math.floor(Math.log(p.length) / Math.log(4)) + 1) : 1 } },
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
