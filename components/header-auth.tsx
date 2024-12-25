"use client";

import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@nextui-org/react";
import { LogIn } from "lucide-react";

export default function AuthButton() {
  return (
    <div className="flex flex-col items-center">
      <SignInButton>
        <Button color="primary" variant="shadow" startContent={<LogIn />}>Sign In</Button>
      </SignInButton>
    </div>
  );
}
