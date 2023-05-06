import { useEffect, useState } from "react";
import "./App.css";
import { Badge, Button, Center, Image, Stack, Text } from "@chakra-ui/react";
import logo from "./img/Logo-BlackBox.png";
import {Zoom} from 'react-reveal/Zoom';



function App() {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState(0);
  const [point, setPoint] = useState(0);

  const question = data[position];

  const getApi = async () => {
    const data = await fetch("https://opentdb.com/api.php?amount=10");
    const resp = await data.json();
    setData(resp.results);
  };

  useEffect(() => {
    getApi();
  }, []);

  const click = (text) => {
    if (text === question.correct_answer) {
      setPoint(point + 1);
      console.log("sumaste 10p");
    } else {
      console.log("no sumaste nada");
    }
    setPosition(position + 1);
  };

  const allAnswers = [
    question ? question.incorrect_answers : null,
    question ? question.correct_answer : null,
  ].flat();

  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <Stack 
    variants={container}
    initial="hidden"
    animate="show"
    justify="center" align="center" h="600px">
      <Stack
       variants={item} size={50}
      align="center" direction="row">
        <Text fontSize="35px">BlackBox Vision </Text>
        <Image boxSize="100px" objectFit="cover" src={logo} alt="Dan Abramov" />
      </Stack>

      <Stack
        borderRadius="20px"
        justify="center"
        align="center"
        bg="#00204a"
        w={{ base: "350px", md: "500px" }}
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
          <>
            <Badge
              borderRadius="10px"
              w={{ base: "300px", md: "350px" }}
              variant="solid"
              bg="#005792"
            >
              <Center p="10px" color="white">
                {question ? question.category : null}
              </Center>
            </Badge>

                   <Stack
              bg="#fd5f00"
              borderRadius="10px"
              w={{ base: "300px", md: "350px" }}
              h="auto"
            >
                 <Center p="20px" color="white">
                {question ? question.question : null}
                <Text>{position + 1}</Text>
              </Center>
             
            </Stack>
       
            <Stack>
              <Badge variant="outline" colorScheme="gray">
                Difficulty -{" "}
                <span style={{ color: "#fd5f00" }}>
                  {question ? question.difficulty : null}
                </span>
              </Badge>
            </Stack>
            <Stack h="200px" width={{ base: "300px", md: "350px" }}>
              {allAnswers.map((item) => (
                <Zoom>
                  <Stack>
                            <Button 
                initial='hidden'
                animate='visible'
                transition={{
                   duration:1,
                   ease:'easeInOut',
                   delay:0.2
  
                }}
                w="auto" bg="#d9faff" onClick={() => click(item)}>
                  {item}
                </Button>
                  </Stack>
                 
                </Zoom>
         
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default App;
