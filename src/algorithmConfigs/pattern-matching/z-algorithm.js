import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

/**
 * Z-Algorithm
 * 
 * A linear-time pattern matching algorithm that constructs a Z-array.
 * The Z-array at index i stores the length of the longest substring starting from i
 * which is also a prefix of the string.
 */

// --- Logic Helpers ---

const handleDecisionPhase = (state, patternLength, n) => {
  const { i, l, r, z } = state;

  if (i >= n) {
    const matches = [];
    // A match occurs if Z[i] == pattern length for any index in the text portion
    for (let j = patternLength + 1; j < n; j++) {
      if (z[j] === patternLength) matches.push(j - (patternLength + 1));
    }
    return {
      ...state,
      isFinished: true,
      activeIndices: [],
      log: {
        title: "Search Completed ✓",
        type: "success",
        messageKey: "Z_ARRAY_COMPLETE",
        params: {
          foundCountStatus:
            matches.length > 0 ? `Found ${matches.length} matches at: ${matches.join(", ")}` : "No matches found",
        },
      },
    };
  }

  // Case 1: Outside any known Z-box
  if (i > r) {
    return {
      ...state,
      phase: 2, // Manual Comparison
      l: i,
      r: i - 1,
      activeIndices: [i, 0],
      log: {
        title: "Outside Z-Box",
        type: "info",
        messageKey: "OUTSIDE_Z_BOX",
        params: { i, r },
      },
    };
  }

  // Case 2: Inside a Z-box
  const k = i - l;
  const remaining = r - i + 1;

  if (z[k] < remaining) {
    // Optimization: Z[i] is exactly Z[k]
    const newZ = [...z];
    newZ[i] = z[k];
    return {
      ...state,
      z: newZ,
      i: i + 1,
      activeIndices: [i],
      referenceIndex: k,
      log: {
        title: "Z-Box Optimized",
        type: "match",
        messageKey: "INSIDE_Z_BOX_OPTIMIZED",
        params: { i, l, r, k, zK: z[k] },
      },
    };
  }

  // Case 3: Inside a Z-box but Z[k] exceeds boundary, must extend
  return {
    ...state,
    phase: 2,
    l: i,
    activeIndices: [i, r - i + 1],
    log: {
      title: "Extending Z-Box",
      type: "info",
      messageKey: "EXTENDING_Z_BOX",
      params: { i, k, r },
    },
  };
};

const handleManualComparisonPhase = (state, n) => {
  const { l: curL, r: curR, i, z, concat } = state;
  const matchLen = curR - curL + 1;
  const patternIdx = matchLen;
  const textIdx = curL + matchLen;

  if (textIdx < n && concat[patternIdx] === concat[textIdx]) {
    return {
      ...state,
      r: textIdx,
      activeIndices: [patternIdx, textIdx],
      log: {
        title: "Character Match",
        type: "match",
        messageKey: "MATCHING",
        params: { zVal: patternIdx, iPlusZ: textIdx, newZVal: matchLen + 1 },
      },
    };
  }

  // Mismatch or end of string
  const newZ = [...z];
  newZ[i] = curR - curL + 1;
  return {
    ...state,
    z: newZ,
    phase: 1,
    i: i + 1,
    activeIndices: [textIdx < n ? textIdx : n - 1],
    log: {
      title: "Mismatch",
      type: "mismatch",
      messageKey: "MISMATCH",
      params: { zVal: newZ[i], iPlusZ: textIdx },
    },
  };
};

