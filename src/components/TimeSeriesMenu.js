import {useState, useEffect} from 'react'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SelectModal from "./SelectModal";
import { InputContext, useInput } from "./InputContext"

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


export default function TimeSeriesMenu() {


    const { inputFields, setInputFields } = useInput();

    const [modalOpen, setModalOpen] = useState(false)
    const [seriesType, setSeriesType] = useState('');
    const [seriesGranularity, setSeriesGranularity] = useState('');
    const [monthStart, setMonthStart] = useState('');
    const [monthEnd, setMonthEnd] = useState('');
    const [yearStart, setYearStart] = useState('');
    const [yearEnd, setYearEnd] = useState('');
    const [selectedSeries, setSelectedSeries] = useState([]);
    const [errors, setErrors] = useState({});
    
    function handleCheck(seriesId) {
        setSelectedSeries(prevSeries=>{
            if(prevSeries.includes(seriesId)) {
                return prevSeries.filter(id=>id!==seriesId)
            } else {
                return [...prevSeries, seriesId]
            }
        })
    }

    function validateForm() {
        const monthNames = ["January", "February", "March", "April", 
            "May", "June", "July", "August", "September", 
            "October", "November", "December"];
        
        function getDateFromMonthYear(month, year) {
          const monthIndex = monthNames.indexOf(month);
          return new Date(parseInt(year.value), monthIndex);
        }
      
        const newErrors = {};
        if (!seriesType) newErrors.seriesType = "Series type is required.";
        // if (!seriesGranularity) newErrors.seriesGranularity = "Granularity is required.";
        if (!yearStart) newErrors.yearStart = "Start year is required.";
        if (!yearEnd) newErrors.yearEnd = "End year is required.";
        if (!monthStart) newErrors.yearStart = "Start month is required.";
        if (!monthEnd) newErrors.yearEnd = "End month is required.";
        if (yearStart && yearEnd && monthStart && monthEnd) {
            const startDate = getDateFromMonthYear(monthStart.label, yearStart);
            const endDate = getDateFromMonthYear(monthEnd.label, yearEnd);
            if (startDate >= endDate) {
              newErrors.monthStart = "Series start date should be prior to series end date.";
            }
          }

        if(seriesGranularity.value==="Annual") {
            if (yearStart && yearEnd && parseInt(yearStart.value) > parseInt(yearEnd.value)) {
                newErrors.yearStart = "Start year must be before end year.";
              }
        }
      
        if (!(selectedSeries.length > 0)) {
          newErrors.seriesLength = "At least one series must be selected.";
        }
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      }

      function handleGenerateChart() {
        if (validateForm()) {
          // Proceed with generating the chart
          setInputFields({
            chartType:"series",
            type:seriesType.value,
            yearStart:yearStart.value,
            yearEnd:yearEnd.value,
            monthStart:monthStart.value,
            monthEnd:monthEnd.value,
            selectedSeries:selectedSeries
          })
        }
      }
      

    return (
        <div className="options-menu">
            <div className="selector-item">
                <label htmlFor="type">Specify series type</label>
                <Select 
                    id="type" 
                    onChange={setSeriesType} 
                    options={typeOptions} />
                {errors.seriesType && <p className="error-message">{errors.seriesType}</p>}
            </div>

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
                {errors.yearStart && <p className="error-message">{errors.yearStart}</p>}
                {errors.monthStart && <p className="error-message">{errors.monthStart}</p>}
            </div>

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
                {errors.yearEnd && <p className="error-message">{errors.yearEnd}</p>}
                {errors.monthEnd && <p className="error-message">{errors.monthEnd}</p>}
            </div>

            <div className="selector-item">
                <label>Add series</label>
                <button className="add-series-btn" onClick={() => setModalOpen((prev) => !prev)}>
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                <span className="selected-pill">{selectedSeries.length} selected</span>
                </button>
                {errors.seriesLength && <p className="error-message">{errors.seriesLength}</p>}
            </div>

            {modalOpen && 
                <SelectModal
                handleModal={()=>setModalOpen(prev=>!prev)}
                selectedSeries={selectedSeries}
                handleCheck={handleCheck}/>
            }

            <button className="generate-btn" onClick={handleGenerateChart}>
                Generate Chart
            </button>
        </div>
    )
}