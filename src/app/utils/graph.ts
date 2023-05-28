import { transformConToNode, transformRepoToNode, transformToEdge } from ".";
import { BasicLogin, BasicRepository, Contributor, IGraph } from "../types";

export const buildGraph = (
  repos: BasicRepository[],
  users: BasicLogin[],
  reposToUsers: Record<string, string[]>
): IGraph => {
  const nodes = [
    ...repos.map(transformRepoToNode),
    ...users.map(transformConToNode),
  ];

  const edges = Object.keys(reposToUsers).flatMap((repo) =>
    reposToUsers[repo].map((login) => transformToEdge(repo, login))
  );

  return {
    nodes,
    edges,
  };
};

export const buildOwnerGraph = (
  con: Contributor,
  repos: { nameWithOwner: string; id: string }[]
): IGraph => {
  let nodes = repos.map((repo) => ({
    id: repo.id,
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    label: repo.nameWithOwner,
  }));

  const edges = repos.map((repo, i) => ({
    id: `${con.id}-${repo.id}`,
    source: con.id.toString(),
    target: repo.id.toString(),
    data: {},
  }));

  return {
    nodes,
    edges,
  };
};
