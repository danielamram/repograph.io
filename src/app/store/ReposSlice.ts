import { StateCreator } from "zustand";
import {
  getContributors,
  getRepositoriesByLogin,
  getRepository,
  getUser,
} from "../api/gh";
import { BasicLogin, BasicRepository } from "../types";
import { transformConToLogin, transformToRepos } from "../utils/users";
import { SelectedNodeSlice } from "./SelectedNodeSlice";

export interface ReposSlice {
  repositories: BasicRepository[];
  users: BasicLogin[];
  reposToUsers: Record<string, string[]>;
  reset: () => void;
  fetchRepoData: (nameWithOwner: string) => Promise<void>;
  fetchUserData: (login: string) => Promise<void>;
  fetchRepoUsers: (nameWithOwner: string) => Promise<void>;
  fetchUserRepos: (login: string) => Promise<void>;
}
const createReposSlice: StateCreator<
  ReposSlice & SelectedNodeSlice,
  [],
  [],
  ReposSlice
> = (set, get) => ({
  repositories: [],
  users: [],
  reposToUsers: {},
  reset: () => {
    set(() => ({
      repositories: [],
      users: [],
      reposToUsers: {},
    }));
  },
  fetchUserData: async (login: string) => {
    if (get().users.find((user) => user.login === login)?.extraData) return;

    const extraData = await getUser(login);

    set((state) => ({
      users: state.users.map((user) =>
        user.login === login
          ? {
              ...user,
              extraData,
            }
          : user
      ),
    }));
  },
  fetchRepoData: async (nameWithOwner: string) => {
    if (
      get().repositories.find((repo) => repo.nameWithOwner === nameWithOwner)
        ?.extraData
    )
      return;

    const extraData = await getRepository(nameWithOwner);

    set((state) => ({
      repositories: state.repositories.map((repo) =>
        repo.nameWithOwner === nameWithOwner
          ? {
              ...repo,
              extraData,
            }
          : repo
      ),
    }));
  },
  fetchRepoUsers: async (nameWithOwner: string) => {
    const cons = await getContributors(nameWithOwner);
    const logins = cons.map(transformConToLogin);

    set((state) => ({
      repositories: [
        ...state.repositories,
        ...(state.repositories.find(
          (repo) => repo.nameWithOwner === nameWithOwner
        )
          ? []
          : [{ nameWithOwner }]),
      ],
      users: [
        ...state.users,
        ...logins.filter(
          ({ login }) => !state.users.some((u) => u.login === login)
        ),
      ],
      reposToUsers: {
        ...state.reposToUsers,
        [nameWithOwner]: [
          ...(state.reposToUsers[nameWithOwner] || []),
          ...logins
            .map((l) => l.login)
            .filter(
              (login) =>
                !(state.reposToUsers[nameWithOwner] || []).includes(login)
            ),
        ],
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
