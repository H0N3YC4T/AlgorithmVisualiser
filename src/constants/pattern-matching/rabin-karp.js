import { createAlgorithmCard } from '../factory';

export const rabinkarp = createAlgorithmCard({
  id: 'rabinkarp',
  metadata: {
    type: 'pattern-matching',
    visualizerType: 'pattern-matching',
    category: 'Pattern Matching Algorithms',
    defaultInputs: { target: 'THE FASTEST FOX TESTS', pattern: 'TEST' },
  },
  homeCard: {
    name: 'Rabin-Karp Search',
    difficulty: 'Hard',
    description: 'Uses a rolling hash to find any one of a set of pattern strings in a text, typically in linear time.',
    complexity: {
      timeBest: '׸(n+m)',
      timeAvg: '׸(n+m)',
      timeWorst: '׸(nm)',
      space: '׸(1)',
    },
  },
  algorithmPage: {
    uiConfig: {
      statusLabel: 'Current Hash: {targetHash}',
      startButton: 'Start Search',
      playbackSpeed: 500
    },
    extendedDescription: 'Rabin-Karp uses a rolling hash to quickly filter through the text. Instead of checking every character, it calculates a hash for each window and only performs a character-by-character comparison if the hashes match.',
    legendItems: [
      { label: 'Unvisited', color: 'bg-slate-800/40 border-slate-700/50' },
      { label: 'Hashing', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Hash Match', color: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' },
      { label: 'Success', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
      { label: 'Mismatch', color: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' },
    ],
  },
  visualSteps: {
    READY: {
      title: 'Ready',
      message: "Rabin-Karp Rolling Hash Initiated.\n\n• First, we'll calculate the hash of the pattern.\n• Then, we'll slide a window across the text.",
      highlights: { pseudo: [1], javascript: [1], python: [1] }
    },
    INITIAL_HASHING: {
      title: 'Initial Hashing',
      message: "Calculating hash for the first window.\n\n• Pattern Hash: {pHash}\n• Text Hash: {tHash}",
      highlights: { pseudo: [2], javascript: [4, 5], python: [4, 5] }
    },
    HASH_MATCH: {
      title: 'Hash Match!',
      message: "Window hash matches pattern hash!\n\n• Hash: {targetHash}\n• Verifying character by character to confirm match.",
      highlights: { pseudo: [3, 4], javascript: [7, 8], python: [7, 8] }
    },
    ROLLING_HASH: {
      title: 'Rolling Hash',
      message: "Sliding window to the right.\n\n• Removing '{charToRemove}' and adding '{charToAdd}'.\n• New Hash: {tHash}",
      highlights: { pseudo: [5], javascript: [12, 13], python: [12, 13] }
    }
  },
  codeSnippets: {
    javascript: `function rabinKarp(text, pattern) {
  const d = 256, q = 101;
  const n = text.length, m = pattern.length;
  let p = 0, t = 0, h = 1;
  for (let i = 0; i < m - 1; i++) h = (h * d) % q;
  for (let i = 0; i < m; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }
  for (let i = 0; i <= n - m; i++) {
    if (p === t) {
      if (text.substring(i, i + m) === pattern) return i;
    }
    if (i < n - m) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (t < 0) t = (t + q);
    }
  }
  return -1;
}`
  },
  getInitialState: (p) => {
    const prime = 101;
    const base = 256;
    let pHash = 0;
    if (p && typeof p === 'string') {
      for (let i = 0; i < p.length; i++) {
        pHash = (base * pHash + p.codePointAt(i)) % prime;
      }
    }
    return {
      phase: 0, compIdx: -1, mismatchFound: false, targetHash: 0, patternHash: pHash,
      currentIndex: 0, accessedIndices: new Set(), activeIndices: new Set(),
      log: { title: 'Ready', type: 'info', messageKey: 'READY' }
    };
  },
  getPreprocessing: (pattern) => {
    const m = pattern.length;
    const prime = 101, base = 256;
    let pHash = 0, h = 1;
    for (let i = 0; i < m - 1; i++) h = (h * base) % prime;
    for (let i = 0; i < m; i++) pHash = (base * pHash + pattern.codePointAt(i)) % prime;
    return { prime, base, h, pHash };
  },
  nextStep: (state, target, pattern, preprocessing) => {
    const { phase } = state;
    const newState = { ...state, activeIndices: new Set(state.accessedIndices) };
    if (phase === 0) return rabinkarp.handleInitHashPhase(newState, target, pattern, preprocessing);
    if (phase === 1) return rabinkarp.handleCompareHashesPhase(newState, pattern);
    if (phase === 2) return rabinkarp.handleVerificationPhase(newState, target, pattern);
    if (phase === 3) return rabinkarp.handleRollHashPhase(newState, target, pattern, preprocessing);
    return newState;
  },
  handleInitHashPhase: (state, target, pattern, preprocessing) => {
    const { base, prime } = preprocessing;
    const m = pattern.length;
    let tHash = 0;
    const initialIndices = new Set();
    for (let i = 0; i < m; i++) {
      tHash = (base * tHash + target.codePointAt(i)) % prime;
      initialIndices.add(i);
    }
    return {
      ...state, phase: 1, targetHash: tHash, patternHash: preprocessing.pHash,
      accessedIndices: initialIndices, activeIndices: initialIndices,
      log: { title: 'INITIAL HASHING', type: 'info', messageKey: 'INITIAL_HASHING', params: { pHash: preprocessing.pHash, tHash } }
    };
  },
  handleCompareHashesPhase: (state, pattern) => {
    const { currentIndex, targetHash, patternHash } = state;
    const m = pattern.length;
    const windowIndices = new Set();
    for (let i = 0; i < m; i++) windowIndices.add(currentIndex + i);
    if (targetHash === patternHash) {
      return {
        ...state, phase: 2, compIdx: 0, activeIndices: windowIndices,
        log: { title: 'HASH MATCH!', type: 'match', messageKey: 'HASH_MATCH', params: { targetHash, patternHash } }
      };
    }
    return {
      ...state, phase: 3, activeIndices: windowIndices,
      log: { title: 'HASH MISMATCH', type: 'mismatch', messageKey: 'HASH_MISMATCH', params: { targetHash, patternHash } }
    };
  },
  handleVerificationPhase: (state, target, pattern) => {
    const { currentIndex, compIdx } = state;
    const m = pattern.length;
    const textIdx = currentIndex + compIdx;
    const newAccessed = new Set(state.accessedIndices);
    newAccessed.add(textIdx);
    if (target[textIdx] !== pattern[compIdx]) {
      return {
        ...state, phase: 3, accessedIndices: newAccessed, activeIndices: new Set([textIdx]),
        log: { title: 'SPURIOUS HIT', type: 'mismatch', messageKey: 'SPURIOUS_HIT', params: { textIdx } }
      };
    }
    if (compIdx + 1 === m) {
      return {
        ...state, isFinished: true, accessedIndices: newAccessed, activeIndices: new Set([textIdx]),
        log: { title: 'SUCCESS: FULL MATCH', type: 'success', messageKey: 'SUCCESS_FULL_MATCH', params: { currentIndex } }
      };
    }
    return {
      ...state, compIdx: compIdx + 1, accessedIndices: newAccessed, activeIndices: new Set([textIdx]),
      log: { title: 'CHARACTER MATCH', type: 'match', messageKey: 'CHAR_MATCH' }
    };
  },
  handleRollHashPhase: (state, target, pattern, preprocessing) => {
    const { currentIndex, targetHash } = state;
    const { prime, base, h } = preprocessing;
    const m = pattern.length, n = target.length;
    const nextPos = currentIndex + 1;
    if (nextPos + m > n) {
      return { ...state, currentIndex: nextPos, isFinished: true, log: { title: 'SEARCH COMPLETED', type: 'info', messageKey: 'SEARCH_COMPLETED' } };
    }
    const charToRemoveCode = target.codePointAt(currentIndex);
    const charToAddCode = target.codePointAt(nextPos + m - 1);
    let tHash = (base * (targetHash - (charToRemoveCode * h) % prime) + charToAddCode) % prime;
    if (tHash < 0) tHash += prime;
    const newAccessed = new Set(state.accessedIndices);
    newAccessed.add(nextPos + m - 1);
    return {
      ...state, currentIndex: nextPos, targetHash: tHash, phase: 1,
      accessedIndices: newAccessed, activeIndices: new Set([nextPos + m - 1]),
      log: { title: 'ROLLING HASH', type: 'shift', messageKey: 'ROLLING_HASH', params: { charToRemove: target[currentIndex], charToAdd: target[nextPos + m - 1], tHash } }
    };
  }
});
