export const kmp = {
  id: 'kmp',
  name: 'KMP Search',
  
  getInitialState: () => ({
    phase: 1,
    compIdx: 0,
    mismatchFound: false,
    activeIndices: new Set(),
    comparisons: 0,
    log: {
      title: 'INITIALIZING',
      type: 'info',
      messageKey: 'READY'
    }
  }),

  getPreprocessing: (pattern) => {
    const m = pattern.length;
    const pi = new Array(m).fill(0);
    let k = 0;
    for (let q = 1; q < m; q++) {
      while (k > 0 && pattern[k] !== pattern[q]) {
        k = pi[k - 1];
      }
      if (pattern[k] === pattern[q]) {
        k++;
      }
      pi[q] = k;
    }
    return { pi };
  },

  nextStep: (state, target, pattern, preprocessing) => {
    const newState = { ...state, activeIndices: new Set() };
    const { phase } = state;

    if (phase === 1) {
      return kmp.handleComparisonPhase(newState, target, pattern);
    }

    if (phase === 2) {
      return kmp.handleFailurePhase(newState, preprocessing);
    }

    if (phase === 3) {
      return kmp.handleShiftPhase(newState, target, pattern, preprocessing);
    }

    return newState;
  },

  handleComparisonPhase: (state, target, pattern) => {
    const { currentIndex, compIdx } = state;
    const m = pattern.length;
    const textIdx = currentIndex + compIdx;
    const targetChar = target[textIdx];
    const patternChar = pattern[compIdx];
    
    state.comparisons += 1;
    state.accessedIndices.add(textIdx);
    state.activeIndices.add(textIdx);

    if (targetChar !== patternChar) {
      return {
        ...state,
        mismatchFound: true,
        phase: 2,
        log: {
          title: 'MISMATCH',
          type: 'mismatch',
          messageKey: 'MISMATCH',
          params: { idx: textIdx, targetChar: targetChar, patternChar: patternChar }
        }
      };
    }

    if (compIdx + 1 === m) {
      return {
        ...state,
        isFinished: true,
        log: {
          title: 'MATCH FOUND ✓',
          type: 'success',
          messageKey: 'MATCH_FOUND',
          params: { idx: currentIndex }
        }
      };
    }

    return {
      ...state,
      compIdx: compIdx + 1,
      log: {
        title: 'CHARACTER MATCH',
        type: 'match',
        messageKey: 'CHAR_MATCH',
        params: { targetChar: targetChar, patternChar: patternChar, newLen: compIdx + 1 }
      }
    };
  },

  handleFailurePhase: (state, preprocessing) => {
    const { compIdx } = state;
    const { pi } = preprocessing;
    if (compIdx === 0) {
      return {
        ...state,
        phase: 3,
        log: {
          title: 'NO PREFIX MATCHED',
          type: 'shift',
          messageKey: 'NO_PREFIX'
        }
      };
    }
    
    const newCompIdx = pi[compIdx - 1];
    const shiftValue = compIdx - newCompIdx;
    
    return {
      ...state,
      phase: 3,
      log: {
        title: 'CONSULTING π TABLE',
        type: 'shift',
        messageKey: 'CONSULT_PI',
        params: { compIdx: compIdx, piIdx: compIdx - 1, newCompIdx: newCompIdx, shiftValue: shiftValue }
      }
    };
  },

  handleShiftPhase: (state, target, pattern, preprocessing) => {
    const { currentIndex, compIdx } = state;
    const { pi } = preprocessing;
    const m = pattern.length;
    const n = target.length;

    const newCompIdx = compIdx > 0 ? pi[compIdx - 1] : 0;
    const shiftValue = compIdx > 0 ? compIdx - newCompIdx : 1;
    const nextPos = currentIndex + shiftValue;
    state.iterations += 1;

    if (nextPos + m > n) {
      return {
        ...state,
        currentIndex: nextPos,
        isFinished: true,
        log: {
          title: 'END OF TEXT',
          type: 'info',
          messageKey: 'END_OF_TEXT',
          params: { nextPos: nextPos }
        }
      };
    }

    const preservedIndices = new Set();
    for (let k = 0; k < newCompIdx; k++) preservedIndices.add(nextPos + k);

    return {
      ...state,
      currentIndex: nextPos,
      compIdx: newCompIdx, 
      phase: 1,
      mismatchFound: false,
      activeIndices: preservedIndices,
      log: {
        title: 'SMART SHIFT',
        type: 'shift',
        messageKey: 'SMART_SHIFT',
        params: { nextPos: nextPos, newCompIdx: newCompIdx }
      }
    };
  }
};
