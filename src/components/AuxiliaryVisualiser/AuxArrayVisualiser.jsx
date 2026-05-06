import PropTypes from "prop-types";
import { Layers } from "lucide-react";
import { IntArrayVisualiser } from "@/components/IntArrayVisualiser";
import { classCategories } from "@/styles/divClassCustom";
import { algorithmPageTheme as apt } from "@/styles/localThemes/algorithmPageTheme";

export default function AuxArrayVisualiser({ state }) {
  if (!state.countArray && !state.temp && !state.output && !state.buckets) return null;

  return (
    <div
      className={`p-8 bg-slate-900/40 border border-slate-800/60 ${classCategories.cardRound} backdrop-blur-md space-y-8 shadow-2xl`}
    >
      <div className="flex items-center gap-3 pb-2 border-b border-slate-800/60">
        <Layers className="w-4 h-4 text-indigo-400" />
        <h3 className={`${apt.consoleTitle} text-white`}>
          Auxiliary Visualization
        </h3>
      </div>
      <div className="space-y-8">
        {state.countArray && (
          <div className="space-y-4">
            <div
              className={`${classCategories.logicText.split(" ")[0]} font-black text-indigo-400/80 uppercase tracking-widest flex items-center gap-2 ml-2`}
            >
              Count Array (Occurrences)
            </div>
            <IntArrayVisualiser array={state.countArray} activeIndices={state.phase === 2 ? [state.i] : []} />
          </div>
        )}
        {state.temp && state.phase === 2 && (
          <div className="space-y-4">
            <div
              className={`${classCategories.logicText.split(" ")[0]} font-black text-indigo-400/80 uppercase tracking-widest flex items-center gap-2 ml-2`}
            >
              Working Buffer (Temp)
            </div>
            <IntArrayVisualiser array={state.temp} activeIndices={[state.k]} />
          </div>
        )}
        {state.output && (
          <div className="space-y-4">
            <div
              className={`${classCategories.logicText.split(" ")[0]} font-black text-emerald-400/80 uppercase tracking-widest flex items-center gap-2 ml-2`}
            >
              Output Array (Building)
            </div>
            <IntArrayVisualiser array={state.output} />
          </div>
        )}
        {state.buckets && (
          <div className="space-y-4">
            <div
              className={`${classCategories.logicText.split(" ")[0]} font-black text-indigo-400/80 uppercase tracking-widest flex items-center gap-2 ml-2`}
            >
              Distribution Buckets (0-9)
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
              {state.buckets
                .map((bucket, bIdx) => ({ bucket, bIdx, id: `bucket-slot-${bIdx}` }))
                .map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <div
                      className={`${classCategories.logicText.split(" ")[0]} font-black text-slate-500 text-center uppercase tracking-tighter`}
                    >
                      B{item.bIdx}
                    </div>
                    <div className="flex-1 bg-slate-950 border border-slate-800/60 rounded-xl p-2 min-h-[60px] flex flex-col-reverse gap-1.5 items-center shadow-inner">
                      {item.bucket
                        .map((val, vIdx) => ({ val, vIdx, subId: `val-${vIdx}-${val}` }))
                        .map((subItem) => (
                          <div
                            key={subItem.subId}
                            className="w-full h-2.5 bg-indigo-500/50 rounded-sm shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                          />
                        ))}
                    </div>
                    <div
                      className={`${classCategories.logicText.split(" ")[0]} font-mono text-center text-slate-400 font-black`}
                    >
                      {item.bucket.length}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

AuxArrayVisualiser.propTypes = {
  state: PropTypes.object.isRequired,
};
