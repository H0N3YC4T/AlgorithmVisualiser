import { createAlgorithmCard } from '../factory';
import { getGridConfig, generateMaze } from './grid-config';

/**
 * A* Search Algorithm Module
 */
export const astar = createAlgorithmCard({
  id: 'astar',
  
  // --- Metadata ---
  metadata: {
    type: 'pathfinding',
    visualizerType: 'grid',
    category: 'Pathfinding Algorithms',
    defaultInputs: { target: '', pattern: '' },
  },

  homeCard: {
    name: 'A* Search',
    difficulty: 'Hard',
    description: 'An informed search algorithm that uses heuristics to find the shortest path more efficiently than Dijkstra.',
    complexity: {
      timeBest: 'Ω(E)',
      timeAvg: 'Θ(E)',
      timeWorst: 'O(E)',
      space: 'O(V)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Visited: {iterations}',
      startButton: 'Start A*',
      playbackSpeed: 100
    },
    extendedDescription: 'A* is one of the most successful search algorithms to find the shortest path between nodes or graphs. It uses a heuristic function to estimate the cost from the current node to the target, prioritizing nodes that appear to be on the shortest path.',
    legendItems: [
      { label: 'Start', color: 'bg-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.4)]' },
      { label: 'End', color: 'bg-emerald-500 ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.4)]' },
      { label: 'Wall', color: 'bg-slate-700' },
      { label: 'Visited', color: 'bg-purple-500/30 border-purple-500/50' },
      { label: 'Path', color: 'bg-sky-600/90 shadow-[0_0_15px_rgba(2,132,199,0.3)]' },
    ],
    visualSteps: {
      READY: {
        title: 'Ready',
        message: "A* initialized. Using Manhattan distance heuristic to find the path to ({endNode.r}, {endNode.c}).",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      SEARCHING: {
        title: 'Exploring',
        message: "Visiting node ({r}, {c}). g={gScore}, h={hScore}, f={fScore}.",
        highlights: { pseudo: [2, 3], javascript: [4, 5], python: [4, 5] }
      },
      TARGET_REACHED: {
        title: 'Target Found ✓',
        message: "A* reached the target! Optimal path found.",
        highlights: { pseudo: [4], javascript: [7], python: [7] }
      },
      BACKTRACKING: {
        title: 'Reconstructing Path',
        message: "Tracing back from target to start using parent pointers.",
        highlights: { pseudo: [5], javascript: [9], python: [9] }
      },
      DONE: {
        title: 'Path Complete ✓',
        message: "A* pathfinding completed successfully.",
        highlights: { pseudo: [6], javascript: [11], python: [11] }
      },
      NO_PATH: {
        title: 'No Path Found',
        message: "Open set exhausted. No path exists to the target.",
        highlights: { pseudo: [7], javascript: [13], python: [13] }
      }
    }
  },

  codeSnippets: {
    pseudo: `function AStar(start, target):
  openSet = [start]
  gScore[start] = 0
  fScore[start] = heuristic(start, target)
  while openSet is not empty:
    current = node in openSet with min fScore
    if current == target: return reconstruct()
    for neighbor in neighbors(current):
      tentativeG = gScore[current] + weight(current, neighbor)
      if tentativeG < gScore[neighbor]:
        prev[neighbor] = current
        gScore[neighbor] = tentativeG
        fScore[neighbor] = tentativeG + heuristic(neighbor, target)
        if neighbor not in openSet: openSet.push(neighbor)`,
    javascript: `function astar(start, target) {
  const openSet = new PriorityQueue();
  openSet.push(start, heuristic(start, target));
  while (!openSet.isEmpty()) {
    const current = openSet.pop();
    if (current.id === target.id) return reconstruct(current);
    for (const neighbor of getNeighbors(current)) {
      const tentativeG = gScore[current.id] + neighbor.weight;
      if (tentativeG < (gScore[neighbor.id] || Infinity)) {
        prev[neighbor.id] = current;
        gScore[neighbor.id] = tentativeG;
        fScore[neighbor.id] = tentativeG + heuristic(neighbor, target);
        openSet.push(neighbor, fScore[neighbor.id]);
      }
    }
  }
}`,
    python: `def a_star(start, target):
    open_set = [(heuristic(start, target), start)]
    g_score = {start: 0}
    while open_set:
        f, current = heapq.heappop(open_set)
        if current == target: return reconstruct(current)
        for neighbor, weight in get_neighbors(current):
            tentative_g = g_score[current] + weight
            if tentative_g < g_score.get(neighbor, float('inf')):
                prev[neighbor] = current
                g_score[neighbor] = tentative_g
                h = heuristic(neighbor, target)
                heapq.heappush(open_set, (tentative_g + h, neighbor))`
  },

  // --- Logic ---
  getInitialState: (p, t, algo, existingState) => {
    const { rows, cols, startNode, endNode } = getGridConfig(existingState || algo);
    
    let walls;
    if (existingState?.walls) {
      walls = existingState.walls instanceof Set ? existingState.walls : new Set(existingState.walls.map(w => `${w.r},${w.c}`));
    } else {
      const mazeWalls = generateMaze(rows, cols, startNode, endNode);
      walls = new Set(mazeWalls.map(w => `${w.r},${w.c}`));
    }

    const gScore = {}; 
    const fScore = {};
    const startKey = `${startNode.r},${startNode.c}`;
    gScore[startKey] = 0;
    fScore[startKey] = Math.abs(startNode.r - endNode.r) + Math.abs(startNode.c - endNode.c);

    const costs = existingState?.costs || new Array(rows).fill().map(() => 
      new Array(cols).fill().map(() => 1)
    );

    return {
      rows, cols,
      startNode, endNode, walls, costs,
      gScore, fScore,
      visited: new Set(),
      previous: {},
      openSet: [startNode],
      path: [],
      phase: 0,
      activeNode: null,
      isFinished: false,
      iterations: 0,
      log: {
        title: 'Ready',
        type: 'info',
        messageKey: 'READY',
        params: { startNode, endNode }
      }
    };
  },

  nextStep: (state) => {
    const { gScore, fScore, visited, previous, openSet, phase, rows, cols, endNode, path, walls, costs } = state;

    if (phase === 0) { // handleSearchPhase
      if (openSet.length === 0) {
        return {
          ...state,
          isFinished: true,
          log: { title: 'NO PATH', type: 'mismatch', messageKey: 'NO_PATH' }
        };
      }

      const current = openSet.reduce((min, node) => {
        const dNode = fScore[`${node.r},${node.c}`] ?? Infinity;
        const dMin = fScore[`${min.r},${min.c}`] ?? Infinity;
        return dNode < dMin ? node : min;
      }, openSet[0]);

      const restOpenSet = openSet.filter(n => n !== current);
      const key = `${current.r},${current.c}`;

      if (visited.has(key)) return { ...state, openSet: restOpenSet };
      
      const newVisited = new Set(visited);
      newVisited.add(key);

      if (current.r === endNode.r && current.c === endNode.c) {
        return {
          ...state,
          visited: newVisited,
          phase: 1,
          activeNode: current,
          log: { title: 'TARGET REACHED', type: 'success', messageKey: 'TARGET_REACHED' }
        };
      }

      const neighbors = [
        { r: current.r - 1, c: current.c },
        { r: current.r + 1, c: current.c },
        { r: current.r, c: current.c - 1 },
        { r: current.r, c: current.c + 1 }
      ];

      const newGScore = { ...gScore };
      const newFScore = { ...fScore };
      const newPrevious = { ...previous };
      const newOpenSet = [...restOpenSet];

      for (const n of neighbors) {
        const nKey = `${n.r},${n.c}`;
        if (n.r >= 0 && n.r < rows && n.c >= 0 && n.c < cols && !visited.has(nKey) && !walls.has(nKey)) {
          const weight = (costs[n.r][n.c] || 1);
          const tentativeG = (gScore[key] ?? 0) + weight;
          if (tentativeG < (gScore[nKey] ?? Infinity)) {
            newPrevious[nKey] = current;
            newGScore[nKey] = tentativeG;
            const h = Math.abs(n.r - endNode.r) + Math.abs(n.c - endNode.c);
            newFScore[nKey] = tentativeG + h;
            if (!newOpenSet.some(o => o.r === n.r && o.c === n.c)) {
              newOpenSet.push(n);
            }
          }
        }
      }

      const hScore = Math.abs(current.r - endNode.r) + Math.abs(current.c - endNode.c);
      return {
        ...state,
        gScore: newGScore,
        fScore: newFScore,
        visited: newVisited,
        previous: newPrevious,
        openSet: newOpenSet,
        iterations: state.iterations + 1,
        activeNode: current,
        log: {
          title: 'SEARCHING',
          type: 'info',
          messageKey: 'SEARCHING',
          params: {
            r: current.r,
            c: current.c,
            gScore: newGScore[key],
            hScore,
            fScore: newFScore[key]
          }
        }
      };
    }

    if (phase === 1) { // handleBacktrackPhase
      const lastKey = path.length === 0 ? `${endNode.r},${endNode.c}` : `${path[0].r},${path[0].c}`;
      const parent = previous[lastKey];
      
      if (!parent) {
        return {
          ...state,
          isFinished: true,
          log: { title: 'DONE ✓', type: 'success', messageKey: 'DONE' }
        };
      }
      return {
        ...state,
        path: [parent, ...path],
        activeNode: parent,
        log: { title: 'BACKTRACKING', type: 'shift', messageKey: 'BACKTRACKING', params: { r: parent.r, c: parent.c } }
      };
    }

    return state;
  }
});