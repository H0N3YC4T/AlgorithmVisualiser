export const classCategory = {
  // Layout
  pageWrapper: "min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30",
  mainPanel: "flex-1 flex flex-col max-w-7xl mx-auto w-full bg-slate-900/50 border-x border-slate-800 shadow-2xl",
  panelFooter: "p-4 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-xs text-slate-500 font-medium tracking-wider uppercase",
  
  // Home Page Specific
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 pb-14",
  algoCard: "group relative p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-500 text-left overflow-hidden flex flex-col h-full",
  cheatsheetCard: "p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-3 group hover:border-slate-700 transition-colors",
  
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: "flex items-center gap-4 py-4 border-b border-slate-900 group-hover:border-slate-800 transition-colors",
    iconBox: (active) => `p-2 rounded-lg transition-all duration-500 ${active ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-slate-900 text-slate-600'}`,
    title: (active) => `text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 ${active ? 'text-white' : 'text-slate-700'}`
  },

  // UI Components
  sidebarSection: "bg-slate-950/40 border border-slate-800/60 rounded-xl p-5 space-y-4 shadow-sm backdrop-blur-sm",
  buttonBase: "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
  labelBase: "block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1",
  inputBase: "w-full bg-slate-950/50 border border-slate-800/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
};
