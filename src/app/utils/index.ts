import { GraphEdge, GraphNode } from "reagraph";
import { BasicLogin, BasicRepository } from "../types";

export const transformConToNode = (user: BasicLogin): GraphNode => ({
  id: user.login,
  icon: user.avatarUrl,
  label: user.login,
  labelVisible: true,
  data: {
    obj: user,
    type: "user",
  },
});

export const transformRepoToNode = (repo: BasicRepository): GraphNode => ({
  id: repo.nameWithOwner,
  icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  label: repo.nameWithOwner,
  labelVisible: true,
  data: {
    obj: repo,
    type: "repo",
  },
});

export const transformToEdge = (repo: string, login: string): GraphEdge => ({
  id: `${login}-${repo}`,
  source: login,
  target: repo,
  data: {},
});
