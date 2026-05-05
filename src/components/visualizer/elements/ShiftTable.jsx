import PropTypes from 'prop-types';
import { Table as TableIcon } from 'lucide-react';

export default function ShiftTable({ shiftTable, lookAheadChar, patternLength, pattern, title = "Shift Table", logic, defaultText }) {
  return (
    <div className="bg-slate-800/20 border border-slate-800/40 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
          <TableIcon className="w-3.5 h-3.5" /> {title}
        </div>
        {pattern && (
          <div className="flex gap-1 items-center">
            <span className="text-[9px] font-black text-slate-500 uppercase mr-2">Pattern:</span>
            {pattern.split('').map((char, i) => (
              <div key={i} className="w-5 h-5 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[10px] font-mono font-bold text-slate-300">
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
                className={`w-11 h-14 bg-slate-800 border rounded-xl flex flex-col items-center justify-center transition-all ${isHighlighted ? 'border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700' : 'border-slate-700 opacity-60'}`}
              >
                <span className="font-black text-white text-sm">{char}</span>
                <span className="text-indigo-400 font-mono font-black text-[11px]">{shift}</span>
              </div>
            );
          })}
          <div className={`w-11 h-14 bg-slate-800 border rounded-xl flex flex-col items-center justify-center transition-all ${(lookAheadChar && !shiftTable[lookAheadChar]) ? 'border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700' : 'border-slate-700 opacity-30'}`}>
            <span className="font-black text-slate-500 text-[11px]">?</span>
            <span className="text-slate-500 font-mono font-black text-[11px]">{patternLength + 1}</span>
          </div>
        </div>

        <div className="md:w-40 flex-shrink-0 flex flex-col justify-center pl-6 border-l border-slate-800/60 hidden md:flex">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-50">Shift Logic</div>
          <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
            {logic || "Shift = m - last_index"}
            <br/>
            <span className="text-slate-600 mt-1 block italic text-[8px]">Default: {defaultText || "m + 1"}</span>
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
