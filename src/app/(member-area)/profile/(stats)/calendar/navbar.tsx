import BackButton from "@/components/back-button";
import { Divider } from "@heroui/react";
import { Flame, Moon } from "lucide-react";

export default function Navbar({
  weekStreak,
  restDays,
}: {
  weekStreak: number;
  restDays: number;
}) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 items-center py-3">
        <div>
          <BackButton />
        </div>

        <span className="col-span-2 text-center text-sm">Calendar</span>

        <div className="flex justify-end gap-2"></div>
      </div>
      <Divider />
      <div className="grid grid-cols-2 items-center py-3">
        <div className="mx-auto flex gap-1 text-center">
          <Flame className="text-orange-500" />
          <span>{weekStreak} week streak</span>
        </div>
        <div className="mx-auto flex gap-1 text-center">
          <Moon className="text-blue-500" />
          <span>
            {restDays} rest day{restDays === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
