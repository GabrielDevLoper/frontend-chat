import React, { useEffect, useRef } from "react";
import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    // @ts-ignore
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="black"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                borderRadius={15}
              >
                <Text>{item.message.message}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              {/* <Avatar
                name="Computer"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                bg="blue.300"
              ></Avatar> */}
          
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                borderRadius={15}
              >
                 <Text color={"#"+`${item.message.user.username.username_color}`}>{item.message.user.username}:  </Text>
                <Text> {item.message.message}</Text>
               
              </Flex>
              
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
