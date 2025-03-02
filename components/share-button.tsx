"use client";

import { Button, ButtonVariantProps } from "@heroui/react";
import { Share } from "lucide-react";

export default function ShareButton({
  data,
  size,
  className,
}: {
  data: ShareData;
  size?: ButtonVariantProps["size"];
  className?: string;
}) {
  const share = async () => {
    await navigator.share(data);
  };

  return (
    <Button
      className={className}
      size={size}
      isIconOnly
      variant="light"
      onPress={share}
      isDisabled={navigator.share === undefined}
    >
      <Share />
    </Button>
  );
}
