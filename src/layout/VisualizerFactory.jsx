import PropTypes from "prop-types";
import ArrayVisualizer from "../../visualizers/ArrayVisualizer";
import TextVisualizer from "../../visualizers/TextVisualizer";
import ZVisualizer from "../../visualizers/ZVisualizer";
import GridVisualizer from "../../visualizers/GridVisualizer";
import BinaryTreeVisualizer from "../../visualizers/BinaryTreeVisualizer";
import GraphVisualizer from "../../visualizers/GraphVisualizer";

const VisualizerFactory = ({ algorithmType, ...props }) => {
  switch (algorithmType) {
    case "array":
    case "sorting":
    case "searching":
      return <ArrayVisualizer {...props} />;
    case "text":
    case "pattern-matching":
      return <TextVisualizer {...props} />;
    case "z-algorithm":
      return <ZVisualizer {...props} />;
    case "grid":
    case "matrix":
    case "grid-problems":
      return <GridVisualizer {...props} />;
    case "tree":
    case "binary-tree":
      return <BinaryTreeVisualizer {...props} />;
    case "graph":
    case "graph-traversal":
      return <GraphVisualizer {...props} />;
    default:
      return (
        <div className="text-center p-12 text-slate-400">
          <h3 className="text-xl font-bold text-white mb-2">Unknown Algorithm</h3>
          <p className="text-slate-500">No visualizer available for type: {algorithmType}</p>
        </div>
      );
  }
};

VisualizerFactory.propTypes = {
  algorithmType: PropTypes.string.isRequired,
  data: PropTypes.array,
  step: PropTypes.number,
  isPaused: PropTypes.bool,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onStepForward: PropTypes.func,
  onStepBackward: PropTypes.func,
  onReset: PropTypes.func,
  config: PropTypes.object,
};

export default VisualizerFactory;
