import HeaderAuth from "@/components/header-auth";
import Hero from "@/components/hero";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-dvh flex flex-col">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"} className="flex flex-row gap-2 items-center">
              <Avatar src="/favicon.ico"></Avatar>
              Jim
            </Link>
          </div>
          <HeaderAuth />
        </div>
      </nav>

      <div className="flex flex-col flex-1">
        <Hero />
      </div>
    </main>
  );
}
