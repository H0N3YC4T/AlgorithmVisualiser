import { getGridConfig } from './grid-config';

export const dijkstra = {
  id: 'dijkstra',
  name: "Dijkstra's Algorithm",
  
  getInitialState: (p, t, algo, gridConfig) => {
    const { rows, cols, startNode, endNode } = getGridConfig(gridConfig || algo);
    const walls = gridConfig?.walls || [];
    
    // Generate random values (heights) for each cell if not provided
    const costs = gridConfig?.costs || new Array(rows).fill().map(() => 
      new Array(cols).fill().map(() => Math.floor(Math.random() * 10))
    );
    
    const distances = new Array(rows).fill().map(() => new Array(cols).fill(Infinity));
    distances[startNode.r][startNode.c] = 0;
    
    return {
      rows,
      cols,
      startNode,
      endNode,
      walls,
      costs,
      distances,
      visited: new Array(rows).fill().map(() => new Array(cols).fill(false)),
      previous: new Array(rows).fill().map(() => new Array(cols).fill(null)),
      queue: [startNode],
      path: [],
      phase: 0, // 0: Searching, 1: Backtracking Path, 2: Finished
      activeNode: null,
      isFinished: false,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY',
        params: { startR: startNode.r, startC: startNode.c, endR: endNode.r, endC: endNode.c }
      }
    };
  },

  nextStep: (state) => {
    const { distances, visited, previous, queue, phase } = state;
    const newState = { 
      ...state, 
      activeNode: null,
      distances: distances.map(row => [...row]),
      visited: visited.map(row => [...row]),
      previous: previous.map(row => [...row]),
      queue: [...queue]
    };

    // Phase 0: Search
    if (phase === 0) {
      return dijkstra.handleSearchPhase(newState);
    }

    // Phase 1: Backtrack
    if (phase === 1) {
      return dijkstra.handleBacktrackPhase(newState);
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

    const current = state.queue.reduce((min, node) => 
      state.distances[node.r][node.c] < state.distances[min.r][min.c] ? node : min, state.queue[0]);
    
    state.queue = state.queue.filter(n => n !== current);
    
    if (state.visited[current.r][current.c]) {
      return dijkstra.nextStep(state);
    }
    
    state.visited[current.r][current.c] = true;
    state.activeNode = current;

    if (current.r === endNode.r && current.c === endNode.c) {
      return {
        ...state,
        phase: 1,
        log: {
          title: 'TARGET FOUND',
          type: 'success',
          messageKey: 'TARGET_FOUND'
        }
      };
    }

    // Explore Neighbors
    const neighbors = [
      { r: current.r - 1, c: current.c },
      { r: current.r + 1, c: current.c },
      { r: current.r, c: current.c - 1 },
      { r: current.r, c: current.c + 1 }
    ];

    for (const n of neighbors) {
      const isWall = (state.walls || []).some(w => w.r === n.r && w.c === n.c);
      if (n.r >= 0 && n.r < rows && n.c >= 0 && n.c < cols && !state.visited[n.r][n.c] && !isWall) {
        // Traversal cost is the value of the destination cell (plus 1 for the step)
        const weight = (state.costs[n.r][n.c] || 0) + 1;
        const alt = state.distances[current.r][current.c] + weight;
        
        if (alt < state.distances[n.r][n.c]) {
          state.distances[n.r][n.c] = alt;
          state.previous[n.r][n.c] = current;
          state.queue.push(n);
        }
      }
    }

    return {
      ...state,
      log: {
        title: 'EXPLORING',
        type: 'info',
        messageKey: 'EXPLORING',
        params: { r: current.r, c: current.c }
      }
    };
  },

  handleBacktrackPhase: (state) => {
    const { endNode, previous, path } = state;
    const last = path.length === 0 ? endNode : previous[path[0].r][path[0].c];
    if (last === null) {
      return {
        ...state,
        isFinished: true,
        log: {
          title: 'PATH COMPLETE ✓',
          type: 'success',
          messageKey: 'PATH_COMPLETE'
        }
      };
    }

    const newPath = [last, ...path];
    return {
      ...state,
      path: newPath,
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
