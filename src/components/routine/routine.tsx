"use client";

import { RoutineProvider } from "@/components/routine/routine-context";
import { useRoutine, UseRoutineProps } from "@/components/routine/use-routine";
import React from "react";

export default function Routine({
  children,
  props,
}: {
  children: React.ReactNode;
  props: UseRoutineProps;
}) {
  const context = useRoutine(props);
  return <RoutineProvider value={context}>{children}</RoutineProvider>;
}
