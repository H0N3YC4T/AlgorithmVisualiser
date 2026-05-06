import PropTypes from "prop-types";
import { Target, Footprints, Grid } from "lucide-react";
import { classCategories } from "@/styles/divClassCustom";

export default function PathfindingMetrics({ state }) {
  const { path, visited, rows, cols } = state;

  const pathLength = path?.length || 0;
  const visitedCount = (visited || []).flat().filter(Boolean).length;
  const totalNodes = rows * cols;
  const coverage = totalNodes > 0 ? ((visitedCount / totalNodes) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <Target className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <div className={`${classCategories.logicText.split(" ")[0]} font-black text-slate-500 uppercase tracking-widest`}>Path Length</div>
          <div className={`${classCategories.homeTitle.split(" ").filter(c => c.startsWith("text-")).join(" ")} font-mono font-black text-white`}>{pathLength}</div>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-indigo-500/10 rounded-xl">
          <Footprints className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <div className={`${classCategories.logicText.split(" ")[0]} font-black text-slate-500 uppercase tracking-widest`}>Visited Nodes</div>
          <div className={`${classCategories.homeTitle.split(" ").filter(c => c.startsWith("text-")).join(" ")} font-mono font-black text-white`}>{visitedCount}</div>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-xl">
          <Grid className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <div className={`${classCategories.logicText.split(" ")[0]} font-black text-slate-500 uppercase tracking-widest`}>Grid Coverage</div>
          <div className={`${classCategories.homeTitle.split(" ").filter(c => c.startsWith("text-")).join(" ")} font-mono font-black text-white`}>{coverage}%</div>
        </div>
      </div>
    </div>
  );
}

PathfindingMetrics.propTypes = {
  state: PropTypes.shape({
    path: PropTypes.array,
    visited: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
    rows: PropTypes.number,
    cols: PropTypes.number,
  }).isRequired,
};
