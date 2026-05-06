import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * useAlgorithmState Hook
 * Manages all algorithm-related states, preprocessing, and step-by-step logic.
 * Synchronizes selected algorithm with the URL path.
 */
export const useUrlResolver = (algorithms) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedAlgoId = useMemo(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const id = pathParts[pathParts.length - 1];
    return algorithms.some((a) => a.id === id) ? id : algorithms[0].id;
  }, [location.pathname, algorithms]);

  const [target, setTarget] = useState(algorithms.find((a) => a.id === selectedAlgoId)?.defaultInputs.target || "");
  const [pattern, setPattern] = useState(algorithms.find((a) => a.id === selectedAlgoId)?.defaultInputs.pattern || "");
  const [gridTool, setGridTool] = useState("wall");
  const [playbackRate, setPlaybackRate] = useState(1);
  const [gridSize, setGridSize] = useState({ rows: 18, cols: 30 });

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

  const getUrlState = useCallback(
    (algo, p, t, existingState = null) => {
      if (!algo.getInitialState) return {};

      const customTarget = parseInput(t, algo.type || algo.category?.toLowerCase());
      const customPattern = parseInput(p, algo.type || algo.category?.toLowerCase());

      // Merge grid size into config for initialization
      const configWithGrid = {
        ...algo,
        gridConfig: {
          ...(algo.gridConfig || {}),
          rows: gridSize.rows,
          cols: gridSize.cols,
        },
      };

      const baseState = algo.getInitialState(customPattern, customTarget, configWithGrid, existingState);

      // Maintain grid state for pathfinding if preserving
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
    },
    [gridSize],
  );

  const [state, setState] = useState(() => {
    const initialAlgo = algorithms.find((a) => a.id === selectedAlgoId);
    const initialAlgoState = getUrlState(initialAlgo, pattern, target);
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
        ...getUrlState(algo, p, t, preserveGrid ? prevState : null),
      }));
      setHistory([]);
    },
    [algorithm, pattern, target, getUrlState],
  );

  // Sync state when algorithm changes (Reset to defaults)
  const lastAlgoId = useRef(selectedAlgoId);
  useEffect(() => {
    if (lastAlgoId.current !== selectedAlgoId) {
      lastAlgoId.current = selectedAlgoId;
      setTimeout(() => {
        const algo = algorithms.find((a) => a.id === selectedAlgoId);
        if (algo) {
          const defaults = algo.defaultInputs;
          setTarget(defaults.target);
          setPattern(defaults.pattern);
          softReset(algo, defaults.pattern, defaults.target, true);
        }
      }, 0);
    }
  }, [selectedAlgoId, algorithms, softReset]);

  const factoryReset = useCallback(() => {
    const defaults = algorithm.defaultInputs;
    setTarget(defaults.target);
    setPattern(defaults.pattern);
    softReset(algorithm, defaults.pattern, defaults.target, false);
  }, [algorithm, softReset]);

  const handleSelectPage = useCallback(
    (id) => {
      if (id === selectedAlgoId) return;
      navigate(`/${id}`);
    },
    [selectedAlgoId, navigate],
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
        ...getUrlState(algorithm, pattern, val, prevState),
      }));
      setHistory([]);
    },
    [algorithm, pattern, getUrlState],
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
        ...getUrlState(algorithm, val, target, prevState),
      }));
      setHistory([]);
    },
    [algorithm, target, getUrlState],
  );

  const nextStep = useCallback(() => {
    setState((prevState) => {
      if (prevState.isFinished) return prevState;

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

        if (updates.startNode || updates.endNode || updates.rows || updates.cols) {
          const freshState = getUrlState(algorithm, pattern, target, next);
          next = { ...next, ...freshState };
          next.isFinished = false;
          next.iterations = 0;
          next.phase = 0;
          setHistory([]);
        }
        return next;
      });
    },
    [algorithm, pattern, target, getUrlState],
  );

  const handleWallToggle = useCallback((r, c) => {
    setState((prev) => {
      if (prev.isFinished || prev.phase !== 0) return prev;
      const key = `${r},${c}`;

      if (prev.walls instanceof Set) {
        const newWalls = new Set(prev.walls);
        if (newWalls.has(key)) newWalls.delete(key);
        else newWalls.add(key);
        return { ...prev, walls: newWalls };
      }

      const walls = prev.walls || [];
      const exists = walls.some((w) => w.r === r && w.c === c);
      const newWalls = exists ? walls.filter((w) => !(w.r === r && w.c === c)) : [...walls, { r, c }];
      return { ...prev, walls: newWalls };
    });
  }, []);

  const handleWallClear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      walls: prev.walls instanceof Set ? new Set() : [],
      isFinished: false,
      iterations: 0,
      phase: 0,
      visited: new Set(),
      path: [],
      queue: [prev.startNode],
      stack: [prev.startNode],
      distances: { [`${prev.startNode.r},${prev.startNode.c}`]: 0 },
      gScore: { [`${prev.startNode.r},${prev.startNode.c}`]: 0 },
      fScore: { [`${prev.startNode.r},${prev.startNode.c}`]: 0 },
    }));
    setHistory([]);
  }, []);

  const handleSetGridSize = useCallback(
    (rows, cols) => {
      setGridSize({ rows, cols });
      // Trigger a soft reset with new dimensions
      softReset(algorithm, pattern, target, false);
    },
    [algorithm, pattern, target, softReset],
  );

  return {
    selectedAlgoId,
    setSelectedAlgoId: handleSelectPage,
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
    clearWalls: handleWallClear,
    gridTool,
    setGridTool,
    gridSize,
    setGridSize: handleSetGridSize,
    playbackRate,
    setPlaybackRate,
    preprocessing,
  };
};
