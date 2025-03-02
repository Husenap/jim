"use client";

import { Button, ButtonVariantProps } from "@heroui/react";
import { Share } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShareButton({
  data,
  size,
  className,
}: {
  data: ShareData;
  size?: ButtonVariantProps["size"];
  className?: string;
}) {
  const [disabled, setDisabled] = useState(true);
  const share = async () => {
    await navigator.share(data);
  };

  useEffect(() => {
    if (navigator.share !== undefined) {
      setDisabled(false);
    }
  }, []);

  return (
    <Button
      className={className}
      size={size}
      isIconOnly
      variant="light"
      onPress={share}
      isDisabled={disabled}
    >
      <Share />
    </Button>
  );
}
