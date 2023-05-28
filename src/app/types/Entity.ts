export type EntityType = "user" | "repo";

export interface Entity {
  id: string;
  type: EntityType;
}
