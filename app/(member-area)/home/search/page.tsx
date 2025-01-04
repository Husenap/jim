"use client";

import Navbar from "@/app/(member-area)/home/search/navbar";
import PageContainer from "@/components/page-container";
import { api } from "@/convex/_generated/api";
import { Button, User } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { Link } from "next-view-transitions";
import { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  const users = useQuery(api.users.search, { search }) ?? [];

  return (
    <PageContainer topNavbar={<Navbar onSearch={setSearch} />}>
      {users.length <= 0 && <span>No users found.</span>}
      {users.length > 0 && (
        <div className="-mx-2 flex flex-col">
          {users.map((u) => (
            <Button
              key={u._id}
              radius="none"
              className="h-auto justify-start p-2"
              as={Link}
              href={`/user/${u.username}`}
              variant="light"
            >
              <User
                name={u.name}
                description={`@${u.username}`}
                avatarProps={{ src: u.imageURL }}
              />
            </Button>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
