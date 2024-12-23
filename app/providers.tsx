'use client'

import { ConvexClientProvider } from '@/components/convex/convex-client-provider'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </ThemeProvider>
    </NextUIProvider>
  )
}