"use client";

import { Button, Divider, Link } from "@nextui-org/react";
import { Dumbbell, Home, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log(pathname);

  const tabs = [
    {
      href: "/home",
      title: "Home",
      icon: <Home />,
    },
    {
      href: "/workout",
      title: "Workout",
      icon: <Dumbbell />,
    },
    {
      href: "/profile",
      title: "Profile",
      icon: <User />,
    },
  ];

  return (
    <main className="flex h-dvh max-h-dvh w-full flex-1 flex-col">
      <div className="flex-1 overflow-y-auto">{children}</div>

      <Divider />

      <div className="flex w-full flex-row items-center justify-around p-4">
        {tabs.map((tab) => (
          <div
            key={tab.href}
            className="flex flex-1 items-center justify-center gap-2"
          >
            <Button
              color="primary"
              startContent={tab.icon}
              variant={pathname.startsWith(tab.href) ? "shadow" : "light"}
              as={Link}
              href={tab.href}
            >
              {tab.title}
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
