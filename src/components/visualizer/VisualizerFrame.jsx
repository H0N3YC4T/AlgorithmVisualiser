import { LayoutGrid } from 'lucide-react';
import PropTypes from 'prop-types';
import InputPanel from '../ui/InputPanel';
import Legend from '../ui/Legend';
import ArrayVisualizer from './types/ArrayVisualizer';
import TextVisualizer from './types/TextVisualizer';
import ZVisualizer from './types/ZVisualizer';
import GridVisualizer from './types/GridVisualizer';
import ProcessLog from './elements/ProcessLog';
import CodePanel from '../ui/CodePanel';
import MetricsBar from './elements/MetricsBar';
import AlgorithmSidebar from './elements/AlgorithmSidebar';
import AuxiliaryArrays from './elements/AuxiliaryArrays';

import useVisualizerPlayback from '../../hooks/useVisualizerPlayback';
import useVisualizerLabels from '../../hooks/useVisualizerLabels';
import { classCategory } from '../../styles/class-category';

function MainVisualization({ algorithm, state, target, pattern, updateState, toggleWall, gridTool, isEditingDisabled }) {
  const isArrayBased = algorithm.type === 'sorting' || algorithm.type === 'searching';
  
  if (algorithm.visualizerType === 'array' || isArrayBased) {
    return (
      <ArrayVisualizer 
        array={state.array || state.nodes || state.table || state.tree || []}
        activeIndices={state.activeIndices}
        sortedIndices={state.sortedIndices}
        pivotIndex={state.pivotIndex || state.curIdx || state.hashValue}
        swapIndices={state.swapIndices}
      />
    );
  }

  if (algorithm.visualizerType === 'z') {
    return (
      <ZVisualizer 
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

  if (algorithm.visualizerType === 'grid' || algorithm.type === 'pathfinding') {
    return (
      <div className="space-y-6">
        <GridVisualizer 
          state={state} 
          updateState={updateState} 
          toggleWall={toggleWall} 
          gridTool={gridTool}
          isEditingDisabled={isEditingDisabled}
        />
      </div>
    );
  }

  return (
    <TextVisualizer 
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
}

MainVisualization.propTypes = {
  algorithm: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  target: PropTypes.string,
  pattern: PropTypes.string,
  updateState: PropTypes.func,
  toggleWall: PropTypes.func,
  gridTool: PropTypes.string,
  isEditingDisabled: PropTypes.bool
};

export default function VisualizerFrame({ 
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
  history,
  preprocessing,
  onBack,
  gridTool,
  setGridTool
}) {
  const { isPlaying, togglePlay, stopPlay } = useVisualizerPlayback(nextStep, softReset, state.isFinished, algorithm.uiConfig?.playbackSpeed);
  const texts = useVisualizerLabels(algorithm, state);

  const isEditingDisabled = isPlaying || state.phase > 0 || (state.iterations || 0) > 0;
  const isArrayBased = algorithm.type === 'sorting' || algorithm.type === 'searching';

  return (
    <div className={classCategory.pageWrapper}>
      <div className={classCategory.mainPanel}>
        
        <MetricsBar 
          name={algorithm.name}
          phase={state.phase}
          isFinished={state.isFinished}
          phaseNames={algorithm.phaseNames}
          onBack={onBack}
          reset={() => { stopPlay(); factoryReset(); }}
          prevStep={() => { stopPlay(); prevStep(); }}
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
          state={state}
        />

        <div className="p-6 space-y-8">
          {/* Controls & Legend */}
          <div className="flex flex-col xl:flex-row gap-6 items-stretch">
            <div className="flex-[0.7] w-full">
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
              />
            </div>

            <div className="flex-[0.3] w-full">
              <Legend items={algorithm.legendItems || []} />
            </div>
          </div>

          {/* Main Display */}
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

          <AuxiliaryArrays state={state} />

          {/* Process & Details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col xl:flex-row gap-6 items-stretch">
              <div className="flex-1 w-full flex flex-col gap-6">
                <ProcessLog log={state.log} algorithm={algorithm} />
                
                <AlgorithmSidebar 
                  algorithm={algorithm}
                  state={state}
                  preprocessing={preprocessing}
                  target={target}
                  pattern={pattern}
                  texts={texts}
                  isArrayBased={isArrayBased}
                />
              </div>
              
              <div className="flex-1 w-full">
                {algorithm.codeSnippets && (
                  <CodePanel 
                    codeSnippets={algorithm.codeSnippets} 
                    lineHighlights={algorithm.lineHighlights}
                    activeStep={state.log?.codeStep || state.log?.title}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={classCategory.panelFooter}>
          <div className="flex items-center gap-2"><LayoutGrid className="w-3 h-3" /> {algorithm.category}</div>
          <div className="font-mono">Interactive Tool</div>
        </div>
      </div>
    </div>
  );
}

VisualizerFrame.propTypes = {
  algorithm: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    visualizerType: PropTypes.string,
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
      inputPlaceholder2: PropTypes.string
    })
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
  history: PropTypes.array.isRequired,
  preprocessing: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  gridTool: PropTypes.string,
  setGridTool: PropTypes.func
};
