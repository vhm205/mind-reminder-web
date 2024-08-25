import { FC } from "react";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

type Props = {
  initialRef: React.RefObject<HTMLInputElement>;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const BaseModal: FC<Props> = ({
  isOpen,
  onClose,
  initialRef,
  children,
}) => {
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>
  );
};
