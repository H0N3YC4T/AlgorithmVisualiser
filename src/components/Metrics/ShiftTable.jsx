import PropTypes from 'prop-types';
import { Table as TableIcon } from 'lucide-react';
import { classCategories } from '@/styles/divClassCustom';


export default function ShiftTable({ shiftTable, lookAheadChar, patternLength, pattern, title = "Shift Table", logic, defaultText }) {
  return (
    <div className={classCategories.sidebarSection}>
      <div className="flex justify-between items-center mb-6">
        <div className={`${classCategories.logicText.split(" ")[0]} font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2`}>
          <TableIcon className="w-3.5 h-3.5" /> {title}
        </div>
        {pattern && (
          <div className="flex gap-1 items-center">
            <span className={`${classCategories.logicText.split(" ")[0]} font-black text-slate-500 uppercase mr-2`}>Pattern:</span>
            {pattern.split('').map((char, i) => (
              <div key={i} className={classCategories.charBox}>
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
                className={`${classCategories.dataBox} border ${isHighlighted ? 'border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700' : 'border-slate-700 opacity-60'}`}
              >
                <span className={`font-black text-white ${classCategories.cardDescription.split(" ")[0]}`}>{char}</span>
                <span className={`text-indigo-400 font-mono font-black ${classCategories.logicText.split(" ")[0]}`}>{shift}</span>
              </div>
            );
          })}
          <div className={`${classCategories.dataBox} border ${(lookAheadChar && !shiftTable[lookAheadChar]) ? 'border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700' : 'border-slate-700 opacity-30'}`}>
            <span className={`font-black text-slate-500 ${classCategories.logicText.split(" ")[0]}`}>?</span>
            <span className={`text-slate-500 font-mono font-black ${classCategories.logicText.split(" ")[0]}`}>{patternLength + 1}</span>
          </div>
        </div>

        <div className="md:w-40 flex-shrink-0 flex flex-col justify-center pl-6 border-l border-slate-800/60 hidden md:flex">
          <div className={`${classCategories.logicText.split(" ")[0]} font-black text-slate-500 uppercase tracking-widest mb-2 opacity-50`}>Shift Logic</div>
          <p className={classCategories.logicText}>
            {logic || "Shift = m - last_index"}
            <br/>
            <span className={`text-slate-600 mt-1 block italic ${classCategories.logicText.split(" ")[0]}`}>Default: {defaultText || "m + 1"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

ShiftTable.propTypes = {
  shiftTable: PropTypes.object.isRequired,
  lookAheadChar: PropTypes.string,
  patternLength: PropTypes.number.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string,
  logic: PropTypes.string,
  defaultText: PropTypes.string,
};
