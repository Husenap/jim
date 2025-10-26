"use client";

import { useProfileContext } from "@/components/profile/profile-context";
import ShareButton from "@/components/share-button";

export default function ProfileShareButton() {
  const { profileUser } = useProfileContext();

  return (
    <ShareButton
      data={{
        title: `${profileUser?.name || profileUser?.username}'s Profile`,
        text: `${profileUser?.name || profileUser?.username}'s Profile:\n`,
        url: `/user/${profileUser?.username}`,
      }}
    />
  );
}
