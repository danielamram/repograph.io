"use client";
import { Avatar, Drawer } from "@mantine/core";
import { FC, PropsWithChildren, createContext } from "react";
import { useEntity, useSelected } from "../hooks";
import { BasicLogin } from "../types";

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
        title={
          selected?.type === "user" ? (
            <Avatar src={(entity as BasicLogin).avatarUrl} />
          ) : (
            "Repository"
          )
        }
        position="right"
      >
        {JSON.stringify(entity)}
      </Drawer>
      {children}
    </SelectedNodeContext.Provider>
  );
};
