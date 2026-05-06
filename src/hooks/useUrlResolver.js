import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useNavigationState } from "./useNavigationState";
import { useGridControls } from "./useGridControls";
import { usePlaybackSettings } from "./usePlaybackSettings";

/**
 * useUrlResolver Hook (Architectural Upgrade)
 * Orchestrates navigation, grid, and playback settings into a unified algorithm engine.
 */
export const useUrlResolver = (algorithms) => {
  const { selectedAlgoId, setSelectedAlgoId, algorithm, onBack } = useNavigationState(algorithms);
  const { gridSize, setGridSize, gridTool, setGridTool, toggleWall, clearWalls } = useGridControls();
  const { playbackRate, setPlaybackRate } = usePlaybackSettings();

  const [target, setTarget] = useState("");
  const [pattern, setPattern] = useState("");
  const [state, setState] = useState({
    currentIndex: 0,
    isFinished: false,
    iterations: 0,
    comparisons: 0,
    accessedIndices: new Set(),
  });
  const [history, setHistory] = useState([]);

  /**
   * Universal Input Parser
   */
  const parseInput = useCallback((val, type) => {
    if (!val) return null;
    const isArrayType = type === "sorting" || type === "searching";
    
    if (isArrayType) {
      const arr = val
        .split(",")
        .map((s) => Number.parseInt(s.trim(), 10))
        .filter((n) => !Number.isNaN(n));
      if (arr.length > 0) return arr;
      const single = Number.parseInt(val.trim(), 10);
      return Number.isNaN(single) ? val : single;
    }
    return val;
  }, []);

  /**
   * Internal State Calculator
   */
  const getUrlState = useCallback(
    (algo, p, t, existingState = null) => {
      if (!algo?.getInitialState) return {};

      const customTarget = parseInput(t, algo.type || algo.category?.toLowerCase());
      const customPattern = parseInput(p, algo.type || algo.category?.toLowerCase());

      const config = {
        ...algo,
        gridConfig: { ...(algo.gridConfig || {}), ...gridSize },
      };

      const baseState = algo.getInitialState(customPattern, customTarget, config, existingState);

      // Persistence logic for pathfinding
      if (algo.type === "pathfinding" && existingState?.walls && !baseState.walls) {
        baseState.walls = existingState.walls;
      }

      // Metadata injection
      return {
        ...baseState,
        legendItems: algo.legendItems || [],
        log: {
          ...(baseState.log || {}),
          content: algo.extendedDescription || algo.description || baseState.log?.content || "",
        }
      };
    },
    [gridSize, parseInput],
  );

  /**
   * Core Control Functions
   */
  const softReset = useCallback(
    (algo = algorithm, p = pattern, t = target, preserveGrid = true) => {
      if (!algo) return;
      setState((prevState) => ({
        currentIndex: 0,
        isFinished: false,
        iterations: 0,
        comparisons: 0,
        accessedIndices: new Set(),
        ...getUrlState(algo, p, t, preserveGrid ? prevState : null),
      }));
      setHistory([]);
    },
    [algorithm, pattern, target, getUrlState],
  );

  const factoryReset = useCallback(() => {
    const defaults = algorithm.defaultInputs;
    setTarget(defaults.target);
    setPattern(defaults.pattern);
    softReset(algorithm, defaults.pattern, defaults.target, false);
  }, [algorithm, softReset]);

  // Sync state when algorithm changes or on initial mount
  const lastAlgoId = useRef(null);
  useEffect(() => {
    if (selectedAlgoId && lastAlgoId.current !== selectedAlgoId) {
      lastAlgoId.current = selectedAlgoId;
      const algo = algorithms.find((a) => a.id === selectedAlgoId);
      if (algo) {
        const { target: dt, pattern: dp } = algo.defaultInputs;
        setTimeout(() => {
          setTarget(dt);
          setPattern(dp);
          softReset(algo, dp, dt, true);
        }, 0);
      }
    }
  }, [selectedAlgoId, algorithms, softReset]);

  const handleSetTarget = useCallback(
    (val) => {
      setTarget(val);
      softReset(algorithm, pattern, val, true);
    },
    [algorithm, pattern, softReset],
  );

  const handleSetPattern = useCallback(
    (val) => {
      setPattern(val);
      softReset(algorithm, val, target, true);
    },
    [algorithm, target, softReset],
  );

  const preprocessing = useMemo(() => {
    return algorithm?.getPreprocessing ? algorithm.getPreprocessing(pattern, target) : {};
  }, [pattern, target, algorithm]);

  /**
   * Execution Logic
   */
  const nextStep = useCallback(() => {
    setState((prevState) => {
      if (prevState.isFinished || !algorithm?.nextStep) return prevState;

      const next = algorithm.nextStep(prevState, target, pattern, preprocessing);
      setHistory((prev) => [...prev, { ...prevState, accessedIndices: new Set(prevState.accessedIndices) }]);
      return next;
    });
  }, [algorithm, target, pattern, preprocessing]);

  const prevStep = useCallback(() => {
    if (history.length === 0) return;
    const lastState = history.at(-1);
    setHistory((prev) => prev.slice(0, -1));
    setState(lastState);
  }, [history]);

  const updateState = useCallback(
    (updater) => {
      setState((prev) => {
        const updates = typeof updater === "function" ? updater(prev) : updater;
        let next = { ...prev, ...updates };

        // Handle specific structural updates that require a partial re-init
        if (updates.startNode || updates.endNode || updates.rows || updates.cols) {
          const freshState = getUrlState(algorithm, pattern, target, next);
          next = { ...next, ...freshState, isFinished: false, iterations: 0, phase: 0 };
          setHistory([]);
        }
        return next;
      });
    },
    [algorithm, pattern, target, getUrlState],
  );

  return {
    // Navigation
    selectedAlgoId,
    setSelectedAlgoId,
    algorithm,
    onBack,
    
    // Inputs
    target,
    setTarget: handleSetTarget,
    pattern,
    setPattern: handleSetPattern,
    
    // Core Engine
    state,
    history,
    preprocessing,
    nextStep,
    prevStep,
    softReset,
    factoryReset,
    updateState,
    
    // Feature Controls
    toggleWall: (r, c) => toggleWall(r, c, setState),
    clearWalls: () => clearWalls(setState, state.startNode),
    gridTool,
    setGridTool,
    gridSize,
    setGridSize: (r, c) => {
      setGridSize({ rows: r, cols: c });
      softReset(algorithm, pattern, target, false);
    },
    playbackRate,
    setPlaybackRate,
  };
};
