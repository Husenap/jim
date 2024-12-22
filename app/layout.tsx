import { Providers } from "@/app/providers";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Avatar, Divider } from "@nextui-org/react";

const defaultUrl = process.env.VERCEL
  ? 'https://jim.husseintaher.com'
  : 'http://localhost:3000';

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
      <body className="bg-background text-foreground">
        <Providers>
          <main className="min-h-dvh flex flex-col">

            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href={"/"} className="flex flex-row gap-2 items-center">
                    <Avatar src="favicon.ico"></Avatar>
                    Jim
                  </Link>
                </div>
                <HeaderAuth />
              </div>
            </nav>

            <div className="flex flex-1">
              {children}
            </div>

            <Divider />

            <footer className="w-full flex items-center justify-center mx-auto text-center text-xs gap-8 py-8">
              <ThemeSwitcher />
            </footer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
