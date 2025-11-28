"use client";

import ConfirmationDialog from "@/components/confirmation-dialog";
import { api } from "@/convex/_generated/api";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import { Button, Divider, useDisclosure } from "@heroui/react";
import { useMutation } from "convex/react";
import { Dumbbell, Home, Play, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();
  const { data: activeWorkout, isSuccess } = useQueryWithStatus(
    api.activeWorkouts.current,
  );
  const { push } = useRouter();

  const tabs = [
    {
      href: "/home",
      title: "Home",
      icon: <Home />,
    },
    {
      href: "/workout",
      title: "Workout",
      icon: <Dumbbell />,
    },
    {
      href: "/profile",
      title: "Profile",
      icon: <User />,
    },
  ];

  return (
    <>
      {isSuccess && activeWorkout && (
        <>
          <div className="flex flex-col gap-2 p-2">
            <span className="text-center">Workout in progress</span>
            <div className="flex flex-row justify-around">
              <Button
                color="primary"
                variant="light"
                startContent={<Play size={20} />}
                size="lg"
                onPress={() => push(`/workout/live/${activeWorkout?._id}`)}
              >
                Resume
              </Button>
              <WorkoutDiscardButton />
            </div>
          </div>
          <Divider />
        </>
      )}
      <div className="flex w-full flex-row items-center justify-around">
        {tabs.map((tab) => (
          <div
            key={tab.href}
            className="flex flex-1 items-center justify-center gap-2 p-2"
          >
            <Button
              color="primary"
              startContent={tab.icon}
              variant={pathname.startsWith(tab.href) ? "shadow" : "light"}
              as={Link}
              href={tab.href}
              prefetch
            >
              {tab.title}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

function WorkoutDiscardButton() {
  const disclosure = useDisclosure();
  const removeActiveWorkout = useMutation(api.activeWorkouts.remove);

  return (
    <>
      <Button
        color="danger"
        variant="light"
        size="lg"
        startContent={<X size={20} />}
        onPress={disclosure.onOpen}
      >
        Discard
      </Button>
      <ConfirmationDialog
        disclosure={disclosure}
        titleText="Are you sure you want to discard the active workout?"
        confirmText="Discard"
        onConfirm={removeActiveWorkout}
      />
    </>
  );
}
