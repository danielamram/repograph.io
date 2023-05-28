import useBoundStore from "../store/useBoundStore";

export const useSelected = () => {
  const state = useBoundStore((state) => ({
    selected: state.selected,
    selectNode: state.selectNode,
  }));

  return { ...state };
};
