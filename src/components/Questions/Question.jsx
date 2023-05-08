import { Badge, Center, Stack } from "@chakra-ui/react";
import React from "react";

export const Question = ({ question }) => {
  return (
    <>
      <Stack
        bg="#3bb4c1"
        borderRadius="10px"
        w={{ base: "300px", md: "400px" }}
        h="100px"
        align="center"
        justify="center"
      >
        <Center p="20px" color="white">
          {question
            ? question.question
                .replace(/=|&|#|0|3|9|quot|quo|Index|;/g, "")
                .toLowerCase()
            : null}
        </Center>
      </Stack>
    </>
  );
};
