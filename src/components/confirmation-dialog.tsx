import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";

export default function ConfirmationDialog({
  disclosure,
  titleText,
  confirmText,
  cancelText,
  onConfirm,
}: {
  disclosure: UseDisclosureReturn;
  titleText: string;
  confirmText: string;
  cancelText?: string;
  onConfirm?: () => void;
}) {
  return (
    <>
      <Modal
        isOpen={disclosure.isOpen}
        onOpenChange={disclosure.onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{titleText}</ModalHeader>
              <ModalBody className="py-4">
                <Button
                  color="danger"
                  onPress={
                    onConfirm
                      ? () => {
                          onConfirm();
                          onClose();
                        }
                      : undefined
                  }
                >
                  {confirmText}
                </Button>
                <Button onPress={onClose}>{cancelText ?? "Cancel"}</Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
