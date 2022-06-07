import React, { useContext } from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <Flex w="100%">
     <Avatar size="md" name={user.username} src="">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
         {user.username}
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  );
};

export default Header;
