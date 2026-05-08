import { LayoutGrid } from "lucide-react";
import { memo, useMemo } from "react";
import { globalTheme } from "@/styles/globalTheme";
import { algorithmPageTheme as apt } from "@/styles/localThemes/algorithmPageTheme";
import PropTypes from "prop-types";
import { InputPanel, Legend, CodePanel } from "@/components/UI";
import { IntArrayVisualiser } from "@/components/IntArrayVisualiser";
import { GridVisualiser } from "@/components/GridVisualiser";
import { StringArrayVisualiser, ZArrayVisualiser } from "@/components/StringArrayVisualiser";
import { MetricsBar } from "@/components/CodeMetrics";
import { ProcessLog } from "@/components/UI";
import { AuxDataVisualiser, AuxArrayVisualiser } from "@/components/AuxiliaryVisualiser";
import usePlayback from "@/hooks/usePlayback";
import useVisualiserLabels from "@/hooks/useVisualiserLabels";
import { classCategories } from "@/styles/divClassCustom";

const localTheme = {
  contentWrapper: "space-y-6 p-6",
  vizArea: `relative ${classCategories.glassPanel} ${classCategories.cardRound} p-6 min-h-[300px]`,
  gridSection: "grid grid-cols-1 xl:grid-cols-10 gap-6 items-stretch",
  inputWrapper: "xl:col-span-7 w-full min-w-0",
  legendWrapper: "xl:col-span-3 w-full min-w-0",
  bottomGrid: (hasAuxData) =>
    `grid grid-cols-1 ${hasAuxData ? "xl:grid-cols-3" : "xl:grid-cols-2"} gap-8 items-stretch`,
  footerIcon: `w-3 h-3 text-${globalTheme.colors.primaryLight}`,
  panel: `w-full max-w-[1400px] bg-${globalTheme.colors.background}/40 backdrop-blur-xl border border-${globalTheme.colors.border} rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col`,
  footer: `p-6 flex justify-between items-center border-t border-${globalTheme.colors.border} bg-slate-950/50 text-${globalTheme.colors.textMuted} font-medium tracking-wider uppercase`,
  logicText: `${apt.key} text-${globalTheme.colors.textDisabled} leading-relaxed`,
};

const MainVisualization = memo(
  ({ algorithm, state, target, pattern, updateState, toggleWall, gridTool, isEditingDisabled }) => {
    const isArrayBased = algorithm.type === "sorting" || algorithm.type === "searching";

    if (algorithm.visualiserType === "array" || isArrayBased) {
      return (
        <IntArrayVisualiser
          array={state.array || state.nodes || state.table || state.tree || []}
          activeIndices={state.activeIndices}
          sortedIndices={state.sortedIndices}
          pivotIndex={state.pivotIndex || state.curIdx || state.hashValue}
          swapIndices={state.swapIndices}
        />
      );
    }

    if (algorithm.visualiserType === "z") {
      return (
        <ZArrayVisualiser
          concat={state.concat}
          z={state.z || []}
          i={state.i}
          l={state.l || 0}
          r={state.r || 0}
          activeIndices={state.activeIndices}
          referenceIndex={state.referenceIndex}
        />
      );
    }

    if (algorithm.visualiserType === "grid" || algorithm.type === "pathfinding") {
      return (
        <GridVisualiser
          algorithm={algorithm}
          state={state}
          updateState={updateState}
          toggleWall={toggleWall}
          gridTool={gridTool}
          isEditingDisabled={isEditingDisabled}
        />
      );
    }

    return (
      <StringArrayVisualiser
        target={target}
        pattern={pattern}
        currentIndex={state.currentIndex}
        phase={state.phase}
        compIdx={state.compIdx}
        mismatchFound={state.mismatchFound}
        isFinished={state.isFinished}
        accessedIndices={state.accessedIndices}
        activeIndices={state.activeIndices}
        lookAheadIndex={state.lookAheadIndex}
        comparesRightToLeft={state.comparesRightToLeft}
        showShiftArrow={state.showShiftArrow}
      />
    );
  },
);

MainVisualization.propTypes = {
  algorithm: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  target: PropTypes.string,
  pattern: PropTypes.string,
  updateState: PropTypes.func,
  toggleWall: PropTypes.func,
  gridTool: PropTypes.string,
  isEditingDisabled: PropTypes.bool,
};

