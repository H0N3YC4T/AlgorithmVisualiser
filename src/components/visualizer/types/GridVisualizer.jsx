import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import GridNode from "../grid/GridNode";
import { classCategory } from "../../../styles/class-category";

export default function GridVisualizer({ state, updateState, gridTool, isEditingDisabled }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragMode, setDragMode] = useState(null); // 'adding' | 'removing' | null

  const colorMapping = useMemo(
    () =>
      (state?.legendItems || []).reduce((acc, item) => {
        acc[item.label.toLowerCase()] = item.color;
        return acc;
      }, {}),
    [state?.legendItems],
  );

  const { rows, cols, startNode, endNode, visited, path, activeNode, walls, costs } = state || {};

  const pathSet = useMemo(() => new Set((path || []).map((n) => `${n.r},${n.c}`)), [path]);
  const activeBranchSet = useMemo(
    () => new Set((state?.activeBranch || []).map((n) => `${n.r},${n.c}`)),
    [state?.activeBranch],
  );
  const wallsSet = useMemo(() => new Set((walls || []).map((n) => `${n.r},${n.c}`)), [walls]);
  const queuedSet = useMemo(
    () => new Set((state?.queue || state?.openSet || []).map((n) => `${n.r},${n.c}`)),
    [state?.queue, state?.openSet],
  );

  // Convert visited 2D array to Set for O(1) lookup if it's still an array
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

  if (state?.rows === undefined) {
    return <div className={classCategory.vizContainer}>Initializing pathfinding grid...</div>;
  }

  const isPath = (r, c) => pathSet.has(`${r},${c}`);
  const isActive = (r, c) => activeNode?.r === r && activeNode?.c === c;
  const isActiveBranch = (r, c) => activeBranchSet.has(`${r},${c}`);
  const isStart = (r, c) => startNode?.r === r && startNode?.c === c;
  const isEnd = (r, c) => endNode?.r === r && endNode?.c === c;
  const isWall = (r, c) => wallsSet.has(`${r},${c}`);
  const isQueued = (r, c) => queuedSet.has(`${r},${c}`);
  const isVisited = (r, c) => visitedSet.has(`${r},${c}`);

  const handleWallTool = (r, c, modeOverride) => {
    if (isStart(r, c) || isEnd(r, c)) return;

    const exists = (walls || []).some((w) => w.r === r && w.c === c);
    const mode = modeOverride || (exists ? "removing" : "adding");

    if (mode === "adding" && !exists) {
      updateState((prev) => ({ ...prev, walls: [...(prev.walls || []), { r, c }] }));
    } else if (mode === "removing" && exists) {
      updateState((prev) => ({ ...prev, walls: (prev.walls || []).filter((w) => !(w.r === r && w.c === c)) }));
    }
    return mode;
  };

  const handleCellAction = (r, c, modeOverride = null) => {
    if (isEditingDisabled) return;

    if (gridTool === "start") {
      if (isEnd(r, c)) return;
      updateState({
        startNode: { r, c },
        walls: (walls || []).filter((w) => w.r !== r || w.c !== c),
      });
    } else if (gridTool === "end") {
      if (isStart(r, c)) return;
      updateState({
        endNode: { r, c },
        walls: (walls || []).filter((w) => w.r !== r || w.c !== c),
      });
    } else if (gridTool === "wall") {
      return handleWallTool(r, c, modeOverride);
    }
  };

  const handleMouseDown = (r, c) => {
    setIsMouseDown(true);
    const mode = handleCellAction(r, c);
    if (gridTool === "wall") setDragMode(mode);
  };

  const handleMouseEnter = (r, c) => {
    if (!isMouseDown) return;
    handleCellAction(r, c, dragMode);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setDragMode(null);
  };

  return (
    <div
      className={`${classCategory.vizContainer} h-[450px] p-8 shadow-inner select-none bg-slate-900/20 rounded-3xl border-slate-800/40`}
    >
      <div
        role="grid"
        tabIndex={0}
        aria-label="Pathfinding Grid"
        className="grid gap-1 outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-lg"
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          aspectRatio: `${cols} / ${rows}`,
          width: "100%",
          maxWidth: `calc((450px - 64px) * ${cols} / ${rows})`,
          maxHeight: "100%",
          margin: "0 auto",
        }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <GridNode
              key={`${r}-${c}`}
              r={r}
              c={c}
              isVisited={isVisited(r, c)}
              isPath={isPath(r, c)}
              isActive={isActive(r, c)}
              isMuted={
                state.activeBranch?.length > 0 &&
                isVisited(r, c) &&
                !isActiveBranch(r, c) &&
                !isPath(r, c) &&
                !isStart(r, c) &&
                !isEnd(r, c)
              }
              isStart={isStart(r, c)}
              isEnd={isEnd(r, c)}
              isWall={isWall(r, c)}
              isQueued={isQueued(r, c)}
              cost={costs?.[r]?.[c]}
              colors={colorMapping}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
            />
          )),
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
    visited: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
    path: PropTypes.arrayOf(PropTypes.shape({ r: PropTypes.number, c: PropTypes.number })),
    activeNode: PropTypes.shape({ r: PropTypes.number, c: PropTypes.number }),
    walls: PropTypes.arrayOf(PropTypes.shape({ r: PropTypes.number, c: PropTypes.number })),
    queue: PropTypes.array,
    openSet: PropTypes.array,
    costs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    legendItems: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        color: PropTypes.string,
      }),
    ),
  }),
  updateState: PropTypes.func.isRequired,
  gridTool: PropTypes.string,
  isEditingDisabled: PropTypes.bool,
};
