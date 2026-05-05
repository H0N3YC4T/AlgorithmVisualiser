/**
 * Boyer-Moore (Horspool) Substring Search Algorithm Module
 */

export const boyermoore = {
  id: 'boyermoore',
  name: 'Boyer-Moore Search',
  
  getInitialState: () => ({
    phase: 1,
    comparesRightToLeft: true,
    lookAheadIndex: -1,
    showShiftArrow: false,
    log: {
      title: 'INITIALIZING',
      type: 'info',
      messageKey: 'READY'
    }
  }),

  getPreprocessing: (pattern) => {
    const m = pattern.length;
    const table = {};
    for (let i = 0; i < m - 1; i++) {
      table[pattern[i]] = m - 1 - i;
    }
    return {
      badCharTable: table,
      getShift: (char) => table[char] || m
    };
  },

  nextStep: (state, target, pattern, preprocessing) => {
    const { currentIndex, phase, compIdx } = state;
    const { getShift, badCharTable } = preprocessing;
    const m = pattern.length;
    const n = target.length;
    
    // Initialize compIdx on first step if needed
    const currentCompIdx = compIdx === undefined ? m - 1 : compIdx;
    
    const newState = { 
      ...state, 
      compIdx: currentCompIdx,
      activeIndices: new Set(),
      accessedIndices: state.accessedIndices || new Set()
    };

    // Phase 1: Comparison (Right to Left)
    if (phase === 1) {
      const textIdx = currentIndex + currentCompIdx;
      const targetChar = target[textIdx];
      const patternChar = pattern[currentCompIdx];
      
      newState.comparisons += 1;
      newState.accessedIndices.add(textIdx);
      newState.activeIndices.add(textIdx);

      if (targetChar !== patternChar) {
        return {
          ...newState,
          compIdx: currentCompIdx,
          mismatchFound: true,
          phase: 2,
          lookAheadIndex: currentIndex + m - 1,
          showShiftArrow: false,
          log: {
            title: 'MISMATCH',
            type: 'mismatch',
            messageKey: 'MISMATCH'
          }
        };
      } else if (currentCompIdx === 0) {
        return {
          ...newState,
          isFinished: true,
          log: {
            title: 'MATCH FOUND ✓',
            type: 'success',
            messageKey: 'MATCH_FOUND',
            params: { idx: currentIndex }
          }
        };
      } else {
        return {
          ...newState,
          compIdx: currentCompIdx - 1,
          log: {
            title: 'RIGHT-TO-LEFT MATCH',
            type: 'match',
            messageKey: 'CHAR_MATCH',
            params: { targetChar, patternChar }
          }
        };
      }
    }

    // Phase 2: Bad Character Rule
    if (phase === 2) {
      const badCharIdx = currentIndex + m - 1; 
      const badChar = target[badCharIdx];
      const shiftValue = getShift(badChar);
      
      newState.activeIndices.add(badCharIdx);

      return {
        ...newState,
        phase: 3,
        lookAheadIndex: badCharIdx,
        showShiftArrow: true,
        log: {
          title: 'BAD CHARACTER RULE',
          type: 'shift',
          messageKey: 'BAD_CHAR_RULE',
          params: { 
            badChar, 
            shiftValue,
            foundStatus: badCharTable[badChar] ? "exists in the pattern" : "does not exist in the pattern"
          }
        }
      };
    }

    // Phase 3: Execute Shift
    if (phase === 3) {
      const badChar = target[currentIndex + m - 1];
      const shiftValue = getShift(badChar);
      const nextPos = currentIndex + shiftValue;
      newState.iterations += 1;

      if (nextPos + m > n) {
        return {
          ...newState,
          currentIndex: nextPos,
          isFinished: true,
          log: {
            title: 'END OF TEXT',
            type: 'info',
            messageKey: 'END_OF_TEXT',
            params: { nextPos }
          }
        };
      } else {
        return {
          ...newState,
          currentIndex: nextPos,
          phase: 1,
          compIdx: m - 1,
          mismatchFound: false,
          lookAheadIndex: -1,
          showShiftArrow: false,
          log: {
            title: 'SHIFT EXECUTED',
            type: 'shift',
            messageKey: 'SHIFT_EXECUTED',
            params: { shiftValue, nextPos }
          }
        };
      }
    }

    return newState;
  }
};
