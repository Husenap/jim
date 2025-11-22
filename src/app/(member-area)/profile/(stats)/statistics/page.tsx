"use client";

import Navbar from "@/app/(member-area)/profile/(stats)/statistics/navbar";
import ChartWrapper from "@/components/charts/chart-wrapper";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import PageContainer from "@/components/page-container";
import { TypographyH1 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import type { MuscleGroup } from "@/convex/schema";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ResponsiveRadar } from "@nivo/radar";
import { DateTime } from "luxon";
import Image, { StaticImageData } from "next/image";
import { useMemo } from "react";
import _ from "underscore";
import BodyImage from "./muscles/muscles_background.png";

export default function Page() {
  const muscles: Partial<Record<MuscleGroup, StaticImageData>> = {
    abdominals: require("./muscles/muscles_abdominals.png"),
    abductors: require("./muscles/muscles_abductors.png"),
    adductors: require("./muscles/muscles_adductors.png"),
    biceps: require("./muscles/muscles_biceps.png"),
    calves: require("./muscles/muscles_calves.png"),
    "lower chest": require("./muscles/muscles_lower_chest.png"),
    "upper chest": require("./muscles/muscles_upper_chest.png"),
    forearms: require("./muscles/muscles_forearms.png"),
    glutes: require("./muscles/muscles_glutes.png"),
    hamstrings: require("./muscles/muscles_hamstrings.png"),
    lats: require("./muscles/muscles_lats.png"),
    "lower back": require("./muscles/muscles_lower_back.png"),
    "upper back": require("./muscles/muscles_upper_back.png"),
    neck: require("./muscles/muscles_neck.png"),
    quadriceps: require("./muscles/muscles_quadriceps.png"),
    "front delts": require("./muscles/muscles_front_delts.png"),
    "side delts": require("./muscles/muscles_side_delts.png"),
    "rear delts": require("./muscles/muscles_rear_delts.png"),
    traps: require("./muscles/muscles_traps.png"),
    triceps: require("./muscles/muscles_triceps.png"),
  };

  const tableRows: MuscleGroup[] = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "lower back",
    "upper back",
    "calves",
    "lower chest",
    "upper chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "neck",
    "quadriceps",
    "front delts",
    "side delts",
    "rear delts",
    "traps",
    "triceps",
  ];

  const { data, isPending, isSuccess } = useQueryWithStatus(
    api.measurements.setsPerMuscle,
  );

  const setsPerMuscle = useMemo(() => {
    const muscles: Partial<Record<MuscleGroup, number>> = {};

    if (!data) return muscles;

    const fromDate = DateTime.local().startOf("day").minus({ weeks: 1 });

    for (const workout of data) {
      if (DateTime.fromMillis(workout.date).startOf("day") < fromDate) continue;
      for (const exercise of workout.exercises) {
        const muscleGroups = exercise.muscleGroups;
        const sets = exercise.numSets;
        for (const muscle of muscleGroups) {
          let mgs = [muscle.muscleGroup];
          switch (muscle.muscleGroup) {
            case "shoulders":
              mgs = ["front delts", "side delts", "rear delts"];
              break;
            case "chest":
              mgs = ["lower chest", "upper chest"];
              break;
          }
          for (const mg of mgs) {
            if (muscles[mg] === undefined) {
              muscles[mg] = 0;
            }
            muscles[mg] += sets * muscle.weight;
          }
        }
      }
    }
    return muscles;
  }, [data]);

  const muscleDistribution = useMemo(() => {
    const maxSets = _(setsPerMuscle).max();
    const setsDenom = Math.min(maxSets, 10.0);
    return _(setsPerMuscle).mapObject((sets) =>
      Math.min(sets / setsDenom, 1.0),
    );
  }, [setsPerMuscle]);

  const muscleGroupDistribution = useMemo(
    () => [
      {
        value: _(setsPerMuscle)
          .filter(
            (sets, mg) =>
              mg === "front delts" ||
              mg === "side delts" ||
              mg === "rear delts",
          )
          .reduce((a, b) => a + b, 0),
        muscleGroup: "shoulders",
      },
      {
        value: _(setsPerMuscle)
          .filter(
            (sets, mg) =>
              mg === "biceps" || mg === "triceps" || mg === "forearms",
          )
          .reduce((a, b) => a + b, 0),
        muscleGroup: "arms",
      },
      {
        value: _(setsPerMuscle)
          .filter((sets, mg) => mg === "lower back" || mg === "abdominals")
          .reduce((a, b) => a + b, 0),
        muscleGroup: "core",
      },
      {
        value: _(setsPerMuscle)
          .filter(
            (sets, mg) =>
              mg === "abductors" ||
              mg === "adductors" ||
              mg === "calves" ||
              mg === "glutes" ||
              mg === "hamstrings" ||
              mg === "quadriceps",
          )
          .reduce((a, b) => a + b, 0),
        muscleGroup: "legs",
      },
      {
        value: _(setsPerMuscle)
          .filter(
            (sets, mg) =>
              mg === "lats" ||
              mg === "lower back" ||
              mg === "upper back" ||
              mg === "neck" ||
              mg === "traps",
          )
          .reduce((a, b) => a + b, 0),
        muscleGroup: "back",
      },
      {
        value: _(setsPerMuscle)
          .filter((sets, mg) => mg === "lower chest" || mg === "upper chest")
          .reduce((a, b) => a + b, 0),
        muscleGroup: "chest",
      },
    ],
    [setsPerMuscle],
  );

  return (
    <>
      <PageContainer topNavbar={<Navbar />}>
        {isPending && <FullscreenSpinner />}
        {isSuccess && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div>
                <TypographyH1 className="text-center">
                  Body Distribution
                </TypographyH1>
                <div className="w-full">
                  <div className="relative mx-auto aspect-square max-h-64 w-auto">
                    <Image
                      className="absolute inset-0"
                      alt="Human body"
                      src={BodyImage}
                    />
                    {_(muscles).map((muscleImage, muscle) => (
                      <Image
                        key={muscle}
                        className="absolute inset-0"
                        alt={muscle}
                        src={muscleImage}
                        style={{
                          opacity:
                            muscleDistribution[muscle as MuscleGroup] ?? 0.0,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <TypographyH1 className="text-center">
                  Muscle Distribution
                </TypographyH1>
                <ChartWrapper>
                  {(theme, nivoTheme, colors) => (
                    <div className="h-64 w-full">
                      <ResponsiveRadar
                        curve="linearClosed"
                        data={muscleGroupDistribution}
                        indexBy="muscleGroup"
                        keys={["value"]}
                        margin={{
                          bottom: 10,
                          left: 50,
                          right: 50,
                          top: 10,
                        }}
                        isInteractive={false}
                        rotation={-30}
                        theme={nivoTheme}
                        colors={colors}
                      />
                    </div>
                  )}
                </ChartWrapper>
              </div>
            </div>

            <Table isCompact>
              <TableHeader>
                <TableColumn>Muscle</TableColumn>
                <TableColumn>Sets</TableColumn>
              </TableHeader>
              <TableBody>
                <>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>
                      {_(setsPerMuscle)
                        .values()
                        .reduce((a, b) => a + b, 0)}
                    </TableCell>
                  </TableRow>
                  {_.chain(tableRows)
                    .sortBy((a) => -(setsPerMuscle[a] ?? 0))
                    .map((mg) => (
                      <TableRow key={mg}>
                        <TableCell>
                          {mg[0].toUpperCase() + mg.slice(1)}
                        </TableCell>
                        <TableCell>{setsPerMuscle[mg] ?? 0}</TableCell>
                      </TableRow>
                    ))
                    .value()}
                </>
              </TableBody>
            </Table>
          </>
        )}
      </PageContainer>
    </>
  );
}
