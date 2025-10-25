import { cn } from "@heroui/react";
import React from "react";

export function TypographyH1({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <h1 className={cn("text-xl", className)}>{children}</h1>;
}
export function TypographyH2({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-lg text-default-500", className)}>{children}</h2>
  );
}

export function TypographyH3({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-md text-default-400", className)}>{children}</h3>
  );
}

export function TypographyH4({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h4 className={cn("text-sm text-default-400", className)}>{children}</h4>
  );
}
