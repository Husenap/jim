import DrawerPageContainer from "@/components/drawer-page-container";
import CreateExerciseForm from "@/components/exercise-list/create/create-exercise-form";
import CreateExerciseNavbar from "@/components/exercise-list/create/create-exercise-navbar";
import Exercises from "@/components/exercise-list/exercises";
import { Drawer, DrawerContent, useDisclosure } from "@nextui-org/react";

export default function CreateExerciseDrawer({
  children,
}: {
  children?: (onOpen: () => void) => React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                topNavbar={<CreateExerciseNavbar onClose={onClose} />}
              >
                <CreateExerciseForm onClose={onClose} />
              </DrawerPageContainer>
            )}
          </DrawerContent>
        </Drawer>
      </Exercises>
    </>
  );
}
