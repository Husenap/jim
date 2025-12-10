import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import BackButton from "@/components/back-button";
import DrawerPageContainer from "@/components/drawer-page-container";
import { TypographyH4 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { humanReadableDuration } from "@/utils/time-diff";
import type { TimeInputValue } from "@heroui/react";
import {
  Button,
  DatePicker,
  Divider,
  Drawer,
  DrawerContent,
  Input,
  Progress,
  Textarea,
  TimeInput,
  useDisclosure,
} from "@heroui/react";
import { fromAbsolute, toLocalTimeZone } from "@internationalized/date";
import type { DateValue } from "@react-types/datepicker";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

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
      <WorkoutDetailsNavbarSection />
    </>
  );
}

function WorkoutDetails({
  disableAnimation,
  startTime,
  endTime,
}: {
  disableAnimation?: boolean;
  startTime?: number;
  endTime?: number;
}) {
  const { activeWorkout, volume, finishedSets, totalSets } =
    useActiveWorkoutContext();

  const [timeString, setTimeString] = useState(
    humanReadableDuration({
      startTime: startTime ?? activeWorkout?._creationTime,
      endTime,
    }),
  );

  useEffect(() => {
    setTimeString(
      humanReadableDuration({
        startTime: startTime ?? activeWorkout?._creationTime,
        endTime,
      }),
    );
    if (disableAnimation) {
      return;
    }
    const interval = setInterval(
      () =>
        setTimeString(
          humanReadableDuration({
            startTime: startTime ?? activeWorkout?._creationTime,
            endTime,
          }),
        ),
      1000,
    );
    return () => {
      clearInterval(interval);
    };
  }, [activeWorkout, startTime, endTime]);

  return (
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
  );
}

function WorkoutDetailsNavbarSection() {
  const { finishedSets, totalSets } = useActiveWorkoutContext();

  return (
    <>
      <div className="-mx-2">
        <Progress
          size="sm"
          radius="none"
          value={finishedSets}
          minValue={0}
          maxValue={totalSets}
        />
        <WorkoutDetails />
      </div>
    </>
  );
}

function FinishButton() {
  const { totalSets, finishedSets } = useActiveWorkoutContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          {(onClose) => <WorkoutForm onClose={onClose} />}
        </DrawerContent>
      </Drawer>
    </>
  );
}

function WorkoutForm({ onClose }: { onClose: () => void }) {
  const { replace } = useRouter();
  const { activeWorkout } = useActiveWorkoutContext();

  const [title, setTitle] = useState(activeWorkout?.title ?? "Workout");
  const [description, setDescription] = useState("");

  const [startTime, setStartTime] = useState<DateValue | null>(
    toLocalTimeZone(
      fromAbsolute(activeWorkout?._creationTime ?? Date.now(), "utc"),
    ),
  );

  const [timeDuration, setTimeDuration] = useState<TimeInputValue | null>(null);

  const createWorkout = useMutation(api.workouts.create);

  const finalStartTime = useMemo(() => {
    if (startTime) {
      return startTime.toDate("").getTime();
    }
    return activeWorkout?._creationTime ?? Date.now();
  }, [startTime, activeWorkout]);

  const finalEndTime = useMemo(() => {
    if (timeDuration) {
      return (
        finalStartTime +
        ((timeDuration.hour * 60 + timeDuration.minute) * 60 +
          timeDuration.second) *
          1000
      );
    }
    return Date.now();
  }, [finalStartTime, timeDuration]);

  const onSave = useCallback(async () => {
    if (activeWorkout) {
      await createWorkout({
        activeWorkoutId: activeWorkout._id,
        title,
        description,
        startTime: finalStartTime,
        endTime: finalEndTime,
      });
      replace("/profile");
    }
  }, [activeWorkout, title, description, finalStartTime, finalEndTime]);

  return (
    <>
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
          </>
        }
      >
        <Input
          name="title"
          placeholder="Workout Title"
          value={title}
          onValueChange={setTitle}
          size="lg"
          variant="underlined"
          isClearable
        />
        <WorkoutDetails
          disableAnimation
          startTime={finalStartTime}
          endTime={finalEndTime}
        />
        <Divider />
        <Textarea
          label="Description"
          labelPlacement="outside"
          name="description"
          placeholder="How was your workout? Describe your workout here..."
          type="text"
          value={description}
          onValueChange={setDescription}
          variant="underlined"
          minRows={2}
        />
        <Divider />
        <DatePicker
          label="When workout started"
          labelPlacement="outside"
          hourCycle={24}
          value={startTime}
          onChange={(v) =>
            setStartTime(
              fromAbsolute(
                Math.min(v?.toDate("").getTime() ?? Date.now(), Date.now()),
                "utc",
              ),
            )
          }
          granularity="second"
          variant="underlined"
          maxValue={fromAbsolute(Date.now(), "utc")}
        />
        <Divider />
        <TimeInput
          label="Workout duration"
          labelPlacement="outside"
          hourCycle={24}
          value={timeDuration}
          onChange={setTimeDuration}
          granularity="second"
          variant="underlined"
        />
      </DrawerPageContainer>
    </>
  );
}
