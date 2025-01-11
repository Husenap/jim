import DrawerPageContainer from "@/components/drawer-page-container";
import CreateExerciseForm from "@/components/exercise-list/create/create-exercise-form";
import CreateExerciseNavbar from "@/components/exercise-list/create/create-exercise-navbar";
import Exercises from "@/components/exercise-list/exercises";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

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
        <Modal
          placement="top"
          hideCloseButton
          size="full"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          disableAnimation
        >
          <ModalContent>
            {(onClose) => (
              <DrawerPageContainer
                topNavbar={<CreateExerciseNavbar onClose={onClose} />}
              >
                <CreateExerciseForm onClose={onClose} />
              </DrawerPageContainer>
            )}
          </ModalContent>
        </Modal>
      </Exercises>
    </>
  );
}
