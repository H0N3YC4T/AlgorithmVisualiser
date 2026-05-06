import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import GridNode from "./GridNode";
import { classCategories } from "@/styles/divClassCustom";

export default function GridVisualizer({ algorithm, state, updateState, toggleWall, gridTool, isEditingDisabled }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragMode, setDragMode] = useState(null); // 'adding' | 'removing' | null

  const localTheme = {
    container: `${classCategories.vizContainer} h-[450px] p-4 shadow-inner select-none bg-slate-900/20 ${classCategories.cardRound} border-slate-800/40`,
    grid: "grid gap-1 outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl",
    overlay: `absolute inset-0 flex items-center justify-center text-slate-500 font-black ${classCategories.logicText.split(" ")[0]} uppercase tracking-widest bg-slate-950/40 rounded-2xl`,
  };

  const {
    rows,
    cols,
    startNode,
    endNode,
    visited,
    path,
    activeNode,
    walls,
    costs,
    activeBranch,
    queue,
    openSet,
  } = state || {};

  const legendItems = algorithm?.legendItems || [];

  const colorMapping = useMemo(
    () =>
      (legendItems || []).reduce((acc, item) => {
        acc[item.label.toLowerCase()] = item.color;
        return acc;
      }, {}),
    [legendItems],
  );

  const pathSet = useMemo(() => new Set((path || []).map((n) => `${n.r},${n.c}`)), [path]);
  const activeBranchSet = useMemo(() => new Set((activeBranch || []).map((n) => `${n.r},${n.c}`)), [activeBranch]);
  const wallsSet = useMemo(() => {
    if (walls instanceof Set) return walls;
    return new Set((walls || []).map((n) => `${n.r},${n.c}`));
  }, [walls]);
  const queuedSet = useMemo(() => new Set((queue || openSet || []).map((n) => `${n.r},${n.c}`)), [queue, openSet]);

  // Convert visited 2D array to Set for O(1) lookup
  const visitedSet = useMemo(() => {
    if (!visited) return new Set();
    if (visited instanceof Set) return visited;
    const s = new Set();
    visited.forEach((row, r) => {
      row.forEach((isV, c) => {
        if (isV) s.add(`${r},${c}`);
      });
    });
    return s;
  }, [visited]);

  const handleWallTool = useCallback(
    (r, c, modeOverride) => {
      if ((startNode?.r === r && startNode?.c === c) || (endNode?.r === r && endNode?.c === c)) return;
      const key = `${r},${c}`;
      const exists = wallsSet.has(key);
      const mode = modeOverride || (exists ? "removing" : "adding");

      if ((mode === "adding" && !exists) || (mode === "removing" && exists)) {
        toggleWall(r, c);
      }
      return mode;
    },
    [startNode, endNode, wallsSet, toggleWall],
  );

  const handleCellAction = useCallback(
    (r, c, modeOverride = null) => {
      if (isEditingDisabled) return;

      const isS = startNode?.r === r && startNode?.c === c;
      const isE = endNode?.r === r && endNode?.c === c;

      const filterWalls = (walls) => {
        if (walls instanceof Set) {
          const next = new Set(walls);
          next.delete(`${r},${c}`);
          return next;
        }
        return (walls || []).filter((w) => w.r !== r || w.c !== c);
      };

      if (gridTool === "start") {
        if (isE) return;
        updateState((prev) => ({
          ...prev,
          startNode: { r, c },
          walls: filterWalls(prev.walls),
        }));
      } else if (gridTool === "end") {
        if (isS) return;
        updateState((prev) => ({
          ...prev,
          endNode: { r, c },
          walls: filterWalls(prev.walls),
        }));
      } else if (gridTool === "wall") {
        return handleWallTool(r, c, modeOverride);
      }
    },
    [isEditingDisabled, gridTool, startNode, endNode, handleWallTool, updateState],
  );

  const handleMouseDown = useCallback(
    (r, c) => {
      setIsMouseDown(true);
      const mode = handleCellAction(r, c);
      if (gridTool === "wall") setDragMode(mode);
    },
    [handleCellAction, gridTool],
  );

  const handleMouseEnter = useCallback(
    (r, c) => {
      if (!isMouseDown) return;
      handleCellAction(r, c, dragMode);
    },
    [handleCellAction, isMouseDown, dragMode],
  );

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    setDragMode(null);
  }, []);

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      aspectRatio: `${cols} / ${rows}`,
      width: "100%",
      maxWidth: `calc((450px - 64px) * ${cols} / ${rows})`,
      maxHeight: "100%",
      margin: "0 auto",
    }),
    [cols, rows],
  );

  const totalCells = rows * cols;
  const nodes = useMemo(() => {
    return Array.from({ length: totalCells }).map((_, index) => {
      const r = Math.floor(index / cols);
      const c = index % cols;
      const coord = `${r},${c}`;
      const isS = startNode?.r === r && startNode?.c === c;
      const isE = endNode?.r === r && endNode?.c === c;
      const isV = visitedSet.has(coord);
      const isP = pathSet.has(coord);
      const isA = activeNode?.r === r && activeNode?.c === c;

      return (
        <GridNode
          key={coord}
          r={r}
          c={c}
          isVisited={isV}
          isPath={isP}
          isActive={isA}
          isMuted={state.activeBranch?.length > 0 && isV && !activeBranchSet.has(coord) && !isP && !isS && !isE}
          isStart={isS}
          isEnd={isE}
          isWall={wallsSet.has(coord)}
          isQueued={queuedSet.has(coord)}
          cost={costs?.[r]?.[c]}
          colors={colorMapping}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
        />
      );
    });
  }, [
    totalCells,
    cols,
    startNode,
    endNode,
    visitedSet,
    pathSet,
    activeNode,
    state.activeBranch,
    activeBranchSet,
    wallsSet,
    queuedSet,
    costs,
    colorMapping,
    handleMouseDown,
    handleMouseEnter,
  ]);

  return (
    <div className={localTheme.container}>
      <div
        role="grid"
        tabIndex={0}
        aria-label="Pathfinding Grid"
        className={localTheme.grid}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        style={gridStyle}
      >
        {state?.rows === undefined ? (
          <div className={localTheme.overlay}>
            Initializing Grid...
          </div>
        ) : (
          nodes
        )}
      </div>
    </div>
  );
}

GridVisualizer.propTypes = {
  state: PropTypes.shape({
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    startNode: PropTypes.shape({ r: PropTypes.number, c: PropTypes.number }),
    endNode: PropTypes.shape({ r: PropTypes.number, c: PropTypes.number }),
    visited: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)), PropTypes.instanceOf(Set)]),
    path: PropTypes.arrayOf(PropTypes.shape({ r: PropTypes.number, c: PropTypes.number })),
    activeNode: PropTypes.shape({ r: PropTypes.number, c: PropTypes.number }),
    walls: PropTypes.arrayOf(PropTypes.shape({ r: PropTypes.number, c: PropTypes.number })),
    queue: PropTypes.array,
    openSet: PropTypes.array,
    activeBranch: PropTypes.array,
    costs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    legendItems: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        color: PropTypes.string,
      }),
    ),
  }),
  updateState: PropTypes.func.isRequired,
  toggleWall: PropTypes.func.isRequired,
  gridTool: PropTypes.string,
  isEditingDisabled: PropTypes.bool,
};
