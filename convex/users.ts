import { UserJSON } from "@clerk/backend";
import { getOneFrom } from "convex-helpers/server/relationships";
import { v, Validator } from "convex/values";
import { internalMutation, mutation, query, QueryCtx } from "./_generated/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const byUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    return await userByUsername(ctx, username);
  }
});

export const updateProfile = mutation({
  args: {
    bio: v.optional(v.string()),
    link: v.optional(v.string()),
  },
  handler: async (ctx, { bio, link }) => {
    const user = await getCurrentUser(ctx);
    if (user) {
      await ctx.db.patch(user._id, { bio, link });
    }
  }
})

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const userAttributes = {
      username: data.username as string,
      imageURL: data.image_url,
      name: (data.first_name || data.last_name) ? [data.first_name ?? "", data.last_name ?? ""].join(" ").trim() : data.username!,
      externalId: data.id,
    };

    const user = await userByExternalId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await getOneFrom(ctx.db, "users", "externalId", externalId);
}

async function userByUsername(ctx: QueryCtx, username: string) {
  return await getOneFrom(ctx.db, "users", "username", username);
}