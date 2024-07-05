import {useState, useEffect} from 'react'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { InputContext, useInput } from "./InputContext"
import axios from 'axios'
import { useResults } from "./ResultsContext"


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


export default function CompareMenu() {


    const { inputFields, setInputFields } = useInput();
    const [monthStart, setMonthStart] = useState('');
    const [monthEnd, setMonthEnd] = useState('');
    const [yearStart, setYearStart] = useState('');
    const [yearEnd, setYearEnd] = useState('');
    const [errors, setErrors] = useState({});
    const { results, setResults } = useResults(null);

    
    function validateForm() {
        const monthNames = ["January", "February", "March", "April", 
            "May", "June", "July", "August", "September", 
            "October", "November", "December"];
        
        function getDateFromMonthYear(month, year) {
          const monthIndex = monthNames.indexOf(month);
          return new Date(parseInt(year.value), monthIndex);
        }
      
        const newErrors = {};
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
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      }

      async function makeApiCall(inputFields) {
        try {
          console.log(process.env.REACT_APP_INFLATION_URL);
          const data = await axios.post("http://0.0.0.0:10000" + "/api/v1/compare", inputFields)
            .then(res => res.data);
            setResults(prev=>({...prev, 'compare':data}));
        } catch (error) {
          console.error("Error making API call:", error);
        }
      }
      
      function handleGenerateChart() {
        if (validateForm()) {
          setInputFields({
            chartType: "compare",
            yearStart: yearStart.value,
            yearEnd: yearEnd.value,
            monthStart: monthStart.value,
            monthEnd: monthEnd.value,
          });
        }
      }
      
      useEffect(() => {
        const fetchData = async () => {
          if (inputFields.chartType) { // Ensure inputFields are set before making the API call
            await makeApiCall(inputFields);
          }
        };
        fetchData();
      }, [inputFields]); // Dependency array to watch for changes in inputFields
      
    return (
        <div className="options-menu-compare">
            <div className="selector-item">
                <label>Compare Start</label>
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
                <label>Compare End</label>
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

            <button className="generate-btn" onClick={handleGenerateChart}>
                Generate Comparison
            </button>
        </div>
    )
}