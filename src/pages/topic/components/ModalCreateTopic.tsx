import { FC, useRef } from "react";

import { BaseModal } from "@/components/modal/BaseModal";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { AlertCustom } from "@/utils";
import { IHttpResponse } from "@/types/http";
import { request } from "@/apis/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
};

export const ModalCreateTopic: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const initialRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!initialRef.current) {
      return AlertCustom(toast, "Error something", "warning");
    }

    onClose();

    try {
      const topicName = initialRef.current.value;

      const response: IHttpResponse = await request.post("/topics", {
        topic: topicName,
      });

      if (response.statusCode !== 201) {
        return AlertCustom(toast, response.message, "warning");
      }

      onSubmit?.();

      return AlertCustom(toast, "Create topic success", "success");
    } catch (error: any) {
      AlertCustom(toast, error.message, "error");
    }
  };

  return (
    <>
      <BaseModal initialRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Create your topic</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Topic name</FormLabel>
            <Input ref={initialRef} placeholder="Topic name" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </BaseModal>
    </>
  );
};
