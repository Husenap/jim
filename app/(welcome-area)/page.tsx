import HeaderAuth from "@/components/header-auth";
import Hero from "@/components/hero";
import { Avatar } from "@heroui/react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-dvh flex-col">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
          <div className="flex items-center gap-5 font-semibold">
            <Link href={"/"} className="flex flex-row items-center gap-2">
              <Avatar src="/favicon.ico"></Avatar>
              Jim
            </Link>
          </div>
          <HeaderAuth />
        </div>
      </nav>

      <div className="flex flex-1 flex-col">
        <Hero />
      </div>
    </main>
  );
}
