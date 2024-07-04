import Header from './Header'
import ToggleSelector from "./ToggleSelector"
import OptionsMenu from './OptionsMenu'
import { useState, useEffect } from 'react'
import { useInput } from './InputContext'
import { useResults } from './ResultsContext'
import MyPlotlyChart from './TimeSeriesChart'

export default function FinalLayout() { 

    const [isCompare, setIsCompare] = useState(false)
    function toggleMenu() {
      setIsCompare(prev=>!prev)
    }

    const {inputFields, setInputFields} = useInput();
    const {results, setResults} = useResults();

    console.log(inputFields)
    console.log(results)

return (
    <div className="main">
        <Header/>
        <div className="main-options">
            <ToggleSelector 
                isCompare={isCompare}
                toggleMenu={toggleMenu}
                toggleText1={"Time Series"}
                toggleText2={"Compare"}/>
            <OptionsMenu 
                isCompare={isCompare}/>
        </div>
        <div className="chart-container">
            <MyPlotlyChart />
        </div>
    </div>
    )}