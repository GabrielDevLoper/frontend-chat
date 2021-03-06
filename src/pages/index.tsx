import { Flex, Button, VStack, Text, Box } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "../components/Header/Logo";
import { useRouter } from "next/router";
import { useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const MotionFlex = motion(Flex);

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export default function Login() {
  const { signIn, isAuthenticated } = useContext(AuthContext);
  const { colorMode } = useColorMode();

  const { handleSubmit, formState, register } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values);
  };

  const { errors, isSubmitting } = formState;

  return (
    <MotionFlex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir={"column"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 2 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        mb={"10"}
        flexDir="column"
      >
        <Logo fontSize={"60px"} />

        <Text fontWeight="bold" fontSize={"20px"} letterSpacing="tight">
          Acessar o sistema
        </Text>
      </Flex>
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg={colorMode === "light" ? "gray.300" : "gray.800"}
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <VStack>
          <Input
            name="email"
            label="Email"
            type="text"
            error={errors.email}
            placeholder="Insira seu email"
            {...register("email")}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            error={errors.password}
            placeholder="Insira sua senha"
            {...register("password")}
          />
        </VStack>
        <Button
          type="submit"
          mt="6"
          bg={"blue.500"}
          color={"white"}
          _hover={{ bg: "blue.700" }}
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </MotionFlex>
  );
}
