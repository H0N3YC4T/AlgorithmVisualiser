import PropTypes from "prop-types";
import { Table as TableIcon } from "lucide-react";
import { classCategories } from "@/styles/divClassCustom";
import { globalTheme } from "@/styles/globalTheme";

export default function AuxShiftTableVisualiser({
  shiftTable,
  lookAheadChar,
  patternLength,
  pattern,
  title = "Shift Table",
  logic,
  defaultText,
}) {
  const localTheme = {
    section: `p-8 ${classCategories.cardRound} border border-${globalTheme.colors.borderStrong}/50 bg-slate-900/20 backdrop-blur-sm`,
    title: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.primaryLight} uppercase tracking-widest flex items-center gap-2`,
    label: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.textDisabled} uppercase mr-2`,
    charBox: `w-8 h-8 bg-slate-950 border border-${globalTheme.colors.borderStrong} rounded-2xl flex items-center justify-center ${globalTheme.typography.sizes.subtext} font-mono font-black text-${globalTheme.colors.primaryLight} shadow-inner`,
    dataBox: `flex flex-col items-center justify-center p-3 bg-slate-950 border border-${globalTheme.colors.borderStrong} rounded-2xl min-w-[3.5rem] shadow-lg hover:border-${globalTheme.colors.primary}/50 transition-colors`,
    logicTitle: `${globalTheme.typography.sizes.subtext} font-black text-${globalTheme.colors.textDisabled} uppercase tracking-widest mb-2 opacity-50`,
    logicText: `${globalTheme.typography.sizes.subtext} text-${globalTheme.colors.textDisabled} font-bold uppercase leading-relaxed tracking-wider`,
    logicNote: `text-slate-600 mt-1 block italic ${globalTheme.typography.sizes.subtext}`,
  };

  return (
    <div className={localTheme.section}>
      <div className="flex justify-between items-center mb-6">
        <div className={localTheme.title}>
          <TableIcon className="w-3.5 h-3.5" /> {title}
        </div>
        {pattern && (
          <div className="flex gap-1 items-center">
            <span className={localTheme.label}>Pattern:</span>
            {pattern.split("").map((char, i) => (
              <div key={i} className={localTheme.charBox}>
                {char}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className="flex flex-wrap gap-3 flex-1">
          {Object.entries(shiftTable).map(([char, shift]) => {
            const isHighlighted = lookAheadChar === char;
            return (
              <div
                key={char}
                className={`${localTheme.dataBox} border ${isHighlighted ? "border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700" : "border-slate-700 opacity-60"}`}
              >
                <span className={`font-black text-white text-[13px]`}>{char}</span>
                <span className={`text-indigo-400 font-mono font-black ${localTheme.logicText}`}>{shift}</span>
              </div>
            );
          })}
          <div
            className={`${localTheme.dataBox} border ${lookAheadChar && !shiftTable[lookAheadChar] ? "border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700" : "border-slate-700 opacity-30"}`}
          >
            <span className={`font-black text-slate-500 ${localTheme.logicText}`}>?</span>
            <span className={`text-slate-500 font-mono font-black ${localTheme.logicText}`}>{patternLength + 1}</span>
          </div>
        </div>

        <div className="md:w-40 flex-shrink-0 flex flex-col justify-center pl-6 border-l border-slate-800/60 hidden md:flex">
          <div className={localTheme.logicTitle}>Shift Logic</div>
          <p className={localTheme.logicText}>
            {logic || "Shift = m - last_index"}
            <br />
            <span className={localTheme.logicNote}>Default: {defaultText || "m + 1"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

AuxShiftTableVisualiser.propTypes = {
  shiftTable: PropTypes.object.isRequired,
  lookAheadChar: PropTypes.string,
  patternLength: PropTypes.number.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string,
  logic: PropTypes.string,
  defaultText: PropTypes.string,
};
