import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { FC } from "react";
import { useEntities } from "../hooks";
import { BasicLogin, BasicRepository, EntityType } from "../types";
import { toReadableDate } from "../utils/date";
import { getReposByUser } from "../utils/users";

const UserDetails: FC<{ user: BasicLogin; repos: string[] }> = ({
  user,
  repos,
}) => {
  return (
    <Stack spacing="lg">
      <Group position="center">
        <Group spacing={4}>
          <Text fw="300" size="sm" color="dimmed">
            Following:
          </Text>
          <Text>{user.extraData?.following}</Text>
        </Group>
        <Group spacing={4}>
          <Text fw="300" size="sm" color="dimmed">
            Followers:
          </Text>
          <Text>{user.extraData?.followers}</Text>
        </Group>
      </Group>
      <Stack spacing="xs">
        <Text fw="300" size="sm" color="dimmed">
          Bio
        </Text>
        <Text>{user.extraData?.bio}</Text>
      </Stack>
      <Stack spacing="xs">
        <Text fw="300" size="sm" color="dimmed">
          Repositories ({repos.length})
        </Text>
        <Stack>
          {repos.map((repo) => (
            <Card
              onClick={() =>
                window.open(`https://github.com/${repo}`, "_blank")
              }
              sx={(theme) => ({
                "&:hover": {
                  backgroundColor: theme.colors.gray[8],
                },
              })}
              component="button"
              key={repo}
            >
              <Group position="left">
                <Avatar color="gray" size="md" src="/github.svg" />
                <Text>{repo}</Text>
              </Group>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const RepoDetails: FC<{ repo: BasicRepository; users: BasicLogin[] }> = ({
  repo,
  users,
}) => {
  return (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Group position="apart">
          <Group spacing={4}>
            <Text fw="300" size="sm" color="dimmed">
              Last updated
            </Text>
            <Text>
              {toReadableDate(new Date(repo.extraData?.pushed_at || ""))}
            </Text>
          </Group>
          <Group spacing={4}>
            <IconStar size={16} />
            <Text>{repo.extraData?.stargazers_count}</Text>
          </Group>
        </Group>
        <Group spacing="xs">
          {(repo.extraData?.topics || []).map((topic) => (
            <Badge key={topic}>{topic}</Badge>
          ))}
        </Group>
      </Stack>
      <Stack spacing="xs">
        <Text fw="300" size="sm" color="dimmed">
          Description
        </Text>
        <Text>{repo.extraData?.description}</Text>
      </Stack>
      <Stack spacing="xs">
        <Text fw="300" size="sm" color="dimmed">
          Contributors ({users.length})
        </Text>
        <Stack>
          {users.map((user) => (
            <Card
              onClick={() =>
                window.open(`https://github.com/${user.login}`, "_blank")
              }
              sx={(theme) => ({
                "&:hover": {
                  backgroundColor: theme.colors.gray[8],
                },
              })}
              component="button"
              key={user.login}
            >
              <Group position="left">
                <Avatar color="gray" size="md" src={user.avatarUrl} />
                <Text>{user.login}</Text>
              </Group>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const EntityDetails: FC<{
  entity: BasicLogin | BasicRepository;
  type?: EntityType;
}> = ({ entity, type }) => {
  const { reposToUsers, users } = useEntities();

  const getUsersByRepo = (repo: string) => {
    const ids = reposToUsers[repo];
    return users.filter((user) => ids.includes(user.login));
  };

  return type === "user" ? (
    <UserDetails
      user={entity as BasicLogin}
      repos={getReposByUser((entity as BasicLogin).login, reposToUsers)}
    />
  ) : (
    <RepoDetails
      repo={entity as BasicRepository}
      users={getUsersByRepo((entity as BasicRepository).nameWithOwner)}
    />
  );
};

export default EntityDetails;
