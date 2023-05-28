"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { FC, PropsWithChildren, createContext, useEffect } from "react";
import AppHeader from "../components/Header";
import { setToken } from "../graphql";
import { useEntities } from "../hooks";

const AuthContext = createContext(null);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { fetchRepoUsers } = useEntities();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    setToken(session?.accessToken || "");
    fetchRepoUsers("pmndrs/react-spring");
  }, [fetchRepoUsers, session]);

  if (!session) return null;

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

const WithProvidersContext = createContext(null);

export const WithProviders: FC<PropsWithChildren> = ({ children }) => (
  <WithProvidersContext.Provider value={null}>
    <SessionProvider>
      <AppHeader />
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  </WithProvidersContext.Provider>
);
