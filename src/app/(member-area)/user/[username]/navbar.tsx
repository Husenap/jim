"use client";

import BackButton from "@/components/back-button";
import { useProfileContext } from "@/components/profile/profile-context";
import ProfileShareButton from "@/components/profile/profile-share-button";

export default function Navbar() {
  const { profileUser } = useProfileContext();

  return (
    <div className="grid grid-cols-4 items-center py-3">
      <BackButton />
      <span className="col-span-2 text-center text-sm">
        {profileUser?.username}
      </span>

      <div className="text-right">
        <ProfileShareButton />
      </div>
    </div>
  );
}
