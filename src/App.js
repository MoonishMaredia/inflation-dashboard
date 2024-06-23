import Header from './components/Header'
import MenuSelector from './components/MenuSelector'
import {useState} from 'react'


function App() {

  const [isCompare, setIsCompare] = useState(false)

  function toggleMenu() {
    setIsCompare(prev=>!prev)
  }

  return (
    <div className="">
      <header className="">
        <Header></Header>
        <MenuSelector
          isCompare={isCompare}
          toggleMenu={toggleMenu}
        />
        <p>
          This is my fun new app!
        </p>
      </header>
    </div>
  );
}

export default App;
