import { classCategories } from "../divClassCustom";

import { algorithmPageTheme as apt } from "./algorithmPageTheme";

export const processLogTheme = {
  container: (style) =>
    `p-8 ${classCategories.cardRound} border transition-all duration-500 ${style.bg} ${style.border} shadow-2xl min-h-[300px] h-full flex flex-col backdrop-blur-sm shadow-inner`,
  title: apt.consoleTitle,
  content: `${apt.console} whitespace-pre-line text-slate-100 font-bold flex-1`,
};
