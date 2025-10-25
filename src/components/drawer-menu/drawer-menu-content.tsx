import { DrawerBody, DrawerContent, Menu } from "@heroui/react";
import React from "react";

export default function DrawerMenuContent({
  children,
  ariaLabel,
  disabledKeys,
}: {
  children: React.ReactNode;
  ariaLabel?: string;
  disabledKeys?: Iterable<string | number>;
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
              disabledKeys={disabledKeys}
            >
              <>{children}</>
            </Menu>
          </DrawerBody>
        )}
      </DrawerContent>
    </>
  );
}
