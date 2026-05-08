import PropTypes from "prop-types";
import { motion } from "framer-motion";

const localTheme = {
  header: "text-slate-500 uppercase tracking-widest text-xs font-black mb-12",
  nodeText: "fill-white font-mono text-sm font-black pointer-events-none select-none",
  empty: "text-slate-700 font-black uppercase tracking-tighter italic",
};

const NODE_SIZE = 48;
const LEVEL_HEIGHT = 80;

function TreeNode({ node, x, y, level, parentX, parentY }) {
  if (!node) return null;

  const leftX = x - 100 / Math.pow(2, level);
  const rightX = x + 100 / Math.pow(2, level);
  const childY = y + LEVEL_HEIGHT;

  return (
    <>
      {/* Edge to Parent */}
      {parentX !== undefined && (
        <motion.line
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          x1={`${parentX}%`}
          y1={parentY + NODE_SIZE / 2}
          x2={`${x}%`}
          y2={y - NODE_SIZE / 2}
          stroke="#334155"
          strokeWidth="2"
        />
      )}

      {/* Current Node */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: level * 0.1 }}
      >
        <circle
          cx={`${x}%`}
          cy={y}
          r={NODE_SIZE / 2}
          className={`fill-slate-800 stroke-slate-700 stroke-2 transition-colors ${node.active ? "fill-indigo-500 stroke-indigo-400" : ""}`}
        />
        <text x={`${x}%`} y={y} dy=".3em" textAnchor="middle" className={localTheme.nodeText}>
          {node.value}
        </text>
      </motion.g>

      <TreeNode node={node.left} x={leftX} y={childY} level={level + 1} parentX={x} parentY={y} />
      <TreeNode node={node.right} x={rightX} y={childY} level={level + 1} parentX={x} parentY={y} />
    </>
  );
}

export default function TreeVisualiser({ root, title = "" }) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-900/20 rounded-3xl border border-slate-800/40 min-h-[400px]">
      {title && <div className={localTheme.header}>{title}</div>}

      <svg className="w-full h-[300px] overflow-visible">
        <TreeNode node={root} x={50} y={40} level={1} />
      </svg>

      {!root && <div className={localTheme.empty}>Tree is empty</div>}
    </div>
  );
}

TreeVisualiser.propTypes = {
  root: PropTypes.object,
  title: PropTypes.string,
};
