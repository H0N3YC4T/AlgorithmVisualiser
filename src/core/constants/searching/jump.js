/**
 * Jump Search Algorithm Module
 */

export const jumpsearch = {
  id: 'jumpsearch',
  name: 'Jump Search',
  
  getInitialState: (p, t) => {
    const rawArray = Array.isArray(t) ? t : [3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53];
    const array = [...rawArray].sort((a, b) => a - b);
    const targetValue = typeof p === 'number' ? p : (Number.parseInt(p, 10) || 30);
    return {
      phase: 0,
      i: 0,
      prev: 0,
      step: Math.floor(Math.sqrt(array.length)),
      targetValue: targetValue,
      array,
      activeIndices: [],
      sortedIndices: [],
      pivotIndex: -1,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY',
        params: { step: Math.floor(Math.sqrt(array.length)) }
      }
    };
  },

  getPreprocessing: () => ({}),

  nextStep: (state) => {
    const { array, i, prev, step, targetValue, phase } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    // Phase 0: Jumping
    if (phase === 0) {
      const currentJump = Math.min(i, n - 1);
      newState.activeIndices = [currentJump];
      newState.comparisons += 1;

      if (array[currentJump] < targetValue && i < n) {
        return {
          ...newState,
          prev: i,
          i: i + step,
          log: {
            title: 'JUMPING',
            type: 'info',
            messageKey: 'JUMPING',
            params: { currentJump: currentJump, val: array[currentJump], targetValue: targetValue, step: step, nextI: i + step }
          }
        };
      } else {
        return {
          ...newState,
          phase: 1,
          i: Math.min(i, n - 1),
          log: {
            title: 'BLOCK IDENTIFIED',
            type: 'match',
            messageKey: 'BLOCK_IDENTIFIED',
            params: { prev: prev, curr: Math.min(i, n - 1) }
          }
        };
      }
    }

    // Phase 1: Linear Search within block
    if (phase === 1) {
      if (prev > i) {
        return {
          ...newState,
          isFinished: true,
          log: {
            title: 'NOT FOUND',
            type: 'mismatch',
            messageKey: 'NOT_FOUND'
          }
        };
      }

      newState.activeIndices = [prev];
      newState.comparisons += 1;

      if (array[prev] === targetValue) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [prev],
          log: {
            title: 'MATCH FOUND!',
            type: 'success',
            messageKey: 'MATCH_FOUND',
            params: { prev: prev }
          }
        };
      } else {
        return {
          ...newState,
          prev: prev + 1,
          log: {
            title: 'LINEAR SCAN',
            type: 'info',
            messageKey: 'LINEAR_SCAN',
            params: { prev: prev }
          }
        };
      }
    }

    return newState;
  }
};
