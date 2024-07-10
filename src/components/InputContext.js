import React, { createContext, useState, useContext } from 'react';

const InputContext = createContext();

export function useInput() {
  return useContext(InputContext);
}

export const InputProvider = ({ children }) => {
  const [chartInputs, setChartInputs] = useState({});

  return (
    <InputContext.Provider value={{ chartInputs, setChartInputs }}>
      {children}
    </InputContext.Provider>
  );
};