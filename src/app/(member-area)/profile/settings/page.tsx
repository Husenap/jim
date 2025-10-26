"use client";

import Navbar from "@/app/(member-area)/profile/settings/navbar";
import NotificationSwitch from "@/app/(member-area)/profile/settings/notification-switch";
import PageContainer from "@/components/page-container";
import ServiceWorker from "@/components/service-worker/service-worker";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TypographyH2 } from "@/components/typography";
import { useClerk, UserProfile } from "@clerk/nextjs";
import { Button } from "@heroui/react";

export default function Page() {
  const { signOut } = useClerk();

  return (
    <PageContainer topNavbar={<Navbar />}>
      <TypographyH2>Notifications</TypographyH2>
      <ServiceWorker>
        <NotificationSwitch />
      </ServiceWorker>

      <TypographyH2>Appearance</TypographyH2>
      <ThemeSwitcher />

      <TypographyH2>Account details</TypographyH2>
      <UserProfile
        appearance={{
          elements: {
            rootBox: "w-full",
            cardBox: "max-w-none w-full h-auto",
          },
        }}
        routing="hash"
      />
      <Button
        color="danger"
        fullWidth
        onPress={() => signOut({ redirectUrl: "/" })}
      >
        Sign Out
      </Button>
    </PageContainer>
  );
}
