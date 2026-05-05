export const radix = {
  id: 'radix',
  name: 'Radix Sort',
  
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [53, 17, 82, 34, 91, 26, 45, 68];
    return {
      phase: 0,
      exp: 1, 
      array: array,
      maxVal: Math.max(...array),
      buckets: Array.from({ length: 10 }, () => []),
      i: 0,
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
    const { array, exp, maxVal, phase, i, buckets } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      if (Math.floor(maxVal / exp) <= 0) {
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
        i: 0,
        buckets: Array.from({ length: 10 }, () => []),
        log: {
          title: `PROCESSING ${exp}s DIGIT`,
          type: 'info',
          messageKey: 'PROCESSING_DIGIT',
          params: { exp: exp }
        }
      };
    }

    if (phase === 1) {
      if (i >= array.length) {
        return {
          ...newState,
          phase: 2,
          log: {
            title: 'DISTRIBUTION COMPLETE',
            type: 'match',
            messageKey: 'DISTRIBUTION_COMPLETE',
            params: { exp: exp }
          }
        };
      }

      const val = array[i];
      const digit = Math.floor((val / exp) % 10);
      const newBuckets = buckets.map((b, idx) => idx === digit ? [...b, val] : b);

      return {
        ...newState,
        buckets: newBuckets,
        i: i + 1,
        activeIndices: [i],
        log: {
          title: 'BUCKETING',
          type: 'info',
          messageKey: 'BUCKETING',
          params: { val: val, digit: digit, exp: exp }
        }
      };
    }

    if (phase === 2) {
      const flattened = buckets.flat();
      return {
        ...newState,
        array: flattened,
        phase: 0,
        exp: exp * 10,
        log: {
          title: 'PASS COMPLETE',
          type: 'shift',
          messageKey: 'PASS_COMPLETE',
          params: { exp: exp }
        }
      };
    }

    return newState;
  }
};
