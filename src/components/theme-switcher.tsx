// app/components/ThemeSwitcher.tsx
"use client";

import { Select, SelectItem, Skeleton } from "@heroui/react";
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
    <Select
      label="Theme"
      labelPlacement="outside"
      selectedKeys={[theme || "light"]}
      selectionMode="single"
      fullWidth={false}
      startContent={
        theme == "light" ? <Sun /> : theme == "dark" ? <Moon /> : <Computer />
      }
    >
      <SelectItem
        startContent={<Sun />}
        key="light"
        onPress={() => setTheme("light")}
      >
        Light
      </SelectItem>
      <SelectItem
        startContent={<Moon />}
        key="dark"
        onPress={() => setTheme("dark")}
      >
        Dark
      </SelectItem>
      <SelectItem
        startContent={<Computer />}
        key="system"
        onPress={() => setTheme("system")}
      >
        System
      </SelectItem>
    </Select>
  );
}
