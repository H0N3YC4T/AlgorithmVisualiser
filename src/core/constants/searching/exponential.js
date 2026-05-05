/**
 * Exponential Search Algorithm Module
 */

export const exponentialsearch = {
  id: 'exponentialsearch',
  name: 'Exponential Search',
  
  getInitialState: (p, t) => {
    const rawArray = Array.isArray(t) ? t : [3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53];
    const array = [...rawArray].sort((a, b) => a - b);
    const targetValue = typeof p === 'number' ? p : (Number.parseInt(p, 10) || 47);
    return {
      phase: 0,
      i: 1,
      l: 0,
      r: 0,
      mid: -1,
      targetValue: targetValue,
      array: array,
    activeIndices: [],
    sortedIndices: [],
    pivotIndex: -1,
    log: {
      title: 'Ready',
      type: 'info',
      content: 'Exponential Search first doubles an index to bound the target range, then runs Binary Search within that range.'
    }
    };
  },

  getPreprocessing: () => ({}),

  nextStep: (state) => {
    const { targetValue, phase, array } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    // Phase 0: Check index 0
    if (phase === 0) {
      return exponentialsearch.handleCheckZeroPhase(newState, targetValue);
    }

    // Phase 1: Exponential Jumps
    if (phase === 1) {
      return exponentialsearch.handleJumpPhase(newState, n, targetValue);
    }

    // Phase 2: Binary Search Logic
    if (phase === 2) {
      return exponentialsearch.handleBSCalcPhase(newState, targetValue);
    }

    // Phase 3: Binary Search Comparison
    if (phase === 3) {
      return exponentialsearch.handleBSComparePhase(newState, targetValue);
    }

    return newState;
  },

  handleCheckZeroPhase: (state, targetValue) => {
    const { array } = state;
    state.activeIndices = [0];
    state.comparisons += 1;
    if (array[0] === targetValue) {
      return {
        ...state,
        isFinished: true,
        sortedIndices: [0],
        log: {
          title: 'FOUND AT 0',
          type: 'success',
            messageKey: 'FOUND_AT_0'
        }
      };
    }
    return {
      ...state,
      phase: 1,
      i: 1,
      log: {
        title: 'STARTING EXPONENTIAL JUMPS',
        type: 'info',
          messageKey: 'STARTING_JUMPS',
          params: { targetValue: targetValue }
      }
    };
  },

  handleJumpPhase: (state, n, targetValue) => {
    const { array, i } = state;
    if (i < n && array[i] <= targetValue) {
      state.activeIndices = [i];
      state.comparisons += 1;
      return {
        ...state,
        i: i * 2,
        log: {
          title: 'DOUBLING INDEX',
          type: 'info',
          messageKey: 'DOUBLING_INDEX',
          params: { i: i, val: array[i], targetValue: targetValue, nextI: i * 2 }
        }
      };
    }

    const left = i / 2;
    const right = Math.min(i, n - 1);
    return {
      ...state,
      phase: 2,
      l: left,
      r: right,
      log: {
        title: 'BOUNDS FOUND',
        type: 'match',
          messageKey: 'BOUNDS_FOUND',
          params: { left: left, right: right }
      }
    };
  },

  handleBSCalcPhase: (state, targetValue) => {
    const { l, r, array } = state;
    if (l > r) {
      return {
        ...state,
        isFinished: true,
        log: {
          title: 'NOT FOUND',
          type: 'mismatch',
          messageKey: 'BS_NOT_FOUND',
          params: { targetValue: targetValue }
        }
      };
    }
    const mid = Math.floor((l + r) / 2);
    state.pivotIndex = mid;
    state.activeIndices = [l, r];
    return {
      ...state,
      phase: 3,
      mid,
      log: {
        title: 'BS: CALC MID',
        type: 'info',
        messageKey: 'BS_CALC_MID',
        params: { l: l, r: r, mid: mid, val: array[mid] }
      }
    };
  },

  handleBSComparePhase: (state, targetValue) => {
    const { mid, array, r, l } = state;
    state.comparisons += 1;
    state.pivotIndex = mid;

    if (array[mid] === targetValue) {
      return {
        ...state,
        isFinished: true,
        sortedIndices: [mid],
        log: {
          title: 'MATCH FOUND!',
          type: 'success',
          messageKey: 'BS_MATCH_FOUND',
          params: { mid: mid }
        }
      };
    }
    
    if (array[mid] < targetValue) {
      return {
        ...state,
        phase: 2,
        l: mid + 1,
        log: {
          title: 'BS: SEARCH RIGHT',
          type: 'match',
          messageKey: 'BS_SEARCH_RIGHT',
          params: { val: array[mid], targetValue: targetValue, midPlusOne: mid + 1, r: r }
        }
      };
    }

    return {
      ...state,
      phase: 2,
      r: mid - 1,
      log: {
        title: 'BS: SEARCH LEFT',
        type: 'mismatch',
        messageKey: 'BS_SEARCH_LEFT',
        params: { val: array[mid], targetValue: targetValue, l: l, midMinusOne: mid - 1 }
      }
    };
  }
};
