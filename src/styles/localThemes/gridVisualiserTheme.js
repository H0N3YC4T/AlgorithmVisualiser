import { classCategories } from "../divClassCustom";

export const gridVisualiserTheme = {
  container: "relative w-full h-[450px] flex flex-col justify-center items-center select-none overflow-visible transition-all duration-500",

  grid: "grid gap-1 outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl",

  overlay: `absolute inset-0 flex items-center justify-center text-slate-500 font-black ${classCategories.logicText.split(" ")[0]} uppercase tracking-widest bg-slate-950/40 rounded-2xl`,
};
