import { getGridConfig } from './grid-config';

export const astar = {
  id: 'astar',
  name: "A* Search",

  getInitialState: (p, t, algo, gridConfig) => {
    const { rows, cols, startNode, endNode } = getGridConfig(gridConfig || algo);
    const walls = gridConfig?.walls || [];

    const gScore = new Array(rows).fill().map(() => new Array(cols).fill(Infinity));
    const fScore = new Array(rows).fill().map(() => new Array(cols).fill(Infinity));

    gScore[startNode.r][startNode.c] = 0;
    fScore[startNode.r][startNode.c] = Math.abs(startNode.r - endNode.r) + Math.abs(startNode.c - endNode.c);

    const costs = gridConfig?.costs || new Array(rows).fill().map(() => 
      new Array(cols).fill().map(() => Math.floor(Math.random() * 10))
    );

    return {
      rows, cols,
      startNode, endNode, walls, costs,
      gScore, fScore,
      visited: new Array(rows).fill().map(() => new Array(cols).fill(false)),
      previous: new Array(rows).fill().map(() => new Array(cols).fill(null)),
      openSet: [startNode],
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
    const { gScore, fScore, visited, previous, openSet, phase } = state;
    const newState = {
      ...state,
      activeNode: null,
      gScore: gScore.map(row => [...row]),
      fScore: fScore.map(row => [...row]),
      visited: visited.map(row => [...row]),
      previous: previous.map(row => [...row]),
      openSet: [...openSet]
    };

    if (phase === 0) {
      return astar.handleSearchPhase(newState);
    }

    if (phase === 1) {
      return astar.handleBacktrackPhase(newState);
    }

    return newState;
  },

  handleSearchPhase: (state) => {
    const { rows, cols, endNode } = state;
    if (state.openSet.length === 0) {
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

    const current = state.openSet.reduce((min, node) =>
      state.fScore[node.r][node.c] < state.fScore[min.r][min.c] ? node : min, state.openSet[0]);

    state.openSet = state.openSet.filter(n => n !== current);
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
        const weight = (state.costs[n.r][n.c] || 0) + 1;
        const tentativeG = state.gScore[current.r][current.c] + weight;
        if (tentativeG < state.gScore[n.r][n.c]) {
          state.previous[n.r][n.c] = current;
          state.gScore[n.r][n.c] = tentativeG;
          const h = Math.abs(n.r - endNode.r) + Math.abs(n.c - endNode.c);
          state.fScore[n.r][n.c] = tentativeG + h;
          if (!state.openSet.some(o => o.r === n.r && o.c === n.c)) {
            state.openSet.push(n);
          }
        }
      }
    }

    const hScore = Math.abs(current.r - endNode.r) + Math.abs(current.c - endNode.c);
    return {
      ...state,
      log: {
        title: 'SEARCHING',
        type: 'info',
        messageKey: 'SEARCHING',
        params: {
          r: current.r,
          c: current.c,
          gScore: state.gScore[current.r][current.c],
          hScore,
          fScore: state.fScore[current.r][current.c]
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