/**
 * Design System Theme Tokens
 * Centralized source of truth for colors, typography, and effects.
 */

export const theme = {
  colors: {
    background: "slate-950",
    surface: "slate-900/40",
    surfaceHover: "slate-900/60",
    border: "slate-800/60",
    borderStrong: "slate-700/80",
    
    // Accents
    primary: "indigo-500",
    primaryMuted: "indigo-500/20",
    secondary: "sky-500",
    
    // Semantics
    success: "emerald-400",
    danger: "rose-500",
    warning: "amber-400",
    info: "sky-400",
    
    // Text
    textHigh: "white",
    textBody: "slate-100",
    textMuted: "slate-500",
    textDisabled: "slate-700",
  },
  
  typography: {
    fontHeading: "font-sans",
    fontBody: "font-sans",
    fontMono: "font-mono",
    
    sizes: {
      xs: "text-[10px]",
      sm: "text-xs",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },

    semantics: {
      home: {
        title: "text-6xl",
        subtitle: "text-xl",
        section: "text-3xl",
      },
      card: {
        title: "text-2xl",
        body: "text-[14px]",
      },
      viz: {
        heading: "text-lg",
        label: "text-[10px]",
      }
    },
    
    tracking: {
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
      tracked: "tracking-[0.35em]",
    },
  },
  
  effects: {
    glass: "backdrop-blur-xl",
    glassMuted: "backdrop-blur-md",
    shadow: "shadow-2xl",
    transition: "transition-all duration-300",
    roundness: {
      sm: "rounded-lg",
      base: "rounded-2xl",
      lg: "rounded-3xl",
      xl: "rounded-[2.5rem]",
      full: "rounded-[3rem]",
    }
  }
};
