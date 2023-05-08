import React, { useEffect } from "react";
import { UsarContext } from "../Context/Context";
import { Progress, Stack } from "@chakra-ui/react";

export const Temporizador = ({ position, setPosition }) => {
  const { temp, setTemp } = UsarContext();

  useEffect(() => {
    let interval = setInterval(() => {
      setTemp(temp - 5);
      if (temp < 1) {
        setPosition(position + 1);
        setTemp(100);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <Stack >
      <Progress size="sm" colorScheme="cyan" value={temp} />
    </Stack>
  );
};
