import Header from './Header'
import ToggleSelector from "./ToggleSelector"
import OptionsMenu from './OptionsMenu'
import { useState, useEffect } from 'react'
import { useInput } from './InputContext'
import { useResults } from './ResultsContext'
import MyPlotlyChart from './TimeSeriesChart'
import Dropdown from './Dropdown'

export default function FinalLayout() { 

    const [isCompare, setIsCompare] = useState(false)
    function toggleMenu() {
      setIsCompare(prev=>!prev)
    }

    const {inputFields, setInputFields} = useInput();
    const {results, setResults} = useResults();

    const[metric, setMetric] = useState(null)
    let metricOptionsArr = [
        { value: 'Monthly Rate', label: 'Monthly % Change' },
        { value: 'Annual Rate', label: 'Annual % Change' },
        { value: 'Level', label:  'Level' },
      ]

    let typeOptionsArr = [
        { value: 'time-series', label: 'see CPI metrics over time' },
        { value: 'compare', label: 'see drivers of CPI between time periods' },
      ]

return (
    <div className="main">
        <Header/>
        <div class="grid-container">
            <div className="item1">
                <MyPlotlyChart />
            </div>
            <div className="item2">
                <Dropdown
                placeholderText="Select metric"
                optionsArr={metricOptionsArr}
                stateVar={metric}
                setStateVar={setMetric}
                />
            </div>
            <div class="item3">X-Start</div>  
            <div class="item4">X-End</div>
            <div class="item5">Legend</div>
            <div class="item6">
                <Dropdown
                    placeholderText=""
                    optionsArr={typeOptionsArr}
                    stateVar={metric}
                    setStateVar={setMetric}
                    prefixText="I want to see:"
                />
            </div>
        </div>
        {/* <div className="main-options">
            <ToggleSelector 
                isCompare={isCompare}
                toggleMenu={toggleMenu}
                toggleText1={"Time Series"}
                toggleText2={"Compare"}/>
            <OptionsMenu 
                isCompare={isCompare}/>
        </div>
        <div className="item1">
            <MyPlotlyChart />
        </div> */}
    </div>
    )}