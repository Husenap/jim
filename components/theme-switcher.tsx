// app/components/ThemeSwitcher.tsx
"use client";

import { Button, Skeleton, Tooltip } from "@nextui-org/react";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <Skeleton className="h-10 w-10 rounded-medium"></Skeleton>;

  return (
    <Tooltip content={theme}>
      <Button
        isIconOnly
        aria-label="Set theme"
        onPress={() =>
          setTheme(
            theme == "light" ? "dark" : theme == "dark" ? "system" : "light",
          )
        }
      >
        {theme == "light" ? <Sun /> : theme == "dark" ? <Moon /> : <Computer />}
      </Button>
    </Tooltip>
  );
}
