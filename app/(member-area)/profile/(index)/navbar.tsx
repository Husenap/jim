"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserButton } from "@clerk/clerk-react";
import { Link, Skeleton } from "@nextui-org/react";
import { Authenticated, AuthLoading } from "convex/react";

export default function Navbar() {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10",
    },
  };

  return (
    <nav className="fixed top-0 z-50 flex h-auto w-full items-center gap-2 bg-content1 p-3">
      <div className="flex-1">
        <Link href="/profile/edit">Edit Profile</Link>
      </div>

      <div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
