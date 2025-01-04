import { Id } from "@/convex/_generated/dataModel";
import { ExerciseFieldsType } from "@/convex/schema";
import { MutationCtx } from "@/convex/types";

export async function createOrTake(ctx: MutationCtx, exercise: ExerciseFieldsType) {
  let immutableExercise = await ctx.table("immutableExercises").get("exercise", exercise);
  if (!immutableExercise) {
    const id = await ctx.table("immutableExercises").insert({
      exercise,
      refCount: 1
    });
    immutableExercise = await ctx.table("immutableExercises").getX(id);
  } else {
    await immutableExercise.patch({ refCount: immutableExercise.refCount + 1 });
  }
  return immutableExercise._id;
}

export async function removeOrReturn(ctx: MutationCtx, id: Id<"immutableExercises">) {
  const immutableExercise = await ctx.table("immutableExercises").getX(id);
  if (immutableExercise.refCount === 1) {
    await immutableExercise.delete();
  } else {
    await immutableExercise.patch({ refCount: immutableExercise.refCount - 1 });
  }
}