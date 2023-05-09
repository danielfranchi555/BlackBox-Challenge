import { Badge, Button, Center, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../../img/Logo-BlackBox.png";
import { UsarContext } from "../Context/Context";
import { motion } from "framer-motion";
import { Question } from "../Questions/Question";
import { Answers } from "../Answers/Answers";
import { Temporizador } from "../Temporizador/Temporizador";

export const Aplication = () => {

//DATOS Y FUNCIONES DEL CONTEXT
  const {
    position,
    data,
    question,
    textoEntrada,
    getTranslate,
    selectAnswer,
    allAnswers,
    setPosition,
    point,
    resetGame,
    loading
  } = UsarContext();

  if(loading){
  return  <Center mt='100px'> <Spinner  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500' size='xl'/></Center> 
  }
  return (
    <Stack justify="center" align="center" h="600px">
      <Stack
        borderRadius="20px"
        justify="center"
        align="center"
        bg="#263849"
        w={{ base: "300px", md: "400px" }}
        h="auto"
      >
        {position >= data.length ? (
          <Stack p="20px">
            <Text fontSize="xl" color="white">
              Respuestas Correctas : {point}/10
            </Text>
            <Button bg="cyan" onClick={() => resetGame()}>
              Volver a jugar
            </Button>
          </Stack>
        ) : (
          <Stack
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 0.9 }}
            position="asbsolute"
            w="400px"
            justify="center"
            align="center"
          >
            <Stack spacing={0} align="center" direction="row">
              <Text fontSize="16px" color="white">
                BlackBox Vision{" "}
              </Text>
              <Image
                boxSize="40px"
                objectFit="cover"
                src={logo}
                alt="Dan Abramov"
              />
            </Stack>
            <Badge
              borderRadius="10px"
              w={{ base: "300px", md: "400px" }}
              variant="solid"
              bg="#41506b"
            >
              <Center p="10px" fontSize="10px" color="white">
                Category / {question ? question.category : null}
              </Center>
            </Badge>
            <Question
              textoEntrada={textoEntrada}
              getTranslate={getTranslate}
              question={question}
              position={position}
            />
            <Stack>
              <Badge variant="outline" colorScheme="gray">
                Difficulty -{" "}
                <span style={{ color: "cyan" }}>
                  {question ? question.difficulty : null}
                </span>
              </Badge>
            </Stack>
            <Stack h="300px" width={{ base: "300px", md: "400px" }}>
              <Answers selectAnswer={selectAnswer} allAnswers={allAnswers} />
              <Temporizador
                setPosition={setPosition}
                position={position}
              ></Temporizador>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
