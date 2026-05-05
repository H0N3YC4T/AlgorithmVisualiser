/**
 * Quickselect Algorithm Module
 * Used to find the k-th smallest element in an unordered list.
 */

export const quickselect = {
  id: 'quickselect',
  name: 'Quickselect',
  
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [5, 2, 8, 3, 9, 1, 7, 4];
    
    // Robust parsing of k
    let kInput = p;
    if (Array.isArray(p)) kInput = p[0];
    const parsedK = typeof kInput === 'number' ? kInput : Number.parseInt(kInput, 10);
    const targetK = Number.isNaN(parsedK) ? 3 : parsedK;
    
    // k is the 0-indexed target position
    const k = Math.max(0, targetK - 1); 

    return {
      phase: 0,
      k: k,
      targetK: targetK,
      l: 0,
      r: array.length - 1,
      array: array,
      activeIndices: [],
      sortedIndices: [],
      pivotIndex: -1,
      isFinished: false,
      log: {
        title: 'INITIALIZING',
        type: 'info',
        messageKey: 'INITIALIZING',
        params: { k: k, targetK: targetK }
      }
    };
  },

  nextStep: (state) => {
    const { array, l, r, k, phase } = state;
    const newState = { ...state, activeIndices: [], pivotIndex: -1 };

    if (l > r) {
      return { ...newState, isFinished: true, log: { title: 'ERROR', type: 'mismatch', messageKey: 'ERROR' } };
    }

    // Phase 0: Initialize partition
    if (phase === 0) {
      const pivot = array[r];
      return {
        ...newState,
        phase: 1,
        pivot,
        pivotIndex: r,
        i: l,
        j: l,
        log: {
          title: 'START PARTITION',
          type: 'info',
          messageKey: 'START_PARTITION',
          params: { l: l, r: r, pivot: pivot, k: k }
        }
      };
    }

    // Phase 1: Partitioning Scan (Lomuto)
    if (phase === 1) {
      const { i, j, pivot } = state;
      if (j < r) {
        newState.activeIndices = [j, r];
        if (array[j] < pivot) {
          const newArray = [...array];
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          return {
            ...newState,
            array: newArray,
            i: i + 1,
            j: j + 1,
            log: {
              title: 'SWAP SMALLER',
              type: 'match',
              messageKey: 'SWAP_SMALLER',
              params: { val: array[j], pivot: pivot, i: i }
            }
          };
        } else {
          return {
            ...newState,
            j: j + 1,
            log: {
              title: 'CONTINUE SCAN',
              type: 'info',
              messageKey: 'CONTINUE_SCAN',
              params: { val: array[j], pivot: pivot }
            }
          };
        }
      } else {
        // Final pivot swap
        const newArray = [...array];
        [newArray[i], newArray[r]] = [newArray[r], newArray[i]];
        return {
          ...newState,
          array: newArray,
          phase: 2,
          pivotIndex: i,
          log: {
            title: 'PIVOT PLACED',
            type: 'shift',
            messageKey: 'PIVOT_PLACED',
            params: { i: i }
          }
        };
      }
    }

    // Phase 2: Check Pivot Position
    if (phase === 2) {
      const pivotIdx = state.pivotIndex;
      if (pivotIdx === k) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [pivotIdx],
          log: {
            title: 'FOUND ✓',
            type: 'success',
            messageKey: 'FOUND',
            params: { k: k, kPlusOne: k + 1, val: array[pivotIdx] }
          }
        };
      } else if (pivotIdx > k) {
        return {
          ...newState,
          phase: 0,
          l,
          r: pivotIdx - 1,
          log: {
            title: 'SEARCH LEFT',
            type: 'shift',
            messageKey: 'SEARCH_LEFT',
            params: { pivotIdx: pivotIdx, k: k, l: l, pivotIdxMinusOne: pivotIdx - 1 }
          }
        };
      } else {
        return {
          ...newState,
          phase: 0,
          l: pivotIdx + 1,
          r,
          log: {
            title: 'SEARCH RIGHT',
            type: 'shift',
            messageKey: 'SEARCH_RIGHT',
            params: { pivotIdx: pivotIdx, k: k, pivotIdxPlusOne: pivotIdx + 1, r: r }
          }
        };
      }
    }

    return newState;
  }
};
