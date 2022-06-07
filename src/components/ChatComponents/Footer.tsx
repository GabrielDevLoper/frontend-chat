
import { Flex, Input, Button, useColorMode } from "@chakra-ui/react";

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Digite algo..."
        _placeholder={{
            color: "black"
        }}
        border="none"
        borderRadius="8"
        _focus={{
          border: "1px solid black",
        }}
        color="black"
        bg={colorMode === "light" ? "gray.400"  : "gray.300"}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Enviar
      </Button>
    </Flex>
  );
};

export default Footer;
