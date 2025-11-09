"use client";

import Navbar from "@/app/(member-area)/workout/(routine)/navbar";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import PageContainer from "@/components/page-container";
import Routine from "@/components/routine/routine";
import RoutineTitle from "@/components/routine/routine-title";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import { FunctionReturnType } from "convex/server";
import { useTransitionRouter } from "next-view-transitions";
import { use } from "react";
import useLocalStorage from "use-local-storage";

export default function Page({
  params,
}: {
  params: Promise<{ routineId: Id<"routines"> }>;
}) {
  const { routineId } = use(params);

  const [title, setTitle] = useLocalStorage("jim-create-routine-title", "");

  const { data, isPending, isError } = useQueryWithStatus(api.routines.get, {
    routineId,
  });

  if (isError) {
    return <span>Failed to load routine!</span>;
  }
  if (isPending) {
    return <FullscreenSpinner />;
  }

  return (
    <Routine
      props={{
        title,
        setTitle,
      }}
    >
      <PageContainerWithRoutine data={data} />
    </Routine>
  );
}

function PageContainerWithRoutine({
  data,
}: {
  data: FunctionReturnType<typeof api.routines.get>;
}) {
  const { back } = useTransitionRouter();

  const onUpdate = async () => {
    console.log("updating routine...");
  };

  return (
    <PageContainer
      topNavbar={
        <Navbar
          titleText="Edit Routine"
          confirmText="Update"
          onCancel={back}
          onConfirm={onUpdate}
        />
      }
    >
      <RoutineTitle />
      {data.name}
    </PageContainer>
  );
}
