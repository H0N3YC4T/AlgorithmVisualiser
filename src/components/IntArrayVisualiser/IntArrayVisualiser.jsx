import { motion } from "framer-motion";
import { useMemo, memo } from "react";
import PropTypes from "prop-types";
import { classCategories } from "@/styles/divClassCustom";
import { mapArrayToUniqueIds, calculateRelativeHeight } from "@/utils/visualiserHelpers";
import { algorithmPageTheme as apt } from "@/styles/localThemes/algorithmPageTheme";

const IntArrayVisualiser = memo(
  ({ array = [], activeIndices = [], sortedIndices = [], pivotIndex = -1, swapIndices = [], compact = false }) => {
    const safeArray = useMemo(() => (Array.isArray(array) ? array : []), [array]);

    const itemsWithIds = useMemo(() => mapArrayToUniqueIds(safeArray), [safeArray]);

    const slotIds = useMemo(() => {
      return Array.from({ length: safeArray.length }, (_, i) => `slot-${i}`);
    }, [safeArray.length]);

    const activeSet = useMemo(
      () => new Set(Array.isArray(activeIndices) ? activeIndices : Array.from(activeIndices || [])),
      [activeIndices],
    );
    const sortedSet = useMemo(
      () => new Set(Array.isArray(sortedIndices) ? sortedIndices : Array.from(sortedIndices || [])),
      [sortedIndices],
    );
    const swappingSet = useMemo(
      () => new Set(Array.isArray(swapIndices) ? swapIndices : Array.from(swapIndices || [])),
      [swapIndices],
    );

    const rawValues = itemsWithIds.map((item) => item.value);
    const maxValue = Math.max(...rawValues, 1);
    const minValue = Math.min(...rawValues, 0);

    const bars = useMemo(() => {
      return itemsWithIds.map((item, i) => {
        const { id, value } = item;
        const height = calculateRelativeHeight(value, minValue, maxValue);
        const isActive = activeSet.has(i);
        const isSorted = sortedSet.has(i);
        const isPivot = pivotIndex === i;
        const isSwapping = swappingSet.has(i);

        let barClass = "w-full min-w-[8px] max-w-[40px] rounded-t-lg transition-all duration-300 relative group";
        let colorClass = "bg-slate-700 border-slate-600";

        if (isActive)
          colorClass =
            "bg-indigo-500 border-indigo-400 ring-4 ring-indigo-500/30 z-10 shadow-[0_0_15px_rgba(99,102,241,0.4)]";
        if (isPivot)
          colorClass =
            "bg-amber-400 border-amber-300 ring-4 ring-amber-400/40 z-20 shadow-[0_0_20px_rgba(251,191,36,0.4)]";
        if (isSwapping) colorClass = "bg-rose-500 border-rose-400 animate-pulse";
        if (isSorted) colorClass = "bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]";

        return (
          <motion.div
            key={id}
            layout={itemsWithIds.length < 50}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 1,
            }}
            className="flex-1 flex flex-col items-center justify-end h-full"
          >
            <div className={`${barClass} ${colorClass} border-t border-x`} style={{ height: `${height}%` }}>
              <span
                className={`absolute -top-8 left-1/2 -translate-x-1/2 ${apt.visualiser} font-black text-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded-md border border-slate-700 whitespace-nowrap z-30`}
              >
                {value}
              </span>
            </div>
          </motion.div>
        );
      });
    }, [itemsWithIds, minValue, maxValue, activeSet, sortedSet, pivotIndex, swappingSet]);

    const labels = useMemo(() => {
      return slotIds.map((slotId, i) => {
        const isA = activeSet.has(i);
        const isP = pivotIndex === i;
        return (
          <div key={slotId} className="flex-1 flex justify-center items-center">
            <span
              className={`${apt.visualiser} font-black font-mono transition-colors ${isA || isP ? "text-white" : "text-slate-600"}`}
            >
              {i}
            </span>
          </div>
        );
      });
    }, [slotIds, activeSet, pivotIndex]);

    if (safeArray.length === 0) {
      return (
        <div className={classCategories.vizContainer}>
          {Array.isArray(array) ? "No array data available to visualize." : "Preparing array data..."}
        </div>
      );
    }

    return (
      <div className={`${classCategories.vizContainer} pt-8`}>
        <div className="absolute top-8 bottom-8 left-0 right-0 flex flex-col justify-between px-4 pointer-events-none opacity-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-px bg-white" />
          ))}
        </div>
        
        {/* Bars Container - Fixed height context */}
        <div className="flex-1 min-h-0 flex items-end justify-center gap-1 md:gap-2 px-4 relative z-10 border-b border-slate-700/50 pb-0">
          {bars}
        </div>

        <div className="h-8 flex gap-1 md:gap-2 px-4 justify-center items-center pointer-events-none bg-slate-900/30 border-t border-slate-800/50">
          {labels}
        </div>
      </div>
    );
  },
);

IntArrayVisualiser.propTypes = {
  array: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
  activeIndices: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.instanceOf(Set)]),
  sortedIndices: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.instanceOf(Set)]),
  pivotIndex: PropTypes.number,
  swapIndices: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.instanceOf(Set)]),
};

export default IntArrayVisualiser;
