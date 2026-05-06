import { createAlgorithmCard } from '../factory';
import { getGridConfig, generateMaze } from './grid-config';

/**
 * Breadth-First Search Algorithm Module
 */
export const bfs = createAlgorithmCard({
  id: 'bfs',

  // --- Metadata ---
  metadata: {
    type: 'pathfinding',
    visualizerType: 'grid',
    category: 'Pathfinding Algorithms',
    defaultInputs: { target: '', pattern: '' },
  },

  homeCard: {
    name: 'Breadth-First Search',
    difficulty: 'Easy',
    description: 'Explores neighbors layer by layer to find the shortest path in an unweighted grid.',
    complexity: {
      timeBest: 'Ω(1)',
      timeAvg: 'Θ(V + E)',
      timeWorst: 'O(V + E)',
      space: 'O(V)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Visited: {iterations}',
      startButton: 'Start BFS',
      playbackSpeed: 100
    },
    extendedDescription: 'Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the source node and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. In an unweighted grid, BFS is guaranteed to find the shortest path.',
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
        message: "BFS initialized. Ready to explore from ({startNode.r}, {startNode.c}) to ({endNode.r}, {endNode.c}).",
        highlights: { pseudo: [1, 2], javascript: [1, 2, 3], python: [1, 2, 3] }
      },
      SEARCHING: {
        title: 'Exploring Neighbors',
        message: "Visiting node at ({r}, {c}). Expanding search layer.",
        highlights: { pseudo: [3, 4], javascript: [4, 5, 6], python: [4, 5, 6] }
      },
      TARGET_REACHED: {
        title: 'Target Found ✓',
        message: "Reached the target node! Preparing to reconstruct the path.",
        highlights: { pseudo: [5], javascript: [7], python: [7] }
      },
      BACKTRACKING: {
        title: 'Reconstructing Path',
        message: "Tracing back from target to start using parent pointers.",
        highlights: { pseudo: [5], javascript: [7], python: [7] }
      },
      DONE: {
        title: 'Path Complete ✓',
        message: "Shortest path reconstructed successfully.",
        highlights: { pseudo: [5], javascript: [7], python: [7] }
      },
      NO_PATH: {
        title: 'No Path Found',
        message: "Queue exhausted. No reachable path exists to the target.",
        highlights: { pseudo: [3], javascript: [4], python: [4] }
      }
    }
  },

  codeSnippets: {
    pseudo: `function BFS(start, target):
  queue = [start], visited = {start}
  while queue is not empty:
    node = queue.shift()
    if node == target: return reconstructPath()
    for neighbor in neighbors(node):
      if neighbor not in visited:
        visited.add(neighbor)
        parent[neighbor] = node
        queue.push(neighbor)`,
    javascript: `function bfs(start, target) {
  const queue = [start];
  const visited = new Set([start.id]);
  while (queue.length > 0) {
    const node = queue.shift();
    if (node.id === target.id) return reconstruct(node);
    for (const neighbor of getNeighbors(node)) {
      if (!visited.has(neighbor.id)) {
        visited.add(neighbor.id);
        neighbor.parent = node;
        queue.push(neighbor);
      }
    }
  }
}`,
    python: `def bfs(start, target):
    queue = deque([start])
    visited = {start}
    while queue:
        node = queue.popleft()
        if node == target: return reconstruct(node)
        for neighbor in get_neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                neighbor.parent = node
                queue.append(neighbor)`
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

    return {
      rows, cols,
      startNode, endNode,
      walls, // Store as Set for O(1) lookup
      visited: new Set(),
      previous: {}, // Map key string to {r, c}
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
    const { visited, previous, queue, phase, rows, cols, endNode, path, walls } = state;

    if (phase === 0) { // handleSearchPhase
      if (queue.length === 0) {
        return {
          ...state,
          isFinished: true,
          log: { title: 'NO PATH', type: 'mismatch', messageKey: 'NO_PATH' }
        };
      }

      const current = queue[0];
      const restQueue = queue.slice(1);
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
          log: { title: 'TARGET REACHED', type: 'success', messageKey: 'TARGET_REACHED' }
        };
      }

      const neighbors = [
        { r: current.r - 1, c: current.c },
        { r: current.r + 1, c: current.c },
        { r: current.r, c: current.c - 1 },
        { r: current.r, c: current.c + 1 }
      ];

      const newQueue = [...restQueue];
      const newPrevious = { ...previous };

      for (const n of neighbors) {
        const nKey = `${n.r},${n.c}`;
        if (n.r >= 0 && n.r < rows && n.c >= 0 && n.c < cols && !visited.has(nKey) && !walls.has(nKey)) {
          if (!newPrevious[nKey]) {
            newPrevious[nKey] = current;
            newQueue.push(n);
          }
        }
      }

      return {
        ...state,
        visited: newVisited,
        queue: newQueue,
        previous: newPrevious,
        iterations: state.iterations + 1,
        activeNode: current,
        log: { title: 'SEARCHING', type: 'info', messageKey: 'SEARCHING', params: { r: current.r, c: current.c } }
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
