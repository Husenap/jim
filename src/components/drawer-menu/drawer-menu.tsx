import { DrawerMenuProvider } from "@/components/drawer-menu/drawer-menu-context";
import { useDrawerMenu } from "@/components/drawer-menu/use-drawer-menu";
import { Drawer } from "@heroui/react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";
import React, { Children } from "react";

export default function DrawerMenu({
  children,
  disclosure,
}: {
  children: React.ReactNode;
  disclosure?: UseDisclosureReturn;
}) {
  const context = useDrawerMenu(disclosure);
  const childArray = Children.toArray(children);
  const trigger = childArray.length === 2 ? childArray[0] : null;
  const content = childArray[childArray.length - 1];

  return (
    <>
      <DrawerMenuProvider value={context}>
        {trigger}
        <Drawer
          hideCloseButton
          isDismissable
          placement="bottom"
          isOpen={context.disclosure.isOpen}
          onOpenChange={context.disclosure.onOpenChange}
        >
          {content}
        </Drawer>
      </DrawerMenuProvider>
    </>
  );
}
