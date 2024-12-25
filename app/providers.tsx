'use client'

import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { NextUIProvider } from '@nextui-org/react';
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from 'next-themes';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
          <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            {children}
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </ThemeProvider >
    </NextUIProvider >
  )
}