import { Providers } from "@/app/providers";
import { cn, Tooltip } from "@nextui-org/react";
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
          "h-full min-h-full overflow-x-hidden",
        )}
        suppressHydrationWarning
      >
        <body className="relative h-full min-h-full w-full bg-background text-foreground">
          <Providers>
            <Tooltip content="Report Github Issue" color="danger">
              <a
                target="_blank"
                style={{ viewTransitionName: "jim-create-issue-button" }}
                href="https://github.com/Husenap/jim/issues/new"
                className="fixed left-0 top-0 z-[100] h-6 w-6"
              >
                <CircleDot className="text-danger" />
              </a>
            </Tooltip>
            {children}
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
