import Header from './Header'
import ToggleSelector from "./ToggleSelector"
import OptionsMenu from './OptionsMenu'
import { useState, useEffect } from 'react'
import { useInput } from './InputContext'
import { useResults } from './ResultsContext'
import MyPlotlyChart from './TimeSeriesChart'
import Dropdown from './Dropdown'
import MonthYearPicker from './MonthYearPicker';
import SelectSeries from './SelectSeries'

export default function FinalLayout() { 

    const [showOptions, setShowOptions] = useState(true)

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const minDate = new Date(1999, 1, 1); // January 2020
    const maxDate = new Date(2024, 5, 1); // December 2025
    const [selectedSeries, setSelectedSeries] = useState([]);

    const [isCompare, setIsCompare] = useState(false)
    function toggleMenu() {
      setIsCompare(prev=>!prev)
    }

    const {inputFields, setInputFields} = useInput();
    const {results, setResults} = useResults();

    const[metric, setMetric] = useState(null)
    let metricOptionsArr = [
        { value: 'Level', label:  'CPI Level' },
        { value: 'Monthly Rate', label: 'MoM % Change' },
        { value: 'Annual Rate', label: 'YoY % Change' }
      ]

    let typeOptionsArr = [
        { value: 'time-series', label: 'Plot a line chart of CPI level or % change over time for my selected set of CPI categories' },
        { value: 'compare', label: 'Create a waterfall chart that isolates the drivers of CPI between two times periods' },
      ]

return (
    <div className="main">
        <Header
            showOptions={showOptions}
            setShowOptions={setShowOptions}
        />
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
            <div class="item3">
                <label>Select series start date:</label>
                    <MonthYearPicker 
                        onDateChange={setFromDate}
                        defaultDate={minDate} 
                        minDate={minDate} 
                        maxDate={maxDate} 
                        openPosition=''
                        placeholderText={"Select a series end date"}
                        pickerPosition={"top"}/>
            </div>  
            <div class="item4">
                <label>Select series end date:</label>
                <MonthYearPicker 
                    onDateChange={setFromDate}
                    defaultDate={maxDate} 
                    minDate={minDate} 
                    maxDate={maxDate} 
                    openPosition=''
                    placeholderText={"Select a series end date"}
                    pickerPosition={"top"}/>
            </div>  
            <div class="item5">
                <SelectSeries 
                    selectedSeries={selectedSeries}
                />
            </div>
            <div class="item6">
                <Dropdown
                    placeholderText="Select type of chart"
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