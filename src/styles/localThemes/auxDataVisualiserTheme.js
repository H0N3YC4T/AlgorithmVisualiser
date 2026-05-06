import { globalTheme } from "../globalTheme";
import { classCategories } from "../divClassCustom";

export const auxDataVisualiserTheme = {
  sectionTitle: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.primaryLight} uppercase tracking-[0.25em] flex items-center gap-3`,
  label: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.textDisabled} uppercase mr-2 tracking-widest`,
  logicTitle: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.textDisabled} uppercase tracking-[0.2em] mb-3 opacity-50`,
  logicText: `${globalTheme.typography.sizes.subtext} text-${globalTheme.colors.textDisabled} font-bold uppercase leading-relaxed tracking-wider`,
  logicNote: `text-slate-600 mt-2 block italic ${globalTheme.typography.sizes.subtext} normal-case`,
  dataCard: `p-4 bg-${globalTheme.colors.background} rounded-2xl border border-${globalTheme.colors.borderStrong} flex justify-between items-center shadow-lg`,
  dataLabel: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.textDisabled} uppercase tracking-widest`,
  dataValue: `font-mono font-black ${globalTheme.typography.sizes.baseSmall}`,
  arrayItem: (isActive, color) =>
    `w-10 h-12 bg-slate-900 border ${isActive ? `border-${color}-500 ring-2 ring-${color}-500/20 shadow-[0_0_20px_rgba(0,0,0,0.2)]` : `border-${globalTheme.colors.borderStrong}`} rounded-xl flex flex-col items-center justify-center transition-all shadow-md`,
  bucketContainer: `flex-1 bg-slate-900 border border-${globalTheme.colors.borderStrong}/60 rounded-xl p-2 min-h-[60px] flex flex-col-reverse gap-1.5 items-center shadow-inner`,
  section: `p-8 ${classCategories.cardRound} border border-${globalTheme.colors.borderStrong}/50 bg-slate-900/20 backdrop-blur-sm`,
  charBox: `w-8 h-8 bg-slate-950 border border-${globalTheme.colors.borderStrong} rounded-2xl flex items-center justify-center ${globalTheme.typography.sizes.subtext} font-mono font-black text-${globalTheme.colors.primaryLight} shadow-inner`,
  dataBox: `flex flex-col items-center justify-center p-3 bg-slate-950 border border-${globalTheme.colors.borderStrong} rounded-2xl min-w-[3.5rem] shadow-lg hover:border-${globalTheme.colors.primary}/50 transition-colors`,
};
