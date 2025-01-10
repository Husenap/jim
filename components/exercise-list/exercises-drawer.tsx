import DrawerPageContainer from "@/components/drawer-page-container";
import Exercises from "@/components/exercise-list/exercises";
import ExercisesList from "@/components/exercise-list/exercises-list";
import ExercisesNavbar from "@/components/exercise-list/exercises-navbar";
import { Doc } from "@/convex/_generated/dataModel";
import { Drawer, DrawerContent, useDisclosure } from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

export default function ExercisesDrawer({
  children,
  title,
  onSelect,
  disclosure,
}: {
  children?: (onOpen: () => void) => React.ReactNode;
  title?: string;
  onSelect?: (exercise: Doc<"exercises">, onClose: () => void) => void;
  disclosure?: UseDisclosureReturn;
}) {
  const { isOpen, onOpen, onOpenChange } = disclosure ?? useDisclosure();

  return (
    <>
      {children && children(onOpen)}
      <Exercises>
        <Drawer
          placement="bottom"
          hideCloseButton
          size="full"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            {(onClose) => (
              <DrawerPageContainer
                topNavbar={<ExercisesNavbar onClose={onClose} title={title} />}
              >
                <ExercisesList
                  onSelect={onSelect ? (e) => onSelect(e, onClose) : undefined}
                />
              </DrawerPageContainer>
            )}
          </DrawerContent>
        </Drawer>
      </Exercises>
    </>
  );
}
