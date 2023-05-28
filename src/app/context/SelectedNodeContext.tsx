"use client";
import { Drawer } from "@mantine/core";
import { FC, PropsWithChildren, createContext } from "react";
import { useEntity, useSelected } from "../hooks";

const SelectedNodeContext = createContext(null);

export const SelectedNodeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { selected, selectNode } = useSelected();

  const entity = useEntity({ entity: selected });

  return (
    <SelectedNodeContext.Provider value={null}>
      <Drawer
        size="sm"
        withOverlay={false}
        opened={!!entity}
        onClose={selectNode}
        title={selected?.type === "user" ? "User" : "Repository"}
        position="right"
      >
        {JSON.stringify(entity)}
      </Drawer>
      {children}
    </SelectedNodeContext.Provider>
  );
};
