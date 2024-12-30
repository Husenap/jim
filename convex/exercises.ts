import { mutation, query } from "@/convex/functions";
import { EquipmentValidator, ExerciseTypeValidator, MuscleGroupValidator } from "@/convex/schema";
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
  args: { name: v.string(), equipment: EquipmentValidator, primaryMuscleGroup: MuscleGroupValidator, secondaryMuscleGroups: v.array(MuscleGroupValidator), exerciseType: ExerciseTypeValidator },
  handler: async (ctx, { name, equipment, primaryMuscleGroup, secondaryMuscleGroups, exerciseType }) => {
    const user = await getCurrentUserOrThrow(ctx);
    return ctx.table("exercises").insert({
      name,
      equipment,
      primaryMuscleGroup,
      secondaryMuscleGroups,
      ownerId: user._id,
      exerciseType
    });
  }
})