"use client";

import { useProfileContext } from "@/components/profile/profile-context";
import ProfileShareButton from "@/components/profile/profile-share-button";
import { Button } from "@heroui/react";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { profileUser } = useProfileContext();

  return (
    <div className="grid grid-cols-4 items-center py-3">
      <div>
        <Button as={Link} variant="light" color="primary" href="/profile/edit">
          Edit Profile
        </Button>
      </div>

      <span className="col-span-2 text-center text-sm">
        {profileUser?.username}
      </span>

      <div className="flex justify-end gap-2">
        <ProfileShareButton />
        <Button as={Link} variant="light" isIconOnly href="/profile/settings">
          <Settings />
        </Button>
      </div>
    </div>
  );
}
