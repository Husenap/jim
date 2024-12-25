import { Providers } from "@/app/providers";
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
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="h-full w-full bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
