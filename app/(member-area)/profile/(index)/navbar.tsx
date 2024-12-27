"use client";

import ShareButton from "@/components/share-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { api } from "@/convex/_generated/api";
import { Link } from "@nextui-org/react";
import { useQuery } from "convex/react";

export default function Navbar() {
  const user = useQuery(api.users.current);

  return (
    <nav className="sticky top-0 z-50 flex h-auto w-full items-center gap-2 bg-content1/70 p-3 backdrop-blur-lg">
      <div className="flex-1">
        <Link href="/profile/edit">Edit Profile</Link>
      </div>

      <div className="flex gap-2">
        {user && (
          <ShareButton
            data={{
              title: `${user.name || user.username}'s Profile`,
              text: `${user.name || user.username}'s Profile:\n`,
              url: `/user/${user.username}`,
            }}
          />
        )}
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
