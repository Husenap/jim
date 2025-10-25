"use client";

import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@heroui/react";
import { LogIn } from "lucide-react";

export default function Header() {
  return (
    <div
      className="grid w-full flex-1 bg-cover bg-center"
      style={{
        backgroundImage: "url(/hero.webp)",
      }}
    >
      <div className="col-start-1 row-start-1 bg-background bg-opacity-60"></div>
      <div className="col-start-1 row-start-1 flex items-center justify-center text-balance p-4 text-center text-foreground">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Jim!</h1>
          <p className="mb-5">
            The best and fastest way to track your gym progress!
          </p>
          <SignInButton>
            <Button color="primary" variant="shadow" startContent={<LogIn />}>
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}
