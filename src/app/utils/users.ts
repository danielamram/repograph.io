import { UserQuery } from "../graphql";
import { BasicLogin, BasicRepository, Contributor } from "../types";

export const transformConToLogin = ({
  login,
  avatar_url,
}: Contributor): BasicLogin => ({
  login,
  avatarUrl: avatar_url,
});

export const transformToRepos = (userQuery: UserQuery): BasicRepository[] => {
  const data =
    userQuery.user?.contributionsCollection
      .pullRequestContributionsByRepository;
  if (!data || !data.length) return [];

  return data.map(({ repository: { nameWithOwner } }) => ({
    nameWithOwner,
  }));
};
