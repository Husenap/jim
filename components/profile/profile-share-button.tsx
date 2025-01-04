"use client";

import { useProfileContext } from "@/components/profile/profile-context";
import { Button } from "@nextui-org/react";
import { Share } from "lucide-react";

export default function ProfileShareButton() {
  const { profileUser } = useProfileContext();

  const share = async () => {
    await navigator.share({
      title: `${profileUser?.name || profileUser?.username}'s Profile`,
      text: `${profileUser?.name || profileUser?.username}'s Profile:\n`,
      url: `/user/${profileUser?.username}`,
    });
  };

  return (
    <>
      <Button isIconOnly variant="light" onPress={share}>
        <Share />
      </Button>
    </>
  );
}
