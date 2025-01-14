import { useDisclosure } from "@nextui-org/react";

export function useDrawerMenu() {
  const disclosure = useDisclosure();

  return {
    onPress: disclosure.onOpen,
    disclosure
  };
}
export type UseDrawerMenuReturn = ReturnType<typeof useDrawerMenu>;