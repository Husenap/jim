"use client";

import ShareButton from "@/components/share-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { api } from "@/convex/_generated/api";
import { Button, Link } from "@nextui-org/react";
import { useQuery } from "convex/react";

export default function Navbar() {
  const user = useQuery(api.users.current);

  return (
    <div className="grid grid-cols-3 items-center py-3">
      <div>
        <Button as={Link} variant="light" color="primary" href="/profile/edit">
          Edit Profile
        </Button>
      </div>

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
