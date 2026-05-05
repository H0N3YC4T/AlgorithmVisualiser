export const zalgorithm = {
  id: 'zalgorithm',
  name: 'Z-Algorithm',
  
  getInitialState: (p = '', t = '') => {
    const concat = p + '$' + t;
    const n = concat.length;
    const z = new Array(n).fill(0);
    
    let l = 0, r = 0;
    const pLen = p.length;
    for (let i = 1; i <= pLen; i++) {
      if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
      while (i + z[i] < n && concat[z[i]] === concat[i + z[i]]) z[i]++;
      if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1; }
    }

    return {
      phase: 1,
      i: pLen + 1,
      l: 0,
      r: 0,
      z,
      concat,
      activeIndices: [],
      comparisons: 0,
      log: {
        title: 'INITIALIZING',
        type: 'info',
        messageKey: 'READY',
        params: { p, t, concat, pLen, startIndex: pLen + 1 }
      }
    };
  },

  getPreprocessing: (pattern, target) => {
    const concat = pattern + '$' + target;
    return { concat };
  },

  nextStep: (state, target, pattern, preprocessing) => {
    const { phase, concat: stateConcat } = state;
    const { concat: preConcat } = preprocessing;
    const concat = stateConcat || preConcat || (pattern + '$' + target);
    const n = concat.length;
    const newState = { ...state, activeIndices: new Set(), concat };

    if (phase === 1) {
      return zalgorithm.handleDecisionPhase(newState, pattern, n);
    }

    if (phase === 2) {
      return zalgorithm.handleManualComparisonPhase(newState, n);
    }

    return newState;
  },

  handleDecisionPhase: (state, pattern, n) => {
    const { i, l, r, z } = state;
    if (i >= n) {
      const matches = [];
      const patternLen = pattern.length;
      for (let j = patternLen + 1; j < n; j++) {
        if (z[j] === patternLen) matches.push(j - (patternLen + 1));
      }

      return {
        ...state,
        isFinished: true,
        log: {
          title: 'Z-ARRAY COMPLETE ✓',
          type: 'success',
          messageKey: 'Z_ARRAY_COMPLETE',
          params: { 
            foundCountStatus: matches.length > 0 
              ? `Found ${matches.length} matches at indices: ${matches.join(', ')}` 
              : 'No matches found in the text'
          }
        }
      };
    }

    if (i > r) {
      return {
        ...state,
        phase: 2,
        l: i,
        r: i - 1,
        activeIndices: [i, 0],
        log: {
          title: 'OUTSIDE Z-BOX',
          type: 'info',
          messageKey: 'OUTSIDE_Z_BOX',
          params: { i, r }
        }
      };
    }

    const k = i - l;
    const remaining = r - i + 1;
    
    if (z[k] < remaining) {
      const newZ = [...z];
      newZ[i] = z[k];
      return {
        ...state,
        z: newZ,
        i: i + 1,
        activeIndices: [i],
        referenceIndex: k,
        log: {
          title: 'INSIDE Z-BOX (OPTIMIZED)',
          type: 'match',
          messageKey: 'INSIDE_Z_BOX_OPTIMIZED',
          params: { i, l, r, k, zK: z[k] }
        }
      };
    }

    return {
      ...state,
      phase: 2,
      l: i,
      activeIndices: [i, r - i + 1],
      log: {
        title: 'EXTENDING Z-BOX',
        type: 'info',
        messageKey: 'EXTENDING_Z_BOX',
        params: { i, k, r }
      }
    };
  },

  handleManualComparisonPhase: (state, n) => {
    const { l: curL, r: curR, i, z, concat } = state;
    const matchLen = curR - curL + 1;
    const patternIdx = matchLen;
    const textIdx = curL + matchLen;
    state.referenceIndex = patternIdx;

    if (textIdx < n && concat[patternIdx] === concat[textIdx]) {
      state.comparisons += 1;
      return {
        ...state,
        r: textIdx,
        activeIndices: [patternIdx, textIdx],
        log: {
          title: 'CHARACTER MATCH',
          type: 'match',
          messageKey: 'CHARACTER_MATCH',
          params: { patternIdx, textIdx, char: concat[patternIdx] }
        }
      };
    }

    if (textIdx < n) state.comparisons += 1;
    const newZ = [...z];
    newZ[i] = curR - curL + 1;
    return {
      ...state,
      z: newZ,
      phase: 1,
      i: i + 1,
      activeIndices: [textIdx < n ? textIdx : n - 1],
      referenceIndex: patternIdx < n ? patternIdx : n - 1,
      log: {
        title: 'MISMATCH / BOX END',
        type: 'mismatch',
        messageKey: 'MISMATCH_BOX_END',
        params: { patternIdx, i, zValue: newZ[i], l: curL, r: curR }
      }
    };
  }
};
