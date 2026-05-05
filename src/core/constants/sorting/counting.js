export const counting = {
  id: 'counting',
  name: 'Counting Sort',
  
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [4, 2, 6, 1, 3, 2, 5, 1];
    const maxVal = array.length > 0 ? Math.max(...array) : 1;
    return {
      phase: 0,
      i: 0,
      array: array,
      countArray: [],
      maxVal: maxVal,
      output: new Array(array.length).fill(null),
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
    const { array, i, phase, countArray, maxVal, output } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      return {
        ...newState,
        phase: 1,
        countArray: new Array(maxVal + 1).fill(0),
        log: {
          title: 'INITIALIZING',
          type: 'info',
          messageKey: 'INITIALIZING',
          params: { maxVal }
        }
      };
    }

    if (phase === 1) {
      if (i >= array.length) {
        return {
          ...newState,
          phase: 2,
          i: 1,
          log: {
            title: 'COUNTING COMPLETE',
            type: 'match',
            messageKey: 'COUNTING_COMPLETE'
          }
        };
      }

      const val = array[i];
      const newCount = [...countArray];
      newCount[val]++;

      return {
        ...newState,
        countArray: newCount,
        i: i + 1,
        activeIndices: [i],
        log: {
          title: 'RECORDING COUNT',
          type: 'info',
          messageKey: 'RECORDING_COUNT',
          params: { i, val, newCountVal: newCount[val] }
        }
      };
    }

    if (phase === 2) {
      if (i > maxVal) {
        return {
          ...newState,
          phase: 3,
          i: array.length - 1,
          log: {
            title: 'CUMULATIVE DONE',
            type: 'match',
            messageKey: 'CUMULATIVE_DONE'
          }
        };
      }

      const newCount = [...countArray];
      newCount[i] += newCount[i - 1];

      return {
        ...newState,
        countArray: newCount,
        i: i + 1,
        log: {
          title: 'ACCUMULATING',
          type: 'info',
          messageKey: 'ACCUMULATING',
          params: { i, iMinusOne: i - 1, newCountI: newCount[i] }
        }
      };
    }

    if (phase === 3) {
      if (i < 0) {
        return {
          ...newState,
          isFinished: true,
          array: output,
          sortedIndices: [...new Array(array.length).keys()],
          log: {
            title: 'SORT COMPLETED',
            type: 'success',
            messageKey: 'SORT_COMPLETE'
          }
        };
      }

      const val = array[i];
      const pos = countArray[val] - 1;
      const newCount = [...countArray];
      newCount[val]--;

      const newOutput = [...output];
      newOutput[pos] = val;

      return {
        ...newState,
        output: newOutput,
        countArray: newCount,
        i: i - 1,
        activeIndices: [i],
        swapIndices: [pos],
        log: {
          title: 'PLACING ELEMENT',
          type: 'shift',
          messageKey: 'PLACING_ELEMENT',
          params: { val, i, pos }
        }
      };
    }

    return newState;
  }
};
