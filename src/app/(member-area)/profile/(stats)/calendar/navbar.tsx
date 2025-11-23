import BackButton from "@/components/back-button";
import type { Selection } from "@heroui/react";
import { Divider, Select, SelectItem } from "@heroui/react";
import { Flame, Hourglass, Moon } from "lucide-react";

export default function Navbar({
  category,
  setCategory,
  weekStreak,
  previousWeekStreak,
  restDays,
}: {
  category: Selection;
  setCategory: (selection: Selection) => void;
  weekStreak: number;
  previousWeekStreak: number;
  restDays: number;
}) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 items-center py-3">
        <div>
          <BackButton />
        </div>

        <div>
          <Select
            variant="underlined"
            selectedKeys={category}
            onSelectionChange={setCategory}
            disallowEmptySelection
            className="mx-auto w-32"
          >
            <SelectItem key="month">Month</SelectItem>
            <SelectItem key="year">Year</SelectItem>
            <SelectItem key="multi-year">Multi-year</SelectItem>
          </Select>
        </div>

        <div className="flex justify-end gap-2"></div>
      </div>

      <Divider />

      <div className="flex items-center py-3">
        <div className="flex flex-1 justify-center gap-1">
          {previousWeekStreak !== 0 && weekStreak === 0 ? (
            <>
              <Hourglass className="text-orange-500" />
              <span>{previousWeekStreak} week streak</span>
            </>
          ) : weekStreak !== 0 ? (
            <>
              <Flame className="text-orange-500" />
              <span>{weekStreak} week streak</span>
            </>
          ) : (
            <>
              <Flame className="text-default-400" />
              <span>{weekStreak} week streak</span>
            </>
          )}
        </div>
        <Divider orientation="vertical" className="-my-3 h-12" />
        <div className="flex flex-1 justify-center gap-1">
          <Moon className="text-blue-500" />
          <span>
            {restDays} rest day{restDays === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {category instanceof Set && category.has("month") && (
        <>
          <Divider />
          <div className="py-1">
            <div className="grid grid-cols-7">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span key={day} className="text-foreground-500 text-center">
                  {day}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
