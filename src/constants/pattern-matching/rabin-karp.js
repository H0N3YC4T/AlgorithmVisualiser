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
      message: "Commencing Rabin-Karp Search: A hashing-based string matching algorithm.\n\n• Mechanism: Mapping string windows to numerical 'fingerprints' for accelerated comparison.\n• Optimization: Performing character-by-character validation only upon fingerprint (hash) collisions.",
      highlights: { pseudo: [1, 2], javascript: [1, 2, 3], python: [1, 2, 3] }
    },
    INITIAL_HASHING: {
      title: 'Initial Hashing',
      message: "Fingerprint Generation Phase.\n\n• Pattern Hash: {pHash}\n• Initial Window Hash: {tHash}\n• Strategy: Initializing the search state by hashing the pattern and the first text window.",
      highlights: { pseudo: [3], javascript: [4, 5, 6, 7, 8], python: [4, 5, 6, 7, 8, 9] }
    },
    HASH_MATCH: {
      title: 'Hash Match!',
      message: "Fingerprint Collision Detected.\n\n• Target hash ({targetHash}) matches pattern hash ({patternHash}).\n• Action: Initiating character-by-character verification to confirm the match or identify a spurious hit.",
      highlights: { pseudo: [5, 6], javascript: [11, 12], python: [11, 12] }
    },
    HASH_MISMATCH: {
      title: 'Hash Mismatch',
      message: "Fingerprint Divergence.\n\n• Window hash ({targetHash}) ≠ pattern hash ({patternHash}).\n• Logic: Invariant failure—the window cannot contain the pattern.\n• Action: Shifting the window via rolling hash.",
      highlights: { pseudo: [5, 8], javascript: [11, 14], python: [11, 14] }
    },
    SPURIOUS_HIT: {
      title: 'Spurious Hit',
      message: "Spurious Hit Identified (Hash Collision).\n\n• Hashes matched, but the character sequence at index {textIdx} differs.\n• Note: A collision occurred in the hash function's finite range.",
      highlights: { pseudo: [6], javascript: [12], python: [12] }
    },
    SUCCESS_FULL_MATCH: {
      title: 'Success!',
      message: "Pattern Instance Finalized!\n\n• Result: Both fingerprints and character sequences are fully synchronized at index {currentIndex}.\n• Match Confirmed.",
      highlights: { pseudo: [7], javascript: [12], python: [12] }
    },
    CHAR_MATCH: {
      title: 'Verification Scan',
      message: "Verification Scan.\n\n• Local character match confirmed within a valid hash window.\n• Continuing sequential validation of the remaining pattern length.",
      highlights: { pseudo: [6], javascript: [12], python: [12] }
    },
    ROLLING_HASH: {
      title: 'Rolling Hash',
      message: "Rolling Hash Update (O(1) Shift).\n\n• Evicting: '{charToRemove}' | Admitting: '{charToAdd}'.\n• Updated Hash: {tHash}\n• Strategy: Recalculating the fingerprint in constant time by shifting the sliding window digits.",
      highlights: { pseudo: [9], javascript: [15, 16], python: [15, 16] }
    },
    SEARCH_COMPLETED: {
      title: 'Search Completed',
      message: "Search Domain Exhausted.\n\n• All potential window alignments have been fingerprints and/or validated.\n• Result: Execution terminated.",
      highlights: { pseudo: [10], javascript: [10, 11], python: [10, 11] }
    }
  },
  codeSnippets: {
    pseudo: `function rabinKarp(text, pattern):
  n = text.length, m = pattern.length
  h_pattern = hash(pattern)
  h_window = hash(text[0...m-1])
  for i from 0 to n - m:
    if h_pattern == h_window:
      if text[i...i+m-1] == pattern:
        return i
    if i < n - m:
      h_window = rollHash(h_window, text[i], text[i+m])
  return -1`,
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
}`,
    python: `def rabin_karp(text, pattern):
    d, q = 256, 101
    n, m = len(text), len(pattern)
    p, t, h = 0, 0, 1
    for i in range(m - 1):
        h = (h * d) % q
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q
    for i in range(n - m + 1):
        if p == t:
            if text[i : i + m] == pattern:
                return i
        if i < n - m:
            t = (d * (t - ord(text[i]) * h) + ord(text[i + m])) % q
            if t < 0: t += q
    return -1`
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
