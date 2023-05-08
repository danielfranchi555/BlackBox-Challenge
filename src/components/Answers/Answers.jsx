import { Button, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export const Answers = ({ allAnswers, selectAnswer }) => {
  return (
    <Stack mb='20px'>
       {allAnswers.sort().map((item) => (
        <Button
          bg='#f6f6f6'
          w="100%"
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5 }}
          whileHover={{ scale: 1.1 }}
          cursor="pointer"
          key={item}
          fontSize={{base:'12px',md:'15px'}}
          onClick={() => selectAnswer(item)}
        >
          <p>{item.replace(/=|&|#|0|3|9|quot|quo|Index|;/g, "")}</p>
        </Button>
      ))}
    </Stack>
   
  );
};
