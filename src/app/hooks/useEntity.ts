import { useMemo } from "react";
import { Entity } from "../types";
import { useEntities } from "./useEntities";

interface Props {
  entity: Entity | null;
}

export const useEntity = ({ entity }: Props) => {
  const { repositories, users } = useEntities();

  const enrichedEntity = useMemo(() => {
    if (!entity) return null;
    if (entity.type === "repo") {
      const repo = repositories.find(
        (repo) => repo.nameWithOwner === entity.id
      );
      return repo || null;
    } else {
      const user = users.find((user) => user.login === entity.id);
      return user || null;
    }
  }, [entity, repositories, users]);

  return enrichedEntity;
};
