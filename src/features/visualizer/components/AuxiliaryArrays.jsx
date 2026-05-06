import PropTypes from 'prop-types';
import { Layers } from 'lucide-react';
import ArrayVisualizer from '@/features/visualizer/renderers/ArrayVisualizer';


export default function AuxiliaryArrays({ state }) {
  if (!state.countArray && !state.temp && !state.output && !state.buckets) return null;

  return (
    <div className="space-y-6 pt-4 border-t border-slate-800/50">
      {state.countArray && (
        <div className="space-y-3">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" /> Count Array (Occurrences)
          </div>
          <ArrayVisualizer 
            array={state.countArray}
            activeIndices={state.phase === 2 ? [state.i] : []}
          />
        </div>
      )}
      {state.temp && state.phase === 2 && (
        <div className="space-y-3">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" /> Working Buffer (Temp)
          </div>
          <ArrayVisualizer 
            array={state.temp}
            activeIndices={[state.k]}
          />
        </div>
      )}
      {state.output && (
        <div className="space-y-3">
          <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" /> Output Array (Building)
          </div>
          <ArrayVisualizer array={state.output} />
        </div>
      )}
      {state.buckets && (
        <div className="space-y-3">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" /> Distribution Buckets (0-9)
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {state.buckets.map((bucket, bIdx) => ({ bucket, bIdx, id: `bucket-slot-${bIdx}` })).map((item) => (
              <div key={item.id} className="flex flex-col gap-1">
                <div className="text-[8px] font-black text-slate-500 text-center uppercase">B{item.bIdx}</div>
                <div className="flex-1 bg-slate-800/40 border border-slate-800/60 rounded-md p-1 min-h-[40px] flex flex-col gap-1 items-center justify-end">
                  {item.bucket.map((val, vIdx) => ({ val, vIdx, subId: `val-${vIdx}-${val}` })).map((subItem) => (
                    <div key={subItem.subId} className="w-full h-1.5 bg-indigo-500/40 rounded-[1px]" />
                  ))}
                </div>
                <div className="text-[9px] font-mono text-center text-slate-400 font-bold">{item.bucket.length}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

AuxiliaryArrays.propTypes = {
  state: PropTypes.object.isRequired
};
