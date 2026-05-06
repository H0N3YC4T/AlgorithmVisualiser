import { globalTheme } from "../globalTheme";
import { algorithmPageTheme as apt } from "./algorithmPageTheme";

const { typography } = globalTheme;

export const metricsBarRegistry = {
  category: `text-[18px] md:text-[22px] font-black text-white/30 uppercase tracking-tighter`,
  name: `${apt.title} text-white m-0 leading-none`,
  metricLabel: `${typography.sizes.subtext} font-black text-slate-500 uppercase tracking-widest`,
  metricValue: (color) => `${typography.sizes.baseSmall} font-mono font-black text-${color}-400`,
  btnBase: `flex items-center gap-2 px-4 py-2 rounded-xl ${apt.button} transition-all active:scale-95 border`,
};

export const metricsBarTheme = {
  bar: "px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center gap-6",
  backBtn:
    "p-2.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all group shadow-inner",
  category: metricsBarRegistry.category,
  name: metricsBarRegistry.name,
  metricPill:
    "hidden lg:flex items-center gap-8 px-8 py-2.5 bg-slate-950/50 rounded-full border border-slate-800/50 shadow-inner",
  metricLabel: metricsBarRegistry.metricLabel,
  metricValue: metricsBarRegistry.metricValue,
  controlGroup: "flex items-center gap-3 bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800/40 shadow-inner",
  btnBase: metricsBarRegistry.btnBase,
  btnReset: "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20",
  btnPrimary: (active) =>
    active
      ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/25"
      : "bg-slate-800/80 border-slate-700/50 text-slate-300 hover:bg-slate-700 shadow-md",
  btnGhost: "bg-slate-800/30 border-slate-700/40 text-amber-400/80 hover:bg-slate-700/50",
  btnFinished:
    "bg-purple-500/15 text-purple-400 border-purple-500/30 hover:bg-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.1)]",
};
