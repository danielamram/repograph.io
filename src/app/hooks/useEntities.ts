import useBoundStore from "../store/useBoundStore";

export const useEntities = () => {
  const state = useBoundStore((state) => ({
    repositories: state.repositories,
    users: state.users,
    reposToUsers: state.reposToUsers,
    fetchRepoData: state.fetchRepoData,
    fetchRepoUsers: state.fetchRepoUsers,
    fetchUserRepos: state.fetchUserRepos,
    reset: state.reset,
  }));

  return { ...state };
};
