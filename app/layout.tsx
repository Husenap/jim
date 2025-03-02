import { Providers } from "@/app/providers";
import { cn, Tooltip } from "@heroui/react";
import { CircleDot } from "lucide-react";
import { Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Geist } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL
  ? "https://jim.husseintaher.com"
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Jim",
  description: "The best and fastest way to track your gym progress!",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  minimumScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: [
    {
      color: "#27272a",
      media: "(prefers-color-scheme: dark)",
    },
    {
      color: "#f4f4f5",
      media: "(prefers-color-scheme: light)",
    },
  ],
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={cn(
          geistSans.className,
          "h-full min-h-full overflow-x-hidden overscroll-x-none",
        )}
        suppressHydrationWarning
      >
        <body className="relative h-full min-h-full w-full overflow-x-hidden overscroll-x-none bg-background text-foreground">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
