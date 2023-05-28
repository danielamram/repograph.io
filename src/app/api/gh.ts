import { UserDocument, UserQuery, client } from "../graphql";
import { Contributor } from "../types";
import { Repository } from "../types/Repository";

const API_URL = "https://api.github.com";

export const callApi = async <T>(url: string) => {
  const response = await fetch(`${API_URL}${url}`);
  const data = await response.json();
  return data as T;
};

export const getContributors = async (nameWithOwner: string) =>
  callApi<Contributor[]>(`/repos/${nameWithOwner}/contributors`);

export const getRepository = async (owner: string, repository: string) =>
  callApi<Repository>(`/repos/${owner}/${repository}`);

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
