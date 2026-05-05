/**
 * Algorithm Card Factory
 * Enforces a consistent schema for all algorithms in the system.
 */
export const createAlgorithmCard = (config) => {
  const { metadata = {}, homeCard = {}, algorithmPage = {} } = config;
  
  return {
    id: config.id,
    name: config.name || metadata.name || homeCard.name,
    type: config.type || metadata.type || homeCard.type,
    category: config.category || metadata.category || homeCard.category,
    difficulty: config.difficulty || metadata.difficulty || homeCard.difficulty,
    description: config.description || metadata.description || homeCard.description,
    extendedDescription: config.extendedDescription || metadata.extendedDescription || algorithmPage.extendedDescription,
    
    // Logic
    getInitialState: config.getInitialState,
    nextStep: config.nextStep,
    getPreprocessing: config.getPreprocessing,
    
    // UI Metadata
    visualizerType: config.visualizerType || metadata.visualizerType || algorithmPage.visualizerType,
    defaultInputs: config.defaultInputs || metadata.defaultInputs || algorithmPage.defaultInputs || { target: '', pattern: '' },
    complexity: config.complexity || metadata.complexity || homeCard.complexity,
    legendItems: config.legendItems || metadata.legendItems || algorithmPage.legendItems || [],
    visualSteps: config.visualSteps || metadata.visualSteps || algorithmPage.visualSteps || {},
    uiConfig: config.uiConfig || metadata.uiConfig || algorithmPage.uiConfig || {},
    codeSnippets: config.codeSnippets || metadata.codeSnippets || algorithmPage.codeSnippets || {},
    lineHighlights: config.lineHighlights || metadata.lineHighlights || algorithmPage.lineHighlights || {},
    phaseNames: config.phaseNames || metadata.phaseNames || algorithmPage.phaseNames || []
  };
};