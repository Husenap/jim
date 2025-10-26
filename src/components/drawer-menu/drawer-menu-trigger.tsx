import { useDrawerMenuContext } from "@/components/drawer-menu/drawer-menu-context";
import React, { Children, cloneElement, useMemo } from "react";

export default function DrawerMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const child = useMemo<any>(() => {
    if (typeof children === "string") return <p>{children}</p>;
    return Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };
  }, [children]);

  const { onPress } = useDrawerMenuContext();

  return cloneElement(child, {
    ...child.props,
    onPress,
  });
}
