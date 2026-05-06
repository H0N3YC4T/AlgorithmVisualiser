/**
 * Design System globalTheme Tokens
 * Fully restored from the 'algorithms-old' build DNA.
 */

export const globalTheme = {
  colors: {
    background: "slate-950",
    surface: "slate-900/60",
    surfaceHover: "slate-900/80",
    border: "slate-800/50",
    borderStrong: "slate-700/50",

    primary: "indigo-500",
    primaryLight: "indigo-400",
    primaryDark: "indigo-600",

    textHigh: "slate-100",
    textMuted: "slate-400",
    textDisabled: "slate-600",

    accent: "indigo-500",
    accentGlass: "indigo-500/10",
  },

  typography: {
    fonts: {
      heading: "'Outfit', system-ui, sans-serif",
      body: "'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    sizes: {
      subtext: "text-[12px]",
      baseSmall: "text-[13px]",
      baseLarge: "text-[16px]",
      header: "text-[18px]",
      title: "text-[20px]",
    },
    tracking: {
      tight: "tracking-tight",
      tighter: "tracking-tighter",
      wider: "tracking-widest",
    },
    semantics: {
      home: {
        title: "text-[3rem] md:text-[3.75rem] lg:text-[4.5rem]",
        subtitle: "text-[1rem] md:text-[1.5rem]", // baseSmall md:baseLarge
        section: "text-[1rem] md:text-[1.2rem]", // baseSmall
      },
      viz: {
        title: "text-[20px]", // title
      },
    },
  },

  effects: {
    transition: "transition-all duration-300 ease-in-out",
    glass: "backdrop-blur-xl border border-slate-800/50 shadow-2xl shadow-black/50",
  },
};
