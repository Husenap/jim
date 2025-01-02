"use client";

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Dumbbell, Home, Play, User, X } from "lucide-react";
import { Link, useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();

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

  const workoutInProgress = false;

  return (
    <>
      {workoutInProgress && (
        <>
          <div className="flex flex-col gap-2 p-2">
            <span className="text-center">Workout in progress</span>
            <div className="flex flex-row justify-around">
              <Button
                color="primary"
                variant="light"
                startContent={<Play size={20} />}
                size="lg"
              >
                Resume
              </Button>
              <Button
                color="danger"
                variant="light"
                size="lg"
                startContent={<X size={20} />}
              >
                Discard
              </Button>
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
            >
              {tab.title}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
