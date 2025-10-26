"use client";

import { zap } from "@/utils/vibration";
import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({
  onPress,
  fallbackUrl = "/",
}: {
  onPress?: () => void;
  fallbackUrl?: string;
}) {
  const { back } = useRouter();

  const backHandler = () => {
    const prevPage = window.location.href;

    back();

    setTimeout(function () {
      if (window.location.href == prevPage) {
        window.location.href = fallbackUrl;
      }
    }, 500);
  };

  return (
    <Button
      onPress={() => {
        zap();
        (onPress ?? backHandler)();
      }}
      isIconOnly
      variant="light"
    >
      <ArrowLeft />
    </Button>
  );
}
