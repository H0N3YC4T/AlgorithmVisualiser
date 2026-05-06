import { createAlgorithmCard } from '../factory';

export const zalgorithm = createAlgorithmCard({
  id: 'zalgorithm',
  metadata: {
    type: 'pattern-matching',
    visualizerType: 'z',
    category: 'Pattern Matching Algorithms',
    defaultInputs: { target: 'AABZAABZAABZA', pattern: 'AAB' },
  },
  homeCard: {
    name: 'Z-Algorithm',
    difficulty: 'Hard',
    description: 'Constructs the Z-array, where each element Z[i] is the length of the longest substring starting from i which is also a prefix.',
    complexity: {
      timeBest: '׸(n+m)',
      timeAvg: '׸(n+m)',
      timeWorst: '׸(n+m)',
      space: '׸(n+m)',
    },
  },
  algorithmPage: {
    uiConfig: {
      statusLabel: 'Z-Box: [{l}, {r}]',
      startButton: 'Start Algorithm',
      playbackSpeed: 400
    },
    extendedDescription: 'The Z-algorithm builds a "Z-array" where Z[i] is the length of the longest substring starting from concat[i] which is also a prefix of concat. It uses previously computed Z-values (Z-box) to speed up calculations.',
    legendItems: [
      { label: 'Unvisited', color: 'bg-slate-800 border-slate-700' },
      { label: 'Checking', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Match', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
      { label: 'Mismatch', color: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' },
    ],
    visualSteps: {
      READY: {
        title: 'Ready',
        message: "Commencing Z-Algorithm: A linear-time pattern matching strategy.\n\n• Context: Operating on the concatenated string S = P + $ + T.\n• Principle: Leveraging previously discovered 'Z-boxes' to avoid redundant character comparisons.\n• Objective: Building the Z-array where Z[i] represents the longest prefix match starting at index i.",
        highlights: { pseudo: [1], javascript: [1, 2], python: [1, 2] }
      },
      Z_ARRAY_COMPLETE: {
        title: 'Z-Array Complete ✓',
        message: "Z-Array Construction Finalized.\n\n• Analysis: {foundCountStatus}.\n• Logic: Any text index i where Z[i] equals the pattern length |P| indicates a total match.",
        highlights: { pseudo: [11], javascript: [10], python: [11] }
      },
      OUTSIDE_Z_BOX: {
        title: 'Outside Z-Box',
        message: "Probe Point {i} exceeds established right boundary {r}.\n\n• Context: No internal symmetry available from previous matches.\n• Action: Initiating manual character comparison starting from index {i} against the prefix at index 0.",
        highlights: { pseudo: [2], javascript: [4, 5], python: [4, 5] }
      },
      INSIDE_Z_BOX_OPTIMIZED: {
        title: 'Z-Box Optimized',
        message: "Index {i} is contained within the active Z-box [{l}..{r}].\n\n• Optimization: Querying internal symmetry at index k = i - l = {k}.\n• Result: Inheriting Z[{k}] = {zK} directly; the prefix property is guaranteed within the box limits.",
        highlights: { pseudo: [3], javascript: [7, 8], python: [7, 8] }
      },
      EXTENDING_Z_BOX: {
        title: 'Extending Z-Box',
        message: "Boundary Condition Encountered: Prefix match at index {i} reaches the box limit {r}.\n\n• Strategy: Using the established match as a lower bound.\n• Action: Performing manual comparison for characters beyond the current boundary to find a new maximal Z-box.",
        highlights: { pseudo: [4], javascript: [10], python: [10] }
      },
      MATCHING: {
        title: 'Matching',
        message: "Character Correspondence: concat[{zVal}] == concat[{iPlusZ}].\n\n• Local validation successful.\n• Status: Extending the current Z-value to {newZVal}.",
        highlights: { pseudo: [5], javascript: [12], python: [12] }
      },
      MISMATCH: {
        title: 'Mismatch',
        message: "Inconsistency Detected: concat[{zVal}] ≠ concat[{iPlusZ}].\n\n• Result: Z-value finalized at {zVal}.\n• Action: Establishing new Z-box boundaries if the match extends beyond the current right limit.",
        highlights: { pseudo: [5], javascript: [12], python: [12] }
      }
    }
  },
  codeSnippets: {
    pseudo: `function getZArray(S):
  n = S.length, Z = array of size n (zeros)
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
    return z`
  },
  getInitialState: (p = '', t = '') => {
    const concat = p + '$' + t;
    const n = concat.length, z = new Array(n).fill(0);
    let l = 0, r = 0, pLen = p.length;
    for (let i = 1; i <= pLen; i++) {
      if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
      while (i + z[i] < n && concat[z[i]] === concat[i + z[i]]) z[i]++;
      if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1; }
    }
    return {
      phase: 1, i: pLen + 1, l: 0, r: 0, z, concat, activeIndices: [], comparisons: 0,
      log: { title: 'INITIALIZING', type: 'info', messageKey: 'READY', params: { p, t, concat, pLen, startIndex: pLen + 1 } }
    };
  },
  getPreprocessing: (_pattern, _target) => ({}),
  nextStep: (state, target, pattern, _preprocessing) => {
    const { phase, concat: stateConcat } = state;
    const concat = stateConcat || (pattern + '$' + target);
    const n = concat.length;
    const newState = { ...state, activeIndices: new Set(), concat };
    if (phase === 1) return zalgorithm.handleDecisionPhase(newState, pattern, n);
    if (phase === 2) return zalgorithm.handleManualComparisonPhase(newState, n);
    return newState;
  },
  handleDecisionPhase: (state, pattern, n) => {
    const { i, l, r, z } = state;
    if (i >= n) {
      const matches = [];
      for (let j = pattern.length + 1; j < n; j++) if (z[j] === pattern.length) matches.push(j - (pattern.length + 1));
      return { ...state, isFinished: true, log: { title: 'Z-ARRAY COMPLETE ✓', type: 'success', messageKey: 'Z_ARRAY_COMPLETE', params: { foundCountStatus: matches.length > 0 ? `Found ${matches.length} matches at: ${matches.join(', ')}` : 'No matches found' } } };
    }
    if (i > r) return { ...state, phase: 2, l: i, r: i - 1, activeIndices: [i, 0], log: { title: 'OUTSIDE Z-BOX', type: 'info', messageKey: 'OUTSIDE_Z_BOX', params: { i, r } } };
    const k = i - l, remaining = r - i + 1;
    if (z[k] < remaining) {
      const newZ = [...z]; newZ[i] = z[k];
      return { ...state, z: newZ, i: i + 1, activeIndices: [i], referenceIndex: k, log: { title: 'INSIDE Z-BOX (OPTIMIZED)', type: 'match', messageKey: 'INSIDE_Z_BOX_OPTIMIZED', params: { i, l, r, k, zK: z[k] } } };
    }
    return { ...state, phase: 2, l: i, activeIndices: [i, r - i + 1], log: { title: 'EXTENDING Z-BOX', type: 'info', messageKey: 'EXTENDING_Z_BOX', params: { i, k, r } } };
  },
  handleManualComparisonPhase: (state, n) => {
    const { l: curL, r: curR, i, z, concat } = state;
    const matchLen = curR - curL + 1, patternIdx = matchLen, textIdx = curL + matchLen;
    if (textIdx < n && concat[patternIdx] === concat[textIdx]) {
      return { ...state, r: textIdx, activeIndices: [patternIdx, textIdx], log: { title: 'CHARACTER MATCH', type: 'match', messageKey: 'CHARACTER_MATCH', params: { patternIdx, textIdx, char: concat[patternIdx] } } };
    }
    const newZ = [...z]; newZ[i] = curR - curL + 1;
    return { ...state, z: newZ, phase: 1, i: i + 1, activeIndices: [textIdx < n ? textIdx : n - 1], log: { title: 'MISMATCH / BOX END', type: 'mismatch', messageKey: 'MISMATCH_BOX_END', params: { patternIdx, i, zValue: newZ[i], l: curL, r: curR } } };
  }
});
