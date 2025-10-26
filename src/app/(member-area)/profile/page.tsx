"use server";

import BottomNavbar from "@/app/(member-area)/bottom-navbar";
import Navbar from "@/app/(member-area)/profile/navbar";
import PageContainer from "@/components/page-container";
import Profile from "@/components/profile/profile";
import ProfilePage from "@/components/profile/profile-page";

export default async function Page() {
  return (
    <Profile>
      <PageContainer topNavbar={<Navbar />} bottomNavbar={<BottomNavbar />}>
        <ProfilePage showDashboard />
      </PageContainer>
    </Profile>
  );
}
