import { createAlgorithmCard } from '../factory';
import { getGridConfig, generateMaze } from './grid-config';

/**
 * Dijkstra's Algorithm Module
 */
export const dijkstra = createAlgorithmCard({
  id: 'dijkstra',
  
  // --- Metadata ---
  metadata: {
    type: 'pathfinding',
    visualizerType: 'grid',
    category: 'Pathfinding Algorithms',
    defaultInputs: { target: '', pattern: '' },
  },

  homeCard: {
    name: "Dijkstra's Algorithm",
    difficulty: 'Hard',
    description: 'Finds the absolute shortest path in a weighted grid by always exploring the node with the lowest cost.',
    complexity: {
      timeBest: 'Ω(V log V)',
      timeAvg: 'Θ(E + V log V)',
      timeWorst: 'O(E + V log V)',
      space: 'O(V)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Visited: {iterations}',
      startButton: 'Start Dijkstra',
      playbackSpeed: 100
    },
    extendedDescription: "Dijkstra's algorithm finds the shortest path between nodes in a graph. In a grid, it explores the nodes closest to the start first. When costs (weights) are involved, Dijkstra is the standard for guaranteed shortest paths.",
    legendItems: [
      { label: 'Start', color: 'bg-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.4)]' },
      { label: 'End', color: 'bg-emerald-500 ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.4)]' },
      { label: 'Wall', color: 'bg-slate-700' },
      { label: 'Visited', color: 'bg-indigo-500/15 border-indigo-500/30' },
      { label: 'Path', color: 'bg-sky-500/60 shadow-[0_0_10px_rgba(14,165,233,0.2)]' },
    ],
    visualSteps: {
      READY: {
        title: 'Ready',
        message: "Dijkstra initialized. Ready to find the shortest path from ({startNode.r}, {startNode.c}) to ({endNode.r}, {endNode.c}).",
        highlights: { pseudo: [1], javascript: [1], python: [1] }
      },
      EXPLORING: {
        title: 'Exploring',
        message: "Visiting node at ({r}, {c}) with cumulative distance {dist}.",
        highlights: { pseudo: [2, 3], javascript: [4, 5], python: [4, 5] }
      },
      TARGET_FOUND: {
        title: 'Target Found ✓',
        message: "Shortest path to target found! Reconstructing path.",
        highlights: { pseudo: [4], javascript: [7], python: [7] }
      },
      BACKTRACKING: {
        title: 'Reconstructing Path',
        message: "Tracing back from target to start using parent pointers.",
        highlights: { pseudo: [5], javascript: [9], python: [9] }
      },
      PATH_COMPLETE: {
        title: 'Path Complete ✓',
        message: "Absolute shortest path reconstructed successfully.",
        highlights: { pseudo: [6], javascript: [11], python: [11] }
      },
      NO_PATH: {
        title: 'No Path Found',
        message: "Queue exhausted. Target is unreachable.",
        highlights: { pseudo: [7], javascript: [13], python: [13] }
      }
    }
  },

  codeSnippets: {
    pseudo: `function Dijkstra(start, target):
  dist[start] = 0, queue = [all nodes]
  while queue is not empty:
    u = node in queue with min dist[u]
    if u == target: return reconstruct()
    for neighbor v of u:
      alt = dist[u] + weight(u, v)
      if alt < dist[v]:
        dist[v] = alt, prev[v] = u`,
    javascript: `function dijkstra(start, target) {
  const dist = {}, prev = {};
  const queue = new PriorityQueue();
  dist[start.id] = 0;
  queue.push(start, 0);
  while (!queue.isEmpty()) {
    const u = queue.pop();
    if (u.id === target.id) return reconstruct(u);
    for (const v of getNeighbors(u)) {
      const alt = dist[u.id] + v.weight;
      if (alt < (dist[v.id] || Infinity)) {
        dist[v.id] = alt;
        prev[v.id] = u;
        queue.push(v, alt);
      }
    }
  }
}`,
    python: `def dijkstra(start, target):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if u == target: return reconstruct(u)
        for v, weight in graph[u].items():
            alt = d + weight
            if alt < dist[v]:
                dist[v] = alt
                prev[v] = u
                heapq.heappush(pq, (alt, v))`
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
    
    const costs = existingState?.costs || new Array(rows).fill().map(() => 
      new Array(cols).fill().map(() => Math.floor(Math.random() * 9) + 1)
    );
    
    const distances = {}; // Map key to distance
    const startKey = `${startNode.r},${startNode.c}`;
    distances[startKey] = 0;
    
    return {
      rows, cols, startNode, endNode, walls, costs, 
      distances,
      visited: new Set(),
      previous: {}, // Map key to {r, c}
      queue: [startNode],
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
    const { distances, visited, previous, queue, phase, rows, cols, endNode, path, walls, costs } = state;

    if (phase === 0) { // handleSearchPhase
      if (queue.length === 0) {
        return { 
          ...state, 
          isFinished: true, 
          log: { title: 'NO PATH', type: 'mismatch', messageKey: 'NO_PATH' } 
        };
      }

      // Priority Queue logic (find min distance)
      const current = queue.reduce((min, node) => {
        const dNode = distances[`${node.r},${node.c}`] ?? Infinity;
        const dMin = distances[`${min.r},${min.c}`] ?? Infinity;
        return dNode < dMin ? node : min;
      }, queue[0]);
      
      const restQueue = queue.filter(n => n !== current);
      const key = `${current.r},${current.c}`;

      if (visited.has(key)) {
        return { ...state, queue: restQueue };
      }
      
      const newVisited = new Set(visited);
      newVisited.add(key);

      if (current.r === endNode.r && current.c === endNode.c) {
        return {
          ...state,
          visited: newVisited,
          phase: 1,
          activeNode: current,
          log: { title: 'TARGET FOUND', type: 'success', messageKey: 'TARGET_FOUND' }
        };
      }

      const neighbors = [
        { r: current.r - 1, c: current.c },
        { r: current.r + 1, c: current.c },
        { r: current.r, c: current.c - 1 },
        { r: current.r, c: current.c + 1 }
      ];

      const newDistances = { ...distances };
      const newPrevious = { ...previous };
      const newQueue = [...restQueue];

      for (const n of neighbors) {
        const nKey = `${n.r},${n.c}`;
        if (n.r >= 0 && n.r < rows && n.c >= 0 && n.c < cols && !visited.has(nKey) && !walls.has(nKey)) {
          const weight = (costs[n.r][n.c] || 1);
          const alt = (distances[key] ?? 0) + weight;
          if (alt < (distances[nKey] ?? Infinity)) {
            newDistances[nKey] = alt;
            newPrevious[nKey] = current;
            if (!queue.some(q => q.r === n.r && q.c === n.c)) {
              newQueue.push(n);
            }
          }
        }
      }

      return {
        ...state,
        distances: newDistances,
        visited: newVisited,
        previous: newPrevious,
        queue: newQueue,
        iterations: state.iterations + 1,
        activeNode: current,
        log: { 
          title: 'EXPLORING', 
          type: 'info', 
          messageKey: 'EXPLORING', 
          params: { r: current.r, c: current.c, dist: newDistances[key] } 
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
          log: { title: 'PATH COMPLETE ✓', type: 'success', messageKey: 'PATH_COMPLETE' } 
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
