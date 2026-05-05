/**
 * Linear Search Algorithm Module
 */

export const linear = {
  id: 'linear',
  name: 'Linear Search',
  
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [12, 5, 14, 8, 4, 11, 8, 15, 4, 6, 13, 10];
    const targetValue = typeof p === 'number' ? p : (Number.parseInt(p, 10) || 13);
    
    return {
      phase: 0,
      i: 0,
      targetValue: targetValue,
      array: array,
      activeIndices: [],
      sortedIndices: [],
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
    const { array, i, targetValue, phase } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [] };

    // Phase 0: Start
    if (phase === 0) {
      return {
        ...newState,
        phase: 1,
        i: 0,
        log: {
          title: 'STARTING SEARCH',
          type: 'info',
          messageKey: 'STARTING_SEARCH',
          params: { targetValue: targetValue }
        }
      };
    }

    // Phase 1: Comparison
    if (phase === 1) {
      if (i >= n) {
        return {
          ...newState,
          isFinished: true,
          log: {
            title: 'NOT FOUND',
            type: 'mismatch',
            messageKey: 'NOT_FOUND',
            params: { targetValue: targetValue }
          }
        };
      }

      newState.comparisons += 1;
      newState.activeIndices = [i];

      if (array[i] === targetValue) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [i],
          log: {
            title: 'VALUE FOUND!',
            type: 'success',
            messageKey: 'VALUE_FOUND',
            params: { i: i, targetValue: targetValue }
          }
        };
      } else {
        return {
          ...newState,
          i: i + 1,
          log: {
            title: 'NO MATCH',
            type: 'info',
            messageKey: 'NO_MATCH',
            params: { i: i, val: array[i], targetValue: targetValue }
          }
        };
      }
    }

    return newState;
  }
};
