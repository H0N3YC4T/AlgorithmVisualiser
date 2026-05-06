import { theme } from "./theme";

const { colors, typography, effects } = theme;

export const classCategories = {
  // Layout
  pageWrapper:
    `min-h-screen bg-transparent text-${colors.textBody} flex flex-col ${typography.fontBody} selection:bg-${colors.primary}/30 relative py-12 px-4 md:px-8`,
  mainPanel:
    `flex-1 flex flex-col max-w-7xl mx-auto w-full bg-${colors.surface} border border-${colors.border} ${effects.shadow} ${effects.roundness.full} overflow-hidden ${effects.glass}`,
  panelFooter:
    `p-4 border-t border-${colors.border} bg-slate-950/50 flex justify-between items-center ${typography.sizes.xs} text-${colors.textMuted} font-medium ${typography.tracking.wider} uppercase`,

  // Home Page Specific
  homeTitle: `${typography.semantics.home.title} font-black text-${colors.textHigh} ${typography.tracking.tight} mb-4`,
  homeSubtitle: `${typography.semantics.home.subtitle} font-medium text-${colors.textMuted} max-w-2xl mx-auto mb-16`,
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 pb-12",
  appCard:
    `group relative flex flex-col p-6 bg-${colors.surface} border border-${colors.border} ${effects.roundness.lg} hover:border-${colors.primary}/50 hover:bg-${colors.surfaceHover} ${effects.transition} duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-${colors.primary}/5 backdrop-blur-sm text-left overflow-hidden h-full`,
  cardHeading: `text-[18px] font-black text-${colors.textHigh} group-hover:text-${colors.primary} ${effects.transition} leading-tight`,
  cardDescription: `text-[13px] font-medium text-${colors.textMuted} leading-relaxed line-clamp-2`,
  infoCard:
    `p-4 ${effects.roundness.base} bg-${colors.surface} border border-${colors.border} space-y-4 group hover:border-slate-700 ${effects.transition}`,
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: `flex items-center gap-6 py-8 border-b border-slate-900 group-hover:border-${colors.borderStrong} ${effects.transition}`,
    iconBox: (active) =>
      `p-3 ${effects.roundness.base} ${effects.transition} ${active ? `bg-${colors.primary} text-${colors.textHigh} shadow-[0_0_20px_rgba(99,102,241,0.4)]` : `bg-slate-900 text-${colors.textDisabled}`}`,
    title: (active) =>
      `${typography.semantics.home.section} font-black uppercase tracking-normal ${effects.transition} ${active ? `text-${colors.textHigh}` : `text-${colors.textDisabled}`}`,
  },

  // Visualizer Components
  vizContainer:
    `relative w-full aspect-video min-h-[500px] bg-slate-950/40 border border-${colors.border} ${effects.roundness.xl} flex items-center justify-center overflow-hidden ${effects.shadow} backdrop-blur-sm`,
  glassPanel: `bg-${colors.surface} border border-${colors.border} ${effects.glassMuted} ${effects.shadow} shadow-slate-950/50`,
  subPanel:
    `flex-1 flex flex-col bg-slate-950/40 border border-${colors.border} ${effects.roundness.xl} overflow-hidden shadow-xl backdrop-blur-sm`,
  subPanelHeader: `px-10 py-8 border-b border-${colors.border} flex justify-between items-center bg-${colors.surface}`,
  smallHeading: `${typography.sizes.lg} font-black uppercase ${typography.tracking.wider} text-${colors.textMuted} flex items-center gap-4`,
  controlGroup: `flex items-center gap-3 bg-slate-950/50 p-3 ${effects.roundness.lg} border border-${colors.border}`,
  sidebarSection:
    `bg-slate-950/40 border border-${colors.border} ${effects.roundness.xl} p-10 space-y-8 shadow-inner backdrop-blur-sm`,

  // Typography & Labels
  buttonBase:
    `inline-flex items-center justify-center ${effects.roundness.base} px-10 py-4.5 ${typography.sizes.base} font-bold ${effects.transition} active:scale-95 disabled:opacity-50 disabled:pointer-events-none`,
  labelBase: `block ${typography.sizes.base} font-black text-${colors.textMuted} uppercase ${typography.tracking.wider} mb-4 ml-3`,
  inputBase:
    `w-full bg-slate-950/60 border border-${colors.border} ${effects.roundness.lg} px-8 py-5 ${typography.sizes.lg} text-${colors.textHigh} placeholder:text-slate-700 focus:outline-none focus:border-${colors.primary}/50 focus:ring-2 focus:ring-${colors.primary}/10 ${effects.transition}`,
  logicText: `${typography.sizes.xs} text-${colors.textMuted} font-bold uppercase leading-relaxed ${typography.tracking.wider}`,
  badgeBase: `${typography.sizes.sm} font-black uppercase px-4 py-1.5 ${effects.roundness.base} border ${effects.transition}`,

  // Small UI Elements
  dataBox:
    `w-12 h-16 bg-slate-800 border border-slate-700 ${effects.roundness.base} flex flex-col items-center justify-center ${effects.transition} hover:bg-slate-700/50 shadow-lg`,
  charBox:
    `w-6 h-6 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center ${typography.sizes.xs} ${typography.fontMono} font-bold text-slate-300`,
  metricPill:
    `flex items-center gap-3 px-4 py-3 ${effects.roundness.base} bg-slate-950/80 border border-${colors.border} ${typography.sizes.sm} font-black shrink-0`,
  iconContainer: `p-4 ${effects.roundness.base} border shadow-xl`,

  // Cell & Data Structures
  cellBase:
    `w-10 h-14 flex-shrink-0 flex items-center justify-center border ${typography.fontMono} font-black ${typography.sizes.lg} ${effects.transition} ${effects.roundness.base} shadow-lg`,
  cellValueBase:
    `w-10 h-16 flex-shrink-0 flex flex-col items-center justify-center border ${effects.transition} ${effects.roundness.base}`,
};
