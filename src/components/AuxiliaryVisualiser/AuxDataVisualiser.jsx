import PropTypes from "prop-types";
import { memo } from "react";
import { Hash, Table as TableIcon } from "lucide-react";
import AuxShiftTableVisualiser from "./AuxShiftTableVisualiser";
import { classCategories } from "@/styles/divClassCustom";

const localTheme = {
  section: `${classCategories.glassPanel} ${classCategories.cardRound} p-8 shadow-2xl`,
  sectionTitle: `flex items-center gap-2 font-black text-indigo-400 uppercase tracking-widest text-[11px]`,
  label: `text-[10px] font-black text-slate-500 uppercase tracking-widest`,
  charBox: `w-8 h-8 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center font-mono font-black text-white shadow-inner`,
  dataBox: `flex flex-col items-center justify-center min-w-[3.5rem] p-3 bg-slate-950/50 border border-slate-800/60 rounded-2xl shadow-inner`,
  dataCard: `flex items-center justify-between p-5 bg-slate-950/50 border border-slate-800 rounded-2xl shadow-inner`,
  dataLabel: `text-[11px] font-black text-slate-500 uppercase tracking-widest`,
  dataValue: `font-mono text-2xl font-black`,
  logicTitle: `font-black text-slate-300 uppercase tracking-widest text-[11px] mb-3`,
  logicText: `text-[11px] font-medium leading-relaxed text-slate-500`,
  logicNote: `block mt-3 pt-3 border-t border-slate-800/60 text-slate-600 italic`,
  arrayItem: (active, color) =>
    `flex flex-col items-center justify-center p-3 min-w-[3rem] bg-slate-950/50 border transition-all duration-300 rounded-xl shadow-inner ${active ? `border-${color}-500/50 bg-${color}-500/10 scale-105 shadow-[0_0_15px_rgba(99,102,241,0.2)]` : "border-slate-800/60"}`,
  bucketContainer:
    "flex flex-col-reverse gap-1.5 p-2 min-h-[100px] bg-slate-950/50 border border-slate-800/60 rounded-2xl shadow-inner",
};

