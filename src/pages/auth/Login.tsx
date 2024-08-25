import { FC, useLayoutEffect, useState } from "react";
import Cookie from "js-cookie";

import {
  useToast,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaGoogle } from "react-icons/fa";
import { request, defaultConfig } from "@/apis/axios";
import { Loader } from "@/components/loader";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const redirectGoogleLogin = async () => {
    toast({
      title: "Logging...",
      status: "info",
      duration: 1000,
      isClosable: true,
    });
    const url = `${defaultConfig.server.baseUrl}/auth/google`;
    window.open(url, "_self");
  };

  useLayoutEffect(() => {
    const isAuthenticated = Cookie.get("isAuthenticated");

    const checkAuth = async () => {
      const { server } = defaultConfig;

      setIsLoading(true);

      const response: string = await request.get(
        `${server.baseUrl}/auth/check`,
      );
      if (response === "") {
        return window.location.replace("/notes");
      }

      setIsLoading(false);
    };

    if (!isAuthenticated) {
      checkAuth();
    } else {
      window.location.replace("/notes");
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Flex minH="100vh" align="center" justify="center">
        <Box textAlign="center">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Heading color="brand.primary">Welcome</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input
                        type="email"
                        placeholder="email address"
                        autoComplete="email"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          borderRadius={10}
                          onClick={handleShowClick}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <GoogleButton onClick={redirectGoogleLogin} />
                  </FormControl>
                  <Button type="submit" variant="primary" width="full">
                    Login
                  </Button>
                  <div className="flex justify-end">
                    <Link href="/not-found">Create an account</Link>
                  </div>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};

type GoogleButtonProps = {
  onClick: () => void;
};

const GoogleButton: FC<GoogleButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      leftIcon={<FaGoogle />}
      variant="solid"
      colorScheme="gray"
      className="w-full"
    >
      Login with Google
    </Button>
  );
};

export default LoginPage;
