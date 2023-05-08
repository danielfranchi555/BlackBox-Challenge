import { Button, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export const Answers = ({allAnswers, selectAnswer}) => {

  return (  
    <>
       {allAnswers.map((item) => (
        <Button
        w='100%'
        as={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{duration: 5}}
        whileHover={{ scale: 1.1 }} 
        cursor='pointer'
        key={item} onClick={()=>selectAnswer(item)}  >
          <p>{item.replace(/=|&|#|0|3|9|quot|quo|Index|;/g, "")}</p>
        </Button>
      ))}
    </>
   
  );
};
