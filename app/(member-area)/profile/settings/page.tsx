"use client";

import Navbar from "@/app/(member-area)/profile/settings/navbar";
import NotificationSwitch from "@/app/(member-area)/profile/settings/notification-switch";
import PageContainer from "@/components/page-container";
import ServiceWorker from "@/components/service-worker/service-worker";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TypographyH2 } from "@/components/typography";

export default function Page() {
  return (
    <PageContainer topNavbar={<Navbar />}>
      <TypographyH2>Notifications</TypographyH2>
      <ServiceWorker>
        <NotificationSwitch />
      </ServiceWorker>
      <TypographyH2>Appearance</TypographyH2>
      <ThemeSwitcher />
    </PageContainer>
  );
}
