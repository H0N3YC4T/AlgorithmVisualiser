import { globalTheme } from "../globalTheme";
import { classCategories } from "../divClassCustom";
import { algorithmPageTheme as apt } from "./algorithmPageTheme";

export const inputPanelTheme = {
  panel: `w-full h-full bg-slate-900/40 backdrop-blur-md border border-slate-800/60 ${classCategories.cardRound} p-5 shadow-2xl`,
  configContainer:
    "flex items-center gap-6 bg-slate-950/50 border border-slate-800/60 rounded-2xl px-4 py-2 shadow-inner",
  configTitle: apt.controlTitle,
  speedContainer: "bg-slate-950/50 border border-slate-800/60 rounded-2xl px-5 py-3 shadow-inner group",
  speedInput:
    "w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 group-hover:bg-slate-700 transition-colors",
  sizeInput: {
    container: `w-12 bg-slate-900 border border-slate-800 rounded-xl px-1.5 py-1 ${globalTheme.typography.sizes.baseSmall} font-mono text-sky-400 focus:border-sky-500 outline-none text-center`,
    label: `${globalTheme.typography.sizes.subtext} font-bold text-slate-600 uppercase`,
  },
  input: `!py-4 !px-6 !rounded-xl !${globalTheme.typography.sizes.baseSmall} bg-slate-950/50 shadow-inner`,
};
