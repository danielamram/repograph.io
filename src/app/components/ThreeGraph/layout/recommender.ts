import { GraphEdge, GraphNode } from '../types';
import { getNodeDepth } from './depthUtils';
import { LayoutTypes } from './types';

export function recommendLayout(
  nodes: GraphNode[],
  edges: GraphEdge[]
): LayoutTypes {
  const { invalid } = getNodeDepth(nodes as any[], edges as any[]);
  const nodeCount = nodes.length;

  if (!invalid) {
    // Large tree layouts
    if (nodeCount > 100) {
      return 'radialOut2d';
    } else {
      // Smaller tree layouts
      return 'treeTd2d';
    }
  }

  // Circular layouts
  return 'forceDirected2d';
}
