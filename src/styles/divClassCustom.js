export const classCategories = {
  // Layout
  pageWrapper:
    "min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 relative py-12 px-4 md:px-8",
  mainPanel:
    "flex-1 flex flex-col max-w-7xl mx-auto w-full bg-slate-900/60 border border-slate-800/80 shadow-2xl rounded-[3rem] overflow-hidden backdrop-blur-xl",
  panelFooter:
    "p-4 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-xs text-slate-500 font-medium tracking-wider uppercase",

  // Home Page Specific
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-10 pb-20",
  appCard:
    "group relative flex flex-col p-12 bg-slate-900/40 border border-slate-800/60 rounded-[3rem] hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 backdrop-blur-sm text-left overflow-hidden h-full",
  infoCard:
    "p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 space-y-6 group hover:border-slate-700 transition-colors",
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: "flex items-center gap-6 py-8 border-b border-slate-900 group-hover:border-slate-800 transition-colors",
    iconBox: (active) =>
      `p-3 rounded-2xl transition-all duration-300 ${active ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]" : "bg-slate-900 text-slate-600"}`,
    title: (active) =>
      `text-3xl font-black uppercase tracking-[0.35em] transition-all duration-300 ${active ? "text-white" : "text-slate-700"}`,
  },

  // Visualizer Components
  vizContainer:
    "relative w-full aspect-video min-h-[500px] bg-slate-950/40 border border-slate-800/60 rounded-[2.5rem] flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-sm",
  glassPanel: "bg-slate-900/40 border border-slate-800/60 backdrop-blur-md shadow-2xl shadow-slate-950/50",
  subPanel:
    "flex-1 flex flex-col bg-slate-950/40 border border-slate-800/60 rounded-[2.5rem] overflow-hidden shadow-xl backdrop-blur-sm",
  subPanelHeader: "px-10 py-8 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/40",
  smallHeading: "text-[18px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-4",
  controlGroup: "flex items-center gap-3 bg-slate-950/50 p-3 rounded-3xl border border-slate-800/60",
  sidebarSection:
    "bg-slate-950/40 border border-slate-800/60 rounded-[2.5rem] p-10 space-y-8 shadow-inner backdrop-blur-sm",

  // Typography & Labels
  buttonBase:
    "inline-flex items-center justify-center rounded-2xl px-10 py-4.5 text-base font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
  labelBase: "block text-[15px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4 ml-3",
  inputBase:
    "w-full bg-slate-950/60 border border-slate-800/60 rounded-[2rem] px-8 py-5 text-lg text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300",
  logicText: "text-[11px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider",
  badgeBase: "text-[12px] font-black uppercase px-4 py-1.5 rounded-xl border transition-colors",

  // Small UI Elements
  dataBox:
    "w-12 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex flex-col items-center justify-center transition-all hover:bg-slate-700/50 shadow-lg",
  charBox:
    "w-6 h-6 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold text-slate-300",
  metricPill:
    "flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800/60 text-[12px] font-black shrink-0",
  iconContainer: "p-4 rounded-2xl border shadow-xl",

  // Cell & Data Structures
  cellBase:
    "w-10 h-14 flex-shrink-0 flex items-center justify-center border font-mono font-black text-lg transition-all duration-300 rounded-xl shadow-lg",
  cellValueBase:
    "w-10 h-16 flex-shrink-0 flex flex-col items-center justify-center border transition-all duration-500 rounded-xl",
};
