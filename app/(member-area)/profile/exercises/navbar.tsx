"use client";

import BackButton from "@/components/back-button";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { Search } from "lucide-react";

export default function Navbar({
  onSearch,
}: {
  onSearch?: (search: string) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-3 items-center p-3">
        <BackButton />

        <span className="text-center">Exercises</span>

        <div className="text-right">
          <Button
            as={Link}
            color="primary"
            href="/profile/exercises/create"
            variant="light"
          >
            Create
          </Button>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-2 p-3">
        <Input
          isClearable
          placeholder="Type to search..."
          size="sm"
          startContent={<Search size={18} />}
          type="search"
          onChange={(e) => onSearch && onSearch(e.currentTarget.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" isDisabled>
            Equipment
          </Button>
          <Button size="sm" isDisabled>
            Muscle Groups
          </Button>
        </div>
      </div>
    </>
  );
}
