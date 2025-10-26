"use client";

import { ProfileProvider } from "@/components/profile/profile-context";
import { useProfile } from "@/components/profile/use-profile";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";

export default function Profile({
  children,
  username,
}: {
  children: React.ReactNode;
  username?: Id<"users">;
}) {
  const context = useProfile({ username });
  return <ProfileProvider value={context}>{children}</ProfileProvider>;
}
