"use client";

import Navbar from "@/app/(member-area)/profile/(stats)/calendar/sick-leave/navbar";
import Calendar from "@/components/calendar/calendar";
import { useCalendarContext } from "@/components/calendar/calendar-context";
import ConfirmationDialog from "@/components/confirmation-dialog";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import PageContainer from "@/components/page-container";
import { api } from "@/convex/_generated/api";
import { Button, Divider, useDisclosure } from "@heroui/react";
import { useMutation } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { Trash } from "lucide-react";
import { DateTime } from "luxon";

export default function Page() {
  return (
    <Calendar>
      <PageContainer topNavbar={<Navbar />}>
        <Content />
      </PageContainer>
    </Calendar>
  );
}

function Content() {
  const { sickLeaves, isPending, isSuccess } = useCalendarContext();

  return (
    <>
      {isPending && <FullscreenSpinner />}
      {isSuccess && (
        <>
          {sickLeaves.toReversed().map((sickLeave) => (
            <Entry key={sickLeave.id} sickLeave={sickLeave} />
          ))}
        </>
      )}
    </>
  );
}

function Entry({
  sickLeave,
}: {
  sickLeave: FunctionReturnType<typeof api.sickLeaves.get>[0];
}) {
  const remove = useMutation(api.sickLeaves.remove);
  const disclosure = useDisclosure();

  return (
    <>
      <div className="flex items-center justify-between">
        <span>
          {DateTime.fromMillis(sickLeave.startTime, { zone: "utc" }).toFormat(
            "yyyy/MM/dd",
          )}
          &nbsp; &mdash; &nbsp;
          {DateTime.fromMillis(sickLeave.endTime, { zone: "utc" }).toFormat(
            "yyyy/MM/dd",
          )}
        </span>
        <Button
          isIconOnly
          variant="light"
          color="danger"
          onPress={disclosure.onOpen}
        >
          <Trash />
        </Button>
      </div>
      <ConfirmationDialog
        disclosure={disclosure}
        titleText="Are you sure you want to remove this sick leave entry?"
        confirmText="Remove"
        onConfirm={async () => {
          await remove({ id: sickLeave.id });
        }}
      />
      <Divider />
    </>
  );
}
