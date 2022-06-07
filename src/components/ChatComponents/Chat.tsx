import { Flex, Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../contexts/AuthContext";

import Divider from "./Divider";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";

interface PropChat {
  id_room: number;
}

function useSocket(url: string) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketIo = io(url)

    setSocket(socketIo)

    function cleanup() {
      socketIo.disconnect()
    }
    return cleanup

    // should only run once and not on every re-render,
    // so pass an empty array
  }, [])

  return socket
}

const Chat = ({ id_room }: PropChat) => {
  const socket = useSocket('http://192.168.0.7:3333');
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(socket){
      socket.emit('select_room', {
        id_user: user.id,
        id_room
    }, messages => {
        setMessages(messages);
        setLoading(false);
    });
    }
  });


  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = {
      id_room,
      id_user: user.id,
      message: inputMessage
    };

    socket.emit("message", data);

    setInputMessage("");

    // setMessages((old) => [...old, { from: "me", text: data.inputMessage }]);
    // setInputMessage("");

    // setTimeout(() => {
    //   setMessages((old) => [...old, { from: "computer", text: data }]);
    // }, 1000);
  };

  return (
    <>
        <Header />
        <Divider />
        {loading ? (
          <Flex justify={"center"} w="100%">
            <Spinner size="md" color="gray.500" ml="4" />
          </Flex>
        ) : (
            <Messages messages={messages} />
        )}
        
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
     </>
  );
};

export default Chat;
