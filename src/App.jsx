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
  keyframes,
} from "@chakra-ui/react";
import logo from "./img/Logo-BlackBox.png";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Answers } from "./components/Answers/Answers";
import { Question } from "./components/Questions/Question";
import { motion } from "framer-motion";

function App() {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [textoEntrada, setTextoEntrada] = useState("");
  const [point, setPoint] = useState(0);
  const [loading, setLoading] = useState(true);

  const question = data[position];

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

  console.log(textoEntrada);

  useEffect(() => {
    getApi();
  }, []);

  const selectAnswer = (text) => {
    if (text === question.correct_answer) {
      setPoint(point + 1);
      setCorrect(true);
      toast({
        position: "bottom",
        duration: 700,
        render: () => (
          <Box color="white" p={3} bg="orange.500">
            Answer Correct!!
          </Box>
        ),
      });
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
      setCorrect(false);
      setPosition(position + 1);
      console.log("no sumaste nada");
    }
  };

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


  const welcome = ()=>{
    setTimeout(() => {
       return <h1>Welcome a Blackbox Vision</h1>
    }, 2000);
  }

  return (
    <Stack justify="center" align="center" h="600px">
      
      <Stack size={50} align="center" direction="row">
        <Text fontSize="35px">BlackBox Vision </Text>
        <Image boxSize="100px" objectFit="cover" src={logo} alt="Dan Abramov" />
      </Stack>
      <Stack
        borderRadius="20px"
        justify="center"
        align="center"
        bg="#00204a"
        w={{ base: "500px", md: "600px" }}
        h="500px"
      >
        {position >= data.length ? (
          <Stack>
            <Text fontSize="xl" color="white">
              Respuestas Correctas : {point}
            </Text>
            <Button onClick={() => setPosition(0)}>Volver a jugar</Button>
          </Stack>
        ) : (
          <Stack  w='400px' justify='center' align='center'>
            <Badge
              borderRadius="10px"
              w={{ base: "380px", md: "400px" }}
              variant="solid"
              bg="#005792"
            >
              <Center as={motion.div}
              p="10px" color="white">
                {question ? question.category : null}
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
                <span style={{ color: "#fd5f00" }}>
                  {question ? question.difficulty : null}
                </span>
              </Badge>
            </Stack>
            <Stack h="200px" width={{ base: "380px", md: "400px" }}>
              <Answers selectAnswer={selectAnswer} allAnswers={allAnswers} />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default App;
