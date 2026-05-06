export const quickhoare = {
  id: 'quickhoare',
  name: 'Quick Sort (Hoare)',
  
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [5, 8, 1, 9, 3, 7, 2, 6];
    return {
      phase: 0,
      stack: [[0, array.length - 1]],
      array: array,
      activeIndices: [],
      sortedIndices: [],
      swapIndices: [],
      pivotIndex: -1,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY'
      }
    };
  },

  nextStep: (state) => {
    const { phase } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      return quickhoare.handleInitPartitionPhase(newState);
    }

    if (phase === 1) {
      return quickhoare.handleMoveIPhase(newState);
    }

    if (phase === 2) {
      return quickhoare.handleMoveJPhase(newState);
    }

    if (phase === 3) {
      return quickhoare.handleCheckSwapPhase(newState);
    }

    return newState;
  },

  handleInitPartitionPhase: (state) => {
    const { array, stack } = state;
    if (stack.length === 0) {
      return {
        ...state,
        isFinished: true,
        sortedIndices: [...new Array(array.length).keys()],
        log: { title: 'SORTED ✓', type: 'success', messageKey: 'SORTED' }
      };
    }

    const newStack = [...stack];
    const [l, r] = newStack.pop();
    if (l >= r) {
      if (l === r) state.sortedIndices = [...new Set([...state.sortedIndices, l])];
      return quickhoare.nextStep({ ...state, stack: newStack });
    }

    const midIdx = Math.floor((l + r) / 2);
    const pivot = array[midIdx];
    
    return {
      ...state,
      phase: 1, 
      stack: newStack,
      l, r,
      pivot,
      pivotIndex: midIdx,
      i: l - 1,
      j: r + 1,
      log: {
        title: 'START PARTITION',
        type: 'info',
        messageKey: 'START_PARTITION',
        params: { l, r, pivot }
      }
    };
  },

  handleMoveIPhase: (state) => {
    const { array, i, pivot } = state;
    const nextI = i + 1;
    
    if (array[nextI] < pivot) {
      return {
        ...state,
        i: nextI,
        activeIndices: [nextI],
        log: {
          title: 'MOVING i',
          type: 'info',
          messageKey: 'MOVING_I',
          params: { val: array[nextI], pivot }
        }
      };
    }

    return {
      ...state,
      i: nextI,
      phase: 2, 
      activeIndices: [nextI],
      log: {
        title: 'i STOPPED',
        type: 'match',
        messageKey: 'I_STOPPED',
        params: { val: array[nextI], pivot }
      }
    };
  },

  handleMoveJPhase: (state) => {
    const { array, j, pivot } = state;
    const nextJ = j - 1;
    
    if (array[nextJ] > pivot) {
      return {
        ...state,
        j: nextJ,
        activeIndices: [nextJ],
        log: {
          title: 'MOVING j',
          type: 'info',
          messageKey: 'MOVING_J',
          params: { val: array[nextJ], pivot }
        }
      };
    }

    return {
      ...state,
      j: nextJ,
      phase: 3, 
      activeIndices: [nextJ],
      log: {
        title: 'j STOPPED',
        type: 'match',
        messageKey: 'J_STOPPED',
        params: { val: array[nextJ], pivot }
      }
    };
  },

  handleCheckSwapPhase: (state) => {
    const { array, l, r, i, j, stack } = state;
    if (i >= j) {
      const newStack = [...stack, [j + 1, r], [l, j]];
      return {
        ...state,
        phase: 0,
        stack: newStack,
        activeIndices: [i, j],
        pivotIndex: -1,
        log: {
          title: 'CROSSED',
          type: 'shift',
          messageKey: 'CROSSED',
          params: { i, j }
        }
      };
    }

    const newArray = [...array];
    let newPivotIndex = state.pivotIndex;
    if (i === state.pivotIndex) newPivotIndex = j;
    else if (j === state.pivotIndex) newPivotIndex = i;

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    return {
      ...state,
      array: newArray,
      phase: 1, 
      swapIndices: [i, j],
      pivotIndex: newPivotIndex,
      log: {
        title: 'SWAPPING',
        type: 'shift',
        messageKey: 'SWAPPING',
        params: { i, j, valI: array[i], valJ: array[j] }
      }
    };
  }
};
