import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Text,
  HStack,
  VStack,
  Accordion,
  useColorMode,
  useBreakpointValue,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Badge,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ModalCustom from "../../components/Modal";
import { parseCookies } from "nookies";

import { Selects } from "../../components/Form/Select";

import { RiAddLine, RiEditLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import ReactTable from "../../components/ReactTable";
import { api } from "../../service";
import { AiOutlineFilePdf, AiOutlineSearch } from "react-icons/ai";

import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@chakra-ui/react";
import Chat from "../../components/ChatComponents/Chat";
import { useRooms, useRoomsWithSelect } from "../../service/hooks/useRooms";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const MotionBox = motion(Box);

const goRoomFormSchema = yup.object().shape({
  room: yup.number().required("Sala é obrigatório"),
});

type GoRoomData = {
  email: string;
  password: string;
};

export default function Chats() {
  const { colorMode } = useColorMode();
  const { isLoading, data, error, isFetching } = useRooms();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);

  // const {
  //   data,
  //   isLoading,
  //   error
  // } = useRoomsWithSelect();


  const { handleSubmit, formState, register, control } = useForm({
    resolver: yupResolver(goRoomFormSchema),
  });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    setRooms(data?.data);
  }, [data]);

  return (
    <>
      <Box>
        <Header />

        <Flex w="100%" h={800} my="6" maxWidth={1800} mx="auto" px="6">
          <Sidebar />

          <AnimatePresence>
            <MotionBox
              flex="1"
              borderRadius={8}
              bg={colorMode === "light" ? "gray.300" : "gray.800"}
              p="8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 2 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {
                room != null ? <Chat id_room={room}/> : (

                isLoading || !rooms ? (
                  <Flex justify={"center"}>
                    <Spinner />
                  </Flex>
                ) : (
                  
                    <Select 
                      placeholder='Selecione a sala que deseja entrar' 
                      bg={colorMode === "light" ? "gray.300" : "gray.800"}
                      name="room"
                      value={room}
                      onChange={e => setRoom(e.target.value)}
                    >
                      {rooms.map(room => (
                        <option key={room.id} value={room.id}>{room.name}</option>
                      ))}
                    </Select>
                )
                )
              }
            
            </MotionBox>
          </AnimatePresence>
        </Flex>
      </Box>

    </>
  );
}
