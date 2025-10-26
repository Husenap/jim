"use client";

import BackButton from "@/components/back-button";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";

export default function Navbar({
  onSearch,
}: {
  onSearch: (search: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 py-3">
      <BackButton />
      <Input
        placeholder="Type to search..."
        size="sm"
        startContent={<Search size={18} />}
        type="search"
        onChange={(e) => onSearch(e.currentTarget.value)}
      />
    </div>
  );
}
