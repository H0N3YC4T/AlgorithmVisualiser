import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import GridNode from "./GridNode";
import { classCategories } from "@/styles/divClassCustom";

export default function GridVisualiser({ algorithm, state, updateState, toggleWall, gridTool, isEditingDisabled }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragMode, setDragMode] = useState(null); // 'adding' | 'removing' | null

  const {
    rows = 15,
    cols = 45,
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

  const legendItems = useMemo(() => algorithm?.legendItems || [], [algorithm?.legendItems]);

  const colorMapping = useMemo(
    () => Object.fromEntries(legendItems.map((i) => [i.label.toLowerCase(), i.color])),
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

  const handleMouseMove = useCallback(
    (e) => {
      if (!isMouseDown) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const r = Math.floor((y / rect.height) * rows);
      const c = Math.floor((x / rect.width) * cols);

      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        handleCellAction(r, c, dragMode);
      }
    },
    [isMouseDown, rows, cols, handleCellAction, dragMode],
  );

  const handleInitialMouseDown = useCallback(
    (e) => {
      setIsMouseDown(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const r = Math.floor((y / rect.height) * rows);
      const c = Math.floor((x / rect.width) * cols);

      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        const mode = handleCellAction(r, c);
        if (gridTool === "wall") setDragMode(mode);
      }
    },
    [rows, cols, handleCellAction, gridTool],
  );

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    setDragMode(null);
  }, []);

  const gridStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      width: "100%",
      height: "auto",
      maxWidth: `calc(450px * ${cols} / ${rows})`,
      maxHeight: "100%",
      aspectRatio: `${cols} / ${rows}`,
      margin: "auto",
      // Optimized background pattern for grid lines
      backgroundImage: `linear-gradient(to right, rgba(30, 41, 59, 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(30, 41, 59, 0.4) 1px, transparent 1px)`,
      backgroundSize: `calc(100% / ${cols}) calc(100% / ${rows})`,
      backgroundColor: "rgba(15, 23, 42, 0.1)",
    }),
    [cols, rows],
  );

  // Identify all cells that actually need a component
  const nodes = useMemo(() => {
    const activeCoords = new Set();
    if (startNode) activeCoords.add(`${startNode.r},${startNode.c}`);
    if (endNode) activeCoords.add(`${endNode.r},${endNode.c}`);
    if (activeNode) activeCoords.add(`${activeNode.r},${activeNode.c}`);

    wallsSet.forEach((c) => activeCoords.add(c));
    visitedSet.forEach((c) => activeCoords.add(c));
    queuedSet.forEach((c) => activeCoords.add(c));
    pathSet.forEach((c) => activeCoords.add(c));

    return Array.from(activeCoords).map((coord) => {
      const [rStr, cStr] = coord.split(",");
      const r = parseInt(rStr);
      const c = parseInt(cStr);

      const isS = startNode?.r === r && startNode?.c === c;
      const isE = endNode?.r === r && endNode?.c === c;
      const isV = visitedSet.has(coord);
      const isP = pathSet.has(coord);
      const isA = activeNode?.r === r && activeNode?.c === c;

      return (
        <div
          key={coord}
          style={{
            gridRow: r + 1,
            gridColumn: c + 1,
            width: "100%",
            height: "100%",
          }}
        >
          <GridNode
            r={r}
            c={c}
            isVisited={isV}
            isPath={isP}
            isActive={isA}
            isMuted={activeBranch?.length > 0 && isV && !activeBranchSet.has(coord) && !isP && !isS && !isE}
            isStart={isS}
            isEnd={isE}
            isWall={wallsSet.has(coord)}
            isQueued={queuedSet.has(coord)}
            cost={costs?.[r]?.[c]}
            colors={colorMapping}
          />
        </div>
      );
    });
  }, [
    startNode,
    endNode,
    activeNode,
    wallsSet,
    visitedSet,
    queuedSet,
    pathSet,
    activeBranch,
    activeBranchSet,
    costs,
    colorMapping,
  ]);

  return (
    <div className="relative w-full h-[450px] flex flex-col justify-center items-center select-none overflow-visible transition-all duration-500">
      <div
        role="grid"
        tabIndex={0}
        aria-label="Pathfinding Grid"
        className="grid gap-1 outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl"
        onMouseDown={handleInitialMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={gridStyle}
      >
        {state?.rows === undefined ? (
          <div
            className={`absolute inset-0 flex items-center justify-center text-slate-500 font-black ${
              classCategories.logicText.split(" ")[0]
            } uppercase tracking-widest bg-slate-950/20 rounded-2xl`}
          >
            Initializing Grid...
          </div>
        ) : (
          nodes
        )}
      </div>
    </div>
  );
}

GridVisualiser.propTypes = {
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
