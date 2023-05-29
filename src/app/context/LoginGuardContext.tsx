"use client";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { FC, PropsWithChildren, createContext, useState } from "react";
import { signIn } from "next-auth/react";

export const LoginGuardContext = createContext({ toggleShow: () => {} });

export const LoginGuardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [show, setShow] = useState(false);

  const toggleShow = (show = true) => setShow(show);

  return (
    <LoginGuardContext.Provider value={{ toggleShow }}>
      <Modal
        opened={show}
        onClose={() => setShow(false)}
        title="Login to Github"
      >
        <Stack>
          <Text size="sm" color="dimmed">
            You need to login to Github to explore the graph.
            <br />
            We will not store any of your data. We only use it to fetch the
            graph data
          </Text>
          <Button autoFocus onClick={() => signIn("github")}>
            Log in
          </Button>
        </Stack>
      </Modal>
      {children}
    </LoginGuardContext.Provider>
  );
};
