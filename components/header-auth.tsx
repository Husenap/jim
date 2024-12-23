"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";

export default function AuthButton() {
  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
    </main>
  );
}
