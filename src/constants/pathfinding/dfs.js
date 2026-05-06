import { createAlgorithmCard } from '../factory';
import { getGridConfig, generateMaze } from './grid-config';

/**
 * Depth-First Search Algorithm Module
 */
export const dfs = createAlgorithmCard({
  id: 'dfs',
  
  // --- Metadata ---
  metadata: {
    type: 'pathfinding',
    visualizerType: 'grid',
    category: 'Pathfinding Algorithms',
    defaultInputs: { target: '', pattern: '' },
  },

  homeCard: {
    name: 'Depth-First Search',
    difficulty: 'Medium',
    description: 'Explores as far as possible along each branch before backtracking. Not guaranteed to find the shortest path.',
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
      startButton: 'Start DFS',
      playbackSpeed: 100
    },
    extendedDescription: 'Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking. Unlike BFS, DFS does not guarantee the shortest path in an unweighted grid.',
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
        message: "DFS initialized. Ready to explore from ({startNode.r}, {startNode.c}) to ({endNode.r}, {endNode.c}).",
        highlights: { pseudo: [1, 2], javascript: [1, 2, 3], python: [1, 2, 3] }
      },
      SEARCHING: {
        title: 'Exploring Branch',
        message: "Visiting node at ({r}, {c}). Exploring deeper into the current branch.",
        highlights: { pseudo: [3, 4], javascript: [4, 5, 6], python: [4, 5, 6] }
      },
      TARGET_REACHED: {
        title: 'Target Found ✓',
        message: "Reached the target node! Tracing the discovered path.",
        highlights: { pseudo: [5], javascript: [7], python: [7] }
      },
      BACKTRACKING: {
        title: 'Reconstructing Path',
        message: "Tracing back from target to start using parent pointers.",
        highlights: { pseudo: [5], javascript: [7], python: [7] }
      },
      DONE: {
        title: 'Path Complete ✓',
        message: "Path discovered and reconstructed.",
        highlights: { pseudo: [5], javascript: [7], python: [7] }
      },
      NO_PATH: {
        title: 'No Path Found',
        message: "Stack exhausted. No reachable path exists to the target.",
        highlights: { pseudo: [3], javascript: [4], python: [4] }
      }
    }
  },

  codeSnippets: {
    pseudo: `function DFS(start, target):
  stack = [start], visited = {start}
  while stack is not empty:
    node = stack.pop()
    if node == target: return reconstructPath()
    for neighbor in neighbors(node):
      if neighbor not in visited:
        visited.add(neighbor)
        parent[neighbor] = node
        stack.push(neighbor)`,
    javascript: `function dfs(start, target) {
  const stack = [start];
  const visited = new Set();
  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node.id)) continue;
    visited.add(node.id);
    if (node.id === target.id) return reconstruct(node);
    for (const neighbor of getNeighbors(node)) {
      if (!visited.has(neighbor.id)) {
        neighbor.parent = node;
        stack.push(neighbor);
      }
    }
  }
}`,
    python: `def dfs(start, target):
    stack = [start]
    visited = set()
    while stack:
        node = stack.pop()
        if node in visited: continue
        visited.add(node)
        if node == target: return reconstruct(node)
        for neighbor in get_neighbors(node):
            if neighbor not in visited:
                neighbor.parent = node
                stack.append(neighbor)`
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
      walls,
      visited: new Set(),
      previous: {},
      stack: [startNode],
      activeBranch: [startNode],
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
    const { visited, previous, stack, phase, rows, cols, endNode, path, walls } = state;

    if (phase === 0) { // handleSearchPhase
      if (stack.length === 0) {
        return { 
          ...state, 
          isFinished: true, 
          log: { title: 'NO PATH', type: 'mismatch', messageKey: 'NO_PATH' } 
        };
      }

      const current = stack[stack.length - 1];
      const restStack = stack.slice(0, -1);
      const key = `${current.r},${current.c}`;

      if (visited.has(key)) {
        return { ...state, stack: restStack };
      }
      
      const newVisited = new Set(visited);
      newVisited.add(key);

      // Calculate active branch (path from start to current)
      const activeBranch = [];
      let curr = current;
      while (curr) {
        activeBranch.push(curr);
        const pKey = `${curr.r},${curr.c}`;
        curr = previous[pKey];
      }

      if (current.r === endNode.r && current.c === endNode.c) {
        return {
          ...state,
          visited: newVisited,
          phase: 1,
          activeNode: current,
          activeBranch,
          log: { title: 'TARGET REACHED', type: 'success', messageKey: 'TARGET_REACHED' }
        };
      }

      const neighbors = [
        { r: current.r + 1, c: current.c },
        { r: current.r, c: current.c + 1 },
        { r: current.r - 1, c: current.c },
        { r: current.r, c: current.c - 1 }
      ];

      const newStack = [...restStack];
      const newPrevious = { ...previous };

      for (const n of neighbors) {
        const nKey = `${n.r},${n.c}`;
        if (n.r >= 0 && n.r < rows && n.c >= 0 && n.c < cols && !visited.has(nKey) && !walls.has(nKey)) {
          newPrevious[nKey] = current;
          newStack.push(n);
        }
      }

      return {
        ...state,
        visited: newVisited,
        stack: newStack,
        previous: newPrevious,
        iterations: state.iterations + 1,
        activeNode: current,
        activeBranch,
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
