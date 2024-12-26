"use client";

import { Button, Link } from "@nextui-org/react";
import { Dumbbell, Home, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

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
    <main className="flex min-h-full w-full flex-1 flex-col">
      <div className="my-16 flex-1 overflow-y-auto">{children}</div>

      <div className="fixed bottom-0 z-50 flex w-full flex-row items-center justify-around bg-content1 p-3">
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