export const zalgorithm = createAlgorithmPage({
  id: "zalgorithm",

  metadata: {
    type: "pattern-matching",
    VisualiserType: "z",
    category: "Pattern Matching Algorithms",
    defaultInputs: { target: "THE FASTEST FOX TESTS", pattern: "TESTS" },
  },

  homeCard: {
    name: "Z-Algorithm",
    difficulty: "Hard",
    description: "Constructs the Z-array to identify pattern instances in linear time using a sliding match window.",
    complexity: {
      timeBest: "Θ(n+m)",
      timeAvg: "Θ(n+m)",
      timeWorst: "Θ(n+m)",
      space: "Θ(n+m)",
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: "Z-Box: [{l}, {r}]",
      startButton: "Start",
      playbackSpeed: 400,
    },
    extendedDescription:
      'The Z-algorithm builds a "Z-array" where Z[i] is the length of the longest common prefix between the concatenated string (Pattern + $ + Text) and its suffix starting at index i. By using previously computed Z-boxes, it achieves O(n+m) complexity by never re-comparing characters known to match.',
    legendItems: [
      { label: "Unvisited", color: "bg-slate-800 border-slate-700" },
      { label: "Checking", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Match", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
      { label: "Mismatch", color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" },
      { label: "Reference", color: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" },
    ],
  },

  visualSteps: {
    READY: {
      title: "Ready",
      message:
        "Commencing Z-Algorithm Search.\n\n• Strategy: Operating on the concatenated string S = P + $ + T.\n• Principle: Leveraging 'Z-boxes' to avoid redundant comparisons.\n• Objective: Building the Z-array to find indices where Z[i] = |P|.",
      highlights: { pseudo: [1, 2, 3], javascript: [1, 2, 3], python: [1, 2, 3] },
    },
    Z_ARRAY_COMPLETE: {
      title: "Search Completed",
      message: "Z-Array Construction Finalized.\n\n• Analysis: {foundCountStatus}.\n• Logic: Matches occur where Z[i] equals pattern length.",
      highlights: { pseudo: [11], javascript: [10], python: [11] },
    },
    OUTSIDE_Z_BOX: {
      title: "Outside Z-Box",
      message: "Index {i} exceeds established right boundary {r}.\n\n• Action: Initiating manual comparison starting from index {i} against the prefix.",
      highlights: { pseudo: [2], javascript: [4, 5], python: [4, 5] },
    },
    INSIDE_Z_BOX_OPTIMIZED: {
      title: "Z-Box Optimized",
      message: "Index {i} is inside Z-box [{l}..{r}].\n\n• Optimization: Querying internal symmetry at k = i - l = {k}.\n• Result: Inheriting Z[{k}] = {zK} directly.",
      highlights: { pseudo: [3], javascript: [7, 8], python: [7, 8] },
    },
    EXTENDING_Z_BOX: {
      title: "Extending Z-Box",
      message: "Boundary Condition: Prefix match at index {i} reaches the box limit {r}.\n\n• Action: Performing manual comparison for characters beyond current boundary.",
      highlights: { pseudo: [4], javascript: [10], python: [10] },
    },
    MATCHING: {
      title: "Matching",
      message: "Correspondence Found: concat[{zVal}] == concat[{iPlusZ}].\n\n• Status: Extending current Z-value to {newZVal}.",
      highlights: { pseudo: [5], javascript: [12], python: [12] },
    },
    MISMATCH: {
      title: "Mismatch",
      message: "Mismatch Found: concat[{zVal}] ≠ concat[{iPlusZ}].\n\n• Result: Z-value finalized at {zVal}.",
      highlights: { pseudo: [5], javascript: [12], python: [12] },
    },
  },

  codeSnippets: {
    pseudo: `function getZArray(S):
  n = length(text), Z = array of size n
  l = 0, r = 0
  for i from 1 to n-1:
    if i <= r:
      Z[i] = min(r - i + 1, Z[i - l])
    while i + Z[i] < n and S[Z[i]] == S[i + Z[i]]:
      Z[i]++
    if i + Z[i] - 1 > r:
      l = i, r = i + Z[i] - 1
  return Z`,
    javascript: `function getZArray(str) {
  let n = str.length;
  let z = new Array(n).fill(0);
  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < n && str[z[i]] === str[i + z[i]]) z[i]++;
    if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1; }
  }
  return z;
}`,
    python: `def get_z_array(s):
    n = len(s)
    z = [0] * n
    l, r = 0, 0
    for i in range(1, n):
        if i <= r:
            z[i] = min(r - i + 1, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] - 1 > r:
            l, r = i, i + z[i] - 1
    return z`,
  },

  getPreprocessing: (_pattern, _target) => ({}),

  getInitialState: (pattern, target) => {
    const concat = pattern + "$" + target;
    const n = concat.length;
    const z = new Array(n).fill(0);
    let l = 0, r = 0;
    const pLen = pattern.length;

    // Precompute Z for the pattern part (up to the separator)
    for (let i = 1; i <= pLen; i++) {
      if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
      while (i + z[i] < n && concat[z[i]] === concat[i + z[i]]) z[i]++;
      if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1; }
    }

    return {
      phase: 1,
      i: pLen + 1, // Start processing from the text portion
      l: 0,
      r: 0,
      z,
      concat,
      activeIndices: [],
      log: {
        title: "Ready",
        type: "info",
        messageKey: "READY",
      },
    };
  },

  nextStep: (state, target, pattern, _preprocessing) => {
    const { phase } = state;
    const n = state.concat.length;
    if (phase === 1) return handleDecisionPhase(state, pattern.length, n);
    if (phase === 2) return handleManualComparisonPhase(state, n);
    return state;
  },
});
