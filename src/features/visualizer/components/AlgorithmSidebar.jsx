import PropTypes from "prop-types";
import { memo } from "react";
import { Hash, Table as TableIcon } from "lucide-react";
import ShiftTable from "./ShiftTable";
import { classCategories } from "@/styles/divClassCustom";


const AlgorithmSidebar = memo(({ algorithm, state, preprocessing, target, pattern, isArrayBased }) => {
  const config = algorithm.sidebarConfig;

  return (
    <div className="lg:col-span-1 space-y-8">
      {config?.type === "shiftTable" && preprocessing?.[config.dataKey] && (
        <ShiftTable
          shiftTable={preprocessing[config.dataKey]}
          lookAheadChar={target[state.currentIndex + pattern.length - (config.dataKey === "badCharTable" ? 1 : 0)]}
          patternLength={pattern.length}
          pattern={pattern}
          title={config.title}
          logic={config.logic}
          defaultText={config.defaultText}
        />
      )}

      {/* Failure Function */}
      {config?.type === "failureFunction" && preprocessing?.[config.dataKey] && (
        <div className={classCategories.sidebarSection}>
          <div className="flex justify-between items-center mb-8">
            <div className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.25em] flex items-center gap-3">
              {config.title}
            </div>
            {pattern && (
              <div className="flex gap-2 items-center">
                <span className="text-[10px] font-black text-slate-500 uppercase mr-2 tracking-widest">Pattern:</span>
                {pattern.split("").map((char, i) => (
                  <div key={`char-box-${i}-${char}`} className={classCategories.charBox}>
                    {char}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="flex-1 flex gap-2.5 flex-wrap">
              {preprocessing[config.dataKey]
                .map((val, i) => ({ val, i, id: `pi-${i}` }))
                .map((item) => (
                  <div key={item.id} className={classCategories.dataBox}>
                    <span className="text-[9px] font-black text-slate-500 mb-1.5 uppercase">p[{item.i}]</span>
                    <span className="text-white font-mono font-black text-sm">{pattern[item.i]}</span>
                    <span className="text-indigo-400 font-mono font-black text-[13px]">{item.val}</span>
                  </div>
                ))}
            </div>

            <div className="md:w-56 flex-shrink-0 flex flex-col justify-center pl-8 border-l border-slate-800/60 hidden md:flex">
              <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 opacity-50">
                Shift Logic
              </div>
              <p className="text-[11px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
                {config.logic.split("\n").map((line, idx) => (
                  <span key={`${config.title}-line-${idx}`}>
                    {line}
                    <br />
                  </span>
                ))}
                {config.logicNote && (
                  <span className="text-slate-600 mt-2 block italic text-[9px] normal-case">{config.logicNote}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rolling Hash */}
      {config?.type === "rollingHash" && state.patternHash !== undefined && (
        <div className={classCategories.sidebarSection}>
          <div className="flex justify-between items-center mb-8">
            <div className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.25em] flex items-center gap-3">
              <Hash className="w-4 h-4" /> {config.title}
            </div>
            {pattern && (
              <div className="flex gap-2 items-center">
                <span className="text-[10px] font-black text-slate-500 uppercase mr-2 tracking-widest">Pattern:</span>
                {pattern.split("").map((char, i) => (
                  <div
                    key={`char-box-${i}-${char}`}
                    className="w-6 h-6 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold text-slate-300"
                  >
                    {char}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="flex-1 space-y-5">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center shadow-lg">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Pattern Hash</span>
                <span className="text-emerald-400 font-mono font-black text-[13px]">{state.patternHash}</span>
              </div>
              <div
                className={`p-4 bg-slate-900 rounded-2xl border flex justify-between items-center transition-all shadow-lg ${state.targetHash === state.patternHash ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "border-slate-800"}`}
              >
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Window Hash</span>
                <span
                  className={`font-mono font-black text-[13px] ${state.targetHash === state.patternHash ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {state.targetHash}
                </span>
              </div>
            </div>

            <div className="md:w-56 flex-shrink-0 flex flex-col justify-center pl-8 border-l border-slate-800/60 hidden md:flex">
              <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 opacity-50">
                Hash Logic
              </div>
              <p className="text-[11px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
                {config.logic.split("\n").map((line, idx) => (
                  <span key={`${config.title}-hash-line-${idx}`}>
                    {line}
                    <br />
                  </span>
                ))}
                {config.logicNote && (
                  <span className="text-slate-600 mt-2 block italic text-[9px] normal-case">{config.logicNote}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Auxiliary Data */}
      {isArrayBased && (
        <div className="space-y-8">
          {/* Counting Sort: Count and Output side-by-side */}
          {config?.type === "countingArrays" && (state.countArray || state.output) && (
            <div className={classCategories.sidebarSection}>
              <div className="flex flex-col md:flex-row gap-10">
                {state.countArray && (
                  <div className="flex-1 space-y-5">
                    <div className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.25em] flex items-center gap-3">
                      <TableIcon className="w-4 h-4" /> Count Array
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {state.countArray
                        .map((c, i) => ({ c, i, id: `count-${i}` }))
                        .map((item) => (
                          <div
                            key={item.id}
                            className={`w-10 h-12 bg-slate-900 border ${state.phase === 2 && state.i === item.i ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]" : "border-slate-800"} rounded-xl flex flex-col items-center justify-center transition-all shadow-md`}
                          >
                            <span className="text-[9px] text-slate-600 font-bold uppercase">{item.i}</span>
                            <span className="text-[12px] text-white font-mono font-black">{item.c}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {state.output && (
                  <div className="flex-1 space-y-5 border-t xl:border-t-0 xl:border-l border-slate-800/60 pt-6 xl:pt-0 xl:pl-10">
                    <div className="text-[12px] font-black text-emerald-400 uppercase tracking-[0.25em] flex items-center gap-3">
                      <TableIcon className="w-4 h-4" /> Output Array
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {state.output
                        .map((val, i) => ({ val, i, id: `output-${i}` }))
                        .map((item) => (
                          <div
                            key={item.id}
                            className={`w-10 h-12 bg-slate-900 border ${state.swapIndices?.includes(item.i) ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "border-slate-800"} rounded-xl flex flex-col items-center justify-center transition-all shadow-md`}
                          >
                            <span className="text-[9px] text-slate-600 font-bold uppercase">{item.i}</span>
                            <span className="text-[12px] text-white font-mono font-black">{item.val ?? "-"}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bucket / Radix Sort: Buckets */}
          {config?.type === "buckets" && state.buckets && (
            <div className={classCategories.sidebarSection}>
              <div className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.25em] mb-8 flex items-center gap-3">
                <TableIcon className="w-4 h-4" /> Distribution Buckets
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
                {state.buckets
                  .map((bucket, bIdx) => ({ bucket, bIdx, id: `bucket-slot-${bIdx}` }))
                  .map((item) => (
                    <div key={item.id} className="flex flex-col gap-3">
                      <div className="text-[10px] font-black text-slate-500 text-center uppercase tracking-widest">
                        B{item.bIdx}
                      </div>
                      <div className="flex-1 bg-slate-900 border border-slate-800/60 rounded-xl p-2 min-h-[60px] flex flex-col-reverse gap-1.5 items-center shadow-inner">
                        {item.bucket
                          .map((val, vIdx) => ({ val, vIdx, subId: `val-${vIdx}-${val}` }))
                          .map((subItem) => (
                            <div
                              key={subItem.subId}
                              className="w-full h-2.5 bg-indigo-500/50 rounded-sm shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                              title={subItem.val}
                            />
                          ))}
                      </div>
                      <div className="text-[11px] font-mono text-center text-slate-400 font-black">
                        {item.bucket.length}
                      </div>
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
  isArrayBased: PropTypes.bool.isRequired,
};

export default AlgorithmSidebar;
