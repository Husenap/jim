"use client";

import { Button, Link } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex h-auto w-full items-center gap-2 bg-content1 p-3">
      <div>
        <Button as={Link} href="/profile" isIconOnly variant="light">
          <ArrowLeft />
        </Button>
      </div>

      <span className="flex-1 text-center">Edit profile</span>
    </nav>
  );
}
