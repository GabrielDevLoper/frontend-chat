import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  theme,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);



export default function Dashboard() {
  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <MotionFlex
        w="100%"
        my="6"
        maxWidth={1800}
        mx="auto"
        px="6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <AnimatePresence>
            {/* <MotionBox
              p={["6", "8"]}
              bg={colorMode === "light" ? "gray.300" : "gray.800"}
              borderRadius={8}
              pb="4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 2 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <Text fontSize="lg" mb="4">
                Total Arrecadações
              </Text>
              {/* @ts-ignore-error */}
            {/* <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </MotionBox>  */}
          </AnimatePresence>

          {/* <MotionBox
            p={["6", "8"]}
            bg={colorMode === "light" ? "gray.300" : "gray.800"}
            borderRadius={8}
            pb="4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <Text fontSize="lg" mb="4">
              Total Arrecadações
            </Text>
            {/* @ts-ignore-error */}
          {/* <Chart options={options} series={series} type="area" height={160} />
          </MotionBox>  */}
        </SimpleGrid>
      </MotionFlex>
    </Flex>
  );
}
