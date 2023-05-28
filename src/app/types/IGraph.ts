import { GraphEdge, GraphNode } from "reagraph";
import { BasicLogin } from "./Contributor";
import { BasicRepository } from "./Repository";

export interface IGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export type NodeType = "user" | "repo";

export type NodeData = {
  obj: BasicLogin | BasicRepository;
  type: NodeType;
};
