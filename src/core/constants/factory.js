/**
 * Algorithm Card Factory
 * Enforces a consistent schema for all algorithms in the system.
 */
export const createAlgorithmCard = (config) => {
  return {
    id: config.id,
    name: config.name || config.metadata?.name,
    type: config.type || config.metadata?.type,
    category: config.category || config.metadata?.category,
    difficulty: config.difficulty || config.metadata?.difficulty,
    description: config.description || config.metadata?.description,
    extendedDescription: config.extendedDescription || config.metadata?.extendedDescription,
    
    // Logic
    getInitialState: config.getInitialState,
    nextStep: config.nextStep,
    getPreprocessing: config.getPreprocessing,
    
    // UI Metadata
    visualizerType: config.visualizerType || config.metadata?.visualizerType,
    defaultInputs: config.defaultInputs || config.metadata?.defaultInputs || { target: '', pattern: '' },
    complexity: config.complexity || config.metadata?.complexity,
    legendItems: config.legendItems || config.metadata?.legendItems || [],
    stepMessages: config.stepMessages || config.metadata?.stepMessages || {},
    uiConfig: config.uiConfig || config.metadata?.uiConfig || {},
    codeSnippets: config.codeSnippets || config.metadata?.codeSnippets || {},
    lineHighlights: config.lineHighlights || config.metadata?.lineHighlights || {},
    phaseNames: config.phaseNames || config.metadata?.phaseNames || []
  };
};