const AuxDataVisualiser = memo(({ algorithm, state, preprocessing, target, pattern, isArrayBased }) => {
  const config = algorithm.auxDataConfig;

  return (
    <div className="h-full space-y-8">
      {config?.type === "map" && preprocessing?.[config.dataKey] && (
        <AuxShiftTableVisualiser
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
        <div className={localTheme.section}>
          <div className="flex justify-between items-center mb-8">
            <div className={localTheme.sectionTitle}>{config.title}</div>
            {pattern && (
              <div className="flex gap-2 items-center">
                <span className={localTheme.label}>Pattern:</span>
                {pattern.split("").map((char, i) => (
                  <div key={`char-box-${i}-${char}`} className={localTheme.charBox}>
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
                  <div key={item.id} className={localTheme.dataBox}>
                    <span className={`${localTheme.logicText} font-black text-slate-500 mb-1.5 uppercase`}>
                      p[{item.i}]
                    </span>
                    <span
                      className={`text-white font-mono font-black ${classCategories.cardDescription.split(" ")[0]}`}
                    >
                      {pattern[item.i]}
                    </span>
                    <span
                      className={`text-indigo-400 font-mono font-black ${classCategories.cardDescription.split(" ")[0]}`}
                    >
                      {item.val}
                    </span>
                  </div>
                ))}
            </div>

            <div className="md:w-56 flex-shrink-0 flex flex-col justify-center pl-8 border-l border-slate-800/60 hidden md:flex">
              <div className={localTheme.logicTitle}>Shift Logic</div>
              <p className={localTheme.logicText}>
                {config.logic.split("\n").map((line, idx) => (
                  <span key={`${config.title}-line-${idx}`}>
                    {line}
                    <br />
                  </span>
                ))}
                {config.logicNote && <span className={localTheme.logicNote}>{config.logicNote}</span>}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rolling Hash */}
      {config?.type === "rollingHash" && state.patternHash !== undefined && (
        <div className={localTheme.section}>
          <div className="flex justify-between items-center mb-8">
            <div className={localTheme.sectionTitle}>
              <Hash className="w-4 h-4" /> {config.title}
            </div>
            {pattern && (
              <div className="flex gap-2 items-center">
                <span className={localTheme.label}>Pattern:</span>
                {pattern.split("").map((char, i) => (
                  <div
                    key={`char-box-${i}-${char}`}
                    className={`w-6 h-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center ${localTheme.logicText} font-mono font-bold text-slate-300`}
                  >
                    {char}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="flex-1 space-y-5">
              <div className={localTheme.dataCard}>
                <span className={localTheme.dataLabel}>Pattern Hash</span>
                <span className={`text-emerald-400 ${localTheme.dataValue}`}>{state.patternHash}</span>
              </div>
              <div
                className={`${localTheme.dataCard} transition-all ${state.targetHash === state.patternHash ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "border-slate-800"}`}
              >
                <span className={localTheme.dataLabel}>Window Hash</span>
                <span
                  className={`${localTheme.dataValue} ${state.targetHash === state.patternHash ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {state.targetHash}
                </span>
              </div>
            </div>

            <div className="md:w-56 flex-shrink-0 flex flex-col justify-center pl-8 border-l border-slate-800/60 hidden md:flex">
              <div className={localTheme.logicTitle}>Hash Logic</div>
              <p className={localTheme.logicText}>
                {config.logic.split("\n").map((line, idx) => (
                  <span key={`${config.title}-hash-line-${idx}`}>
                    {line}
                    <br />
                  </span>
                ))}
                {config.logicNote && <span className={localTheme.logicNote}>{config.logicNote}</span>}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* List Type (e.g. l-gram dictionary) */}
      {config?.type === "list" && preprocessing?.AuxData && (
        <div className={localTheme.section}>
          <div className="flex justify-between items-center mb-6">
            <div className={localTheme.sectionTitle}>{config.header}</div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {preprocessing.AuxData.map((item, idx) => (
              <div key={`list-item-${idx}`} className={localTheme.dataBox}>
                <span className="text-white font-mono font-black">{item}</span>
              </div>
            ))}
          </div>
          {config.description && <p className={localTheme.logicNote}>{config.description}</p>}
        </div>
      )}

      {/* Auxiliary Data */}
      {isArrayBased && (
        <div className="space-y-8">
          {/* Counting Sort: Count and Output side-by-side */}
          {config?.type === "countingArrays" && (state.countArray || state.output) && (
            <div className={localTheme.section}>
              <div className="flex flex-col md:flex-row gap-10">
                {state.countArray && (
                  <div className="flex-1 space-y-5">
                    <div className={localTheme.sectionTitle}>
                      <TableIcon className="w-4 h-4" /> Count Array
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {state.countArray
                        .map((c, i) => ({ c, i, id: `count-${i}` }))
                        .map((item) => (
                          <div
                            key={item.id}
                            className={localTheme.arrayItem(state.phase === 2 && state.i === item.i, "indigo")}
                          >
                            <span className={`${localTheme.logicText} text-slate-600 font-bold uppercase`}>
                              {item.i}
                            </span>
                            <span
                              className={`${classCategories.cardDescription.split(" ")[0]} text-white font-mono font-black`}
                            >
                              {item.c}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {state.output && (
                  <div className="flex-1 space-y-5 border-t xl:border-t-0 xl:border-l border-slate-800/60 pt-6 xl:pt-0 xl:pl-10">
                    <div className={localTheme.sectionTitle.replace("indigo", "emerald")}>
                      <TableIcon className="w-4 h-4" /> Output Array
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {state.output
                        .map((val, i) => ({ val, i, id: `output-${i}` }))
                        .map((item) => (
                          <div
                            key={item.id}
                            className={localTheme.arrayItem(state.swapIndices?.includes(item.i), "emerald")}
                          >
                            <span className={`${localTheme.logicText} text-slate-600 font-bold uppercase`}>
                              {item.i}
                            </span>
                            <span
                              className={`${classCategories.cardDescription.split(" ")[0]} text-white font-mono font-black`}
                            >
                              {item.val ?? "-"}
                            </span>
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
            <div className={localTheme.section}>
              <div className={localTheme.sectionTitle}>
                <TableIcon className="w-4 h-4" /> Distribution Buckets
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
                {state.buckets
                  .map((bucket, bIdx) => ({ bucket, bIdx, id: `bucket-slot-${bIdx}` }))
                  .map((item) => (
                    <div key={item.id} className="flex flex-col gap-3">
                      <div
                        className={`${localTheme.logicText} font-black text-slate-500 text-center uppercase tracking-widest`}
                      >
                        B{item.bIdx}
                      </div>
                      <div className={localTheme.bucketContainer}>
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
                      <div className={`${localTheme.logicText} font-mono text-center text-slate-400 font-black`}>
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

AuxDataVisualiser.propTypes = {
  algorithm: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  preprocessing: PropTypes.object.isRequired,
  target: PropTypes.string,
  pattern: PropTypes.string,
  isArrayBased: PropTypes.bool.isRequired,
};

export default AuxDataVisualiser;
