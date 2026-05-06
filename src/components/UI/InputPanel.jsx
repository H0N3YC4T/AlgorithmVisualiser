import PropTypes from "prop-types";
import { memo } from "react";
import { Trash2 } from "lucide-react";
import { GridEditor } from "@/components/GridVisualiser";
import { classCategories } from "@/styles/divClassCustom";

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
    placeholder2,
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

    return (
      <div className="w-full bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[2rem] p-6 shadow-2xl flex flex-col gap-4">
        <div
          className={`flex flex-wrap items-center ${isPathfinding ? "justify-center lg:flex-nowrap" : "justify-between"} gap-6`}
        >
          {/* Playback Speed */}
          <div className="flex flex-col items-center gap-2 min-w-[140px]">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
              Playback Speed
            </label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="range"
                min="0.25"
                max="3"
                step="0.05"
                value={playbackRate}
                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>

          {/* Pathfinding Controls */}
          {isPathfinding && (
            <>
              <div className="h-10 w-px bg-slate-800 hidden lg:block" />

              {/* Grid Size Inputs */}
              <div className="flex flex-col items-center gap-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
                  Grid Size
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-slate-600 uppercase">H</span>
                    <input
                      type="number"
                      value={gridSize.rows}
                      onChange={(e) => setGridSize(parseInt(e.target.value) || 5, gridSize.cols)}
                      disabled={isEditingDisabled}
                      className="w-11 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono text-sky-400 focus:border-sky-500 outline-none text-center"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-slate-600 uppercase">W</span>
                    <input
                      type="number"
                      value={gridSize.cols}
                      onChange={(e) => setGridSize(gridSize.rows, parseInt(e.target.value) || 5)}
                      disabled={isEditingDisabled}
                      className="w-11 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono text-sky-400 focus:border-sky-500 outline-none text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-800 hidden lg:block" />

              <div className="flex flex-col items-center gap-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
                  Grid Tools
                </label>
                <div className="flex items-center gap-4">
                  <GridEditor selectedTool={gridTool} setTool={setGridTool} disabled={isEditingDisabled} />

                  <button
                    onClick={clearWalls}
                    disabled={isEditingDisabled}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-500/20 transition-all disabled:opacity-30 whitespace-nowrap active:scale-95"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Array-based Inputs */}
          {isArrayBased && (
            <div className="flex-1 flex flex-wrap gap-8 items-center justify-end">
              {type === "searching" && (
                <>
                  <div className="flex-1 min-w-[240px]">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block ml-2">
                      {label || "Array Input"}
                    </label>
                    <input
                      type="text"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder={placeholder1 || "e.g. 10, 20, 30, 40, 50"}
                      className={classCategories.inputBase}
                      disabled={isPlaying}
                    />
                  </div>
                  <div className="w-28 text-center">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">
                      {label2 || "Target"}
                    </label>
                    <input
                      type="text"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="X"
                      className={`${classCategories.inputBase} text-center`}
                      disabled={isPlaying}
                    />
                  </div>
                </>
              )}
              {type === "sorting" && (
                <div className="flex-1 max-w-md">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block ml-2">
                    {label || "Array Input"}
                  </label>
                  <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder={placeholder1 || "e.g. 5, 2, 8, 1, 9"}
                    className={classCategories.inputBase}
                    disabled={isPlaying}
                  />
                </div>
              )}
            </div>
          )}

          {/* String Matching Inputs */}
          {!isPathfinding && !isArrayBased && (
            <div className="flex-1 flex flex-wrap gap-8 items-center justify-end">
              <div className="flex-1 min-w-[240px]">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block ml-2">
                  {label || "Target Text"}
                </label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value.toUpperCase())}
                  className={classCategories.inputBase}
                  disabled={isPlaying}
                  placeholder={placeholder1}
                />
              </div>
              <div className="w-56 text-center">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">
                  {label2 || "Pattern"}
                </label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value.toUpperCase())}
                  className={classCategories.inputBase}
                  disabled={isPlaying}
                  placeholder={placeholder2}
                />
              </div>
            </div>
          )}
        </div>
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
