import { Avatar, Group, Text } from "@mantine/core";
import { FC } from "react";
import { BasicLogin, BasicRepository, EntityType } from "../types";

export const UserTitle: FC<{ entity: BasicLogin }> = ({ entity }) => (
  <Group>
    <Avatar src={entity.avatarUrl} />
    <Text>{entity.login}</Text>
  </Group>
);

export const RepoTitle: FC<{ entity: BasicRepository }> = ({ entity }) => (
  <Group>
    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" />
    <Text>{entity.nameWithOwner}</Text>
  </Group>
);

const SideBarTitle: FC<{
  entity: BasicLogin | BasicRepository | null;
  type?: EntityType;
}> = ({ entity, type }) => {
  if (!entity || !type) return null;

  return type === "user" ? (
    <UserTitle entity={entity as BasicLogin} />
  ) : (
    <RepoTitle entity={entity as BasicRepository} />
  );
};

export default SideBarTitle;
