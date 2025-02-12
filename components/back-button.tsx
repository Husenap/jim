"use client";

import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ onPress }: { onPress?: () => void }) {
  const { back } = useRouter();
  return (
    <Button onPress={onPress ? onPress : back} isIconOnly variant="light">
      <ArrowLeft />
    </Button>
  );
}
