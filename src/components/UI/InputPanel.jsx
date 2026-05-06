import PropTypes from "prop-types";
import { memo, useState, useEffect } from "react";
import { GridEditor } from "@/components/GridVisualiser";
import { classCategories } from "@/styles/divClassCustom";
import { globalTheme } from "@/styles/globalTheme";
import { algorithmPageTheme as apt } from "@/styles/localThemes/algorithmPageTheme";

const localTheme = {
  panel: `w-full h-full bg-slate-900/40 backdrop-blur-md border border-slate-800/60 ${classCategories.cardRound} p-5 shadow-2xl`,
  configContainer:
    "flex items-center gap-6 bg-slate-950/50 border border-slate-800/60 rounded-2xl px-4 py-2 shadow-inner",
  configTitle: apt.controlTitle,
  speedContainer: "bg-slate-950/50 border border-slate-800/60 rounded-2xl px-5 py-3 shadow-inner group",
  speedInput:
    "w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 group-hover:bg-slate-700 transition-colors",
  sizeInput: {
    container: `w-12 bg-slate-900 border border-slate-800 rounded-xl px-1.5 py-1 ${globalTheme.typography.sizes.baseSmall} font-mono text-sky-400 focus:border-sky-500 outline-none text-center`,
    label: `${globalTheme.typography.sizes.subtext} font-bold text-slate-600 uppercase`,
  },
  input: `!py-4 !px-6 !rounded-xl !${globalTheme.typography.sizes.baseSmall} bg-slate-950/50 shadow-inner`,
};

const InputPanel = memo(
  ({
    target,
    setTarget,
    pattern,
    setPattern,
    isPlaying,
    type,
    label,
    label2,
    placeholder1,
    gridTool,
    setGridTool,
    isEditingDisabled,
    playbackRate,
    setPlaybackRate,
    clearWalls,
    gridSize,
    setGridSize,
  }) => {
    const isPathfinding = type === "pathfinding";
    const isArrayBased = type === "sorting" || type === "searching";

    const [localRows, setLocalRows] = useState(gridSize.rows);
    const [localCols, setLocalCols] = useState(gridSize.cols);

    useEffect(() => {
      setLocalRows(gridSize.rows);
      setLocalCols(gridSize.cols);
    }, [gridSize]);

    const handleRowsUpdate = () => {
      const val = Math.max(3, parseInt(localRows) || 3);
      setLocalRows(val);
      setGridSize(val, gridSize.cols);
    };

    const handleColsUpdate = () => {
      const val = Math.max(3, parseInt(localCols) || 3);
      setLocalCols(val);
      setGridSize(gridSize.rows, val);
    };

    return (
      <div className={localTheme.panel}>
        {isPathfinding ? (
          <div className="flex items-center gap-3">
            {/* Speed Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]" />
                <label className={`${localTheme.configTitle}`}>Playback Speed</label>
              </div>
              <div className={localTheme.speedContainer}>
                <input
                  type="range"
                  min="0.25"
                  max="3"
                  step="0.05"
                  value={playbackRate}
                  onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                  className={localTheme.speedInput}
                />
              </div>
            </div>

            <div className="w-px h-12 bg-slate-800/60 mt-4" />

            {/* Size Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                <label className={`${localTheme.configTitle}`}>Grid Size</label>
              </div>
              <div className={`${localTheme.configContainer}`}>
                <div className="flex items-center gap-3">
                  <span className={`${localTheme.sizeInput.label}`}>H</span>
                  <input
                    type="number"
                    value={localRows}
                    onChange={(e) => setLocalRows(e.target.value)}
                    onBlur={handleRowsUpdate}
                    onKeyDown={(e) => e.key === "Enter" && handleRowsUpdate()}
                    disabled={isEditingDisabled}
                    className={`${localTheme.sizeInput.container}`}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className={`${localTheme.sizeInput.label}`}>W</span>
                  <input
                    type="number"
                    value={localCols}
                    onChange={(e) => setLocalCols(e.target.value)}
                    onBlur={handleColsUpdate}
                    onKeyDown={(e) => e.key === "Enter" && handleColsUpdate()}
                    disabled={isEditingDisabled}
                    className={`${localTheme.sizeInput.container}`}
                  />
                </div>
              </div>
            </div>

            <div className="w-px h-12 bg-slate-800/60 mt-4" />

            {/* Tools Section */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2 ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <label className={`${localTheme.configTitle}`}>Grid Visualization Tools</label>
              </div>
              <div className={`${localTheme.configContainer}`}>
                <GridEditor
                  selectedTool={gridTool}
                  setTool={setGridTool}
                  disabled={isEditingDisabled}
                  onClear={clearWalls}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-start gap-12">
            {/* Playback Speed Control */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="flex items-center gap-2 ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]" />
                <label className={`${localTheme.configTitle}`}>Playback Speed</label>
              </div>
              <div className={`${localTheme.speedContainer} py-4`}>
                <input
                  type="range"
                  min="0.25"
                  max="3"
                  step="0.05"
                  value={playbackRate}
                  onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                  className={localTheme.speedInput}
                />
              </div>
            </div>

            {/* Logic Inputs (Array / Text) */}
            <div className="flex-1 flex flex-wrap gap-10 items-center border-l border-slate-800/60 pl-10">
              <div className="flex-1 min-w-[300px] flex flex-col gap-3">
                <div className="flex items-center gap-2 ml-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                  <label className={`${localTheme.configTitle}`}>
                    {label || (isArrayBased ? "Data Input" : "Target String")}
                  </label>
                </div>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (isArrayBased) {
                      setTarget(val);
                    } else {
                      setTarget(val.toUpperCase());
                    }
                  }}
                  placeholder={placeholder1 || "Enter values..."}
                  className={`${classCategories.inputBase} ${localTheme.input}`}
                  disabled={isPlaying}
                />
              </div>

              {(type === "searching" || (!isPathfinding && !isArrayBased)) && (
                <div className="w-56 flex flex-col gap-3">
                  <div className="flex items-center gap-2 ml-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    <label className={`${localTheme.configTitle}`}>
                      {label2 || (type === "searching" ? "Target Value" : "Search Pattern")}
                    </label>
                  </div>
                  <input
                    type="text"
                    value={pattern}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (isArrayBased) setPattern(val);
                      else setPattern(val.toUpperCase());
                    }}
                    placeholder={type === "searching" ? "X" : "PATTERN"}
                    className={`${classCategories.inputBase} ${localTheme.input} text-center`}
                    disabled={isPlaying}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

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
  playbackRate: PropTypes.number,
  setPlaybackRate: PropTypes.func,
  clearWalls: PropTypes.func,
  gridSize: PropTypes.object,
  setGridSize: PropTypes.func,
};

export default InputPanel;
