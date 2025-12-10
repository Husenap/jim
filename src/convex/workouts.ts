import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { mutation, query } from "@/convex/functions";
import { removeOrReturn } from "@/convex/immutableExercises";
import { sendNotification } from "@/convex/notifications";
import { Ent, QueryCtx } from "@/convex/types";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
import {
  FunctionReturnType,
  paginationOptsValidator,
  PaginationResult,
} from "convex/server";
import { v } from "convex/values";

async function extractWorkoutData(ctx: QueryCtx, workout: Ent<"workouts">) {
  return {
    ...workout.doc(),
    exercises: await Promise.all(
      workout.exercises.map(async (e) => ({
        ...e,
        exercise: (await ctx.table("immutableExercises").getX(e.exercise))
          .exercise,
      })),
    ),
    likers: await workout.edgeX("likers").docs(),
    comments: await workout.edgeX("comments").map(async (comment) => ({
      ...comment,
      author: await ctx.table("users").getX(comment.authorId).doc(),
    })),
  };
}

export const get = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }) => {
    if (!userId) return [];
    const user = await ctx.table("users").get(userId);
    if (!user) return [];
    const workouts = await user.edge("workouts").order("desc").docs();
    return workouts;
  },
});

export const details = query({
  args: { workoutId: v.optional(v.id("workouts")) },
  handler: async (ctx, { workoutId }) => {
    if (!workoutId) return null;

    const workout = await ctx.table("workouts").get(workoutId);
    if (!workout) return null;

    const user = await ctx.table("users").getX(workout.userId).doc();

    return {
      workout: await extractWorkoutData(ctx, workout),
      user,
    };
  },
});
export type WorkoutDetailsType = NonNullable<
  FunctionReturnType<typeof api.workouts.details>
>;

export const create = mutation({
  args: {
    activeWorkoutId: v.id("activeWorkouts"),
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.number(),
  },
  handler: async (
    ctx,
    { activeWorkoutId, title, description, startTime, endTime },
  ) => {
    const user = await getCurrentUser(ctx);
    const activeWorkout = await ctx
      .table("activeWorkouts")
      .getX(activeWorkoutId);
    if (user?._id !== activeWorkout.userId)
      throw new Error("You're not the owner of the active workout!");

    const cleanExercises = activeWorkout.exercises
      .map((e) => ({
        ...e,
        sets: e.sets.filter((s) => s.done),
      }))
      .filter((e) => e.sets.length > 0);

    const newWorkout = await ctx.table("workouts").insert({
      title,
      description,
      exercises: cleanExercises,
      userId: activeWorkout.userId,
      bodyweight: activeWorkout.bodyweight,
      startTime,
      endTime,
    });

    for (const exercise of cleanExercises) {
      const pastExerciseSet = await ctx
        .table("pastExerciseSets", "by_user_exercise", (q) =>
          q
            .eq("userId", activeWorkout.userId)
            .eq("exercise", exercise.exercise),
        )
        .first();
      if (pastExerciseSet) {
        await pastExerciseSet.patch({
          ...exercise,
          note: exercise.note,
        });
      } else {
        await ctx.table("pastExerciseSets").insert({
          userId: user._id,
          ...exercise,
        });
      }
    }

    await activeWorkout.delete();

    const subscriptions = (await user.edgeX("followers")).flatMap((follower) =>
      follower.pushSubscriptions.map((s) => ({ ...s, userId: follower._id })),
    );
    await sendNotification(ctx, subscriptions, {
      title: "Jim",
      body: `${user.name} just finished a workout!`,
      icon: user.imageURL,
      path: `/post/${newWorkout}`,
    });
  },
});

export const remove = mutation({
  args: { workoutId: v.id("workouts") },
  handler: async (ctx, { workoutId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const workout = await ctx.table("workouts").getX(workoutId);
    if (user._id == workout.userId) {
      await Promise.all(
        workout.exercises.map(async (e) => removeOrReturn(ctx, e.exercise)),
      );
      await workout.delete();
    }
  },
});

export const paginatedWorkouts = query({
  args: {
    userId: v.optional(v.id("users")),
    discovery: v.optional(v.boolean()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { userId, paginationOpts, discovery }) => {
    try {
      const user = await getCurrentUserOrThrow(ctx);

      let results;

      if (userId) {
        results = await ctx
          .table("workouts")
          .order("desc", "by_start_time")
          .filter((q) => q.eq(q.field("userId"), userId))
          .paginate(paginationOpts);
      } else if (discovery) {
        results = await ctx
          .table("workouts")
          .order("desc", "by_start_time")
          .paginate(paginationOpts);
      } else {
        const followees = await user.edgeX("followees").map((f) => f._id);
        followees.push(user._id);

        results = await ctx
          .table("workouts")
          .order("desc", "by_start_time")
          .filter((q) =>
            q.or(...followees.map((id) => q.eq(q.field("userId"), id))),
          )
          .paginate(paginationOpts);
      }

      return {
        ...results,
        page: await Promise.all(
          results.page.map(async (workout) => ({
            workout: await extractWorkoutData(ctx, workout),
            user: await ctx.table("users").getX(workout.userId).doc(),
          })),
        ),
      };
    } catch (error) {
      return {
        page: [],
        isDone: false,
        continueCursor: "",
      } satisfies PaginationResult<{
        workout: Doc<"workouts">;
        user: Doc<"users">;
      }>;
    }
  },
});
export type PaginatedWorkoutsReturnType = NonNullable<
  FunctionReturnType<
    typeof api.workouts.paginatedWorkouts
  >["page"][0]["workout"]
>;

export const toggleLike = mutation({
  args: { workoutId: v.id("workouts") },
  handler: async (ctx, { workoutId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const workout = await ctx.table("workouts").getX(workoutId);
    if (await workout.edge("likers").has(user._id)) {
      await workout.patch({
        likers: { remove: [user._id] },
      });
    } else {
      await workout.patch({
        likers: { add: [user._id] },
      });

      if (workout.userId !== user._id) {
        const owner = await workout.edgeX("user");
        await sendNotification(
          ctx,
          owner.pushSubscriptions.map((s) => ({ ...s, userId: owner._id })),
          {
            title: "Jim",
            body: `${user.name} liked your workout!`,
            icon: user.imageURL,
            path: `/post/${workout._id}`,
          },
        );
      }
    }
  },
});
