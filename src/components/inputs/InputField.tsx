import { FC } from "react";
import { Input } from "@chakra-ui/react";

type Props = {};

export const InputField: FC<Props> = (props) => {
  return <Input focusBorderColor="brand.primary" {...props} />;
};
