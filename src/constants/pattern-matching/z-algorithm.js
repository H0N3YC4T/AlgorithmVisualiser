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
      { label: 'Unvisited', color: 'bg-slate-800/40 border-slate-700/50' },
      { label: 'Z-Box', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Matching', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
      { label: 'Prefix', color: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' },
    ],
  },
  visualSteps: {
    READY: {
      title: 'Ready',
      message: "Z-Algorithm Initiated.\n\n• Concatenating pattern and text: P + $ + T.\n• Initializing Z-array of size N.",
      highlights: { pseudo: [1], javascript: [1, 2], python: [1, 2] }
    },
    OUTSIDE_Z_BOX: {
      title: 'Outside Z-Box',
      message: "Current index i={i} is outside the current Z-box [l={l}, r={r}].\n\n• Performing manual comparison with prefix.",
      highlights: { pseudo: [2], javascript: [4, 5], python: [4, 5] }
    },
    INSIDE_Z_BOX_OPTIMIZED: {
      title: 'Z-Box Optimized',
      message: "i={i} is inside the Z-box [l={l}, r={r}].\n\n• Copying Z[{k}] = {zK} using symmetry.",
      highlights: { pseudo: [3], javascript: [7, 8], python: [7, 8] }
    },
    EXTENDING_Z_BOX: {
      title: 'Extending Z-Box',
      message: "Extending Z-box beyond index r={r}.\n\n• Checking further character matches.",
      highlights: { pseudo: [4], javascript: [10], python: [10] }
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
  getPreprocessing: (pattern, target) => ({ concat: pattern + '$' + target }),
  nextStep: (state, target, pattern, preprocessing) => {
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
