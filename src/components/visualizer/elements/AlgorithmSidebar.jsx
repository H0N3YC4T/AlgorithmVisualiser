import PropTypes from 'prop-types';
import { memo } from 'react';
import { Hash, Table as TableIcon } from 'lucide-react';
import ShiftTable from './ShiftTable';
import { classCategory } from '../../../styles/class-category';

const AlgorithmSidebar = memo(({ algorithm, state, preprocessing, target, pattern, isArrayBased }) => {
  const config = algorithm.sidebarConfig;

  return (
    <div className="lg:col-span-1 space-y-6">
      {config?.type === 'shiftTable' && preprocessing?.[config.dataKey] && (
        <ShiftTable 
          shiftTable={preprocessing[config.dataKey]}
          lookAheadChar={target[state.currentIndex + pattern.length - (config.dataKey === 'badCharTable' ? 1 : 0)]}
          patternLength={pattern.length}
          pattern={pattern}
          title={config.title}
          logic={config.logic}
          defaultText={config.defaultText}
        />
      )}

      {/* Failure Function */}
      {config?.type === 'failureFunction' && preprocessing?.[config.dataKey] && (
        <div className={classCategory.sidebarSection}>
          <div className="flex justify-between items-center mb-6">
            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              {config.title}
            </div>
            {pattern && (
              <div className="flex gap-1 items-center">
                <span className="text-[9px] font-black text-slate-500 uppercase mr-2">Pattern:</span>
                {pattern.split('').map((char, i) => (
                  <div key={`char-box-${i}-${char}`} className="w-5 h-5 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[10px] font-mono font-bold text-slate-300">
                    {char}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-1 flex gap-2 flex-wrap">
              {preprocessing[config.dataKey].map((val, i) => ({ val, i, id: `pi-${i}` })).map((item) => (
                <div key={item.id} className="w-10 h-14 bg-slate-800 border border-slate-700 rounded-xl flex flex-col items-center justify-center transition-all hover:bg-slate-700/50">
                  <span className="text-[8px] font-black text-slate-500 mb-1">p[{item.i}]</span>
                  <span className="text-white font-mono font-bold">{pattern[item.i]}</span>
                  <span className="text-indigo-400 font-mono font-bold text-xs">{item.val}</span>
                </div>
              ))}
            </div>

            <div className="md:w-48 flex-shrink-0 flex flex-col justify-center pl-6 border-l border-slate-800/60 hidden md:flex">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-50">Shift Logic</div>
              <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
                {config.logic.split('\n').map((line, idx) => (
                  <span key={`${config.title}-line-${idx}`}>{line}<br/></span>
                ))}
                {config.logicNote && (
                  <span className="text-slate-600 mt-1 block italic text-[8px]">{config.logicNote}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rolling Hash */}
      {config?.type === 'rollingHash' && state.patternHash !== undefined && (
        <div className={classCategory.sidebarSection}>
          <div className="flex justify-between items-center mb-6">
            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <Hash className="w-3.5 h-3.5" /> {config.title}
            </div>
            {pattern && (
              <div className="flex gap-1 items-center">
                <span className="text-[9px] font-black text-slate-500 uppercase mr-2">Pattern:</span>
                {pattern.split('').map((char, i) => (
                  <div key={`char-box-${i}-${char}`} className="w-5 h-5 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[10px] font-mono font-bold text-slate-300">
                    {char}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-1 space-y-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-500 uppercase">Pattern Hash</span>
                <span className="text-emerald-400 font-mono font-bold">{state.patternHash}</span>
              </div>
              <div className={`p-3 bg-slate-900 rounded-xl border flex justify-between items-center transition-all ${state.targetHash === state.patternHash ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-800'}`}>
                <span className="text-[10px] font-black text-slate-500 uppercase">Window Hash</span>
                <span className={`font-mono font-bold ${state.targetHash === state.patternHash ? 'text-emerald-400' : 'text-rose-400'}`}>{state.targetHash}</span>
              </div>
            </div>

            <div className="md:w-48 flex-shrink-0 flex flex-col justify-center pl-6 border-l border-slate-800/60 hidden md:flex">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-50">Hash Logic</div>
              <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
                {config.logic.split('\n').map((line, idx) => (
                  <span key={`${config.title}-hash-line-${idx}`}>{line}<br/></span>
                ))}
                {config.logicNote && (
                  <span className="text-slate-600 mt-1 block italic text-[8px]">{config.logicNote}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Auxiliary Data */}
      {isArrayBased && (
        <div className="space-y-6">
          {/* Counting Sort: Count and Output side-by-side */}
          {config?.type === 'countingArrays' && (state.countArray || state.output) && (
            <div className={classCategory.sidebarSection}>
              <div className="flex flex-col md:flex-row gap-8">
                {state.countArray && (
                  <div className="flex-1 space-y-4">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                      <TableIcon className="w-3.5 h-3.5" /> Count Array
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {state.countArray.map((c, i) => ({ c, i, id: `count-${i}` })).map((item) => (
                        <div key={item.id} className={`w-8 h-10 bg-slate-900 border ${state.phase === 2 && state.i === item.i ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-slate-800'} rounded-xl flex flex-col items-center justify-center transition-all`}>
                          <span className="text-[7px] text-slate-600 font-bold uppercase">{item.i}</span>
                          <span className="text-[10px] text-white font-mono font-black">{item.c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {state.output && (
                  <div className="flex-1 space-y-4 border-t xl:border-t-0 xl:border-l border-slate-800/60 pt-4 xl:pt-0 xl:pl-8">
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                      <TableIcon className="w-3.5 h-3.5" /> Output Array
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {state.output.map((val, i) => ({ val, i, id: `output-${i}` })).map((item) => (
                        <div key={item.id} className={`w-8 h-10 bg-slate-900 border ${state.swapIndices?.includes(item.i) ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-800'} rounded-xl flex flex-col items-center justify-center transition-all`}>
                          <span className="text-[7px] text-slate-600 font-bold uppercase">{item.i}</span>
                          <span className="text-[10px] text-white font-mono font-black">{item.val ?? '-'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bucket / Radix Sort: Buckets */}
          {config?.type === 'buckets' && state.buckets && (
            <div className={classCategory.sidebarSection}>
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <TableIcon className="w-3.5 h-3.5" /> Distribution Buckets
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {state.buckets.map((bucket, bIdx) => ({ bucket, bIdx, id: `bucket-slot-${bIdx}` })).map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <div className="text-[8px] font-black text-slate-500 text-center uppercase tracking-tighter">B{item.bIdx}</div>
                    <div className="flex-1 bg-slate-900 border border-slate-800/60 rounded-lg p-1.5 min-h-[50px] flex flex-col-reverse gap-1 items-center shadow-inner">
                      {item.bucket.map((val, vIdx) => ({ val, vIdx, subId: `val-${vIdx}-${val}` })).map((subItem) => (
                        <div key={subItem.subId} className="w-full h-2 bg-indigo-500/50 rounded-sm shadow-[0_0_5px_rgba(99,102,241,0.3)]" title={subItem.val} />
                      ))}
                    </div>
                    <div className="text-[9px] font-mono text-center text-slate-400 font-bold">{item.bucket.length}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

AlgorithmSidebar.propTypes = {
  algorithm: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  preprocessing: PropTypes.object.isRequired,
  target: PropTypes.string,
  pattern: PropTypes.string,
  isArrayBased: PropTypes.bool.isRequired
};

export default AlgorithmSidebar;
