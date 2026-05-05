export const cocktail = {
  id: 'cocktail',
  name: 'Cocktail Shaker Sort',
  
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [7, 1, 6, 2, 5, 3, 8, 4];
    return {
      phase: 1,
      start: 0,
      end: array.length - 1,
      k: 0,
      swapped: false,
      direction: 1,
      passes: 1,
      array,
      activeIndices: [0, 1],
      sortedIndices: [],
      swapIndices: [],
      comparisons: 0,
      log: {
        title: 'FORWARD PASS',
        type: 'info',
        messageKey: 'READY',
        params: { val0: array[0], val1: array[1] }
      }
    };
  },

  getPreprocessing: () => ({}),

  nextStep: (state) => {
    const { phase } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 1) {
      return cocktail.handleComparisonPhase(newState);
    }

    if (phase === 2) {
      return cocktail.handleSwapPhase(newState);
    }

    return newState;
  },

  handleComparisonPhase: (state) => {
    const { array, start, end, k, swapped, direction } = state;
    const n = array.length;
    const isDone = direction === 1 ? k >= end : k < start;
    
    if (isDone) {
      if (!swapped) {
        return {
          ...state,
          isFinished: true,
          sortedIndices: [...new Array(n).keys()],
          log: {
            title: 'SORTED ✓',
            type: 'success',
            messageKey: 'SORTED'
          }
        };
      }
      
      return cocktail.prepareNextPass(state);
    }

    state.comparisons += 1;
    state.activeIndices = [k, k + 1];

    if (array[k] > array[k + 1]) {
      return {
        ...state,
        phase: 2,
        log: {
          title: 'OUT OF ORDER',
          type: 'mismatch',
          messageKey: 'OUT_OF_ORDER',
          params: { k: k, valK: array[k], kPlusOne: k + 1, valKPlusOne: array[k + 1] }
        }
      };
    }

    const nextK = k + direction;
    return {
      ...state,
      k: nextK,
      activeIndices: [nextK, nextK + 1],
      log: {
        title: 'IN ORDER',
        type: 'match',
        messageKey: 'IN_ORDER',
        params: { k: k, valK: array[k], kPlusOne: k + 1, valKPlusOne: array[k + 1] }
      }
    };
  },

  prepareNextPass: (state) => {
    const { start, end, direction, sortedIndices, passes } = state;
    if (direction === 1) {
      const newEnd = end - 1;
      const nextK = newEnd - 1;
      return {
        ...state,
        direction: -1,
        end: newEnd,
        k: nextK,
        swapped: false,
        passes: passes + 1,
        sortedIndices: [...sortedIndices, end],
        activeIndices: [nextK, nextK + 1],
        log: {
          title: 'BACKWARD PASS',
          type: 'info',
          messageKey: 'BACKWARD_PASS',
          params: { end: end, nextK: nextK, start: start }
        }
      };
    } else {
      const newStart = start + 1;
      const nextK = newStart;
      return {
        ...state,
        direction: 1,
        start: newStart,
        k: nextK,
        swapped: false,
        passes: passes + 1,
        sortedIndices: [...sortedIndices, start],
        activeIndices: [nextK, nextK + 1],
        log: {
          title: 'FORWARD PASS',
          type: 'info',
          messageKey: 'FORWARD_PASS',
          params: { start: start, nextK: nextK, end: end }
        }
      };
    }
  },

  handleSwapPhase: (state) => {
    const { array, start, end, k, direction } = state;
    const newArray = [...array];
    [newArray[k], newArray[k + 1]] = [newArray[k + 1], newArray[k]];
    const nextK = k + direction;
    
    const isKValid = direction === 1 ? nextK < end : nextK >= start;
    const activeIndices = isKValid ? [nextK, nextK + 1] : [];

    return {
      ...state,
      array: newArray,
      phase: 1,
      swapped: true,
      swapIndices: [k, k + 1],
      k: nextK,
      activeIndices,
      log: {
        title: 'SWAPPED',
        type: 'shift',
        messageKey: 'SWAPPED',
        params: { k: k, kPlusOne: k + 1, valK: newArray[k], valKPlusOne: newArray[k + 1] }
      }
    };
  }
};
