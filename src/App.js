import Header from './components/Header'
import MenuSelector from './components/ToggleSelector'
import OptionsMenu from './components/OptionsMenu'
import {useState} from 'react'


function App() {

  return (
    <div className="">
      <header className="">
        <Header></Header>
        <OptionsMenu />
      </header>
    </div>
  );
}

export default App;
