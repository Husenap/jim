"use client";

import BackButton from "@/components/back-button";
import { useCalendarContext } from "@/components/calendar/calendar-context";
import { api } from "@/convex/_generated/api";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  RangeCalendar,
  useDisclosure,
} from "@heroui/react";
import { fromAbsolute } from "@internationalized/date";
import { useMutation } from "convex/react";
import { ClipboardPlus } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";

export default function Navbar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] =
    useState<Parameters<typeof RangeCalendar>[0]["value"]>();
  const create = useMutation(api.sickLeaves.create);
  const { dates } = useCalendarContext();

  const firstDate = Math.min(...dates, Date.now());
  const lastDate = Date.now();

  return (
    <div className="-mx-2 flex flex-col">
      <div className="grid grid-cols-3 items-center px-2 py-3">
        <div>
          <BackButton />
        </div>

        <div className="text-center">Sick Leave</div>

        <div className="flex justify-end">
          <Button
            startContent={<ClipboardPlus />}
            color="secondary"
            onPress={onOpen}
          >
            Log
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Add a new sick leave entry</ModalHeader>
                  <ModalBody>
                    <div className="flex justify-center">
                      <RangeCalendar
                        showMonthAndYearPickers
                        firstDayOfWeek="mon"
                        value={value}
                        onChange={setValue}
                        color="secondary"
                        minValue={fromAbsolute(firstDate, "utc")}
                        maxValue={fromAbsolute(lastDate, "utc")}
                      />
                    </div>
                    <Button
                      color="secondary"
                      isDisabled={!value}
                      onPress={async () => {
                        await create({
                          startTime: DateTime.utc(
                            value!.start.year,
                            value!.start.month,
                            value!.start.day,
                          ).toMillis(),
                          endTime: DateTime.utc(
                            value!.end.year,
                            value!.end.month,
                            value!.end.day,
                          ).toMillis(),
                        });
                        onClose();
                        setValue(null);
                      }}
                    >
                      Register sick leave
                    </Button>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
