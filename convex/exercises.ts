import { mutation, query } from "@/convex/_generated/server";
import { EquipmentValidator, ExerciseTypeValidator, MuscleGroupValidator } from "@/convex/schema";
import { getCurrentUser, getCurrentUserOrThrow } from "@/convex/users";
import { getManyFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";


export const builtin = query({
  args: {},
  handler: async (ctx) => {
    return await getManyFrom(ctx.db, "exercises", "ownerId", undefined);
  },
});

export const custom = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    return await getManyFrom(ctx.db, "exercises", "ownerId", user._id);
  },
});

export const create = mutation({
  args: { name: v.string(), equipment: EquipmentValidator, primaryMuscleGroup: MuscleGroupValidator, secondaryMuscleGroups: v.array(MuscleGroupValidator), exerciseType: ExerciseTypeValidator },
  handler: async (ctx, { name, equipment, primaryMuscleGroup, secondaryMuscleGroups, exerciseType }) => {
    const user = await getCurrentUserOrThrow(ctx);
    return await ctx.db.insert("exercises", {
      name,
      equipment,
      primaryMuscleGroup,
      secondaryMuscleGroups,
      ownerId: user._id,
      exerciseType
    });
  }
})