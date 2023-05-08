import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext, createContext } from "react";

export const ContextState = createContext();

export const UsarContext = () => useContext(ContextState);

export const Context = ({ children }) => {
  const [temp, setTemp] = useState(100);
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
    <ContextState.Provider value={{ setTemp, temp,position,data,question,textoEntrada,getTranslate,selectAnswer,allAnswers,setPosition,point,resetGame}}>
      {children}
    </ContextState.Provider>
  );
};
