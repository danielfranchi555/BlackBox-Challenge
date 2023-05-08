import { useEffect, useState } from "react";
import "./App.css";
import {
  Badge,
  Box,
  Button,
  Center,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "./img/Logo-BlackBox.png";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Answers } from "./components/Answers/Answers";
import { Question } from "./components/Questions/Question";
import { motion } from "framer-motion";
import { Temporizador } from "./components/Temporizador/Temporizador";
import { Context, UsarContext } from "./components/Context/Context";

function App() {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [textoEntrada, setTextoEntrada] = useState("");
  const [point, setPoint] = useState(0);
  const [loading, setLoading] = useState(true);

  const question = data[position];

  const{temp,setTemp}=UsarContext()

  const toast = useToast();

  const getApi = async () => {
    const data = await fetch("https://opentdb.com/api.php?amount=10");
    const resp = await data.json();
    setData(resp.results);
    setLoading(false);
  };



  const getTranslate = async (question) => {
    const url = `https://api.mymemory.translated.net/get?q=${question.toLowerCase()}&langpair=en|es`;
    const data = await fetch(url);
    const resp = await data.json();
    if (
      resp.responseData.translatedText ===
      "INVALID LANGUAGE PAIR SPECIFIED. EXAMPLE: LANGPAIR=EN|IT USING 2 LETTER ISO OR RFC3066 LIKE ZH-CN. ALMOST ALL LANGUAGES SUPPORTED BUT SOME MAY HAVE NO CONTENT"
    ) {
      alert("no se puede traducir");
    } else {
      setTextoEntrada(resp.responseData.translatedText);
    }
  };


  useEffect(() => {
    getApi();
  }, []);

  const selectAnswer = (text) => {
    if (text === question.correct_answer) {
      setPoint(point + 1);
      toast({
        position: "bottom",
        duration: 800,
        render: () => (
          <Box color="white" p={3} bg="cyan">
            Answer Correct!!
          </Box>
        ),
      });
      setTemp(100)
      setPosition(position + 1);
      console.log(point);
    } else {
      toast({
        position: "bottom",
        duration: 700,
        render: () => (
          <Box color="white" p={3} bg="red.500">
            Answer Incorrect!!
          </Box>
        ),
      });
      setTemp(100)
      setCorrect(false);
      setPosition(position + 1);
      console.log("no sumaste nada");
    }
  };

  const resetGame = ()=>{
    setPosition(0)
    setPoint(0)
  }

  const allAnswers = [
    question ? question.incorrect_answers : null,
    question ? question.correct_answer : null,
  ].flat();

  if (loading) {
    return (
      <Center mt="200px">
        <Spinner size="xl" color="red.500" />
      </Center>
    );
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
         <Stack   size={50} align="center" direction="row">
         <Text fontSize="16px" color='white'>BlackBox Vision </Text>
        <Image boxSize="50px" objectFit="cover" src={logo} alt="Dan Abramov" />
      </Stack>
        {position >= data.length ? (
          <Stack p='20px' >
            <Text fontSize="xl" color="white">
              Respuestas Correctas : {point}/10
            </Text>
            <Button bg='cyan' onClick={() => resetGame() }>Volver a jugar</Button>
          </Stack>
        ) : (
          <Stack 
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 0.9}}
          position='asbsolute'
          w='400px' justify='center' align='center'>
            <Badge
              borderRadius="10px"
              w={{ base: "300px", md: "400px" }}
              variant="solid"
              bg="#41506b"
            >

              <Center
              p="10px" color="white">
               Category /  { question ? question.category : null}
              </Center>
            </Badge>
            <Question
              textoEntrada={textoEntrada}
              getTranslate={getTranslate}
              question={question}
              position={position}
            />
            <Stack >
              <Badge      
               variant="outline" colorScheme="gray">
                Difficulty -{" "}
                <span
                style={{ color: "cyan" }}>
                  {question ? question.difficulty : null}
                </span>
              </Badge>
            </Stack>
            <Stack  h="300px" width={{ base: "300px", md: "400px" }}>
              <Answers selectAnswer={selectAnswer} allAnswers={allAnswers} />
              <Temporizador setPosition={setPosition} position={position}></Temporizador>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  
  );
}

export default App;
