import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import BackButton from "@/components/back-button";
import DrawerPageContainer from "@/components/drawer-page-container";
import { TypographyH4 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { humanReadiableDuration } from "@/utils/time-diff";
import {
  Button,
  Divider,
  Drawer,
  DrawerContent,
  Input,
  Progress,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
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
      <WorkoutDetails />
    </>
  );
}

function WorkoutDetails({ disableAnimation }: { disableAnimation?: boolean }) {
  const { activeWorkout, volume, finishedSets, totalSets } =
    useActiveWorkoutContext();
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
    <div className="-mx-2">
      <Progress
        size="sm"
        radius="none"
        value={finishedSets}
        minValue={0}
        maxValue={totalSets}
      />
      <div className="flex flex-row items-center py-3">
        <div className="grid w-full grid-cols-3 text-center">
          <div className="flex flex-col">
            <TypographyH4>Duration</TypographyH4>
            <span className="text-primary text-nowrap">{timeString}</span>
          </div>
          <div className="flex flex-col">
            <TypographyH4>Volume</TypographyH4>
            <span className="text-nowrap">{volume} kg</span>
          </div>
          <div className="flex flex-col">
            <TypographyH4>Sets</TypographyH4>
            <span className="text-nowrap">
              {finishedSets}/{totalSets}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinishButton() {
  const { activeWorkout, totalSets, finishedSets } = useActiveWorkoutContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [title, setTitle] = useState(activeWorkout?.title ?? "Workout");
  const [description, setDescription] = useState("");

  const createWorkout = useMutation(api.workouts.create);
  const { replace } = useRouter();

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
        <Button
          onPress={onOpen}
          color="primary"
          isDisabled={totalSets !== finishedSets}
        >
          Finish
        </Button>
      </div>

      <Drawer
        placement="right"
        hideCloseButton
        size="full"
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      >
        <DrawerContent>
          {(onClose) => (
            <DrawerPageContainer
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
            </DrawerPageContainer>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
