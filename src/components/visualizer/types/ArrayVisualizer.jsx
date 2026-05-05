import { motion } from 'framer-motion';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { classCategory } from '../../../styles/class-category';

export default function ArrayVisualizer({ array = [], activeIndices = [], sortedIndices = [], pivotIndex = -1, swapIndices = [] }) {
  const safeArray = useMemo(() => Array.isArray(array) ? array : [], [array]);

  const itemsWithIds = useMemo(() => {
    const counts = {};
    return safeArray.map((val) => {
      const isObj = typeof val === 'object' && val !== null;
      const v = isObj ? val.value : val;
      const id = isObj ? val.id : null;
      
      if (id !== null) return { id, value: v };
      
      counts[v] = (counts[v] || 0) + 1;
      return {
        id: `${v}-${counts[v]}`,
        value: v
      };
    });
  }, [safeArray]);

  const slotIds = useMemo(() => {
    return Array.from({ length: safeArray.length }, (_, i) => `slot-${i}`);
  }, [safeArray.length]);

  if (!Array.isArray(array)) {
    return (
      <div className={classCategory.vizContainer}>
        Preparing array data...
      </div>
    );
  }

  if (!Array.isArray(array) || array.length === 0) {
    return (
      <div className={classCategory.vizContainer}>
        No array data available to visualize.
      </div>
    );
  }

  const rawValues = itemsWithIds.map(item => item.value);
  const maxValue = Math.max(...rawValues, 1);
  const minValue = Math.min(...rawValues, 0);
  const range = maxValue - minValue || 1;
  
  const active = Array.isArray(activeIndices) ? activeIndices : Array.from(activeIndices || []);
  const sorted = Array.isArray(sortedIndices) ? sortedIndices : Array.from(sortedIndices || []);
  const swapping = Array.isArray(swapIndices) ? swapIndices : Array.from(swapIndices || []);

  return (
    <div className={`${classCategory.vizContainer} flex-col pt-8`}>
      {/* Grid */}
      <div className="absolute top-8 bottom-8 left-0 right-0 flex flex-col justify-between px-4 pointer-events-none opacity-10">
        {['grid-1', 'grid-2', 'grid-3', 'grid-4', 'grid-5'].map((id) => (
          <div key={id} className="w-full h-px bg-white" />
        ))}
      </div>

      {/* Bars */}
      <div className="flex-1 flex items-end justify-center gap-1 md:gap-2 px-4 relative z-10 border-b border-slate-700/50 pb-0">
        {itemsWithIds.map((item, i) => {
          const { id, value } = item;
          const height = 10 + ((value - minValue) / range) * 75;
          const isActive = active.includes(i);
          const isSorted = sorted.includes(i);
          const isPivot = pivotIndex === i;
          const isSwapping = swapping.includes(i);

          let barClass = "w-full min-w-[12px] max-w-[40px] rounded-t-lg transition-colors duration-300 relative group";
          let colorClass = "bg-slate-700 border-slate-600";
          
          if (isActive) colorClass = "bg-indigo-500 border-indigo-400 ring-4 ring-indigo-500/30 z-10 shadow-xl";
          if (isPivot) colorClass = "bg-amber-400 border-amber-300 ring-4 ring-amber-400/40 z-20 shadow-2xl";
          if (isSwapping) colorClass = "bg-rose-500 border-rose-400 animate-pulse";
          if (isSorted) colorClass = "bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]";

          return (
            <motion.div 
              key={id}
              layout
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 1
              }}
              className="flex-1 flex flex-col items-center justify-end h-full"
            >
              <div 
                className={`${barClass} ${colorClass} border-t border-x`}
                style={{ height: `${height}%` }}
              >
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded-md border border-slate-700 whitespace-nowrap z-30">
                  {value}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Index Labels Container (Static) */}
      <div className="h-8 flex gap-1 md:gap-2 px-4 justify-center items-center pointer-events-none bg-slate-900/30">
        {slotIds.map((slotId, i) => {
          const isActive = active.includes(i);
          const isPivot = pivotIndex === i;
          return (
            <div key={slotId} className="flex-1 flex justify-center items-center">
              <span className={`text-[11px] font-black font-mono transition-colors ${isActive || isPivot ? 'text-white' : 'text-slate-500'}`}>
                {i}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

ArrayVisualizer.propTypes = {
  array: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
  activeIndices: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.instanceOf(Set)]),
  sortedIndices: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.instanceOf(Set)]),
  pivotIndex: PropTypes.number,
  swapIndices: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.instanceOf(Set)])
};

