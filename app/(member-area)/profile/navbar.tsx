"use client";

import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="float-right">
      <UserButton />
    </nav>
  );
}
