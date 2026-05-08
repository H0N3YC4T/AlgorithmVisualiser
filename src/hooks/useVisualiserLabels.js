import { useMemo, useCallback } from "react";
import { uiDefaults } from "@/constants/ui";


export default function useVisualiserLabels(algorithm, state, historyLength = 0) {
  // Resolve properties with fallbacks for schema compatibility
  const metadata = useMemo(() => algorithm?.metadata || {}, [algorithm]);
  const uiConfig = useMemo(() => algorithm?.algorithmPage?.uiConfig || algorithm?.uiConfig || {}, [algorithm]);
  const name = useMemo(() => algorithm?.homeCard?.name || algorithm?.name || "", [algorithm]);
  const type = useMemo(() => metadata.type || algorithm?.type || "", [algorithm, metadata]);

  const getButtonText = useCallback(() => {
    if (!state) return uiDefaults.labels.next;
    if (state.isFinished) return uiDefaults.labels.restart;
    
    if (historyLength > 0) return uiDefaults.labels.next;

    if (uiConfig.startButton) return uiConfig.startButton;

    if (type === "data-structure") return uiDefaults.labels.startOperation;
    if (type === "sorting") return uiDefaults.labels.startSort;
    return uiDefaults.labels.startSearch;
  }, [state, historyLength, type, uiConfig.startButton]);

  const texts = useMemo(() => {
    if (!algorithm) return { button: uiDefaults.labels.next, label: "", vizTitle: "" };

    const isSorting = type === "sorting";
    const isSearching = type === "searching";

    // Status Label
    let label = uiConfig.statusLabel || `${name} State`;

    // Replace any {key} with state[key]
    label = label.replaceAll(/{(\w+)}/g, (_, key) => {
      const val = state?.[key];
      return val === undefined ? `{${key}}` : val;
    });

    if (!uiConfig.statusLabel) {
      if (isSorting) {
        label = uiDefaults.labels.arrayElements;
      } else if (isSearching) {
        label = uiDefaults.labels.targetValue.replace("{value}", state?.targetValue || "");
      }
    }

    // Visualization Title
    let vizTitle = uiConfig.vizTitle;
    if (!vizTitle) {
      if (isSorting) vizTitle = uiDefaults.labels.sortingViz;
      else if (isSearching) vizTitle = uiDefaults.labels.searchingViz;
      else vizTitle = uiDefaults.labels.dsViz;
    }

    const inputLabel1 =
      uiConfig.inputLabel1 || (isSearching || isSorting ? uiDefaults.labels.arrayInput : uiDefaults.labels.targetText);
    const inputLabel2 = uiConfig.inputLabel2 || (isSearching ? uiDefaults.labels.target : uiDefaults.labels.pattern);
    const inputPlaceholder1 =
      uiConfig.inputPlaceholder1 || (isSorting || isSearching ? uiDefaults.labels.arrayPlaceholder : "");
    const inputPlaceholder2 =
      uiConfig.inputPlaceholder2 || (isSearching ? uiDefaults.labels.target : uiDefaults.labels.pattern);

    return {
      button: getButtonText(),
      isStarted: historyLength > 0,
      label,
      vizTitle,
      inputLabel1,
      inputLabel2,
      inputPlaceholder1,
      inputPlaceholder2,
    };
  }, [algorithm, state, getButtonText, historyLength, uiConfig, type, name]);

  return texts;
}
