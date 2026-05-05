import { useState, useMemo, useCallback } from "react";

/**
 * useAlgorithmState Hook
 * Manages all algorithm-related states, preprocessing, and step-by-step logic.
 */
export const useAlgorithmState = (algorithms, initialAlgoId = null) => {
  const [selectedAlgoId, setSelectedAlgoId] = useState(initialAlgoId || algorithms[0].id);
  const [target, setTarget] = useState(
    algorithms.find((a) => a.id === (initialAlgoId || algorithms[0].id)).defaultInputs.target,
  );
  const [pattern, setPattern] = useState(
    algorithms.find((a) => a.id === (initialAlgoId || algorithms[0].id)).defaultInputs.pattern,
  );
  const [gridTool, setGridTool] = useState("wall");

  const algorithm = useMemo(() => {
    return algorithms.find((a) => a.id === selectedAlgoId) || algorithms[0];
  }, [selectedAlgoId, algorithms]);

  const parseInput = (val, type) => {
    if (!val) return null;
    if (type === "sorting" || type === "searching") {
      const arr = val
        .split(",")
        .map((s) => Number.parseInt(s.trim(), 10))
        .filter((n) => !Number.isNaN(n));
      if (arr.length > 0) return arr;
      const single = Number.parseInt(val.trim(), 10);
      return Number.isNaN(single) ? val : single;
    }
    return val;
  };

  const getInitialAlgoState = useCallback((algo, p, t, existingState = null) => {
    if (!algo.getInitialState) return {};

    const customTarget = parseInput(t, algo.type || algo.category?.toLowerCase());
    const customPattern = parseInput(p, algo.type || algo.category?.toLowerCase());

    const baseState = algo.getInitialState(customPattern, customTarget, algo, existingState);

    // Maintain grid state for pathfinding
    if (algo.type === "pathfinding" && existingState?.walls && !baseState.walls) {
      baseState.walls = existingState.walls;
    }

    if (baseState.log) {
      baseState.log = {
        ...baseState.log,
        content: algo.extendedDescription || algo.description || baseState.log.content,
      };
    }

    baseState.legendItems = algo.legendItems || [];
    return baseState;
  }, []);

  const [state, setState] = useState(() => {
    const initialAlgo = algorithms.find((a) => a.id === (initialAlgoId || algorithms[0].id));
    const initialAlgoState = getInitialAlgoState(
      initialAlgo,
      initialAlgo.defaultInputs.pattern,
      initialAlgo.defaultInputs.target,
    );
    return {
      currentIndex: 0,
      isFinished: false,
      iterations: 0,
      comparisons: 0,
      ...initialAlgoState,
    };
  });

  const [history, setHistory] = useState([]);

  const preprocessing = useMemo(() => {
    return algorithm.getPreprocessing ? algorithm.getPreprocessing(pattern, target) : {};
  }, [pattern, target, algorithm]);

  const softReset = useCallback(
    (algo = algorithm, p = pattern, t = target, preserveGrid = true) => {
      if (!algo) return;
      setState((prevState) => ({
        currentIndex: 0,
        isFinished: false,
        iterations: 0,
        comparisons: 0,
        accessedIndices: new Set(),
        ...getInitialAlgoState(algo, p, t, preserveGrid ? prevState : null),
      }));
      setHistory([]);
    },
    [algorithm, pattern, target, getInitialAlgoState],
  );

  const factoryReset = useCallback(() => {
    const defaults = algorithm.defaultInputs;
    setTarget(defaults.target);
    setPattern(defaults.pattern);
    softReset(algorithm, defaults.pattern, defaults.target, false);
  }, [algorithm, softReset]);

  const handleSelectAlgorithm = useCallback(
    (id) => {
      setSelectedAlgoId(id);
      const algo = algorithms.find((a) => a.id === id);
      const defaults = algo.defaultInputs;
      setTarget(defaults.target);
      setPattern(defaults.pattern);
      softReset(algo, defaults.pattern, defaults.target);
    },
    [algorithms, softReset],
  );

  const handleSetTarget = useCallback(
    (val) => {
      setTarget(val);
      setState((prevState) => ({
        currentIndex: 0,
        isFinished: false,
        iterations: 0,
        comparisons: 0,
        accessedIndices: new Set(),
        ...getInitialAlgoState(algorithm, pattern, val, prevState),
      }));
      setHistory([]);
    },
    [algorithm, pattern, getInitialAlgoState],
  );

  const handleSetPattern = useCallback(
    (val) => {
      setPattern(val);
      setState((prevState) => ({
        currentIndex: 0,
        isFinished: false,
        iterations: 0,
        comparisons: 0,
        accessedIndices: new Set(),
        ...getInitialAlgoState(algorithm, val, target, prevState),
      }));
      setHistory([]);
    },
    [algorithm, target, getInitialAlgoState],
  );

  const nextStep = useCallback(() => {
    setState((prevState) => {
      if (prevState.isFinished) return prevState;

      // Safety check: if nextStep doesn't exist, finish the algorithm
      if (!algorithm.nextStep) {
        return {
          ...prevState,
          isFinished: true,
          log: { ...prevState.log, content: "Algorithm logic not implemented." },
        };
      }

      const next = algorithm.nextStep(prevState, target, pattern, preprocessing);
      setHistory((prevHist) => [
        ...prevHist,
        {
          ...prevState,
          accessedIndices: new Set(prevState.accessedIndices),
        },
      ]);
      return next;
    });
  }, [algorithm, target, pattern, preprocessing]);

  const prevStep = useCallback(() => {
    if (history.length === 0) return;
    const lastState = history.at(-1);
    setHistory((prev) => prev.slice(0, -1));
    setState(lastState);
  }, [history]);

  const handleUpdateState = useCallback(
    (updater) => {
      setState((prev) => {
        const updates = typeof updater === "function" ? updater(prev) : updater;
        let next = { ...prev, ...updates };

        if (updates.startNode || updates.endNode) {
          const freshState = getInitialAlgoState(algorithm, pattern, target, next);
          next = { ...next, ...freshState };
          next.isFinished = false;
          next.iterations = 0;
          next.phase = 0;
          setHistory([]);
        }
        return next;
      });
    },
    [algorithm, pattern, target, getInitialAlgoState],
  );

  const handleWallToggle = useCallback((r, c) => {
    setState((prev) => {
      if (prev.isFinished || prev.phase !== 0) return prev;
      const walls = prev.walls || [];
      const exists = walls.some((w) => w.r === r && w.c === c);
      const newWalls = exists ? walls.filter((w) => !(w.r === r && w.c === c)) : [...walls, { r, c }];
      return { ...prev, walls: newWalls };
    });
  }, []);

  return {
    selectedAlgoId,
    setSelectedAlgoId: handleSelectAlgorithm,
    algorithm,
    target,
    setTarget: handleSetTarget,
    pattern,
    setPattern: handleSetPattern,
    state,
    history,
    nextStep,
    prevStep,
    softReset,
    factoryReset,
    updateState: handleUpdateState,
    toggleWall: handleWallToggle,
    gridTool,
    setGridTool,
    preprocessing,
  };
};
