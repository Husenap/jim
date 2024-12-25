"use client";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { NextUIProvider } from "@nextui-org/react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "next-themes";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string,
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextUIProvider>
        <ClerkProvider
          publishableKey={
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string
          }
          appearance={{
            baseTheme: [dark],
          }}
        >
          <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            {children}
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}
