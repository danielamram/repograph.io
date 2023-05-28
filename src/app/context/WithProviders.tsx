"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FC, PropsWithChildren, createContext, useEffect } from "react";
import AppHeader from "../components/Header";
import { setToken } from "../graphql";
import { useEntities } from "../hooks";
import WithSpotlight from "./WithSpotlight";

const InitContext = createContext(null);

const InitProvider: FC<PropsWithChildren> = ({ children }) => {
  const urlSearchParams = useSearchParams();
  const { fetchRepoUsers, fetchUserRepos } = useEntities();

  useEffect(() => {
    const id = urlSearchParams.get("id");
    if (!id) fetchRepoUsers("codesandbox/sandpack");
    else if (id.includes("/")) fetchRepoUsers(id);
    else fetchUserRepos(id);
  }, [fetchRepoUsers, fetchUserRepos, urlSearchParams]);

  return <InitContext.Provider value={null}>{children}</InitContext.Provider>;
};

const AuthContext = createContext(null);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { fetchRepoUsers } = useEntities();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    setToken(session?.accessToken || "");
  }, [fetchRepoUsers, session]);

  if (!session) return null;

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

const WithProvidersContext = createContext(null);

export const WithProviders: FC<PropsWithChildren> = ({ children }) => (
  <WithProvidersContext.Provider value={null}>
    <SessionProvider>
      <AppHeader />
      <AuthProvider>
        <>
          <WithSpotlight />
          <InitProvider />
          {children}
        </>
      </AuthProvider>
    </SessionProvider>
  </WithProvidersContext.Provider>
);
