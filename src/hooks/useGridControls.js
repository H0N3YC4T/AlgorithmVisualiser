import { useState, useCallback } from "react";

/**
 * useGridControls Hook
 * Handles grid-specific state including size, tools, and wall management.
 */
export const useGridControls = (initialRows = 20, initialCols = 40) => {
  const [gridSize, setGridSize] = useState({ rows: initialRows, cols: initialCols });
  const [gridTool, setGridTool] = useState("wall");

  const toggleWall = useCallback((r, c, setState) => {
    setState((prev) => {
      if (prev.isFinished || prev.phase !== 0) return prev;
      const key = `${r},${c}`;

      if (prev.walls instanceof Set) {
        const newWalls = new Set(prev.walls);
        if (newWalls.has(key)) newWalls.delete(key);
        else newWalls.add(key);
        return { ...prev, walls: newWalls };
      }

      const walls = prev.walls || [];
      const exists = walls.some((w) => w.r === r && w.c === c);
      const newWalls = exists ? walls.filter((w) => !(w.r === r && w.c === c)) : [...walls, { r, c }];
      return { ...prev, walls: newWalls };
    });
  }, []);

  const clearWalls = useCallback((setState, startNode) => {
    setState((prev) => ({
      ...prev,
      walls: prev.walls instanceof Set ? new Set() : [],
      isFinished: false,
      iterations: 0,
      phase: 0,
      visited: new Set(),
      path: [],
      queue: [prev.startNode || startNode],
      stack: [prev.startNode || startNode],
      distances: { [`${(prev.startNode || startNode).r},${(prev.startNode || startNode).c}`]: 0 },
      gScore: { [`${(prev.startNode || startNode).r},${(prev.startNode || startNode).c}`]: 0 },
      fScore: { [`${(prev.startNode || startNode).r},${(prev.startNode || startNode).c}`]: 0 },
    }));
  }, []);

  const updateGridSize = useCallback((rows, cols) => {
    setGridSize({ rows, cols });
  }, []);

  return {
    gridSize,
    setGridSize: updateGridSize,
    gridTool,
    setGridTool,
    toggleWall,
    clearWalls,
  };
};
