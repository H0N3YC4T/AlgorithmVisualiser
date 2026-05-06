import { theme } from "./theme";

const { colors, typography, effects } = theme;

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
  pageWrapper: "min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center py-12 px-4",
  mainPanel:
    "w-full max-w-[1400px] bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col",
  homeTitle: cx(
    typography.semantics.home.title,
    `font-black text-${colors.textHigh}`,
    typography.tracking.tight,
    "mb-2",
  ),
  homeSubtitle: cx(
    typography.semantics.home.subtitle,
    `font-medium text-${colors.textMuted}`,
    "max-w-2xl mx-auto mb-4",
  ),
  grid: cx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", "gap-4 pt-4 pb-6"),

  // --- Algorithm Cards ---
  appCard: cx(
    "group relative flex flex-col p-4 h-full overflow-hidden",
    `bg-${colors.surface} border border-${colors.border} rounded-2xl`,
    `hover:border-${colors.primary}/50 hover:bg-${colors.surfaceHover} hover:-translate-y-1 hover:shadow-lg hover:shadow-${colors.primary}/5`,
    "backdrop-blur-sm transition-all duration-500 text-left",
  ),
  cardHeading: cx(
    typography.sizes.header,
    "font-black leading-tight",
    `text-${colors.textHigh} group-hover:text-${colors.primary} transition-colors`,
  ),
  cardDescription: cx(typography.sizes.baseSmall, "font-medium leading-relaxed line-clamp-2", `text-${colors.textMuted}`),

  // --- Category Headers ---
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: cx(
      "flex items-center gap-4 py-3 border-b border-slate-900 transition-colors",
      `group-hover:border-${colors.borderStrong}`,
    ),
    iconBox: (active) =>
      cx(
        "p-2 transition-all",
        "rounded-xl",
        active
          ? `bg-${colors.primary} text-${colors.textHigh} shadow-[0_0_15px_rgba(99,102,241,0.3)]`
          : `bg-slate-900 text-${colors.textDisabled}`,
      ),
    title: (active) =>
      cx(
        typography.semantics.home.section,
        "font-black uppercase tracking-normal transition-colors",
        active ? `text-${colors.textHigh}` : `text-${colors.textDisabled}`,
      ),
  },

  // --- Visualizer Components ---
  glassPanel: `bg-slate-900/40 border border-${colors.border} backdrop-blur-xl rounded-2xl shadow-2xl`,
  subPanel: `flex-1 flex flex-col bg-slate-950/40 border border-${colors.border} rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm min-h-[300px]`,
  subPanelHeader: `px-8 py-5 border-b border-${colors.border} flex justify-between items-center bg-slate-900/40`,
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

  // --- Sidebar & Data Visualization ---
  sidebarItem: `p-4 border-b border-${colors.border} hover:bg-slate-900/40 transition-colors`,
  charBox: `w-8 h-8 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center ${typography.sizes.subtext} font-mono font-black text-indigo-400 shadow-inner`,
  dataBox: `flex flex-col items-center justify-center p-3 bg-slate-950 border border-slate-800 rounded-2xl min-w-[3.5rem] shadow-lg hover:border-indigo-500/50 transition-colors`,
  logicText: `${typography.sizes.subtext} text-slate-500 font-bold uppercase leading-relaxed tracking-wider`,
  vizPanel:
    "w-full max-w-[1400px] bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col",
  panelFooter: cx(
    "p-6 flex justify-between items-center",
    `border-t border-${colors.border} bg-slate-950/50`,
    `text-${colors.textMuted} font-medium ${typography.tracking.wider} uppercase`,
  ),

  // --- Thematic Defaults ---
  cardRound: "rounded-2xl",
};
