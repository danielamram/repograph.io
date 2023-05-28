import { Avatar, Card, Group, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { useEntities } from "../hooks";
import { BasicLogin, BasicRepository, EntityType } from "../types";
import { getReposByUser } from "../utils/users";

const UserDetails: FC<{ user: BasicLogin; repos: string[] }> = ({
  user,
  repos,
}) => {
  console.log(repos);
  return (
    <>
      <Title fw="400" order={3}>
        Repositories: {repos.length}
      </Title>
      <Stack mt="lg">
        {repos.map((repo) => (
          <Card
            onClick={() => window.open(`https://github.com/${repo}`, "_blank")}
            sx={(theme) => ({
              "&:hover": {
                backgroundColor: theme.colors.gray[8],
              },
            })}
            component="button"
            key={repo}
          >
            <Group position="left">
              <Avatar
                color="gray"
                size="md"
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              />
              <Text>{repo}</Text>
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  );
};

const RepoDetails: FC<{ repo: BasicRepository }> = ({ repo }) => {
  return <></>;
};

const EntityDetails: FC<{
  entity: BasicLogin | BasicRepository;
  type?: EntityType;
}> = ({ entity, type }) => {
  const { reposToUsers } = useEntities();

  return type === "user" ? (
    <UserDetails
      user={entity as BasicLogin}
      repos={getReposByUser((entity as BasicLogin).login, reposToUsers)}
    />
  ) : (
    <RepoDetails repo={entity as BasicRepository} />
  );
};

export default EntityDetails;
