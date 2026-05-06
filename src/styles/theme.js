/**
 * Design System Theme Tokens
 * Fully restored from the 'algorithms-old' build DNA.
 */

export const theme = {
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
      xs: "text-[11px]",
      sm: "text-[13px]",
      base: "text-[15px]",
      lg: "text-[17px]",
      xl: "text-[20px]",
    },
    tracking: {
      tight: "tracking-tight",
      tighter: "tracking-tighter",
      wider: "tracking-wider",
    },
    semantics: {
      home: {
        title: "text-4xl md:text-5xl lg:text-6xl",
        subtitle: "text-sm md:text-base",
        section: "text-[13px]",
      },
      viz: {
        title: "text-xl md:text-2xl",
      }
    }
  },

  effects: {
    roundness: {
      sm: "rounded-md",
      base: "rounded-xl",
      lg: "rounded-2xl",
      xl: "rounded-3xl",
    },
    transition: "transition-all duration-300 ease-in-out",
    glass: "backdrop-blur-xl border border-slate-800/50 shadow-2xl shadow-black/50",
  }
};
