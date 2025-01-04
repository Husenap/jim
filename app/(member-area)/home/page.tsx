"use client";

import BottomNavbar from "@/app/(member-area)/bottom-navbar";
import Navbar from "@/app/(member-area)/home/navbar";
import PageContainer from "@/components/page-container";
import { api } from "@/convex/_generated/api";
import { Avatar, Badge, ScrollShadow } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { Link } from "next-view-transitions";

export default function Page() {
  const activeFollowees = useQuery(api.activeWorkouts.followees) ?? [];

  return (
    <PageContainer topNavbar={<Navbar />} bottomNavbar={<BottomNavbar />}>
      {activeFollowees.length > 0 && (
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
                        "bg-gradient-to-tr from-orange-400 via-pink-500 to-blue-500 text-white",
                    }}
                    content="live"
                    size="sm"
                  >
                    <div className="inline-block rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-blue-500 p-[3px]">
                      <div className="rounded-full bg-background p-[3px]">
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
                  <span className="w-24 overflow-hidden text-ellipsis text-nowrap text-center text-xs">
                    {user.username}
                  </span>
                </Link>
              ))}
            </div>
          </ScrollShadow>
        </>
      )}
    </PageContainer>
  );
}
