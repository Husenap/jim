import { GenericEnt, GenericEntWriter } from "convex-ents";
import { CustomCtx } from "convex-helpers/server/customFunctions";
import { TableNames } from "./_generated/dataModel";
import { mutation, query } from "./functions";
import { entDefinitions } from "./schema";

export type QueryCtx = CustomCtx<typeof query>;
export type MutationCtx = CustomCtx<typeof mutation>;

export type Ent<TableName extends TableNames> = GenericEnt<
  typeof entDefinitions,
  TableName
>;
export type EntWriter<TableName extends TableNames> = GenericEntWriter<
  typeof entDefinitions,
  TableName
>;

export type PushSubscription = {
  endpoint: string;
  expirationTime?: null | number;
  keys: {
    p256dh: string;
    auth: string;
  };
}
