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
  const socket = useSocket('http://localhost:3333');
  const { user, logout } = useContext(AuthContext);
  
  useEffect(() => {
    if(socket){
      socket.emit('select_room', {
        id_user: user.id,
        id_room
    }, messages => {
        console.log(messages);
        setMessages(messages);
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
        <Messages messages={messages} />
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
