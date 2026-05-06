import PropTypes from "prop-types";
import { memo } from "react";

const GridNode = memo(
  ({
    isVisited,
    isPath,
    isActive,
    isMuted,
    isStart,
    isEnd,
    isWall,
    isQueued,
    cost,
    colors = {},
    onMouseDown,
    onMouseEnter,
    r,
    c,
  }) => {
    let cellClass = `h-full w-full rounded-sm border-1 border-white/55 transition-all duration-300 flex items-center justify-center select-none cursor-pointer [container-type:inline-size]`;
    let colorClass = colors.unvisited || "";

    if (isWall) colorClass = colors.wall || "";
    else if (isStart) colorClass = colors.start || "";
    else if (isEnd) colorClass = colors.end || "";
    else if (isActive) colorClass = colors.active || "";
    else if (isPath) colorClass = colors.path || "";
    else if (isVisited) colorClass = colors.visited || "";
    else if (isQueued) colorClass = colors.checked || colors.queue || "";

    if (isMuted && !isStart && !isEnd && !isPath) {
      colorClass = "bg-red-500/5 border-red-500/10";
    }

    // Add functional classes (layering and scale)
    if (isStart || isEnd || isPath) colorClass += " z-10 shadow-lg scale-[1.05]";
    if (isActive) colorClass += " z-20 scale-[1.15] shadow-2xl ring-2 ring-white/20";
    if (isWall) colorClass += " shadow-md";

    if (colorClass.trim() === "") colorClass = "bg-slate-800/25 border-slate-800/25";

    // Calculate terrain opacity based on cost (1-9)
    const costOpacity = cost !== undefined && !isStart && !isEnd && !isWall && !isPath ? 0.8 - cost / 14 : 1;

    return (
      <div
        className={`${cellClass} ${colorClass} hover:scale-[1.1] hover:brightness-[1.2] active:scale-[0.95]`}
        onMouseDown={() => onMouseDown(r, c)}
        onMouseEnter={() => onMouseEnter(r, c)}
        style={{
          opacity: costOpacity,
          borderRadius: isStart || isEnd ? "50%" : "4px",
        }}
      >
        {cost !== undefined && !isStart && !isEnd && !isWall && (
          <span className="text-[42cqw] text-white/50">{cost}</span>
        )}
      </div>
    );
  },
);

GridNode.displayName = "GridNode";

GridNode.propTypes = {
  isVisited: PropTypes.bool,
  isPath: PropTypes.bool,
  isActive: PropTypes.bool,
  isMuted: PropTypes.bool,
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
  isWall: PropTypes.bool,
  isQueued: PropTypes.bool,
  cost: PropTypes.number,
  colors: PropTypes.object,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  r: PropTypes.number,
  c: PropTypes.number,
};

export default GridNode;
