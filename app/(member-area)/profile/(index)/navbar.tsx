"use client";

import ShareButton from "@/components/share-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { api } from "@/convex/_generated/api";
import { Link } from "@nextui-org/react";
import { useQuery } from "convex/react";

export default function Navbar() {
  const user = useQuery(api.users.current);

  return (
    <div className="grid grid-cols-3 items-center p-3">
      <Link href="/profile/edit">Edit Profile</Link>

      <span className="text-center">{user?.username}</span>

      <div className="flex justify-end gap-2">
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
    </div>
  );
}
