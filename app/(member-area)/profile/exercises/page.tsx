"use client";

import Navbar from "@/app/(member-area)/profile/exercises/navbar";
import PageContainer from "@/components/page-container";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Avatar, Divider } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function Page() {
  const builtinExercises = useQuery(api.exercises.builtin);
  const customExercises = useQuery(api.exercises.custom);
  const [search, useSearch] = useState("");

  const filter = (exercise: Doc<"exercises">) => {
    if (search.length > 0) {
      if (exercise.name.toLowerCase().indexOf(search) == -1) {
        return false;
      }
    }
    return true;
  };

  return (
    <PageContainer topNavbar={<Navbar onSearch={useSearch} />}>
      <div className="px-2 py-4">
        <h2>Custom Exercises</h2>
        <ExerciseList exercises={customExercises?.filter(filter)} />
        <h2>All Exercises</h2>
        <ExerciseList exercises={builtinExercises?.filter(filter)} />
      </div>
    </PageContainer>
  );
}

function ExerciseList({
  exercises,
}: {
  exercises: Doc<"exercises">[] | undefined;
}) {
  return (
    <div className="flex flex-col gap-2 py-2">
      {exercises?.map((exercise) => (
        <div key={exercise._id} className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Avatar src="/favicon.ico" size="lg" />
            <div className="flex flex-col">
              <h2>{exercise.name}</h2>
              <span className="text-default-400">
                {exercise.primaryMuscleGroup}
              </span>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
}
