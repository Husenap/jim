import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { mutation, query } from "@/convex/functions";
import { createOrTake, removeOrReturn } from "@/convex/immutableExercises";
import { SetDataValidator } from "@/convex/schema";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
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

    if (id) {
      const routine = await ctx.table("routines").get(id);
      const routineExercises = await ctx.table("exercises").getMany(routine?.exercises ?? []);
      for (const re of routineExercises) {
        if (re) {
          const immutableExerciseId =
            await createOrTake(
              ctx,
              {
                name: re.name,
                imageURL: re.imageURL,
                equipment: re.equipment,
                muscleGroups: re.muscleGroups,
                exerciseType: re.exerciseType,
                bodyweightFactor: re.bodyweightFactor,
              }
            )
          exercises.push(immutableExerciseId);
        }
      }
    }

    return await ctx.table("activeWorkouts").insert({
      userId: user._id,
      bodyweight: user.bodyweight,
      exercises: exercises.map(e => ({
        exercise: e,
        sets: []
      }))
    });
  }
});


export const remove = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await user.edge("activeWorkout");
    if (activeWorkout) {
      await Promise.all(activeWorkout.exercises.map(async e => removeOrReturn(ctx, e.exercise)));
      await ctx.table("activeWorkouts").getX(activeWorkout._id).delete();
    }
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

export const updateSet = mutation({
  args: {
    id: v.id("activeWorkouts"),
    exerciseIndex: v.number(),
    setIndex: v.number(),
    setData: SetDataValidator
  },
  handler: async (ctx, { id, exerciseIndex, setIndex, setData }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const activeWorkout = await ctx.table("activeWorkouts").getX(id);
    if (activeWorkout.userId !== user._id) throw new Error("You're not the owner!");

    activeWorkout.exercises[exerciseIndex].sets[setIndex] = setData;

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