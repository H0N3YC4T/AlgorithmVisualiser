import { globalTheme } from "../globalTheme";
import { classCategories } from "../divClassCustom";
import { algorithmPageTheme as apt } from "./algorithmPageTheme";

export const visualiserFrameTheme = {
  contentWrapper: "space-y-6 p-6",
  vizArea: `relative ${classCategories.glassPanel} ${classCategories.cardRound} p-6 min-h-[300px]`,
  gridSection: "grid grid-cols-1 xl:grid-cols-10 gap-6 items-stretch",
  inputWrapper: "xl:col-span-7 w-full min-w-0",
  legendWrapper: "xl:col-span-3 w-full min-w-0",
  bottomGrid: (hasAuxData) =>
    `grid grid-cols-1 ${hasAuxData ? "xl:grid-cols-3" : "xl:grid-cols-2"} gap-8 items-stretch`,
  footerIcon: `w-3 h-3 text-${globalTheme.colors.primaryLight}`,
  panel: `w-full max-w-[1400px] bg-${globalTheme.colors.background}/40 backdrop-blur-xl border border-${globalTheme.colors.border} rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col`,
  footer: `p-6 flex justify-between items-center border-t border-${globalTheme.colors.border} bg-slate-950/50 text-${globalTheme.colors.textMuted} font-medium tracking-wider uppercase`,
  logicText: `${apt.key} text-${globalTheme.colors.textDisabled} leading-relaxed`,
};
