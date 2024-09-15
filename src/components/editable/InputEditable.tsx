import { FC, useRef } from "react";
import {
  useEditableControls,
  useColorModeValue,
  EditablePreview,
  Input,
  ButtonGroup,
  Editable,
  Tooltip,
  EditableInput,
  IconButton,
  EditableProps,
} from "@chakra-ui/react";
import { Check, X } from "lucide-react";

type Props = {
  content: string;
  props?: EditableProps;
  approve?: (input: string) => void;
  reject?: React.MouseEventHandler<HTMLButtonElement>;
};

export const InputEditable: FC<Props> = ({ content, approve, props }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();
    const { onClick } = getSubmitButtonProps();
    const input = ref.current?.value || "";

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton
          aria-label="Accept"
          icon={<Check />}
          {...getSubmitButtonProps()}
          onClick={(event: any) => {
            approve?.(input);
            onClick?.(event);
          }}
        />
        <IconButton
          aria-label="Reject"
          icon={<X />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  };

  return (
    <Editable
      defaultValue={content}
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      {...props}
    >
      <Tooltip label="Click to edit" shouldWrapChildren={true}>
        <EditablePreview
          py={2}
          px={4}
          _hover={{
            background: useColorModeValue("gray.100", "gray.700"),
          }}
        />
      </Tooltip>
      <Input py={2} px={4} as={EditableInput} ref={ref} />
      <EditableControls />
    </Editable>
  );
};
