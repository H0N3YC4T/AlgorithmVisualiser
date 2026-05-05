export const classCategory = {
  // Layout
  pageWrapper: "min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 relative py-12 px-4 md:px-8",
  mainPanel: "flex-1 flex flex-col max-w-7xl mx-auto w-full bg-slate-900/60 border border-slate-800/80 shadow-2xl rounded-[3rem] overflow-hidden backdrop-blur-xl",
  panelFooter: "p-4 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-xs text-slate-500 font-medium tracking-wider uppercase",
  
  // Home Page Specific
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 pb-14",
  algoCard: "group relative flex flex-col p-8 bg-slate-900/40 border border-slate-800/60 rounded-[2rem] hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 backdrop-blur-sm text-left overflow-hidden h-full",
  cheatsheetCard: "p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-3 group hover:border-slate-700 transition-colors",
  
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: "flex items-center gap-4 py-4 border-b border-slate-900 group-hover:border-slate-800 transition-colors",
    iconBox: (active) => `p-2 rounded-lg transition-all duration-300 ${active ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-slate-900 text-slate-600'}`,
    title: (active) => `text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 ${active ? 'text-white' : 'text-slate-700'}`
  },

  // UI Components
  vizContainer: "relative w-full aspect-video min-h-[400px] bg-slate-950/40 border border-slate-800/60 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-sm",
  glassPanel: "bg-slate-900/40 border border-slate-800/60 backdrop-blur-md shadow-2xl shadow-slate-950/50",
  subPanel: "flex-1 flex flex-col bg-slate-950/40 border border-slate-800/60 rounded-[1.5rem] overflow-hidden shadow-xl backdrop-blur-sm",
  subPanelHeader: "px-6 py-5 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/40",
  smallHeading: "text-[12px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2.5",
  controlGroup: "flex items-center gap-1.5 bg-slate-950/50 p-1.5 rounded-2xl border border-slate-800/60",
  sidebarSection: "bg-slate-950/40 border border-slate-800/60 rounded-2xl p-7 space-y-5 shadow-inner backdrop-blur-sm",
  buttonBase: "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
  labelBase: "block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1.5",
  inputBase: "w-full bg-slate-950/60 border border-slate-800/60 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300"
};
