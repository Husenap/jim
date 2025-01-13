import { SetRowType } from "@/app/(member-area)/workout/live/[workoutId]/types";
import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import { SetType } from "@/convex/schema";
import {
  cn,
  Drawer,
  DrawerBody,
  DrawerContent,
  Menu,
  MenuItem,
  useDisclosure,
} from "@nextui-org/react";
import { X } from "lucide-react";

const setTypeButtons: {
  color: string;
  shortLabel: string;
  label: string;
  value: SetType;
}[] = [
  {
    color: "text-warning",
    shortLabel: "W",
    label: "Warm Up Set",
    value: "warmup",
  },
  {
    color: "text-foreground",
    shortLabel: "1",
    label: "Normal Set",
    value: "normal",
  },
  {
    color: "text-danger",
    shortLabel: "F",
    label: "Failure Set",
    value: "failure",
  },
  {
    color: "text-primary",
    shortLabel: "D",
    label: "Drop Set",
    value: "drop",
  },
];

export default function SetMenu({
  item,
  rows,
  exerciseIndex,
}: {
  item: SetRowType;
  rows: SetRowType[];
  exerciseIndex: number;
}) {
  const { activeWorkout, isOwner, updateSet, removeSet } =
    useActiveWorkoutContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const SetIndicator = () => {
    return (
      <div
        onClick={onOpen}
        className={cn("-m-3 min-w-6 p-3 text-center text-lg font-bold", {
          "text-[#eeaa00]": item.set.type === "warmup",
          "text-[#36baff]": item.set.type === "drop",
          "text-[#e34b37]": item.set.type === "failure",
          "cursor-pointer": isOwner,
        })}
      >
        {item.set.type === "normal"
          ? rows.reduce(
              (acc, cur, ind) =>
                acc + Number(ind <= item.index && cur.set.type !== "warmup"),
              0,
            )
          : item.set.type[0].toUpperCase()}
      </div>
    );
  };

  if (!isOwner) {
    return <SetIndicator />;
  }

  return (
    <>
      <SetIndicator />
      <Drawer
        hideCloseButton
        isDismissable
        placement="bottom"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody className="p-4">
                <Menu
                  onClose={onClose}
                  closeOnSelect
                  className="iphone-safe-inset"
                  aria-label="Set Menu"
                >
                  <>
                    {setTypeButtons.map(
                      ({ color, shortLabel, label, value }) => (
                        <MenuItem
                          key={value}
                          startContent={
                            <span
                              className={cn(
                                "w-6 text-center text-lg font-bold",
                                color,
                              )}
                            >
                              {shortLabel}
                            </span>
                          }
                          onPress={() =>
                            updateSet({
                              id: activeWorkout!._id,
                              exerciseIndex,
                              setIndex: item.index,
                              setData: { type: value },
                            })
                          }
                        >
                          {label}
                        </MenuItem>
                      ),
                    )}
                    <MenuItem
                      key="delete"
                      startContent={<X className="text-danger" />}
                      onPress={() =>
                        removeSet({
                          id: activeWorkout!._id,
                          exerciseIndex,
                          setIndex: item.index,
                        })
                      }
                    >
                      Remove Set
                    </MenuItem>
                  </>
                </Menu>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
