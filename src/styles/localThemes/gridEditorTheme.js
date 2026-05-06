import { classCategories } from "../divClassCustom";

export const gridEditorTheme = {
  container: "flex items-center gap-4",
  toolBtn: (isActive, tool, disabled) => `
    flex items-center gap-2 px-4 py-2 rounded-xl ${classCategories.logicText.split(" ")[0]} font-bold transition-all duration-300
    ${isActive
      ? `${tool.bgColor} ${tool.color} ${tool.borderColor} border shadow-lg scale-105 z-10`
      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border-transparent border'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `,
  clearBtn: `flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl ${classCategories.logicText.split(" ")[0]} font-black uppercase tracking-widest hover:bg-rose-500/20 transition-all disabled:opacity-30 whitespace-nowrap active:scale-95`,
  lockBadge: `${classCategories.logicText.split(" ")[0]} font-bold text-rose-400/60 uppercase tracking-tighter ml-2 animate-pulse`,
};
