import React, { createContext, useState, useContext } from 'react';

const InputContext = createContext();

export function useInput() {
  return useContext(InputContext);
}

export const InputProvider = ({ children }) => {
  const [inputFields, setInputFields] = useState({});

  return (
    <InputContext.Provider value={{ inputFields, setInputFields }}>
      {children}
    </InputContext.Provider>
  );
};