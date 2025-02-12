"use client";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { HeroUIProvider } from "@heroui/react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider, useTheme } from "next-themes";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string,
);

function ThemeWrappedProviders({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <HeroUIProvider className="h-full min-h-full">
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
        appearance={{
          baseTheme: resolvedTheme == "dark" ? dark : undefined,
        }}
      >
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
          {children}
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </HeroUIProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      scriptProps={{ "data-cfasync": "false" }}
    >
      <ThemeWrappedProviders>{children}</ThemeWrappedProviders>
    </ThemeProvider>
  );
}
