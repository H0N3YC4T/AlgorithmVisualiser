import PropTypes from "prop-types";
import GridEditor from "../visualizer/grid/GridEditor";
import { classCategory } from "../../styles/class-category";

export default function InputPanel({
  target,
  setTarget,
  pattern,
  setPattern,
  isPlaying,
  type,
  label,
  label2,
  placeholder1,
  placeholder2,
  gridTool,
  setGridTool,
  isEditingDisabled,
}) {
  const isPathfinding = type === "pathfinding";
  const isArrayBased = type === "sorting" || type === "searching";

  return (
    <div className="h-full flex flex-col justify-center items-center bg-slate-800/30 py-4 px-8 rounded-2xl border border-slate-800/40 shadow-inner">
      {isPathfinding && <GridEditor selectedTool={gridTool} setTool={setGridTool} disabled={isEditingDisabled} />}

      {!isPathfinding && !isArrayBased && (
        <div className="w-full flex flex-wrap gap-6 items-end justify-center">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="target-input" className={classCategory.labelBase}>
              {label || "Target Text"}
            </label>
            <input
              id="target-input"
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value.toUpperCase())}
              className={classCategory.inputBase}
              disabled={isPlaying}
              placeholder={placeholder1}
            />
          </div>
          <div className="w-full md:w-64">
            <label htmlFor="pattern-input" className={classCategory.labelBase}>
              {label2 || "Pattern"}
            </label>
            <input
              id="pattern-input"
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value.toUpperCase())}
              className={classCategory.inputBase}
              disabled={isPlaying}
              placeholder={placeholder2}
            />
          </div>
        </div>
      )}

      {type === "searching" && (
        <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className={classCategory.labelBase}>{label || "Array Input"}</label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={placeholder1 || "e.g. 10, 20, 30, 40, 50"}
              className={classCategory.inputBase}
              disabled={isPlaying}
            />
          </div>
          <div className="w-full md:w-40">
            <label className={classCategory.labelBase}>{label2 || "Target"}</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder={placeholder2 || "Target"}
              className={`${classCategory.inputBase} text-center px-4`}
              disabled={isPlaying}
            />
          </div>
        </div>
      )}

      {type === "sorting" && (
        <div className="w-full max-w-md text-center">
          <label className={classCategory.labelBase}>{label || "Array Input"}</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder={placeholder1 || "e.g. 5, 2, 8, 1, 9"}
            className={`${classCategory.inputBase} text-center`}
            disabled={isPlaying}
          />
        </div>
      )}
    </div>
  );
}

InputPanel.propTypes = {
  target: PropTypes.string,
  setTarget: PropTypes.func,
  pattern: PropTypes.string,
  setPattern: PropTypes.func,
  isPlaying: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  label2: PropTypes.string,
  placeholder1: PropTypes.string,
  placeholder2: PropTypes.string,
  gridTool: PropTypes.string,
  setGridTool: PropTypes.func,
  isEditingDisabled: PropTypes.bool,
};
