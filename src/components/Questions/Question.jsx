import { Center, Stack } from "@chakra-ui/react";
import React from "react";

export const Question = ({ question }) => {
  return (
    <Stack
      bg="#fd5f00"
      borderRadius="10px"
      w={{ base: "430px", md: "400px" }}
      h="auto"
      border="solid white"
    >
      <Center p="20px" color="white">
        {question
          ? question.question
              .replace(/=|&|#|0|3|9|quot|quo|Index|;/g, "")
              .toLowerCase()
          : null}
      </Center>
    </Stack>
  );
};
