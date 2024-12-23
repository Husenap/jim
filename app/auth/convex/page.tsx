"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Page() {
  const tasks = useQuery(api.tasks.get);

  return (
    <>
      <pre>
        {JSON.stringify(tasks, null, 2)}
      </pre>
    </>
  );
}