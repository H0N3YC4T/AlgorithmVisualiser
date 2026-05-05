import { Routes, Route, useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../layout/Home";
import VisualizerFrame from "../layout/VisualizerFrame";

/**
 * ScrollToTop Component
 * Resets the scroll position to the top of the page on route changes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * AppRouter Component
 * Uses react-router-dom to manage navigation between algorithms.
 */
export const AppRouter = ({ categories, algorithms, stateManager }) => {
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route
        path="/"
        element={
          <Home
            categories={categories}
            algorithms={algorithms}
            onSelect={(id) => {
              stateManager.setSelectedAlgoId(id);
              navigate(`/${id}`);
            }}
          />
        }
      />

      <Route
        path="/:algoId"
        element={<VisualizerWrapper stateManager={stateManager} algorithms={algorithms} />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const VisualizerWrapper = ({ stateManager, algorithms }) => {
  const { algoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (algoId && stateManager.selectedAlgoId !== algoId) {
      const exists = algorithms.some((a) => a.id === algoId);
      if (exists) {
        stateManager.setSelectedAlgoId(algoId);
      } else {
        navigate("/");
      }
    }
  }, [algoId, stateManager, algorithms, navigate]);

  return (
    <VisualizerFrame
      key={stateManager.algorithm.id}
      algorithm={stateManager.algorithm}
      state={stateManager.state}
      target={stateManager.target}
      setTarget={stateManager.setTarget}
      pattern={stateManager.pattern}
      setPattern={stateManager.setPattern}
      softReset={stateManager.softReset}
      factoryReset={stateManager.factoryReset}
      nextStep={stateManager.nextStep}
      prevStep={stateManager.prevStep}
      updateState={stateManager.updateState}
      toggleWall={stateManager.toggleWall}
      clearWalls={stateManager.clearWalls}
      history={stateManager.history}
      preprocessing={stateManager.preprocessing}
      onBack={() => navigate("/")}
      gridTool={stateManager.gridTool}
      setGridTool={stateManager.setGridTool}
      playbackRate={stateManager.playbackRate}
      setPlaybackRate={stateManager.setPlaybackRate}
      gridSize={stateManager.gridSize}
      setGridSize={stateManager.setGridSize}
    />
  );
};
