import { GITHUB_TOKEN, UserDocument, UserQuery, client } from "../graphql";
import { Contributor, User } from "../types";
import { Repository } from "../types/Repository";

const API_URL = "https://api.github.com";

export const callApi = async <T>(url: string) => {
  let headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };

  if (GITHUB_TOKEN) {
    headers = {
      ...headers,
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    };
  }

  const response = await fetch(`${API_URL}${url}`, {
    headers,
  });
  const data = await response.json();
  return data as T;
};

export const getContributors = async (nameWithOwner: string) =>
  callApi<Contributor[]>(`/repos/${nameWithOwner}/contributors`);

export const getUser = async (login: string) =>
  callApi<User>(`/users/${login}`);

export const getRepository = async (nameWithOwner: string) =>
  callApi<Repository>(`/repos/${nameWithOwner}`);

// export const getRepositoriesByOwner = async (owner: string) => {
//   const repos = await callApi<Repository[]>(`/users/${owner}/repos`);
//   return repos;
// };

export const getRepositoriesByLogin = async (login: string) => {
  const res = await client.query<UserQuery>({
    query: UserDocument,
    variables: {
      login,
    },
  });

  return res.data;
};
