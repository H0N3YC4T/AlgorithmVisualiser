

export const binarysearch = {
  id: 'binarysearch',
  name: 'Binary Search',
  
  getInitialState: (p, t) => {
    const rawArray = Array.isArray(t) ? t : [3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53];
    const array = [...rawArray].sort((a, b) => a - b);
    const targetValue = typeof p === 'number' ? p : (Number.parseInt(p, 10) || 26);
    return {
      phase: 0,
      l: 0,
      r: array.length - 1,
      mid: -1,
      targetValue,
      array,
      activeIndices: [],
      sortedIndices: [],
      pivotIndex: -1,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY',
        params: { targetValue: targetValue }
      }
    };
  },

  getPreprocessing: () => ({}),

  nextStep: (state) => {
    const { phase } = state;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    if (phase === 0) {
      return binarysearch.handleStartPhase(newState);
    }

    if (phase === 1) {
      return binarysearch.handleMidPhase(newState);
    }

    if (phase === 2) {
      return binarysearch.handleComparePhase(newState);
    }

    return newState;
  },

  handleStartPhase: (state) => {
    const { array, targetValue } = state;
    return {
      ...state,
      phase: 1,
      l: 0,
      r: array.length - 1,
      log: {
        title: 'INITIALIZING',
        type: 'info',
        messageKey: 'INITIALIZING',
        params: { targetValue: targetValue, lenMinusOne: array.length - 1 }
      }
    };
  },

  handleMidPhase: (state) => {
    const { array, l, r, targetValue } = state;
    if (l > r) {
      return {
        ...state,
        isFinished: true,
        log: {
          title: 'NOT FOUND',
          type: 'mismatch',
          messageKey: 'NOT_FOUND',
          params: { targetValue: targetValue }
        }
      };
    }

    const mid = Math.floor((l + r) / 2);
    return {
      ...state,
      phase: 2,
      mid,
      pivotIndex: mid,
      activeIndices: [l, r],
      log: {
        title: 'CALCULATING MID',
        type: 'info',
        messageKey: 'CALCULATING_MID',
        params: { l: l, r: r, mid: mid, val: array[mid] }
      }
    };
  },

  handleComparePhase: (state) => {
    const { array, mid, targetValue } = state;
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
          messageKey: 'MATCH_FOUND',
          params: { mid: mid }
        }
      };
    }
    
    if (array[mid] < targetValue) {
      return {
        ...state,
        phase: 1,
        l: mid + 1,
        log: {
          title: 'SEARCH RIGHT',
          type: 'match',
          messageKey: 'SEARCH_RIGHT',
          params: { val: array[mid], targetValue: targetValue, midPlusOne: mid + 1, r: state.r }
        }
      };
    }

    return {
      ...state,
      phase: 1,
      r: mid - 1,
      log: {
        title: 'SEARCH LEFT',
        type: 'mismatch',
        messageKey: 'SEARCH_LEFT',
        params: { val: array[mid], targetValue: targetValue, midMinusOne: mid - 1, l: state.l }
      }
    };
  }
};
