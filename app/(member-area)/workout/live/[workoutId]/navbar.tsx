import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import BackButton from "@/components/back-button";
import { TypographyH4 } from "@/components/typography";
import { humanReadiableDuration } from "@/utils/time-diff";
import { Button, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { activeWorkout, isOwner, volume, finishedSets } =
    useActiveWorkoutContext();
  const [timeString, setTimeString] = useState(
    humanReadiableDuration(activeWorkout?._creationTime),
  );
  useEffect(() => {
    setTimeString(humanReadiableDuration(activeWorkout?._creationTime));
    const interval = setInterval(
      () => setTimeString(humanReadiableDuration(activeWorkout?._creationTime)),
      1000,
    );
    return () => {
      clearInterval(interval);
    };
  }, [activeWorkout]);

  return (
    <>
      <div className="grid grid-cols-4 items-center p-3">
        <BackButton />
        {activeWorkout && (
          <>
            <span className="col-span-2 text-center">
              {isOwner ? "Log Workout" : "Spectate Workout"}
            </span>
            {isOwner && (
              <div className="text-right">
                <Button color="primary" className="under-construction">
                  Finish
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <Divider />
      <div className="flex flex-row items-center py-3">
        <div className="grid w-full grid-cols-3 text-center">
          <div className="flex flex-col">
            <TypographyH4>Duration</TypographyH4>
            <span className="text-nowrap text-primary">{timeString}</span>
          </div>
          <div className="flex flex-col">
            <TypographyH4>Volume</TypographyH4>
            <span className="text-nowrap">{volume}kg</span>
          </div>
          <div className="flex flex-col">
            <TypographyH4>Sets</TypographyH4>
            <span className="text-nowrap">{finishedSets}</span>
          </div>
        </div>
      </div>
    </>
  );
}
