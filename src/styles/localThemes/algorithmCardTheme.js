import { globalTheme } from "../globalTheme";

export const algorithmCardTheme = {
  appCard: `group relative flex flex-col p-4 h-full overflow-hidden bg-${globalTheme.colors.surface} border border-${globalTheme.colors.border} rounded-2xl hover:border-${globalTheme.colors.primary}/50 hover:bg-${globalTheme.colors.surfaceHover} hover:-translate-y-1 hover:shadow-lg hover:shadow-${globalTheme.colors.primary}/5 backdrop-blur-sm transition-all duration-500 text-left w-full`,
  cardHeading: `${globalTheme.typography.sizes.header} font-black leading-tight text-${globalTheme.colors.textHigh} group-hover:text-${globalTheme.colors.primary} transition-colors`,
  cardDescription: `${globalTheme.typography.sizes.baseSmall} font-medium leading-relaxed line-clamp-2 text-${globalTheme.colors.textMuted}`,
  complexityPill: `flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-slate-950/80 border border-slate-800/60 ${globalTheme.typography.sizes.subtext} font-black shrink-0`,
  complexityLabel: `text-${globalTheme.colors.textDisabled} uppercase tracking-widest`,
  badgeBase: "inline-flex items-center justify-center rounded-full font-black uppercase tracking-widest text-[10px]",
};
