import { mutation, query } from "@/convex/functions";
import { EquipmentValidator, ExerciseTypeValidator, WeightedMuscleGroupValidator } from "@/convex/schema";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
import { v } from "convex/values";

export const builtin = query({
  args: {},
  handler: async (ctx) => {
    return ctx.table("exercises", "ownerId", q => q.eq("ownerId", undefined));
  },
});

export const custom = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    return user.edge("exercises");
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    equipment: EquipmentValidator,
    muscleGroups: v.array(WeightedMuscleGroupValidator),
    exerciseType: ExerciseTypeValidator
  },
  handler: async (ctx, { name, equipment, muscleGroups, exerciseType }) => {
    const user = await getCurrentUserOrThrow(ctx);
    return ctx.table("exercises").insert({
      name,
      equipment,
      muscleGroups,
      ownerId: user._id,
      exerciseType
    });
  }
})