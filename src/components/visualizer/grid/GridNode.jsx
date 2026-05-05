import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function GridNode({ 
  isVisited, 
  isPath, 
  isActive, 
  isStart, 
  isEnd, 
  isWall,
  isQueued,
  cost,
  colors = {},
  onMouseDown,
  onMouseEnter
}) {
  let cellClass = "aspect-square w-full rounded-sm border transition-colors duration-300 flex items-center justify-center text-[8px] font-bold select-none";
  let colorClass = colors.unvisited || "";
  
  if (isWall) colorClass = colors.wall || "";
  else if (isStart) colorClass = colors.start || "";
  else if (isEnd) colorClass = colors.end || "";
  else if (isActive) colorClass = colors.active || "";
  else if (isPath) colorClass = colors.path || "";
  else if (isVisited) colorClass = colors.visited || "";
  else if (isQueued) colorClass = colors.checked || colors.queue || "";

  // Add functional classes (layering and scale)
  if (isStart || isEnd || isPath) colorClass += " z-10 shadow-lg";
  if (isActive) colorClass += " z-20 scale-110 shadow-2xl ring-2 ring-white/20";
  if (isWall) colorClass += " shadow-md";
  
  if (colorClass.trim() === "") colorClass = "bg-slate-800/20 border-slate-800/50";

  let scale = 1;
  if (isActive) scale = 1.15;
  else if (isStart || isEnd) scale = 1.1;

  // Calculate terrain brightness based on cost (0-9)
  // Higher cost = darker background (more weight)
  const costFilter = cost !== undefined ? `brightness(${1 - (cost / 20)})` : '';

  return (
    <motion.div
      className={`${cellClass} ${colorClass}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      initial={false}
      style={{ filter: costFilter }}
      animate={{ 
        scale: scale,
        borderRadius: isStart || isEnd ? '4px' : '2px'
      }}
      whileHover={{ scale: 1.05, filter: 'brightness(1.4)' }}
    >
      {cost !== undefined && !isStart && !isEnd && !isWall && (
        <span className="text-white/40">{cost}</span>
      )}
    </motion.div>
  );
}

GridNode.propTypes = {
  isVisited: PropTypes.bool,
  isPath: PropTypes.bool,
  isActive: PropTypes.bool,
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
  isWall: PropTypes.bool,
  isQueued: PropTypes.bool,
  cost: PropTypes.number,
  colors: PropTypes.object,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func
};
