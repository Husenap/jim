import { DrawerMenuProvider } from "@/components/drawer-menu/drawer-menu-context";
import { useDrawerMenu } from "@/components/drawer-menu/use-drawer-menu";
import { Drawer } from "@heroui/react";
import React, { Children } from "react";

export default function DrawerMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useDrawerMenu();
  const [trigger, content] = Children.toArray(children);

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
