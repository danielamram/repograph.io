import { StateCreator } from "zustand";
import { getContributors, getRepositoriesByLogin } from "../api/gh";
import { BasicLogin, BasicRepository } from "../types";
import { transformConToLogin, transformToRepos } from "../utils/users";
import { SelectedNodeSlice } from "./SelectedNodeSlice";

export interface ReposSlice {
  repositories: BasicRepository[];
  users: BasicLogin[];
  reposToUsers: Record<string, string[]>;
  fetchRepoUsers: (nameWithOwner: string) => Promise<void>;
  fetchUserRepos: (login: string) => Promise<void>;
}
const createReposSlice: StateCreator<
  ReposSlice & SelectedNodeSlice,
  [],
  [],
  ReposSlice
> = (set) => ({
  repositories: [],
  users: [],
  reposToUsers: {},
  fetchRepoUsers: async (nameWithOwner: string) => {
    const cons = await getContributors(nameWithOwner);
    const logins = cons.map(transformConToLogin);
    set((state) => ({
      repositories: [...state.repositories, { nameWithOwner }],
      users: [...state.users, ...logins],
      reposToUsers: {
        ...state.reposToUsers,
        [nameWithOwner]: logins.map((l) => l.login),
      },
    }));
  },
  fetchUserRepos: async (login: string) => {
    const reposData = await getRepositoriesByLogin(login);
    const repos = transformToRepos(reposData);

    set((state) => ({
      repositories: [
        ...state.repositories,
        ...repos.filter(
          ({ nameWithOwner }) =>
            !state.repositories.some(
              ({ nameWithOwner: n }) => n === nameWithOwner
            )
        ),
      ],
      reposToUsers: {
        ...state.reposToUsers,
        ...repos.reduce((acc, { nameWithOwner }) => {
          acc[nameWithOwner] = [
            ...(state.reposToUsers[nameWithOwner] || acc[nameWithOwner] || []),
            login,
          ];
          return acc;
        }, {} as Record<string, string[]>),
      },
    }));
  },
});

export { createReposSlice };
