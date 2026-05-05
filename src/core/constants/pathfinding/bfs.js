import { getGridConfig } from './grid-config';

export const bfs = {
  id: 'bfs',
  name: "Breadth-First Search",
  
  getInitialState: (p, t, algo, gridConfig) => {
    const { rows, cols, startNode, endNode } = getGridConfig(gridConfig || algo);
    const walls = gridConfig?.walls || [];
    
    return {
      rows, cols,
      startNode, endNode, walls,
      visited: new Array(rows).fill().map(() => new Array(cols).fill(false)),
      previous: new Array(rows).fill().map(() => new Array(cols).fill(null)),
      queue: [startNode],
      path: [],
      phase: 0, 
      activeNode: null,
      isFinished: false,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY'
      }
    };
  },

  nextStep: (state) => {
    const { visited, previous, queue, phase } = state;
    const newState = { 
      ...state, 
      activeNode: null,
      visited: visited.map(row => [...row]),
      previous: previous.map(row => [...row]),
      queue: [...queue]
    };

    if (phase === 0) {
      return bfs.handleSearchPhase(newState);
    }

    if (phase === 1) {
      return bfs.handleBacktrackPhase(newState);
    }

    return newState;
  },

  handleSearchPhase: (state) => {
    const { rows, cols, endNode } = state;
    if (state.queue.length === 0) {
      return { 
        ...state, 
        isFinished: true, 
        log: { 
          title: 'NO PATH', 
          type: 'mismatch', 
          messageKey: 'NO_PATH' 
        } 
      };
    }

    const current = state.queue.shift();
    state.visited[current.r][current.c] = true;
    state.activeNode = current;
    
    if (current.r === endNode.r && current.c === endNode.c) {
      return {
        ...state,
        phase: 1,
        log: { 
          title: 'TARGET REACHED', 
          type: 'success', 
          messageKey: 'TARGET_REACHED' 
        }
      };
    }

    const neighbors = [
      { r: current.r - 1, c: current.c },
      { r: current.r + 1, c: current.c },
      { r: current.r, c: current.c - 1 },
      { r: current.r, c: current.c + 1 }
    ];

    for (const n of neighbors) {
      const isWall = (state.walls || []).some(w => w.r === n.r && w.c === n.c);
      if (n.r >= 0 && n.r < rows && n.c >= 0 && n.c < cols && !state.visited[n.r][n.c] && !isWall) {
        if (!state.queue.some(o => o.r === n.r && o.c === n.c)) {
          state.previous[n.r][n.c] = current;
          state.queue.push(n);
        }
      }
    }

    return {
      ...state,
      log: {
        title: 'SEARCHING',
        type: 'info',
        messageKey: 'SEARCHING',
        params: { 
          r: current.r, 
          c: current.c 
        }
      }
    };
  },

  handleBacktrackPhase: (state) => {
    const { endNode, path } = state;
    const last = path.length === 0 ? endNode : state.previous[path[0].r][path[0].c];
    if (last === null) {
      return { 
        ...state, 
        isFinished: true, 
        log: { 
          title: 'DONE ✓', 
          type: 'success', 
          messageKey: 'DONE' 
        } 
      };
    }
    return {
      ...state,
      path: [last, ...path],
      activeNode: last,
      log: { 
        title: 'BACKTRACKING', 
        type: 'shift', 
        messageKey: 'BACKTRACKING', 
        params: { r: last.r, c: last.c } 
      }
    };
  }
};
