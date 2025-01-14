import { DrawerBody, DrawerContent, Menu } from "@nextui-org/react";
import React from "react";

export default function DrawerMenuContent({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <>
      <DrawerContent>
        {(onClose) => (
          <DrawerBody className="p-4">
            <Menu
              className="iphone-safe-inset"
              onClose={onClose}
              closeOnSelect
              aria-label={ariaLabel}
            >
              <>{children}</>
            </Menu>
          </DrawerBody>
        )}
      </DrawerContent>
    </>
  );
}
