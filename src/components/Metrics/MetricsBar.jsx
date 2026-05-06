import PropTypes from "prop-types";
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { classCategories } from "@/styles/divClassCustom";


export default function MetricsBar({
  name,
  phase,
  isFinished,
  phaseNames,
  onBack,
  reset,
  prevStep,
  nextStep,
  togglePlay,
  canPrev,
  canNext,
  isPlaying,
  buttonText,
  state,
}) {
  const isPathfinding = state?.type === "pathfinding" || !!state?.gridConfig || !!state?.rows;

  const pathLength = state?.path?.length || 0;
  const visitedCount =
    state?.visited instanceof Set ? state.visited.size : (state?.visited || []).flat().filter(Boolean).length;
  const frontierCount = (state?.queue || state?.openSet || []).length;
  const totalChecked = visitedCount + frontierCount;

  return (
    <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/80 flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors group"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}
        <div className="h-8 w-px bg-slate-800 mx-0.5" />
        <div>
          <h1 className="text-lg font-black text-white m-0 tracking-tight leading-none mb-1">{name}</h1>
          <div className="flex items-center gap-4">
            <span
              className={`text-[11px] font-black uppercase tracking-[0.2em] ${isFinished ? "text-emerald-400" : "text-indigo-400"}`}
            >
              {isFinished ? "Completed ✓" : phaseNames?.[phase] || "Running"}
            </span>
          </div>
        </div>
      </div>

      {/* Centered Metrics (for Pathfinding) */}
      {isPathfinding && (
        <div className="hidden lg:flex items-center gap-6 px-6 py-2 bg-slate-950/50 rounded-full border border-slate-800/50 shadow-inner">
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Path:</div>
            <div className="text-sm font-mono font-black text-emerald-400">{pathLength}</div>
          </div>
          <div className="w-px h-4 bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Checked:</div>
            <div className="text-sm font-mono font-black text-indigo-400 flex items-baseline">
              {totalChecked}
              <span className="text-[10px] text-slate-500/60 font-bold ml-1">
                / {Math.max(0, (state?.rows || 0) * (state?.cols || 0) - (state?.walls?.size ?? state?.walls?.length ?? 0) - 2)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={reset}
          className={`${classCategories.buttonBase} bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 px-3 py-1 rounded-lg text-[10px]`}
          title="Hard Reset"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>

        <div className="w-px h-5 bg-slate-800 mx-0.5" />

        <button
          onClick={togglePlay}
          className={`${classCategories.buttonBase} px-3 py-1 rounded-lg text-[10px] ${
            isPlaying
              ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/25"
              : "bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:bg-slate-700"
          }`}
        >
          {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
          {isPlaying ? "Pause" : "Auto Play"}
        </button>

        <button
          onClick={prevStep}
          disabled={!canPrev}
          className={`${classCategories.buttonBase} px-3 py-1 rounded-lg text-[10px] bg-slate-800/30 border border-slate-700/40 text-amber-400/80 hover:bg-slate-700/50`}
        >
          <ChevronLeft className="w-3 h-3" /> Prev
        </button>

        <button
          onClick={nextStep}
          disabled={!canNext && !isFinished}
          className={`${classCategories.buttonBase} px-4 py-1 rounded-lg text-[10px] ${
            isFinished
              ? "bg-purple-500/15 text-purple-400 border border-purple-500/30 hover:bg-purple-500/25"
              : "bg-slate-800/30 text-sky-400 border border-slate-700/40 hover:bg-slate-700/50"
          }`}
        >
          {isFinished ? "Restart" : buttonText || "Next"}
          {isFinished ? <RotateCcw className="w-3 h-3 ml-1" /> : <ChevronRight className="w-3 h-3 ml-1" />}
        </button>
      </div>
    </div>
  );
}

MetricsBar.propTypes = {
  name: PropTypes.string.isRequired,
  phase: PropTypes.number,
  isFinished: PropTypes.bool,
  phaseNames: PropTypes.arrayOf(PropTypes.string),
  onBack: PropTypes.func,
  reset: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  canPrev: PropTypes.bool.isRequired,
  canNext: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  buttonText: PropTypes.string,
  state: PropTypes.object,
};
