import { internal } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { mutation, query } from "@/convex/functions";
import { removeOrReturn } from "@/convex/immutableExercises";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
import { paginationOptsValidator, PaginationResult } from "convex/server";
import { v } from "convex/values";

export const get = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }) => {
    if (!userId) return [];
    const user = await ctx.table("users").get(userId);
    if (!user) return [];
    const workouts = await user.edge("workouts").order("desc").docs();
    return workouts;
  }
});

export const create = mutation({
  args: {
    activeWorkoutId: v.id("activeWorkouts"),
    title: v.string(),
    description: v.optional(v.string())
  },
  handler: async (ctx, { activeWorkoutId, title, description }) => {
    const user = await getCurrentUser(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(activeWorkoutId);
    if (user?._id !== activeWorkout.userId) throw new Error("You're not the owner of the active workout!");

    const newWorkout = await ctx.table("workouts").insert({
      title,
      description,
      exercises: activeWorkout.exercises,
      userId: activeWorkout.userId,
      bodyweight: activeWorkout.bodyweight,
      startTime: activeWorkout._creationTime,
    });
    await activeWorkout.delete();

    const subscriptions = (await user.edgeX("followers")).flatMap(follower => follower.pushSubscriptions);
    if (subscriptions.length > 0) {
      await ctx.scheduler.runAfter(0, internal.actions.sendNotification, {
        subscriptions,
        payload: JSON.stringify({
          title: "Jim",
          body: `${user.name} just finished a workout!`,
          icon: user.imageURL,
          // Todo: https://github.com/Husenap/jim/issues/11
          // path: `/workout/post/${newWorkout}`
        })
      });
    }

  }
});

export const remove = mutation({
  args: { workoutId: v.id("workouts") },
  handler: async (ctx, { workoutId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const workout = await ctx.table("workouts").getX(workoutId);
    if (user._id == workout.userId) {
      await Promise.all(workout.exercises.map(async e => removeOrReturn(ctx, e.exercise)));
      await workout.delete();
    }
  }
})

export const paginatedWorkouts = query({
  args: {
    userId: v.optional(v.id("users")),
    discovery: v.optional(v.boolean()),
    paginationOpts: paginationOptsValidator
  },
  handler: async (ctx, { userId, paginationOpts, discovery }) => {
    try {
      const user = await getCurrentUserOrThrow(ctx);

      let results;

      if (userId) {
        results = await ctx.table("users")
          .getX(userId)
          .edgeX("workouts")
          .order("desc")
          .paginate(paginationOpts);
      } else if (discovery) {
        results = await ctx.table("workouts")
          .order("desc")
          .paginate(paginationOpts);
      } else {
        const followees = await user.edgeX("followees").map(f => f._id);
        followees.push(user._id);

        results =
          await ctx.table("workouts")
            .filter(q => q.or(
              ...followees.map(id => q.eq(q.field("userId"), id))
            ))
            .order("desc")
            .paginate(paginationOpts);
      }

      return {
        ...results,
        page: await Promise.all(results.page.map(async workout => ({
          workout: {
            ...workout.doc(),
            exercises: await Promise.all(workout.exercises.map(async e => ({
              ...e,
              exercise: (await ctx.table("immutableExercises").getX(e.exercise)).exercise
            }))),
            likers: await workout.edgeX("likers").docs(),
          },
          user: await ctx.table("users").getX(workout.userId).doc()
        })))
      };
    } catch (error) {
      return {
        page: [],
        isDone: false,
        continueCursor: "",
      } satisfies PaginationResult<{
        workout: Doc<"workouts">,
        user: Doc<"users">,
      }>;
    }
  }
});
export type PaginatedWorkoutsReturnType = Awaited<ReturnType<typeof paginatedWorkouts>>["page"][0]["workout"];

export const toggleLike = mutation({
  args: { workoutId: v.id("workouts") },
  handler: async (ctx, { workoutId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const workout = await ctx.table("workouts").getX(workoutId);
    if (await workout.edge("likers").has(user._id)) {
      await workout.patch({
        likers: { remove: [user._id] }
      });
    } else {
      await workout.patch({
        likers: { add: [user._id] }
      });


      const owner = await workout.edgeX("user");
      if (owner.pushSubscriptions.length > 0) {
        await ctx.scheduler.runAfter(0, internal.actions.sendNotification, {
          subscriptions: owner.pushSubscriptions,
          payload: JSON.stringify({
            title: "Jim",
            body: `${user.name} liked your workout!`,
            icon: user.imageURL,
          })
        });
      }
    }
  }
});
