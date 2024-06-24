import ToggleSelector from "./ToggleSelector"
import {useState} from 'react'
import Select from 'react-select'


export default function OptionsMenu() {

    const [isCompare, setIsCompare] = useState(false)
    function toggleMenu() {
        setIsCompare(prev=>!prev)
    }

    const [seriesType, setSeriesType] = useState('');
    const typeOptions = [
        { value: 'CPI Level', label: 'CPI Level' },
        { value: 'CPI Rate', label: 'CPI Rate' },
      ]

    const [seriesGranularity, setSeriesGranularity] = useState('');
    const granularityOptions = [
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Annual', label: 'Annual' },
    ]

    const [monthStart, setMonthStart] = useState('January');
    const [monthEnd, setMonthEnd] = useState('January');
    const monthOptions = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' }
    ];


    const [yearStart, setYearStart] = useState('1998');
    const [yearEnd, setYearEnd] = useState('2024');
    const yearOptions = [];
    for (let i = 1998; i <= new Date().getFullYear(); i++) {
        yearOptions.push({ value: i.toString(), label: i.toString() });
    }

    const colourOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
      ];
      

    return (
        <div className="options-menu">
            <ToggleSelector 
            isCompare={isCompare}
            toggleMenu={toggleMenu}
            toggleText1={"Time Series"}
            toggleText2={"Compare"}/>

            <div className="selector-item">
                <label htmlFor="type">Specify series type:</label>
                <Select 
                    id="type" 
                    onChange={setSeriesType} 
                    options={typeOptions} />
            </div>

            <div className="selector-item">
                <label htmlFor="granularity">Specify granularity:</label>
                <Select 
                    id="granularity" 
                    onChange={setSeriesGranularity} 
                    options={granularityOptions} />
            </div>

            {seriesGranularity.value==="Monthly" && 
                <div className="selector-item">
                    <label>Series Start:</label>
                    <div className="month-year-input">
                        <Select 
                        id="month" 
                        onChange={setMonthStart} 
                        options={monthOptions}
                        placeholder="Month"
                        className="month-input"/>
                        <Select 
                        id="year" 
                        onChange={setYearStart} 
                        options={yearOptions} 
                        placeholder="Year"/>
                    </div>
                </div>
            }

            {seriesGranularity.value!=="Monthly" && 
                <div className="selector-item">
                    <label>Series Start:</label>
                    <div className="">
                        <Select 
                        id="year" 
                        onChange={setYearStart} 
                        options={yearOptions} 
                        placeholder="Enter Year"/>
                    </div>
                </div>
            }


            {seriesGranularity.value==="Monthly" && 
                <div className="selector-item">
                    <label>Series End:</label>
                    <div className="month-year-input">
                        <Select 
                        id="month" 
                        onChange={setMonthEnd} 
                        options={monthOptions}
                        placeholder="Month"
                        className="month-input"/>
                        <Select 
                        id="year" 
                        onChange={setYearEnd} 
                        options={yearOptions} 
                        placeholder="Year"/>
                    </div>
                </div>
            }

            {seriesGranularity.value!=="Monthly" && 
                <div className="selector-item">
                    <label>Series End:</label>
                    <div className="">
                        <Select 
                        id="year" 
                        onChange={setYearEnd} 
                        options={yearOptions} 
                        placeholder="Enter Year"/>
                    </div>
                </div>
            }

            <div className="selector-item">
                <label htmlFor="granularity">Select categories:</label>
                <Select
                    closeMenuOnSelect={false}
                    defaultValue={[colourOptions[0], colourOptions[1]]}
                    isMulti
                    options={colourOptions}
                />
            </div>
        </div>
    )
}