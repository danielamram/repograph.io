import { StateCreator } from "zustand";
import { NodeType } from "../types";
import { ReposSlice } from "./ReposSlice";

interface SelectedNode {
  id: string;
  type: NodeType;
}

export interface SelectedNodeSlice {
  selected: SelectedNode | null;
  selectNode: (selected?: SelectedNode) => void;
}
const createSelectedNodeSlice: StateCreator<
  ReposSlice & SelectedNodeSlice,
  [],
  [],
  SelectedNodeSlice
> = (set) => ({
  selected: null,
  selectNode: (selected: SelectedNode | null = null) => {
    set((state) => ({
      selected: selected,
    }));
  },
});

export { createSelectedNodeSlice };
