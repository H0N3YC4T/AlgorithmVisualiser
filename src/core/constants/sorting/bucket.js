export const bucket = {
  id: 'bucket',
  name: 'Bucket Sort',
  
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [42, 8, 76, 31, 95, 19, 58, 14];
    return {
      phase: 0,
      i: 0,
      array: array,
      buckets: [[], [], [], []], 
      maxVal: Math.max(...array),
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
    const { array, i, phase, buckets, maxVal } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      if (i >= array.length) {
        return {
          ...newState,
          phase: 1,
          i: 0,
          log: {
            title: 'DISTRIBUTION COMPLETE',
            type: 'match',
            messageKey: 'DISTRIBUTION_COMPLETE'
          }
        };
      }

      const val = array[i];
      const bucketIdx = Math.min(Math.floor((val / (maxVal + 1)) * buckets.length), buckets.length - 1);
      const newBuckets = buckets.map((b, idx) => idx === bucketIdx ? [...b, val] : b);

      return {
        ...newState,
        buckets: newBuckets,
        i: i + 1,
        activeIndices: [i],
        log: {
          title: 'BUCKETING',
          type: 'info',
          messageKey: 'BUCKETING',
          params: { val, bucketIdx }
        }
      };
    }

    if (phase === 1) {
      if (i >= buckets.length) {
        return {
          ...newState,
          phase: 2,
          i: 0,
          log: {
            title: 'BUCKETS SORTED',
            type: 'match',
            messageKey: 'BUCKETS_SORTED'
          }
        };
      }

      const newBuckets = [...buckets];
      newBuckets[i] = [...buckets[i]].sort((a, b) => a - b); 

      return {
        ...newState,
        buckets: newBuckets,
        i: i + 1,
        log: {
          title: 'SORTING BUCKET',
          type: 'info',
          messageKey: 'SORTING_BUCKET',
          params: { i }
        }
      };
    }

    if (phase === 2) {
      if (buckets.every(b => b.length === 0)) {
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

      const bucketIdx = buckets.findIndex(b => b.length > 0);
      const val = buckets[bucketIdx][0];
      const newBuckets = [...buckets];
      newBuckets[bucketIdx] = newBuckets[bucketIdx].slice(1);
      
      const newArray = [...array];
      newArray[i] = val;

      return {
        ...newState,
        array: newArray,
        buckets: newBuckets,
        i: i + 1,
        activeIndices: [i],
        swapIndices: [i],
        sortedIndices: [...state.sortedIndices, i],
        log: {
          title: 'CONCATENATING',
          type: 'shift',
          messageKey: 'CONCATENATING',
          params: { val, bucketIdx, i }
        }
      };
    }

    return newState;
  }
};
