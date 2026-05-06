import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { classCategories } from "@/styles/divClassCustom";


export default function ZVisualizer({ concat, z, i, l, r, activeIndices, referenceIndex }) {
  const active = activeIndices instanceof Set ? activeIndices : new Set(activeIndices || []);
  const refIdx = referenceIndex ?? -1;
  const str = concat || "";

  const sepIdx = str.indexOf("$");
  const slots = str.split("").map((char, pos) => ({ char, pos, id: `slot-${pos}` }));

  return (
    <div className="space-y-8 overflow-x-auto pb-8 scrollbar-hide">
      <div className="inline-flex flex-col min-w-full px-4">
        {/* Indices */}
        <div className="flex gap-1 mb-1">
          {slots.map((slot) => (
            <div
              key={`idx-row-${slot.id}`}
              className="w-10 flex-shrink-0 text-center text-[9px] font-black text-slate-700 font-mono"
            >
              {slot.pos}
            </div>
          ))}
        </div>

        {/* Concatenated String */}
        <div className="flex gap-1">
          {slots.map((slot) => {
            const isInsideZBox = slot.pos >= l && slot.pos <= r && l !== 0;
            const isActive = active.has(slot.pos) || slot.pos === i;
            const isPattern = slot.pos < sepIdx;
            const isSeparator = slot.char === "$";

            let cellClass = `${classCategories.cellBase} `;

            if (isSeparator) {
              cellClass += "bg-slate-900 border-slate-800 text-rose-500 shadow-none";
            } else if (slot.pos === refIdx) {
              cellClass += "bg-amber-400 border-amber-500 text-amber-950 ring-4 ring-amber-400/30 scale-110 z-20";
            } else if (isActive) {
              cellClass += "bg-indigo-500 border-indigo-400 text-white scale-110 z-20 ring-4 ring-indigo-500/20";
            } else if (isInsideZBox) {
              cellClass += "bg-indigo-500/20 border-indigo-500/50 text-indigo-100";
            } else if (isPattern) {
              cellClass += "bg-slate-800/80 border-slate-700 text-emerald-400";
            } else {
              cellClass += "bg-slate-800 border-slate-700 text-slate-100";
            }

            return (
              <div key={`char-row-${slot.id}`} className={cellClass}>
                {slot.char}
              </div>
            );
          })}
        </div>

        {/* Z-Array */}
        <div className="flex gap-1 mt-4">
          <AnimatePresence mode="popLayout">
            {slots.map((slot) => {
              const val = z[slot.pos];
              const hasValue = val !== undefined && val !== null;
              const isCurrent = slot.pos === i;
              const isPatternPart = slot.pos <= sepIdx;

              const isFullMatch = hasValue && val === sepIdx && !isPatternPart;
              const isPartialMatch = hasValue && val > 0 && val !== sepIdx && !isPatternPart;

              let cellClass = `${classCategories.cellValueBase} `;

              if (isCurrent) {
                cellClass += "bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/20";
              } else if (isFullMatch) {
                cellClass += "bg-emerald-500/10 border-emerald-500/50";
              } else if (isPartialMatch) {
                cellClass += "bg-rose-500/10 border-rose-500/50";
              } else {
                cellClass += "bg-slate-900 border-slate-800/50";
              }

              const showVal = hasValue && !isPatternPart;
              const displayValue = showVal ? val : "-";
              let valueColor = "text-slate-400";
              if (isFullMatch) valueColor = "text-emerald-400";
              else if (isPartialMatch) valueColor = "text-rose-400";

              return (
                <motion.div
                  key={`z-val-row-${slot.id}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cellClass}
                >
                  <span className="text-[8px] font-black text-slate-600 mb-1">Z[{slot.pos}]</span>
                  <span className={`text-sm font-bold ${valueColor}`}>{displayValue}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Z-Box Label */}
        <div className="mt-8 flex gap-1 relative h-6 min-h-[1.5rem]">
          <AnimatePresence>
            {l !== 0 && r >= l && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute h-1 bg-indigo-500/50 rounded-full bottom-0 transition-all duration-500"
                style={{
                  left: `${l * 2.75}rem`,
                  width: `${(r - l + 1) * 2.75 - 0.25}rem`,
                }}
              >
                <div className="absolute inset-0 bg-indigo-500 blur-[2px] opacity-50" />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black text-indigo-400 uppercase tracking-tighter bg-slate-950 px-2 py-0.5 border border-indigo-500/30 rounded-md shadow-xl z-30">
                  Z-Box [{l}, {r}]
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

ZVisualizer.propTypes = {
  concat: PropTypes.string.isRequired,
  z: PropTypes.arrayOf(PropTypes.number).isRequired,
  i: PropTypes.number.isRequired,
  l: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  activeIndices: PropTypes.oneOfType([PropTypes.instanceOf(Set), PropTypes.arrayOf(PropTypes.number)]),
  referenceIndex: PropTypes.number,
};
