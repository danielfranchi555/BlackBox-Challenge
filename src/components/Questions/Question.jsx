import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export const Question = ({ question,getTranslate, position,textoEntrada }) => {
  return (
    <Stack
      bg="#fd5f00"
      borderRadius="10px"
      w={{ base: "380px", md: "400px" }}
      h="auto"
      border='solid white'
    >
      <Center
      p="20px" color="white">
        {question
          ? question.question.replace(/=|&|#|0|3|9|quot|quo|Index|;/g, "").toLowerCase()
          : null}
      </Center>
    </Stack>
  );
};
