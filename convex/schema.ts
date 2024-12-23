import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  users: defineTable({
    username: v.string(),
    name: v.optional(v.string()),
    image_url: v.optional(v.string()),
    externalId: v.string(),
  })
    .index("byExternalId", ["externalId"])
    .index("byUsername", ["username"]),
});

export default schema;