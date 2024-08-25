import { FC } from "react";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

type Props = {};

export const InputSearch: FC<Props> = () => {
  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <CiSearch size="1.5rem" />
      </InputLeftElement>
      <Input
        pr="4rem"
        size="lg"
        variant="filled"
        placeholder="Everything you want"
      />
      <InputRightElement width="4rem">
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </InputRightElement>
    </InputGroup>
  );
};
