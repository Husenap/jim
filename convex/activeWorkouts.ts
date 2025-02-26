import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { mutation, query } from "@/convex/functions";
import { createOrTake, removeOrReturn } from "@/convex/immutableExercises";
import { sendNotification } from "@/convex/notifications";
import { SetTypeValidator } from "@/convex/schema";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
import { updateSetData } from "@/utils/workout/sets";
import { v } from "convex/values";

export const create = mutation({
  args: { id: v.optional(v.id("routines")) },
  handler: async (ctx, { id }) => {
    const user = await getCurrentUserOrThrow(ctx);

    const activeWorkout = await ctx.runQuery(api.activeWorkouts.current, {});
    if (activeWorkout) {
      throw new Error("User already has active workout!");
    }

    const exercises: Id<"immutableExercises">[] = [];

    let title = "Workout";

    if (id) {
      const routine = await ctx.table("routines").getX(id);
      title = routine.name;
      for (const re of routine.exercises) {
        try {
          const immutableExerciseId = await createOrTake(ctx, re);
          exercises.push(immutableExerciseId);
        } catch { }
      }
    }

    const newActiveWorkout = await ctx.table("activeWorkouts").insert({
      title,
      userId: user._id,
      bodyweight: user.bodyweight,
      exercises: exercises.map(e => ({
        exercise: e,
        sets: [{
          type: "normal",
          done: false
        }]
      }))
    });

    const subscriptions = (await user.edgeX("followers")).flatMap(follower => follower.pushSubscriptions);
    await sendNotification(
      ctx,
      subscriptions,
      {
        title: "Jim",
        body: `${user.name} just started a workout!`,
        icon: user.imageURL,
        path: `/workout/live/${newActiveWorkout}`
      }
    );

    return newActiveWorkout;
  }
});


export const remove = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await user.edgeX("activeWorkout");
    await Promise.all(activeWorkout.exercises.map(async e => removeOrReturn(ctx, e.exercise)));
    await ctx.table("activeWorkouts").getX(activeWorkout._id).delete();
  }
});

export const get = query({
  args: { id: v.id("activeWorkouts") },
  handler: async (ctx, { id }) => {
    return await ctx.table("activeWorkouts").get(id).doc();
  }
});

export const exercises = query({
  args: { id: v.id("activeWorkouts") },
  handler: async (ctx, { id }) => {
    const activeWorkout = await ctx.table("activeWorkouts").get(id);
    if (!activeWorkout) return [];
    return await Promise.all(activeWorkout.exercises.map(async e => ({
      sets: e.sets,
      note: e.note,
      exercise: (await ctx.table("immutableExercises").getX(e.exercise)).exercise,
    })));
  }
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;
    return await user.edge("activeWorkout").doc();
  }
});

export const followees = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    const followees = user.edgeX("followees");
    return await followees
      .map(async u => ({
        user: u.doc(),
        activeWorkout: await u.edge("activeWorkout").doc()
      }))
      .filter((aw): aw is {
        user: typeof aw.user;
        activeWorkout: NonNullable<typeof aw.activeWorkout>;
      } => aw.activeWorkout !== null)
  }
});

export const updateNote = mutation({
  args: {
    id: v.id("activeWorkouts"),
    exerciseIndex: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, { id, exerciseIndex, note }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(id);
    if (activeWorkout.userId !== user._id) throw new Error("You're not the owner!");

    activeWorkout.exercises[exerciseIndex].note = note;

    await activeWorkout.patch(activeWorkout);
  }
});

export const updateSet = mutation({
  args: {
    id: v.id("activeWorkouts"),
    exerciseIndex: v.number(),
    setIndex: v.number(),
    setData: v.object({
      type: v.optional(SetTypeValidator),
      reps: v.optional(v.number()),
      weight: v.optional(v.number()),
      done: v.optional(v.boolean())
    })
  },
  handler: async (ctx, { id, exerciseIndex, setIndex, setData }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(id);
    if (activeWorkout.userId !== user._id) throw new Error("You're not the owner!");

    const sets = activeWorkout.exercises[exerciseIndex].sets;
    updateSetData(sets, setIndex, setData);

    await activeWorkout.patch(activeWorkout);
  }
});

export const addSet = mutation({
  args: {
    id: v.id("activeWorkouts"),
    exerciseIndex: v.number(),
  },
  handler: async (ctx, { id, exerciseIndex }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(id);
    if (activeWorkout.userId !== user._id) throw new Error("You're not the owner!");

    activeWorkout.exercises[exerciseIndex].sets.push({
      type: "normal",
      done: false
    });
    await activeWorkout.patch(activeWorkout);
  }
});

export const removeSet = mutation({
  args: {
    id: v.id("activeWorkouts"),
    exerciseIndex: v.number(),
    setIndex: v.number(),
  },
  handler: async (ctx, { id, exerciseIndex, setIndex }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(id);
    if (activeWorkout.userId !== user._id) throw new Error("You're not the owner!");

    activeWorkout.exercises[exerciseIndex].sets.splice(setIndex, 1);

    await activeWorkout.patch(activeWorkout);
  }
});

export const addExercise = mutation({
  args: {
    workoutId: v.id("activeWorkouts"),
    exerciseId: v.id("exercises"),
  },
  handler: async (ctx, { workoutId, exerciseId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(workoutId);
    if (activeWorkout.userId !== user._id) throw new Error("You're not the owner!");

    const immutableExerciseId = await createOrTake(ctx, exerciseId);
    activeWorkout.exercises.push({
      exercise: immutableExerciseId,
      sets: [{
        type: "normal",
        done: false
      }]
    });
    await activeWorkout.patch(activeWorkout);
  }
});

export const removeExercise = mutation({
  args: {
    workoutId: v.id("activeWorkouts"),
    exerciseIndex: v.number(),
  },
  handler: async (ctx, { workoutId, exerciseIndex }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(workoutId);
    if (activeWorkout.userId !== user._id) throw new Error("You're not the owner!");

    await Promise.all(
      activeWorkout.exercises
        .splice(exerciseIndex, 1)
        .map(async e => removeOrReturn(ctx, e.exercise)));

    await activeWorkout.patch(activeWorkout);
  }
});

export const replaceExercise = mutation({
  args: {
    workoutId: v.id("activeWorkouts"),
    exerciseIndex: v.number(),
    exerciseId: v.id("exercises")
  },
  handler: async (ctx, { workoutId, exerciseIndex, exerciseId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(workoutId);
    if (activeWorkout.userId !== user._id) throw new Error("You're not the owner!");

    const newExerciseId = await createOrTake(ctx, exerciseId);
    await removeOrReturn(ctx, activeWorkout.exercises[exerciseIndex].exercise);
    activeWorkout.exercises[exerciseIndex].exercise = newExerciseId;

    await activeWorkout.patch(activeWorkout);
  }
});

export const setBodyweight = mutation({
  args: {
    workoutId: v.id("activeWorkouts"),
    bodyweight: v.optional(v.number()),
  },
  handler: async (ctx, { workoutId, bodyweight }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(workoutId);
    if (activeWorkout.userId !== user._id) throw new Error("You're not the owner!");
    await activeWorkout.patch({ bodyweight });
    await ctx.table("users").getX(user._id).patch({ bodyweight });
  }
})