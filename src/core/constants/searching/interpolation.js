/**
 * Interpolation Search Algorithm Module
 */

export const interpolationsearch = {
  id: 'interpolationsearch',
  name: 'Interpolation Search',
  
  getInitialState: (p, t) => {
    const rawArray = Array.isArray(t) ? t : [3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69];
    const array = [...rawArray].sort((a, b) => a - b);
    const targetValue = typeof p === 'number' ? p : (Number.parseInt(p, 10) || 39);
    return {
      phase: 0,
      low: 0,
      high: array.length - 1,
      pos: -1,
      targetValue: targetValue,
      array,
      activeIndices: [],
      sortedIndices: [],
      pivotIndex: -1,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY'
      }
    };
  },

  getPreprocessing: () => ({}),

  nextStep: (state) => {
    const { array, low, high, targetValue, phase } = state;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    // Phase 0: Calculate Position
    if (phase === 0) {
      if (low > high || targetValue < array[low] || targetValue > array[high]) {
        return {
          ...newState,
          isFinished: true,
          log: {
            title: 'OUT OF BOUNDS',
            type: 'mismatch',
            messageKey: 'OUT_OF_BOUNDS'
          }
        };
      }

      // Formula: pos = low + [ (x - arr[low]) * (high - low) / (arr[high] - arr[low]) ]
      const pos = low + Math.floor(((targetValue - array[low]) * (high - low)) / (array[high] - array[low]));
      
      return {
        ...newState,
        phase: 1,
        pos,
        pivotIndex: pos,
        activeIndices: [low, high],
        log: {
          title: 'ESTIMATING POSITION',
          type: 'info',
          messageKey: 'ESTIMATING_POSITION',
          params: { pos: pos }
        }
      };
    }

    // Phase 1: Comparison
    if (phase === 1) {
      const { pos } = state;
      newState.comparisons += 1;
      newState.pivotIndex = pos;

      if (array[pos] === targetValue) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [pos],
          log: {
            title: 'MATCH FOUND!',
            type: 'success',
            messageKey: 'MATCH_FOUND',
            params: { pos: pos }
          }
        };
      } else if (array[pos] < targetValue) {
        return {
          ...newState,
          phase: 0,
          low: pos + 1,
          log: {
            title: 'ESTIMATE TOO LOW',
            type: 'match',
            messageKey: 'ESTIMATE_TOO_LOW',
            params: { pos: pos, val: array[pos], targetValue: targetValue }
          }
        };
      } else {
        return {
          ...newState,
          phase: 0,
          high: pos - 1,
          log: {
            title: 'ESTIMATE TOO HIGH',
            type: 'mismatch',
            messageKey: 'ESTIMATE_TOO_HIGH',
            params: { pos: pos, val: array[pos], targetValue: targetValue }
          }
        };
      }
    }

    return newState;
  }
};
