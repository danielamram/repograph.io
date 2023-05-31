import { FC, useRef } from "react";
import { IGraph, NodeData } from "../types";
import {
  GraphCanvas,
  GraphCanvasRef,
  SphereWithIcon,
  darkTheme,
  useSelection,
} from "./ThreeGraph";

const Graph: FC<{ graph: IGraph; onNodeClick: (data?: NodeData) => void }> = ({
  graph,
  onNodeClick: onNodeClickProp,
}) => {
  const graphRef = useRef<GraphCanvasRef | null>(null);
  const { selections, onNodeClick, onCanvasClick, actives } = useSelection({
    ref: graphRef,
    ...graph,
    type: "single",
    // pathSelectionType: "all",
  });

  return (
    <GraphCanvas
      theme={darkTheme}
      ref={graphRef}
      onNodeClick={(node, props) => {
        onNodeClickProp(node.data);
        onNodeClick && onNodeClick(node);
      }}
      onCanvasClick={(e) => {
        onNodeClickProp();
        onCanvasClick && onCanvasClick(e);
      }}
      selections={selections}
      nodes={graph.nodes}
      edges={graph.edges}
      actives={actives}
      renderNode={({ node, ...rest }) => (
        <SphereWithIcon {...rest} node={node} image={node.icon || ""} />
      )}
    />
  );
};

export default Graph;