export default function VisualiserFrame({
  algorithm,
  state,
  target,
  setTarget,
  pattern,
  setPattern,
  softReset,
  factoryReset,
  prevStep,
  nextStep,
  updateState,
  toggleWall,
  clearWalls,
  history,
  preprocessing,
  onBack,
  gridTool,
  setGridTool,
  playbackRate,
  setPlaybackRate,
  gridSize,
  setGridSize,
}) {

  const lineHighlights = useMemo(() => {
    if (algorithm.lineHighlights && Object.keys(algorithm.lineHighlights).length > 0) {
      return algorithm.lineHighlights;
    }
    const extracted = {};
    Object.entries(algorithm.visualSteps || {}).forEach(([key, step]) => {
      if (step.highlights) extracted[key] = step.highlights;
    });
    return extracted;
  }, [algorithm]);

  const activeStep = state.log?.messageKey || state.log?.codeStep || state.log?.title;

  // Adjust speed based on playbackRate (inverse: higher rate means lower interval)
  const adjustedSpeed = (algorithm.uiConfig?.playbackSpeed || 500) / playbackRate;

  const { isPlaying, togglePlay, stopPlay } = usePlayback(nextStep, softReset, state.isFinished, adjustedSpeed);
  const texts = useVisualiserLabels(algorithm, state, history.length);

  const isEditingDisabled = isPlaying || state.phase > 0 || (state.iterations || 0) > 0;
  const isArrayBased = algorithm.type === "sorting" || algorithm.type === "searching";

  const renderInputsAndLegend = () => (
    <div className={localTheme.gridSection}>
      <div className={localTheme.inputWrapper}>
        <InputPanel
          target={target}
          setTarget={setTarget}
          pattern={pattern}
          setPattern={setPattern}
          isPlaying={isPlaying}
          type={algorithm.type}
          label={texts.inputLabel1}
          label2={texts.inputLabel2}
          placeholder1={texts.inputPlaceholder1}
          placeholder2={texts.inputPlaceholder2}
          gridTool={gridTool}
          setGridTool={setGridTool}
          isEditingDisabled={isEditingDisabled}
          playbackRate={playbackRate}
          setPlaybackRate={setPlaybackRate}
          clearWalls={clearWalls}
          gridSize={gridSize}
          setGridSize={setGridSize}
        />
      </div>

      <div className={localTheme.legendWrapper}>
        <Legend items={algorithm.legendItems || []} />
      </div>
    </div>
  );

  const renderVisualiser = () => (
    <div className="w-full px-2">
      <MainVisualization
        algorithm={algorithm}
        state={state}
        target={target}
        pattern={pattern}
        updateState={updateState}
        toggleWall={toggleWall}
        gridTool={gridTool}
        isEditingDisabled={isEditingDisabled}
      />
    </div>
  );

  return (
    <div className={classCategories.pageWrapper}>
      <div className={localTheme.panel}>
        <MetricsBar
          name={algorithm.name}
          isFinished={state.isFinished}
          onBack={onBack}
          reset={() => {
            stopPlay();
            factoryReset();
          }}
          prevStep={() => {
            stopPlay();
            prevStep();
          }}
          nextStep={() => {
            stopPlay();
            if (state.isFinished) softReset();
            else nextStep();
          }}
          togglePlay={togglePlay}
          canPrev={history.length > 0 && !isPlaying}
          canNext={!isPlaying}
          isPlaying={isPlaying}
          buttonText={texts.button}
          isStarted={texts.isStarted}
          state={state}
          algorithm={algorithm}
        />

        <div className={localTheme.contentWrapper}>
          {/* Toolbar & Legend - Controls first */}
          {renderInputsAndLegend()}

          {/* Main Visualiser Area */}
          <div className={localTheme.vizArea}>{renderVisualiser()}</div>

          <AuxArrayVisualiser state={state} />

          {/* Bottom Info Section: Dynamic Grid */}
          <div className={localTheme.bottomGrid(!!algorithm.auxDataConfig)}>
            <ProcessLog log={state.log} algorithm={algorithm} />

            {algorithm.auxDataConfig && (
              <AuxDataVisualiser
                algorithm={algorithm}
                state={state}
                preprocessing={preprocessing}
                target={target}
                pattern={pattern}
                texts={texts}
                isArrayBased={isArrayBased}
              />
            )}

            {algorithm.codeSnippets && (
              <CodePanel
                codeSnippets={algorithm.codeSnippets}
                lineHighlights={lineHighlights}
                activeStep={activeStep}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={localTheme.footer}>
          <div className="flex items-center gap-2">
            <LayoutGrid className={localTheme.footerIcon} /> {algorithm.category}
          </div>
          <div className={`font-mono ${localTheme.logicText} text-slate-500`}>Interactive Tool</div>
        </div>
      </div>
    </div>
  );
}

VisualiserFrame.propTypes = {
  algorithm: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    visualiserType: PropTypes.string,
    cheatSheetData: PropTypes.object,
    phaseNames: PropTypes.arrayOf(PropTypes.string),
    codeSnippets: PropTypes.object,
    lineHighlights: PropTypes.object,
    legendItems: PropTypes.arrayOf(PropTypes.object),
    uiConfig: PropTypes.shape({
      playbackSpeed: PropTypes.number,
      startButton: PropTypes.string,
      statusLabel: PropTypes.string,
      vizTitle: PropTypes.string,
      inputLabel1: PropTypes.string,
      inputLabel2: PropTypes.string,
      inputPlaceholder1: PropTypes.string,
      inputPlaceholder2: PropTypes.string,
    }),
  }).isRequired,
  state: PropTypes.object.isRequired,
  target: PropTypes.string.isRequired,
  setTarget: PropTypes.func.isRequired,
  pattern: PropTypes.string.isRequired,
  setPattern: PropTypes.func.isRequired,
  softReset: PropTypes.func.isRequired,
  factoryReset: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
  toggleWall: PropTypes.func,
  clearWalls: PropTypes.func,
  history: PropTypes.array.isRequired,
  preprocessing: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  gridTool: PropTypes.string,
  setGridTool: PropTypes.func,
  playbackRate: PropTypes.number,
  setPlaybackRate: PropTypes.func,
  gridSize: PropTypes.object,
  setGridSize: PropTypes.func,
};
