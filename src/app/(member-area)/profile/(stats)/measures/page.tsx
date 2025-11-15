"use client";

import Navbar from "@/app/(member-area)/profile/(stats)/measures/navbar";
import ChartWrapper from "@/components/charts/chart-wrapper";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import PageContainer from "@/components/page-container";
import { TypographyH1 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import { Divider } from "@heroui/react";
import { ResponsiveLine } from "@nivo/line";
import { DateTime } from "luxon";
import { useMemo } from "react";
import _ from "underscore";

export default function Page() {
  const { data, isPending, isSuccess } = useQueryWithStatus(
    api.measurements.bodyweight,
  );

  const chartData = useMemo(
    () => [
      {
        id: "bodyweight",
        data: _.chain(data)
          .filter(({ bodyweight }) => bodyweight !== undefined)
          .map(({ date, bodyweight }) => ({
            x: new Date(date),
            y: bodyweight!,
          }))
          .value(),
      },
    ],
    [data],
  );

  return (
    <>
      <PageContainer topNavbar={<Navbar />}>
        {isPending && <FullscreenSpinner />}
        {isSuccess && (
          <>
            <ChartWrapper>
              {(_theme, nivoTheme, colors) => (
                <>
                  <div className="h-64 w-full">
                    <ResponsiveLine
                      theme={nivoTheme}
                      colors={colors}
                      data={chartData}
                      margin={{
                        bottom: 40,
                        left: 40,
                        right: 20,
                        top: 20,
                      }}
                      yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        nice: true,
                      }}
                      xFormat="time:%Y-%m-%d"
                      xScale={{
                        format: "%Y-%m-%d",
                        precision: "day",
                        type: "time",
                        nice: true,
                      }}
                      axisBottom={{
                        format: "%Y %b %d",
                        tickRotation: 25,
                        tickValues: 5,
                      }}
                      enableGridX={false}
                      pointSize={5}
                      curve="monotoneX"
                    />
                  </div>
                </>
              )}
            </ChartWrapper>
            <TypographyH1>Bodyweight history</TypographyH1>
            <div className="flex flex-col gap-1">
              {chartData[0].data.map(({ x: date, y: bodyweight }, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex flex-row">
                    <div className="flex-1 text-left">
                      {DateTime.fromJSDate(date).toLocaleString(
                        DateTime.DATE_MED,
                      )}
                    </div>
                    <div className="text-right">{bodyweight}</div>
                  </div>
                  <Divider />
                </div>
              ))}
            </div>
          </>
        )}
      </PageContainer>
    </>
  );
}
