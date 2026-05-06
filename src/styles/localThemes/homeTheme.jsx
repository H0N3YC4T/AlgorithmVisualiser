import { globalTheme } from "../globalTheme";
import { classCategories } from "../divClassCustom";
import React from "react";

export const homeTheme = {
  container: `bg-transparent text-${globalTheme.colors.textHigh} font-sans relative`,
  wrapper: "min-h-screen max-w-[1200px] mx-auto z-10 grow",
  header: "text-center space-y-4 pt-4",
  homeTitle: `${globalTheme.typography.semantics.home.title} font-black text-${globalTheme.colors.textHigh} tracking-tight mb-2`,
  conceptCard: `p-5 bg-slate-900/40 border border-slate-800/60 ${classCategories.cardRound} space-y-4 hover:border-slate-700 transition-colors shadow-xl`,
  iconBox: "p-2 rounded-xl bg-slate-950 border border-slate-800",
  notationCard: `p-4 ${classCategories.cardRound} border border-slate-800/60 space-y-3 flex flex-col justify-between`,
  complexityCard: `p-4 ${classCategories.cardRound} border border-slate-800/60 bg-indigo-500/5 space-y-3 group hover:border-slate-700 transition-colors shadow-xl`,
  footer: `text-center border-t border-${globalTheme.colors.borderStrong}`,
  copyright: `pt-2 pb-2 font-black ${globalTheme.typography.sizes.baseSmall} text-${globalTheme.colors.textDisabled} uppercase ${globalTheme.typography.tracking.wider}`,
  homeSubtitle: `${globalTheme.typography.semantics.home.subtitle} font-medium text-${globalTheme.colors.textMuted} max-w-2xl mx-auto mb-4`,
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: `flex items-center gap-4 py-3 border-b border-${globalTheme.colors.borderStrong} transition-colors group-hover:border-${globalTheme.colors.border}`,
    iconBox: (active) =>
      `p-2 transition-all rounded-xl ${active ? `bg-${globalTheme.colors.primary} text-${globalTheme.colors.textHigh} shadow-[0_0_15px_rgba(99,102,241,0.3)]` : `bg-slate-900 text-${globalTheme.colors.textDisabled}`}`,
    title: (active) =>
      `${globalTheme.typography.semantics.home.section} font-black uppercase tracking-normal transition-colors ${active ? `text-${globalTheme.colors.textHigh}` : `text-${globalTheme.colors.textDisabled}`}`,
  },
};
