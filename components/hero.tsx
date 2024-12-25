"use client";

import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@nextui-org/react";
import { LogIn } from "lucide-react";

export default function Header() {
  return (
    <div
      className="w-full flex-1 grid bg-center bg-cover"
      style={{
        backgroundImage: "url(/hero.webp)",
      }}>
      <div className="bg-opacity-60 bg-background col-start-1 row-start-1"></div>
      <div className="flex items-center justify-center text-foreground text-center col-start-1 row-start-1 p-4 text-balance">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Jim!</h1>
          <p className="mb-5">
            The best and fastest way to track your gym progress!
          </p>
          <SignInButton>
            <Button color="primary" variant="shadow" startContent={<LogIn />}>Sign In</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}
