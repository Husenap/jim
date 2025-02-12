"use client";

import BottomNavbar from "@/app/(member-area)/bottom-navbar";
import DrawerMenu from "@/components/drawer-menu/drawer-menu";
import DrawerMenuContent from "@/components/drawer-menu/drawer-menu-content";
import DrawerMenuTrigger from "@/components/drawer-menu/drawer-menu-trigger";
import PageContainer from "@/components/page-container";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
} from "@heroui/react";
import { useMutation, useQuery } from "convex/react";
import {
  Copy,
  Ellipsis,
  NotepadText,
  Pen,
  Plus,
  Search,
  Share,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const routines = useQuery(api.routines.custom) ?? [];
  const removeRoutine = useMutation(api.routines.remove);
  const createWorkout = useMutation(api.activeWorkouts.create);
  const { push } = useRouter();

  const [isStarting, setIsStarting] = useState(false);

  const startWorkout = async (id?: Id<"routines">) => {
    try {
      setIsStarting(true);
      const workoutId = await createWorkout({ id });
      push(`/workout/live/${workoutId}`);
    } catch {
      setIsStarting(false);
    }
  };

  return (
    <>
      <PageContainer bottomNavbar={<BottomNavbar />}>
        <TypographyH2>Quick Start</TypographyH2>
        <Button
          size="lg"
          startContent={<Plus />}
          onPress={() => startWorkout()}
        >
          Start Empty Workout
        </Button>
        <TypographyH2>Routines</TypographyH2>
        <div className="grid grid-cols-2 gap-4">
          <Button
            as={Link}
            href="/workout/create-routine"
            size="lg"
            startContent={<NotepadText />}
          >
            New Routine
          </Button>
          <Button
            size="lg"
            startContent={<Search />}
            className="under-construction"
          >
            Explore
          </Button>
        </div>
        <TypographyH3>My Routines</TypographyH3>
        {routines.map((r) => (
          <Card key={r._id} fullWidth as="div">
            <CardHeader className="items-start justify-between">
              <div>
                <TypographyH1>{r.name}</TypographyH1>
                <TypographyH4>
                  {r.exercises.map((e) => e.name).join(", ")}
                </TypographyH4>
              </div>
              <DrawerMenu>
                <DrawerMenuTrigger>
                  <Button isIconOnly variant="light" size="md">
                    <Ellipsis size={20} />
                  </Button>
                </DrawerMenuTrigger>
                <DrawerMenuContent ariaLabel="Routine Menu">
                  <MenuItem
                    key="share"
                    className="under-construction"
                    startContent={<Share />}
                  >
                    Share routine
                  </MenuItem>
                  <MenuItem
                    key="duplicate"
                    className="under-construction"
                    startContent={<Copy />}
                  >
                    Duplicate routine
                  </MenuItem>
                  <MenuItem
                    key="edit"
                    className="under-construction"
                    startContent={<Pen />}
                  >
                    Edit routine
                  </MenuItem>
                  <MenuItem
                    key="delete"
                    color="danger"
                    className="text-danger"
                    onPress={() => {
                      removeRoutine({ id: r._id });
                    }}
                    startContent={<X />}
                  >
                    Remove routine
                  </MenuItem>
                </DrawerMenuContent>
              </DrawerMenu>
            </CardHeader>
            <CardFooter>
              <Button
                fullWidth
                color="primary"
                onPress={() => startWorkout(r._id)}
              >
                Start Routine
              </Button>
            </CardFooter>
          </Card>
        ))}
      </PageContainer>
      <Modal
        isOpen={isStarting}
        isDismissable={false}
        backdrop="blur"
        placement="center"
        hideCloseButton
      >
        <ModalContent>
          <ModalBody className="p-4">
            <div className="flex flex-row items-center justify-center gap-4">
              <Spinner />
              Starting workout...
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
