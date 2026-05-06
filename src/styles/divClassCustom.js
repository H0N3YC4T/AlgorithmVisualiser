import { globalTheme } from "./globalTheme";

const { colors, typography, effects } = globalTheme;

/**
 * UTILITY: Join classes cleanly for better readability
 */
const cx = (...args) => args.filter(Boolean).join(" ");

/**
 * SEMANTIC CLASS REGISTRY
 * Organized by domain for high-density UI management.
 */

export const classCategories = {
  // --- Dashboard Base ---
  pageWrapper: `min-h-screen bg-${colors.background} text-${colors.textHigh} flex flex-col items-center py-12 px-4`,
  mainPanel: `w-full max-w-[1400px] bg-${colors.background}/40 backdrop-blur-xl border border-${colors.border} rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col`,
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-6",

  // --- Algorithm Cards ---
  cardDescription: cx(
    typography.sizes.baseSmall,
    "font-medium leading-relaxed line-clamp-2",
    `text-${colors.textMuted}`,
  ),

  // --- Legacy Compatibility (to be refactored into localTheme) ---
  logicText: typography.sizes.subtext,
  homeSubtitle: typography.semantics.home.subtitle,

  // --- Visualiser Components ---
  glassPanel: `bg-${colors.background}/40 border border-${colors.border} backdrop-blur-xl rounded-2xl shadow-2xl`,
  subPanel: `flex-1 flex flex-col bg-slate-950/40 border border-${colors.border} rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm min-h-[300px]`,
  subPanelHeader: `px-8 py-5 border-b border-${colors.border} flex justify-between items-center bg-${colors.background}/40`,
  smallHeading: `${typography.sizes.header} font-black uppercase ${typography.tracking.wider} text-${colors.textMuted} flex items-center gap-2`,
  controlGroup: `flex items-center gap-3 bg-slate-950/50 p-3 rounded-2xl border border-${colors.border}`,

  // --- Typography & Inputs ---
  buttonBase: `inline-flex items-center justify-center rounded-2xl px-10 py-4.5 ${typography.sizes.baseSmall} font-bold ${effects.transition} active:scale-95 disabled:opacity-50 disabled:pointer-events-none`,
  labelBase: `block ${typography.sizes.baseSmall} font-black text-${colors.textMuted} uppercase ${typography.tracking.wider} mb-4 ml-3`,
  inputBase: `w-full bg-slate-950/60 border border-${colors.border} rounded-xl px-6 py-4 ${typography.sizes.baseSmall} text-${colors.textHigh} placeholder:text-slate-700 focus:outline-none focus:border-${colors.primary}/50 focus:ring-2 focus:ring-${colors.primary}/10 ${effects.transition}`,

  // --- Cells & Data Structures ---
  cellBase: `w-10 h-14 flex-shrink-0 flex items-center justify-center border ${typography.fontMono} font-black ${typography.sizes.header} ${effects.transition} rounded-2xl shadow-lg`,
  cellValueBase: `w-10 h-16 flex-shrink-0 flex flex-col items-center justify-center border ${effects.transition} rounded-2xl`,

  // --- Helpers ---
  metricPill: `flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-950/80 border border-${colors.border} ${typography.sizes.subtext} font-black shrink-0`,
  infoCard: cx(
    "p-6 flex flex-col gap-2 transition-all",
    "rounded-2xl",
    `bg-${colors.surface} border border-slate-900/50 hover:border-slate-800`,
  ),
  cardFooter: cx(
    "p-4 flex justify-between items-center",
    `border-t border-${colors.border} bg-slate-950/50`,
    typography.sizes.subtext,
    `text-${colors.textMuted} font-medium ${typography.tracking.wider} uppercase`,
  ),

  // --- Thematic Defaults ---
  cardRound: "rounded-2xl",
  vizContainer: "relative w-full h-[450px] bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl flex flex-col",
};

