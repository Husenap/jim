import { internalMutation, mutation, query } from "@/convex/functions";
import { QueryCtx } from "@/convex/types";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return (await getCurrentUser(ctx))?.doc();
  },
});

export const byUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    return (await userByUsername(ctx, username))?.doc();
  }
});

export const toggleFollow = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await getCurrentUser(ctx);

    if (!user) return;

    if (await user.edge("followees").has(userId)) {
      await ctx.table("users").getX(user._id).patch({
        followees: { remove: [userId] }
      });
    } else {
      await ctx.table("users").getX(user._id).patch({
        followees: { add: [userId] }
      });
    }
  }
});

export const isFollower = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }) => {
    if (!userId) return false;
    const user = await getCurrentUser(ctx);
    if (!user) return false;
    return await user.edge("followers").has(userId);
  }
});
export const isFollowee = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }) => {
    if (!userId) return false;
    const user = await getCurrentUser(ctx);
    if (!user) return false;
    return await user.edge("followees").has(userId);
  }
});
export const followers = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }) => {
    if (!userId) return [];
    return await ctx.table("users").getX(userId).edge("followers").docs();
  }
});
export const followees = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }) => {
    if (!userId) return [];
    return await ctx.table("users").getX(userId).edge("followees").docs();
  }
});

export const search = query({
  args: { search: v.string() },
  handler: async (ctx, { search }) => {
    return await ctx.table("users").search("search_username", q => q.search("username", search)).take(15).docs();
  }
});

export const updateProfile = mutation({
  args: {
    bio: v.optional(v.string()),
    link: v.optional(v.string()),
    bodyweight: v.optional(v.number()),
  },
  handler: async (ctx, { bio, link, bodyweight }) => {
    const user = await getCurrentUser(ctx);
    if (user) {
      await ctx.table("users").getX(user._id).patch({ bio, link, bodyweight });
    }
  }
});

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
      await ctx.table("users").insert(userAttributes);
    } else {
      await ctx.table("users").getX(user._id).patch(userAttributes);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.table("users").getX(user._id).delete();
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
  return await userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  try {
    return await userByExternalId(ctx, identity.subject);
  } catch {
    return null;
  }
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.table("users").getX("externalId", externalId);
}

export async function userByUsername(ctx: QueryCtx, username: string) {
  try {
    return await ctx.table("users").getX("username", username);
  } catch {
    return null;
  }
}