import useBoundStore from "../store/useBoundStore";

export const useEntities = () => {
  const state = useBoundStore((state) => ({
    repositories: state.repositories,
    users: state.users,
    reposToUsers: state.reposToUsers,
    fetchRepoUsers: state.fetchRepoUsers,
    fetchUserRepos: state.fetchUserRepos,
  }));

  return { ...state };
};
