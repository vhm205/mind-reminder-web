import { FC, ReactNode } from "react";
import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

interface Props extends BoxProps {
  extra?: string;
  children: ReactNode;
}

export const BoxWrapper: FC<Props> = ({ extra, children, ...props }) => {
  const borderContainer = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      boxShadow="lg"
      rounded="lg"
      border="1px"
      borderColor={borderContainer}
      p={4}
      className={extra}
      {...props}
    >
      {children}
    </Box>
  );
};
