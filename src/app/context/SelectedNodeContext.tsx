"use client";
import { Drawer } from "@mantine/core";
import { FC, PropsWithChildren, createContext } from "react";
import EntityDetails from "../components/EntityDetails";
import SideBarTitle from "../components/SideBarTitle";
import { useEntity, useSelected } from "../hooks";

const SelectedNodeContext = createContext(null);

export const SelectedNodeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { selected, selectNode } = useSelected();

  const entity = useEntity({ entity: selected });

  return (
    <SelectedNodeContext.Provider value={null}>
      <Drawer
        styles={(theme) => ({
          inner: { marginTop: 60 },
          content: {
            boxShadow: theme.colorScheme === "dark" ? "none" : theme.shadows.sm,
            borderLeft:
              theme.colorScheme === "dark"
                ? `1px solid ${theme.colors.gray[9]}`
                : `1px solid ${theme.colors.gray[2]}`,
          },
        })}
        withinPortal
        className="z-100"
        size="sm"
        withOverlay={false}
        opened={!!entity}
        onClose={selectNode}
        title={<SideBarTitle entity={entity} type={selected?.type} />}
        position="right"
      >
        {entity && <EntityDetails entity={entity} type={selected?.type} />}
      </Drawer>
      {children}
    </SelectedNodeContext.Provider>
  );
};
