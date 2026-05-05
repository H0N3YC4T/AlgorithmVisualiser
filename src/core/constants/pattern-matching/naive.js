export const naive = {
  id: 'naive',
  name: 'Naive Search',
  
  getInitialState: () => ({
    phase: 1,
    compIdx: 0,
    mismatchFound: false,
    log: {
      title: 'INITIALIZING',
      type: 'info',
      messageKey: 'READY'
    }
  }),

  getPreprocessing: () => ({}),

  nextStep: (state, target, pattern) => {
    const { currentIndex, phase, compIdx } = state;
    const m = pattern.length;
    const n = target.length;
    const newState = { ...state };

    if (phase === 1) {
      const textIdx = currentIndex + compIdx;
      const targetChar = target[textIdx];
      const patternChar = pattern[compIdx];
      
      newState.comparisons += 1;
      newState.accessedIndices.add(textIdx);

      if (targetChar !== patternChar) {
        return {
          ...newState,
          mismatchFound: true,
          phase: 2,
          log: {
            title: 'MISMATCH',
            type: 'mismatch',
            messageKey: 'MISMATCH',
            params: { idx: textIdx, targetChar: targetChar, patternChar: patternChar }
          }
        };
      } else if (compIdx + 1 === m) {
        return {
          ...newState,
          isFinished: true,
          log: {
            title: 'MATCH FOUND ✓',
            type: 'success',
            messageKey: 'MATCH_FOUND',
            params: { m: m, idx: currentIndex }
          }
        };
      } else {
        return {
          ...newState,
          compIdx: compIdx + 1,
          log: {
            title: 'CHARACTER MATCH',
            type: 'match',
            messageKey: 'CHAR_MATCH',
            params: { targetChar: targetChar, patternChar: patternChar }
          }
        };
      }
    }

    if (phase === 2) {
      const nextPos = currentIndex + 1;
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
            params: { nextPos: nextPos }
          }
        };
      } else {
        return {
          ...newState,
          currentIndex: nextPos,
          phase: 1,
          compIdx: 0,
          mismatchFound: false,
          log: {
            title: 'SHIFTING',
            type: 'shift',
            messageKey: 'SHIFTING',
            params: { currentIndex: currentIndex, nextPos: nextPos }
          }
        };
      }
    }

    return newState;
  }
};

