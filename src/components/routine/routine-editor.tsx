import Navbar from "@/app/(member-area)/workout/(routine)/navbar";
import PageContainer from "@/components/page-container";
import RoutineAddExerciseButton from "@/components/routine/routine-add-exercise-button";
import { useRoutineContext } from "@/components/routine/routine-context";
import RoutineExercises from "@/components/routine/routine-exercises";
import RoutineTitle from "@/components/routine/routine-title";
import { Id } from "@/convex/_generated/dataModel";
import { RoutineExerciseData } from "@/convex/schema";
import { addToast, Divider } from "@heroui/react";
import { Dumbbell } from "lucide-react";
import { useRouter } from "next/navigation";

export type RoutineData = {
  name: string;
  exercises: Id<"exercises">[];
  exercisesData: RoutineExerciseData[];
};

export default function RoutineEditor({
  titleText,
  confirmText,
  onConfirm,
}: {
  titleText: string;
  confirmText: string;
  onConfirm: (routineData: RoutineData) => Promise<void>;
}) {
  const { back } = useRouter();

  const { title, errors, setErrors, exercises } = useRoutineContext();

  const confirmHandler = async () => {
    if (title === "") {
      setErrors({
        title: "Your routine needs a title.",
      });
      return;
    }

    if (exercises.length === 0) {
      setErrors({
        exercises: "Your routine needs at least one exercise.",
      });
      return;
    }

    try {
      await onConfirm({
        name: title,
        exercises: exercises.map((e) => e.exercise._id),
        exercisesData: exercises.map((e) => ({
          superset: e.superset,
        })),
      });
      back();
    } catch {
      addToast({
        title: "An error occurred!",
        color: "danger",
      });
    }
  };

  return (
    <>
      <PageContainer
        topNavbar={
          <Navbar
            titleText={titleText}
            confirmText={confirmText}
            onCancel={back}
            onConfirm={confirmHandler}
          />
        }
      >
        <RoutineTitle />

        <Divider />

        {exercises.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8">
            <Dumbbell size={32} />
            <span>Get started by adding an exercise to your routine.</span>
            {"exercises" in errors && (
              <span className="text-danger">{errors["exercises"]}</span>
            )}
          </div>
        )}

        <RoutineExercises />

        <RoutineAddExerciseButton />
      </PageContainer>
    </>
  );
}
