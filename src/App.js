import FinalLayout from './components/FinalLayout'
import { useState, useEffect } from 'react'
import { InputProvider, useInput } from './components/InputContext'
import { ResultsProvider, useResults } from './components/ResultsContext'


function App() {


  return (
      <InputProvider>
        <ResultsProvider> 
          <FinalLayout />
        </ResultsProvider>
      </InputProvider>
  );
}

export default App;
