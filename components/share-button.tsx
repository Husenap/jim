"use client";

import { Button, Link } from "@nextui-org/react";
import { Share } from "lucide-react";

export default function ShareButton({ data }: { data: ShareData }) {
  const share = async () => {
    await navigator.share(data);
  };
  return (
    <>
      <Button isIconOnly as={Link} variant="light" onPress={share}>
        <Share />
      </Button>
    </>
  );
}
