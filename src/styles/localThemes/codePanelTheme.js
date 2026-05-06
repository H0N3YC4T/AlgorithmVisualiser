import { globalTheme } from "../globalTheme";
import { algorithmPageTheme as apt } from "./algorithmPageTheme";

export const codePanelTheme = {
  tabBtn: (isActive) =>
    `px-3 py-1.5 rounded-xl ${apt.button} transition-all ${
      isActive
        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
    }`,
  copyBtn: "p-2 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-white transition-colors",
  codeTitle: apt.codeTitle,
  visualiserTitle: apt.visualiserTitle,
  syntaxStyle: {
    margin: 0,
    padding: "1.25rem",
    background: "transparent",
    fontSize: apt.code.split(" ")[0].includes("text-[") ? apt.code.split(" ")[0].replace("text-[", "").replace("]", "") : "14px",
    lineHeight: "1.6",
  },
};
