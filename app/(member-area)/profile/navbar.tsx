"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserButton } from "@clerk/clerk-react";
import { Link, Skeleton } from "@nextui-org/react";
import { Authenticated, AuthLoading } from "convex/react";

export default function Navbar() {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-8 h-8",
    },
  };

  return (
    <nav className="absolute top-0 z-50 flex h-auto w-full items-center gap-2 bg-content1 p-3">
      <div className="flex-1">
        <Link href="/profile/edit">Edit Profile</Link>
      </div>

      <div>
        <ThemeSwitcher />
      </div>
      <div className="h-8 max-h-8">
        <Authenticated>
          <UserButton appearance={userButtonAppearance} />
        </Authenticated>
        <AuthLoading>
          <Skeleton className="h-8 w-8 rounded-full" />
        </AuthLoading>
      </div>
    </nav>
  );
}
