"use client";

import Navbar from "@/app/(member-area)/home/search/navbar";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import PageContainer from "@/components/page-container";
import { api } from "@/convex/_generated/api";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import { Button, User } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");

  const {
    data: users,
    isSuccess,
    isPending,
  } = useQueryWithStatus(api.users.search, {
    search,
  });

  return (
    <PageContainer topNavbar={<Navbar onSearch={setSearch} />}>
      {isPending && <FullscreenSpinner />}
      {isSuccess && (
        <>
          {users.length <= 0 ? (
            <span>No users found.</span>
          ) : (
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
        </>
      )}
    </PageContainer>
  );
}
