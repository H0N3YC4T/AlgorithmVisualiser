import { globalTheme } from "../globalTheme";

export const categorySectionTheme = {
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: `flex items-center gap-4 py-3 border-b border-${globalTheme.colors.borderStrong} transition-colors group-hover:border-${globalTheme.colors.border}`,
    iconBox: (active) =>
      `p-2 transition-all rounded-xl ${active ? `bg-${globalTheme.colors.primary} text-${globalTheme.colors.textHigh} shadow-[0_0_15px_rgba(99,102,241,0.3)]` : `bg-slate-900 text-${globalTheme.colors.textDisabled}`}`,
    title: (active) =>
      `${globalTheme.typography.semantics.home.section} font-black uppercase tracking-normal transition-colors ${active ? `text-${globalTheme.colors.textHigh}` : `text-${globalTheme.colors.textDisabled}`}`,
  },
};
