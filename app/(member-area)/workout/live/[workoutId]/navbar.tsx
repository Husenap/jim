import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import BackButton from "@/components/back-button";
import PageContainer from "@/components/page-container";
import { TypographyH4 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { humanReadiableDuration } from "@/utils/time-diff";
import {
  Button,
  Divider,
  Drawer,
  DrawerContent,
  Input,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation } from "convex/react";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { activeWorkout, isOwner } = useActiveWorkoutContext();

  return (
    <>
      <div className="grid grid-cols-4 items-center py-3">
        <BackButton />
        {activeWorkout && (
          <>
            <span className="col-span-2 text-center">
              {isOwner ? "Log Workout" : "Spectate Workout"}
            </span>
            {isOwner && <FinishButton />}
          </>
        )}
      </div>
      <Divider />
      <WorkoutDetails />
    </>
  );
}

function WorkoutDetails({ disableAnimation }: { disableAnimation?: boolean }) {
  const { activeWorkout, volume, finishedSets } = useActiveWorkoutContext();
  const [timeString, setTimeString] = useState(
    humanReadiableDuration({ startTime: activeWorkout?._creationTime }),
  );
  if (!disableAnimation) {
    useEffect(() => {
      setTimeString(
        humanReadiableDuration({ startTime: activeWorkout?._creationTime }),
      );
      const interval = setInterval(
        () =>
          setTimeString(
            humanReadiableDuration({ startTime: activeWorkout?._creationTime }),
          ),
        1000,
      );
      return () => {
        clearInterval(interval);
      };
    }, [activeWorkout]);
  }

  return (
    <div className="flex flex-row items-center py-3">
      <div className="grid w-full grid-cols-3 text-center">
        <div className="flex flex-col">
          <TypographyH4>Duration</TypographyH4>
          <span className="text-nowrap text-primary">{timeString}</span>
        </div>
        <div className="flex flex-col">
          <TypographyH4>Volume</TypographyH4>
          <span className="text-nowrap">{volume} kg</span>
        </div>
        <div className="flex flex-col">
          <TypographyH4>Sets</TypographyH4>
          <span className="text-nowrap">{finishedSets}</span>
        </div>
      </div>
    </div>
  );
}

function FinishButton() {
  const { activeWorkout } = useActiveWorkoutContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [title, setTitle] = useState(activeWorkout?.title ?? "Workout");
  const [description, setDescription] = useState("");

  const createWorkout = useMutation(api.workouts.create);
  const { replace } = useTransitionRouter();

  const onSave = async () => {
    if (activeWorkout) {
      await createWorkout({
        activeWorkoutId: activeWorkout._id,
        title,
        description,
      });
      replace("/profile");
    }
  };

  return (
    <>
      <div className="text-right">
        <Button onPress={onOpen} color="primary">
          Finish
        </Button>
      </div>

      <Drawer
        placement="bottom"
        hideCloseButton
        size="full"
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      >
        <DrawerContent>
          {(onClose) => (
            <PageContainer
              topNavbar={
                <>
                  <div className="grid grid-cols-4 items-center py-3">
                    <BackButton onPress={onClose} />
                    <span className="col-span-2 text-center">Save Workout</span>
                    <div className="text-right">
                      <Button color="primary" onPress={onSave}>
                        Save
                      </Button>
                    </div>
                  </div>
                  <Divider />
                  <WorkoutDetails disableAnimation />
                </>
              }
            >
              <Input
                label="Title"
                labelPlacement="outside"
                name="title"
                placeholder="Workout Title"
                value={title}
                onValueChange={setTitle}
              />
              <Textarea
                label="Description"
                labelPlacement="outside"
                name="description"
                placeholder="Describe your workout"
                type="text"
                value={description}
                onValueChange={setDescription}
              />
            </PageContainer>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
