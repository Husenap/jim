"use client";

import Navbar from "@/app/(member-area)/profile/exercises/navbar";
import Exercises from "@/components/exercise-list/exercises";
import ExercisesList from "@/components/exercise-list/exercises-list";
import PageContainer from "@/components/page-container";

export default function Page() {
  return (
    <Exercises>
      <PageContainer topNavbar={<Navbar />}>
        <ExercisesList />
      </PageContainer>
    </Exercises>
  );
}
