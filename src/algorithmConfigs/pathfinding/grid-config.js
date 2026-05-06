/**
 * Shared configuration for Grid-based Pathfinding algorithms.
 * Centralizes default dimensions and node placements.
 */

export const DEFAULT_GRID_CONFIG = {
  rows: 15,
  cols: 45,
};

/**
 * Merges default grid config with algorithm-specific overrides.
 * @param {Object} algoDefaults - The defaults object from the algorithm definition.
 * @returns {Object} The merged configuration.
 */
export const getGridConfig = (config = {}) => {
  const overrides = config.gridConfig || config || {};

  const rows = overrides.rows || DEFAULT_GRID_CONFIG.rows;
  const cols = overrides.cols || DEFAULT_GRID_CONFIG.cols;

  const getRandomOdd = (max) => {
    // Generates a random odd number between 1 and max-1
    const count = Math.floor((max - 1) / 2);
    return Math.floor(Math.random() * count) * 2 + 1;
  };

  // Start Node: Pick a random odd coordinate within the top-left 10% zone
  const startNode =
    overrides.startNode ||
    (() => {
      const maxR = Math.max(3, Math.floor(rows / 5)); // 20% zone for better variety on small grids
      const maxC = Math.max(3, Math.floor(cols / 5));
      return {
        r: getRandomOdd(maxR),
        c: getRandomOdd(maxC),
      };
    })();

  let endNode = overrides.endNode;
  if (!endNode) {
    // End Node: Pick a random odd coordinate within the bottom-right 10% zone
    const minR = Math.max(1, rows - Math.max(3, Math.floor(rows / 5)));
    const minC = Math.max(1, cols - Math.max(3, Math.floor(cols / 5)));

    // Find odd indices in these ranges
    const getPossibleOdds = (min, max) => {
      const odds = [];
      for (let i = min; i < max; i++) {
        if (i % 2 === 1) odds.push(i);
      }
      return odds.length > 0 ? odds : [min % 2 === 1 ? min : min + 1];
    };

    const possibleR = getPossibleOdds(minR, rows - 1);
    const possibleC = getPossibleOdds(minC, cols - 1);

    endNode = {
      r: possibleR[Math.floor(Math.random() * possibleR.length)],
      c: possibleC[Math.floor(Math.random() * possibleC.length)],
    };
  }

  return {
    rows,
    cols,
    startNode,
    endNode,
  };
};

/**
 * Generates a randomized maze using Recursive Backtracking.
 */
export const generateMaze = (rows, cols, startNode, endNode) => {
  const walls = [];
  // Initialize grid: true = wall, false = passage
  const grid = Array.from({ length: rows }, () => Array(cols).fill(true));

  const walk = (r, c) => {
    grid[r][c] = false; // Carve passage

    // Randomize directions (Up, Down, Left, Right) with 2-step jumps
    const dirs = [
      [0, 2],
      [0, -2],
      [2, 0],
      [-2, 0],
    ].sort(() => Math.random() - 0.5);

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      // Check boundaries and if target cell is still a wall
      if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && grid[nr][nc]) {
        grid[r + dr / 2][c + dc / 2] = false; // Carve the wall between current and next
        walk(nr, nc);
      }
    }
  };

  // Start carving from a random odd coordinate
  walk(1, 1);

  // Fix for even dimensions: The 2-step recursive backtracking leaves a double-thick wall
  // at the end of even-indexed grids. We carve into these edges to unify the maze.
  if (rows % 2 === 0) {
    for (let c = 1; c < cols - 1; c++) {
      if (!grid[rows - 3][c]) grid[rows - 2][c] = false;
    }
  }
  if (cols % 2 === 0) {
    for (let r = 1; r < rows - 1; r++) {
      if (!grid[r][cols - 3]) grid[r][cols - 2] = false;
    }
  }

  // Randomly remove some walls to create multiple paths (essential for Dijkstra/A*)
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (grid[r][c] && Math.random() < 0.15) {
        grid[r][c] = false;
      }
    }
  }

  // Ensure start and end are clear and connected to the maze
  const ensureConnected = (node) => {
    if (!node) return;
    grid[node.r][node.c] = false;

    // Check if already connected to a passage
    const neighbors = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    const isConnected = neighbors.some(([dr, dc]) => {
      const nr = node.r + dr;
      const nc = node.c + dc;
      return nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc];
    });

    if (!isConnected) {
      // Force connection to a valid neighbor
      for (const [dr, dc] of neighbors) {
        const nr = node.r + dr;
        const nc = node.c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          grid[nr][nc] = false;
          break;
        }
      }
    }
  };

  ensureConnected(startNode);
  ensureConnected(endNode);

  // Convert back to wall list format
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c]) {
        // Double check it's not start or end
        if (startNode && r === startNode.r && c === startNode.c) continue;
        if (endNode && r === endNode.r && c === endNode.c) continue;
        walls.push({ r, c });
      }
    }
  }

  return walls;
};
