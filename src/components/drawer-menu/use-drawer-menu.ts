import { useDisclosure } from "@heroui/react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";

export function useDrawerMenu(customDisclosure?: UseDisclosureReturn) {
  const disclosure = customDisclosure ?? useDisclosure();

  return {
    onPress: disclosure.onOpen,
    disclosure,
  };
}
export type UseDrawerMenuReturn = ReturnType<typeof useDrawerMenu>;
