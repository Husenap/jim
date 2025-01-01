import { Providers } from "@/app/providers";
import { cn } from "@nextui-org/react";
import { Viewport } from "next";
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
    <html
      lang="en"
      className={cn(geistSans.className, "h-full min-h-full overscroll-none")}
      suppressHydrationWarning
    >
      <body className="relative h-full min-h-full w-full bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
