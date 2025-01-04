"use client";

import BottomNavbar from "@/app/(member-area)/bottom-navbar";
import Navbar from "@/app/(member-area)/user/[username]/navbar";
import PageContainer from "@/components/page-container";
import Profile from "@/components/profile/profile";
import ProfilePage from "@/components/profile/profile-page";
import { Id } from "@/convex/_generated/dataModel";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ username: Id<"users"> }>;
}) {
  const { username } = use(params);

  return (
    <Profile username={username}>
      <PageContainer topNavbar={<Navbar />} bottomNavbar={<BottomNavbar />}>
        <ProfilePage showRoutines />
      </PageContainer>
    </Profile>
  );
}
