/**
 * Rabin-Karp Substring Search Algorithm Module
 */

export const rabinkarp = {
  id: 'rabinkarp',
  name: 'Rabin-Karp Search',
  
  getInitialState: (p) => {
    // Calculate initial pattern hash immediately for UI feedback
    const prime = 101;
    const base = 256;
    let pHash = 0;
    if (p && typeof p === 'string') {
      for (let i = 0; i < p.length; i++) {
        pHash = (base * pHash + p.codePointAt(i)) % prime;
      }
    }

    return {
      phase: 0,
      compIdx: -1,
      mismatchFound: false,
      targetHash: 0,
      patternHash: pHash,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY'
      }
    };
  },

  getPreprocessing: (pattern) => {
    const m = pattern.length;
    const prime = 101;
    const base = 256;
    
    let pHash = 0;
    let h = 1;
    for (let i = 0; i < m - 1; i++) {
      h = (h * base) % prime;
    }

    for (let i = 0; i < m; i++) {
      pHash = (base * pHash + pattern.codePointAt(i)) % prime;
    }

    return { prime, base, h, pHash };
  },

  nextStep: (state, target, pattern, preprocessing) => {
    const { phase } = state;
    const newState = { ...state, activeIndices: new Set(state.accessedIndices) };

    // Phase 0: Calculate Initial Target Hash
    if (phase === 0) {
      return rabinkarp.handleInitHashPhase(newState, target, pattern, preprocessing);
    }

    // Phase 1: Compare Hashes
    if (phase === 1) {
      return rabinkarp.handleCompareHashesPhase(newState, pattern);
    }

    // Phase 2: Character Verification (Only on Hash Match)
    if (phase === 2) {
      return rabinkarp.handleVerificationPhase(newState, target, pattern);
    }

    // Phase 3: Roll Hash and Shift
    if (phase === 3) {
      return rabinkarp.handleRollHashPhase(newState, target, pattern, preprocessing);
    }

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
      ...state,
      phase: 1,
      targetHash: tHash,
      patternHash: preprocessing.pHash,
      accessedIndices: initialIndices,
      activeIndices: initialIndices,
      log: {
        title: 'INITIAL HASHING',
        type: 'info',
        messageKey: 'INITIAL_HASHING',
        params: { pHash: preprocessing.pHash, tHash }
      }
    };
  },

  handleCompareHashesPhase: (state, pattern) => {
    const { currentIndex, targetHash, patternHash } = state;
    const m = pattern.length;
    const windowIndices = new Set();
    for (let i = 0; i < m; i++) {
      windowIndices.add(currentIndex + i);
    }

    if (targetHash === patternHash) {
      return {
        ...state,
        phase: 2,
        compIdx: 0,
        activeIndices: windowIndices,
        log: {
          title: 'HASH MATCH!',
          type: 'match',
          messageKey: 'HASH_MATCH',
          params: { targetHash, patternHash }
        }
      };
    }

    return {
      ...state,
      phase: 3,
      activeIndices: windowIndices,
      log: {
        title: 'HASH MISMATCH',
        type: 'mismatch',
        messageKey: 'HASH_MISMATCH',
        params: { targetHash, patternHash }
      }
    };
  },

  handleVerificationPhase: (state, target, pattern) => {
    const { currentIndex, compIdx } = state;
    const m = pattern.length;
    const textIdx = currentIndex + compIdx;
    state.comparisons += 1;
    const newAccessed = new Set(state.accessedIndices);
    newAccessed.add(textIdx);

    if (target[textIdx] !== pattern[compIdx]) {
      return {
        ...state,
        phase: 3,
        accessedIndices: newAccessed,
        activeIndices: new Set([textIdx]),
        log: {
          title: 'SPURIOUS HIT',
          type: 'mismatch',
          messageKey: 'SPURIOUS_HIT',
          params: { textIdx }
        }
      };
    }

    if (compIdx + 1 === m) {
      return {
        ...state,
        isFinished: true,
        accessedIndices: newAccessed,
        activeIndices: new Set([textIdx]),
        log: {
          title: 'SUCCESS: FULL MATCH',
          type: 'success',
          messageKey: 'SUCCESS_FULL_MATCH',
          params: { currentIndex }
        }
      };
    }

    return {
      ...state,
      compIdx: compIdx + 1,
      accessedIndices: newAccessed,
      activeIndices: new Set([textIdx]),
      log: {
        title: 'CHARACTER MATCH',
        type: 'match',
        messageKey: 'CHAR_MATCH'
      }
    };
  },

  handleRollHashPhase: (state, target, pattern, preprocessing) => {
    const { currentIndex, targetHash } = state;
    const { prime, base, h } = preprocessing;
    const m = pattern.length;
    const n = target.length;
    const nextPos = currentIndex + 1;
    state.iterations += 1;

    if (nextPos + m > n) {
      return {
        ...state,
        currentIndex: nextPos,
        isFinished: true,
        log: {
          title: 'SEARCH COMPLETED',
          type: 'info',
          messageKey: 'SEARCH_COMPLETED'
        }
      };
    }

    // Canonical Rabin-Karp rolling hash:
    const charToRemoveCode = target.codePointAt(currentIndex);
    const charToAddCode = target.codePointAt(nextPos + m - 1);
    
    let tHash = (base * (targetHash - (charToRemoveCode * h) % prime) + charToAddCode) % prime;
    if (tHash < 0) tHash += prime;
    
    const newAccessed = new Set(state.accessedIndices);
    newAccessed.add(nextPos + m - 1);

    return {
      ...state,
      currentIndex: nextPos,
      targetHash: tHash,
      phase: 1,
      accessedIndices: newAccessed,
      activeIndices: new Set([nextPos + m - 1]),
      log: {
        title: 'ROLLING HASH',
        type: 'shift',
        messageKey: 'ROLLING_HASH',
        params: { 
          charToRemove: target[currentIndex], 
          charToAdd: target[nextPos + m - 1], 
          tHash 
        }
      }
    };
  }
};
