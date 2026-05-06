import PropTypes from "prop-types";
import { MoveRight } from "lucide-react";
import { classCategories } from "@/styles/divClassCustom";

export default function StringArrayVisualiser({
  target = "",
  pattern = "",
  currentIndex,
  phase,
  compIdx,
  mismatchFound,
  isFinished,
  accessedIndices,
  activeIndices,
  lookAheadIndex,
  comparesRightToLeft,
  showShiftArrow,
}) {
  const accessed = accessedIndices instanceof Set ? accessedIndices : new Set(accessedIndices || []);
  const active = activeIndices instanceof Set ? activeIndices : new Set(activeIndices || []);

  return (
    <div className="overflow-x-auto pb-8 scrollbar-hide flex justify-center">
      <div className="inline-flex flex-col px-8 items-start">
        {/* Indices */}
        <div className="flex gap-1 mb-1">
          {target
            .split("")
            .map((_, i) => ({ i, id: `idx-slot-${i}` }))
            .map((item) => (
              <div
                key={item.id}
                className={`w-10 flex-shrink-0 text-center ${classCategories.logicText.split(" ")[0]} font-bold text-slate-500 font-mono`}
              >
                {item.i}
              </div>
            ))}
        </div>

        {/* Target */}
        <div className="flex gap-1">
          {target
            .split("")
            .map((char, i) => ({ char, i, id: `tcell-slot-${i}` }))
            .map((item) => {
              const isLookAhead = lookAheadIndex !== undefined && lookAheadIndex !== -1 && item.i === lookAheadIndex;
              const isExplicitActive = active.has(item.i);
              const isActiveChar = phase === 1 && item.i === currentIndex + compIdx;
              const isAccessed = accessed.has(item.i);
              const isBehind = item.i < currentIndex;

              let cellClass = `${classCategories.cellBase} w-10 h-10 bg-slate-800 border-slate-700 text-slate-100`;

              if (isExplicitActive) {
                cellClass = `${classCategories.cellBase} w-10 h-10 bg-indigo-500/40 border-indigo-500 text-indigo-100 ring-4 ring-indigo-500/20 scale-105 z-10`;
              } else if (isLookAhead) {
                cellClass = `${classCategories.cellBase} w-10 h-10 bg-sky-400 border-sky-300 text-white shadow-xl shadow-sky-400/40 scale-110 z-10 animate-pulse`;
              } else if (isActiveChar) {
                cellClass = `${classCategories.cellBase} w-10 h-10 bg-blue-900/40 border-blue-500 text-blue-200 ring-4 ring-blue-500/20 scale-105`;
              } else if (isAccessed || isBehind) {
                cellClass = `${classCategories.cellBase} w-10 h-10 bg-slate-800/40 border-slate-800 text-slate-600`;
              }

              return (
                <div key={item.id} className={cellClass}>
                  {item.char}
                </div>
              );
            })}
        </div>

        {/* Pattern */}
        <div className="mt-4 flex gap-1 relative h-10">
          <div
            className="flex-shrink-0 transition-all duration-500 ease-in-out -mr-1"
            style={{ width: `${currentIndex * 2.75}rem` }}
          />

          {pattern
            .split("")
            .map((char, i) => ({ char, i, id: `pcell-slot-${i}` }))
            .map((item) => {
              const isComparingIdx = phase === 1 && item.i === compIdx;
              const isMatched =
                (phase === 1 && !comparesRightToLeft && item.i < compIdx) ||
                (phase === 1 && comparesRightToLeft && item.i > compIdx) ||
                (isFinished && !mismatchFound && item.i < pattern.length);
              const isMismatched = phase >= 2 && item.i === compIdx && mismatchFound;

              let cellClass = `${classCategories.cellBase} w-10 h-10 bg-slate-700 border-slate-600 text-slate-100 shadow-md`;
              if (isComparingIdx)
                cellClass = `${classCategories.cellBase} w-10 h-10 bg-amber-400 border-amber-300 text-amber-950 ring-4 ring-amber-400/30 scale-110 z-20 shadow-xl`;
              if (isMismatched)
                cellClass = `${classCategories.cellBase} w-10 h-10 bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20`;
              if (isMatched)
                cellClass = `${classCategories.cellBase} w-10 h-10 bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20`;

              return (
                <div key={item.id} className={cellClass}>
                  {item.char}
                </div>
              );
            })}

          {showShiftArrow && !isFinished && (
            <div className="flex items-center px-2">
              <MoveRight className="w-6 h-6 text-sky-400 animate-bounce-x" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

StringArrayVisualiser.propTypes = {
  target: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  phase: PropTypes.number.isRequired,
  compIdx: PropTypes.number.isRequired,
  mismatchFound: PropTypes.bool.isRequired,
  isFinished: PropTypes.bool.isRequired,
  accessedIndices: PropTypes.oneOfType([PropTypes.instanceOf(Set), PropTypes.arrayOf(PropTypes.number)]),
  activeIndices: PropTypes.oneOfType([PropTypes.instanceOf(Set), PropTypes.arrayOf(PropTypes.number)]),
  lookAheadIndex: PropTypes.number,
  comparesRightToLeft: PropTypes.bool,
  showShiftArrow: PropTypes.bool,
};
