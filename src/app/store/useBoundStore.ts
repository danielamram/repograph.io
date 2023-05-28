import { create } from "zustand";
import { ReposSlice, createReposSlice } from "./ReposSlice";
import {
  SelectedNodeSlice,
  createSelectedNodeSlice,
} from "./SelectedNodeSlice";

const useBoundStore = create<ReposSlice & SelectedNodeSlice>()((...a) => ({
  ...createReposSlice(...a),
  ...createSelectedNodeSlice(...a),
}));

export default useBoundStore;
