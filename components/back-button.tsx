"use client";

import { Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const { back } = useRouter();
  return (
    <Button onPress={back} isIconOnly variant="light">
      <ArrowLeft />
    </Button>
  );
}
