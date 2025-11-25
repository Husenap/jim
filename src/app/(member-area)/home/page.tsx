"use client";

import BottomNavbar from "@/app/(member-area)/bottom-navbar";
import Navbar from "@/app/(member-area)/home/navbar";
import PageContainer from "@/components/page-container";
import WorkoutFeed from "@/components/workout/workout-feed";
import { api } from "@/convex/_generated/api";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import type { Selection } from "@heroui/react";
import { Avatar, Badge, ScrollShadow } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const { data: activeFollowees, isSuccess } = useQueryWithStatus(
    api.activeWorkouts.followees,
  );
  const [page, setPage] = useState<Selection>(new Set(["home"]));

  return (
    <PageContainer
      topNavbar={<Navbar page={page} setPage={setPage} />}
      bottomNavbar={<BottomNavbar />}
    >
      {isSuccess && activeFollowees.length > 0 && (
        <>
          <ScrollShadow
            className="-mx-2"
            orientation="horizontal"
            visibility="both"
            hideScrollBar
            size={16}
          >
            <div className="flex flex-row p-1">
              {activeFollowees.map(({ user, activeWorkout }) => (
                <Link
                  href={`/workout/live/${activeWorkout._id}`}
                  key={activeWorkout._id}
                  className="flex flex-col items-center gap-1"
                >
                  <Badge
                    classNames={{
                      badge:
                        "bg-linear-to-tr from-orange-400 via-pink-500 to-blue-500 text-white",
                    }}
                    content="live"
                    size="sm"
                  >
                    <div className="inline-block rounded-full bg-linear-to-tr from-orange-400 via-pink-500 to-blue-500 p-[3px]">
                      <div className="bg-background rounded-full p-[3px]">
                        <Avatar
                          className="h-[72px] w-[72px]"
                          size="lg"
                          color="danger"
                          radius="full"
                          src={user.imageURL}
                        />
                      </div>
                    </div>
                  </Badge>
                  <span className="w-24 overflow-hidden text-center text-xs text-nowrap text-ellipsis">
                    {user.username}
                  </span>
                </Link>
              ))}
            </div>
          </ScrollShadow>
        </>
      )}

      <div className="-mx-2">
        <WorkoutFeed discovery={page instanceof Set && page.has("discovery")} />
      </div>
    </PageContainer>
  );
}
