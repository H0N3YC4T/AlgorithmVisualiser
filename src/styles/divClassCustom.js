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
  mainPanel: "w-full max-w-[1400px] bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col",
  homeTitle: cx(
    typography.semantics.home.title,
    `font-black text-${colors.textHigh}`,
    typography.tracking.tight,
    "mb-2"
  ),
  homeSubtitle: cx(
    typography.semantics.home.subtitle,
    `font-medium text-${colors.textMuted}`,
    "max-w-2xl mx-auto mb-4"
  ),
  grid: cx(
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "gap-4 pt-4 pb-6"
  ),

  // --- Algorithm Cards ---
  appCard: cx(
    "group relative flex flex-col p-4 h-full overflow-hidden",
    `bg-${colors.surface} border border-${colors.border} ${effects.roundness.lg}`,
    `hover:border-${colors.primary}/50 hover:bg-${colors.surfaceHover} hover:-translate-y-1 hover:shadow-lg hover:shadow-${colors.primary}/5`,
    "backdrop-blur-sm transition-all duration-500 text-left"
  ),
  cardHeading: cx(
    "text-[17px] font-black leading-tight",
    `text-${colors.textHigh} group-hover:text-${colors.primary} transition-colors`
  ),
  cardDescription: cx(
    "text-[12px] font-medium leading-relaxed line-clamp-2",
    `text-${colors.textMuted}`
  ),

  // --- Category Headers ---
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: cx(
      "flex items-center gap-4 py-3 border-b border-slate-900 transition-colors",
      `group-hover:border-${colors.borderStrong}`
    ),
    iconBox: (active) => cx(
      "p-2 transition-all",
      effects.roundness.base,
      active 
        ? `bg-${colors.primary} text-${colors.textHigh} shadow-[0_0_15px_rgba(99,102,241,0.3)]` 
        : `bg-slate-900 text-${colors.textDisabled}`
    ),
    title: (active) => cx(
      typography.semantics.home.section,
      "font-black uppercase tracking-normal transition-colors",
      active ? `text-${colors.textHigh}` : `text-${colors.textDisabled}`
    ),
  },

  // --- Visualizer UI ---
  viz: {
    heading: cx(
      typography.semantics.viz.title,
      `font-black text-${colors.textHigh}`,
      typography.tracking.tighter
    ),
    badge: cx(
      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
      "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
    ),
  },

  // --- Helper Components ---
  infoCard: cx(
    "p-3 space-y-2 group transition-all",
    effects.roundness.base,
    `bg-${colors.surface} border border-slate-900/50 hover:border-slate-800`
  ),
  metricPill: cx(
    `px-2 py-1 rounded-md bg-slate-950/40 border border-${colors.border} transition-colors`,
    "hover:border-slate-700"
  ),
  cardFooter: cx(
    "p-4 flex justify-between items-center",
    `border-t border-${colors.border} bg-slate-950/50`,
    typography.sizes.xs,
    `text-${colors.textMuted} font-medium ${typography.tracking.wider} uppercase`
  ),
};
