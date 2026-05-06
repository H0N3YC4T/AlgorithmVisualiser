import { globalTheme } from "../globalTheme";
import { classCategories } from "../divClassCustom";

export const auxShiftTableTheme = {
  section: `p-8 ${classCategories.cardRound} border border-${globalTheme.colors.borderStrong}/50 bg-slate-900/20 backdrop-blur-sm`,
  title: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.primaryLight} uppercase tracking-widest flex items-center gap-2`,
  label: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.textDisabled} uppercase mr-2`,
  charBox: `w-8 h-8 bg-slate-950 border border-${globalTheme.colors.borderStrong} rounded-2xl flex items-center justify-center ${globalTheme.typography.sizes.subtext} font-mono font-black text-${globalTheme.colors.primaryLight} shadow-inner`,
  dataBox: `flex flex-col items-center justify-center p-3 bg-slate-950 border border-${globalTheme.colors.borderStrong} rounded-2xl min-w-[3.5rem] shadow-lg hover:border-${globalTheme.colors.primary}/50 transition-colors`,
  logicTitle: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.textDisabled} uppercase tracking-widest mb-2 opacity-50`,
  logicText: `${globalTheme.typography.sizes.subtext} text-${globalTheme.colors.textDisabled} font-bold uppercase leading-relaxed tracking-wider`,
  logicNote: `text-slate-600 mt-1 block italic ${globalTheme.typography.sizes.subtext}`,
};
