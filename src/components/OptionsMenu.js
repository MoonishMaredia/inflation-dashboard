import ToggleSelector from "./ToggleSelector"
import {useState} from 'react'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SelectModal from "./SelectModal";

import {
    typeOptions,
    granularityOptions,
    monthOptions,
    colourOptions,
    foodOptions,
    groupedOptions,
    yearOptions,
    detailOptions
} from '../optionsData.js'


export default function OptionsMenu() {

    const [isCompare, setIsCompare] = useState(false)
    function toggleMenu() {
        setIsCompare(prev=>!prev)
    }

    const [modalOpen, setModalOpen] = useState(false)
    const [seriesType, setSeriesType] = useState('');
    const [seriesGranularity, setSeriesGranularity] = useState('');
    const [monthStart, setMonthStart] = useState('');
    const [monthEnd, setMonthEnd] = useState('');
    const [yearStart, setYearStart] = useState('');
    const [yearEnd, setYearEnd] = useState('');
    const [selectedSeries, setSelectedSeries] = useState([])
    
    function handleCheck(seriesId) {
        setSelectedSeries(prevSeries=>{
            if(prevSeries.includes(seriesId)) {
                return prevSeries.filter(id=>id!==seriesId)
            } else {
                return [...prevSeries, seriesId]
            }
        })
    }
      

    return (
        <div className="options-menu">
            <ToggleSelector 
            isCompare={isCompare}
            toggleMenu={toggleMenu}
            toggleText1={"Time Series"}
            toggleText2={"Compare"}/>

            <div className="selector-item">
                <label htmlFor="type">Specify series type</label>
                <Select 
                    id="type" 
                    onChange={setSeriesType} 
                    options={typeOptions} />
            </div>

            <div className="selector-item">
                <label htmlFor="granularity">Specify granularity</label>
                <Select 
                    id="granularity" 
                    onChange={setSeriesGranularity} 
                    options={granularityOptions} />
            </div>

            {seriesGranularity.value==="Monthly" && 
                <div className="selector-item">
                    <label>Series Start</label>
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
                    <label>Series Start</label>
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
                    <label>Series End</label>
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
                    <label>Series End</label>
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
                <label>Add series</label>
                <button className="add-series-btn" onClick={()=>setModalOpen(prev=>!prev)}>
                    <FontAwesomeIcon className="plus-icon" icon={faPlus}/>
                    <span className="selected-pill">{selectedSeries.length} selected</span>
                </button>
            </div>

            {modalOpen && 
                <SelectModal
                handleModal={()=>setModalOpen(prev=>!prev)}
                selectedSeries={selectedSeries}
                handleCheck={handleCheck}/>
            }

            <button className="generate-btn">
                Generate Chart
            </button>

        </div>
    )
}