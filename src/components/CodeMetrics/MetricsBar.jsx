import PropTypes from "prop-types";
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { globalTheme } from "@/styles/globalTheme";

const { typography } = globalTheme;

const themeRegistry = {
  category: `${typography.semantics.home.title} font-black text-white/30 uppercase tracking-tighter`,
  name: `${typography.semantics.home.title} font-black text-white m-0 tracking-tighter leading-none uppercase`,
  metricLabel: `${typography.sizes.subtext} font-black text-slate-500 uppercase tracking-widest`,
  metricValue: (color) => `${typography.sizes.baseSmall} font-mono font-black text-${color}-400`,
  btnBase: `flex items-center gap-2 px-4 py-2 rounded-xl ${typography.sizes.subtext} font-black uppercase tracking-widest transition-all active:scale-95 border`,
};

export default function MetricsBar({
  name,
  isFinished,
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
  algorithm,
}) {
  const localTheme = {
    bar: "px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex flex-wrap justify-between items-center gap-6",
    backBtn:
      "p-2.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all group shadow-inner",
    category: themeRegistry.category,
    name: themeRegistry.name,
    metricPill:
      "hidden lg:flex items-center gap-8 px-8 py-2.5 bg-slate-950/50 rounded-full border border-slate-800/50 shadow-inner",
    metricLabel: themeRegistry.metricLabel,
    metricValue: themeRegistry.metricValue,
    controlGroup: "flex items-center gap-3 bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800/40 shadow-inner",
    btnBase: themeRegistry.btnBase,
    btnReset: "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20",
    btnPrimary: (active) =>
      active
        ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/25"
        : "bg-slate-800/80 border-slate-700/50 text-slate-300 hover:bg-slate-700 shadow-md",
    btnGhost: "bg-slate-800/30 border-slate-700/40 text-amber-400/80 hover:bg-slate-700/50",
    btnFinished:
      "bg-purple-500/15 text-purple-400 border-purple-500/30 hover:bg-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.1)]",
  };

  const isPathfinding = algorithm?.type === "pathfinding";

  const pathLength = state?.path?.length || 0;
  const visitedCount =
    state?.visited instanceof Set ? state.visited.size : (state?.visited || []).flat().filter(Boolean).length;
  const frontierCount = (state?.queue || state?.openSet || []).length;
  const totalChecked = visitedCount + frontierCount;

  return (
    <div className={localTheme.bar}>
      <div className="flex items-center gap-6">
        {onBack && (
          <button onClick={onBack} className={localTheme.backBtn} title="Back to Dashboard">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <span className={localTheme.category}>{algorithm.category}</span>
            <span className={`text-slate-800 ${localTheme.name} font-thin select-none mb-1`}>/</span>
            <h1 className={localTheme.name}>{name}</h1>
          </div>
        </div>
      </div>

      {/* Centered CodeMetrics (for Pathfinding) */}
      {isPathfinding && (
        <div className={localTheme.metricPill}>
          <div className="flex items-center gap-3">
            <div className={localTheme.metricLabel}>Path:</div>
            <div className={localTheme.metricValue("emerald")}>{pathLength}</div>
          </div>
          <div className="w-px h-5 bg-slate-800/50" />
          <div className="flex items-center gap-3">
            <div className={localTheme.metricLabel}>Checked:</div>
            <div className={`${localTheme.metricValue("indigo")} flex items-baseline`}>
              {totalChecked}
              <span className={`${typography.sizes.subtext} text-slate-500/60 font-bold ml-1.5`}>
                /{" "}
                {Math.max(
                  0,
                  (state?.rows || 0) * (state?.cols || 0) - (state?.walls?.size ?? state?.walls?.length ?? 0) - 2,
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={localTheme.controlGroup}>
        <button onClick={reset} className={`${localTheme.btnBase} ${localTheme.btnReset}`} title="Hard Reset">
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>

        <div className="w-px h-6 bg-slate-800/50 mx-1" />

        <button onClick={togglePlay} className={`${localTheme.btnBase} ${localTheme.btnPrimary(isPlaying)}`}>
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          {isPlaying ? "Pause" : "Auto Play"}
        </button>

        <button onClick={prevStep} disabled={!canPrev} className={`${localTheme.btnBase} ${localTheme.btnGhost} px-4`}>
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>

        <button
          onClick={nextStep}
          disabled={!canNext && !isFinished}
          className={`${localTheme.btnBase} ${isFinished ? localTheme.btnFinished : localTheme.btnGhost} px-5`}
        >
          {isFinished ? "Restart" : buttonText || "Next"}
          {isFinished ? <RotateCcw className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

MetricsBar.propTypes = {
  name: PropTypes.string.isRequired,
  isFinished: PropTypes.bool,
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
  algorithm: PropTypes.object,
};
