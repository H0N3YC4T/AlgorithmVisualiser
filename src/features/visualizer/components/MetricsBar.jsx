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
    <div className="px-8 py-5 border-b border-slate-800 bg-slate-900/80 flex flex-wrap justify-between items-center gap-6">
      <div className="flex items-center gap-6">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors group"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1.5 transition-transform" />
          </button>
        )}
        <div className="h-10 w-px bg-slate-800 mx-1" />
        <div>
          <h1 className="text-xl font-black text-white m-0 tracking-tight leading-none mb-1.5">{name}</h1>
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
        <div className="hidden lg:flex items-center gap-8 px-10 py-2.5 bg-slate-950/50 rounded-full border border-slate-800/50 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="text-[12px] font-black text-slate-500 uppercase tracking-widest">Path Length:</div>
            <div className="text-base font-mono font-black text-emerald-400">{pathLength}</div>
          </div>
          <div className="w-px h-5 bg-slate-800" />
          <div className="flex items-center gap-3">
            <div className="text-[12px] font-black text-slate-500 uppercase tracking-widest">Checked:</div>
            <div className="text-base font-mono font-black text-indigo-400 flex items-baseline">
              {totalChecked}
              <span className="text-[12px] text-slate-500/60 font-bold ml-2">
                / {Math.max(0, (state?.rows || 0) * (state?.cols || 0) - (state?.walls?.size ?? state?.walls?.length ?? 0) - 2)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className={`${classCategories.buttonBase} bg-rose-500/20 border border-rose-500/50 text-rose-400 hover:bg-rose-500/30 px-6 py-2.5 rounded-xl`}
          title="Hard Reset"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        <div className="w-px h-8 bg-slate-800 mx-2" />

        <button
          onClick={togglePlay}
          className={`${classCategories.buttonBase} px-6 py-2.5 rounded-xl ${
            isPlaying
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30 shadow-lg shadow-cyan-500/10"
              : "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          {isPlaying ? "Pause" : "Auto Play"}
        </button>

        <button
          onClick={prevStep}
          disabled={!canPrev}
          className={`${classCategories.buttonBase} px-6 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-amber-400 hover:bg-slate-700/60 shadow-[inset_0_0_10px_rgba(251,191,36,0.05)]`}
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        <button
          onClick={nextStep}
          disabled={!canNext && !isFinished}
          className={`${classCategories.buttonBase} border px-8 py-2.5 rounded-xl ${
            isFinished
              ? "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30 shadow-[inset_0_0_10px_rgba(168,85,247,0.05)]"
              : "bg-slate-800/40 text-sky-400 border border-slate-700/50 hover:bg-slate-700/60 shadow-[inset_0_0_10px_rgba(56,189,248,0.05)]"
          }`}
        >
          {isFinished ? "Restart" : buttonText || "Next"}
          {isFinished ? <RotateCcw className="w-4 h-4 ml-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
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
