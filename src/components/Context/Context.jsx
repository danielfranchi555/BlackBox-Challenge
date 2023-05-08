import React from "react";
import { useState } from "react";
import { useContext, createContext } from "react";

export const ContextState = createContext();

export const UsarContext = () => useContext(ContextState);

export const Context = ({ children }) => {
  const [temp, setTemp] = useState(100);

  return (
    <ContextState.Provider value={{ setTemp, temp }}>
      {children}
    </ContextState.Provider>
  );
};
