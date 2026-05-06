import { Routes, Route, useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "@/layout/Home";
import VisualiserFrame from "@/layout/VisualiserFrame";


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

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="flex-1 flex flex-col"
  >
    {children}
  </motion.div>
);

/**
 * AppRouter Component
 * Uses react-router-dom to manage navigation between algorithms.
 */
export const AppRouter = ({ categories, algorithms, stateManager }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home
                  categories={categories}
                  algorithms={algorithms}
                  onSelect={(id) => {
                    stateManager.setSelectedAlgoId(id);
                    navigate(`/${id}`);
                  }}
                />
              </PageTransition>
            }
          />

          <Route
            path="/:algoId"
            element={
              <PageTransition>
                <VisualiserWrapper stateManager={stateManager} algorithms={algorithms} />
              </PageTransition>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const VisualiserWrapper = ({ stateManager, algorithms }) => {
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
    <VisualiserFrame
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
