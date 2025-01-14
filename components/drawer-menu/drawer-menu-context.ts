import { createContext } from "@nextui-org/react-utils";

import { UseDrawerMenuReturn } from "./use-drawer-menu";

export const [DrawerMenuProvider, useDrawerMenuContext] = createContext<UseDrawerMenuReturn>({
  name: "DrawerMenuContext",
  errorMessage:
    "useDrawerMenuContext: `context` is undefined. Seems you forgot to wrap all drawer-menu components within `<DrawerMenu />`",
});