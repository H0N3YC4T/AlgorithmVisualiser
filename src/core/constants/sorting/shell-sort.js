export const shellsort = {
  id: 'shellsort',
  name: 'Shell Sort',
  
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [23, 29, 15, 19, 31, 7, 9, 5, 2];
    return {
      phase: 0,
      gap: Math.floor(array.length / 2),
      i: Math.floor(array.length / 2),
      j: Math.floor(array.length / 2),
      array: array,
      activeIndices: [],
      sortedIndices: [],
      swapIndices: [],
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY'
      }
    };
  },

  getPreprocessing: () => ({}),

  nextStep: (state) => {
    const { array, gap, i, phase } = state;
    const n = array.length;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      if (gap <= 0) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [...new Array(array.length).keys()],
          log: {
            title: 'SORT COMPLETE',
            type: 'success',
            messageKey: 'SORT_COMPLETE'
          }
        };
      }
      return {
        ...newState,
        phase: 1,
        i: gap,
        log: {
          title: `GAP SIZE: ${gap}`,
          type: 'info',
          messageKey: 'GAP_SIZE',
          params: { gap }
        }
      };
    }

    if (phase === 1) {
      if (i >= n) {
        return {
          ...newState,
          phase: 0,
          gap: Math.floor(gap / 2),
          log: {
            title: 'PASS FINISHED',
            type: 'match',
            messageKey: 'PASS_FINISHED',
            params: { gap }
          }
        };
      }
      return {
        ...newState,
        phase: 2,
        j: i,
        log: {
          title: `INSERTION AT GAP`,
          type: 'info',
          messageKey: 'INSERTION_AT_GAP',
          params: { val: array[i], i }
        }
      };
    }

    if (phase === 2) {
      if (state.j < gap || array[state.j - gap] <= array[state.j]) {
        return {
          ...newState,
          phase: 1,
          i: i + 1,
          activeIndices: [state.j],
          log: {
            title: 'POSITION FOUND',
            type: 'match',
            messageKey: 'POSITION_FOUND',
            params: { j: state.j }
          }
        };
      }

      newState.comparisons = (newState.comparisons || 0) + 1;
      newState.activeIndices = [state.j, state.j - gap];

      const newArray = [...array];
      [newArray[state.j], newArray[state.j - gap]] = [newArray[state.j - gap], newArray[state.j]];

      return {
        ...newState,
        array: newArray,
        j: state.j - gap,
        swapIndices: [state.j, state.j - gap],
        log: {
          title: 'GAP SWAP',
          type: 'shift',
          messageKey: 'GAP_SWAP',
          params: { valLeft: array[state.j - gap], valRight: array[state.j], gap }
        }
      };
    }

    return newState;
  }
};
