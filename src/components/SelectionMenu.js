import {useState, useEffect} from 'react'
import Dropdown from './Dropdown'
import MyPlotlyChart from './TimeSeriesChart'
import MonthYearPicker from './MonthYearPicker'
import SelectSeries from './SelectSeries'
import {chartTypeOptions, metricOptions, monthNames, monthToString} from '../optionsData'
import {getSeriesData, getCompareData} from '../utils/api.js';
import { useInput } from './InputContext'
import { useResults } from './ResultsContext'

export default function SelectionMenu({fromDate, setFromDate, toDate, setToDate,
    selectedSeries, setSelectedSeries, metric, setMetric, chartType, setChartType}){

    const [errors, setErrors] = useState({});
    const [minDate, setMinDate] = useState(new Date(1999, 1, 1));
    const maxDate = new Date(2024, 5, 1);
    const {results, setResults} = useResults({});
    const {chartInputs, setChartInputs} = useInput({});

    function handleCheck(seriesId) {
        setSelectedSeries(prevSeries=>{
            if(prevSeries.includes(seriesId)) {
                return prevSeries.filter(id=>id!==seriesId)
            } else {
                return [...prevSeries, seriesId]
            }
        })
    }

    const isButtonEnabled = (type) => {
        if (type === 'time-series') {
            return (chartType && metric && fromDate && toDate && selectedSeries.length > 0);
        } else if (type === 'compare') {
            return chartType && fromDate && toDate;
        } return false;
      };

    async function handleButtonClick() {
        if(chartType.value==="time-series") {
            const inputObject = {
                chartType: "time-series",
                seriesType: metric.value,
                yearStart: fromDate.getFullYear(),
                yearEnd: toDate.getFullYear(),
                monthStart: monthToString[monthNames[fromDate.getMonth()]],
                monthEnd: monthToString[monthNames[toDate.getMonth()]],
                seriesIds: selectedSeries
            }
            setChartInputs(prev=>({
                ...prev,
                "time-series":inputObject
            }))
            const data = await getSeriesData(inputObject)
            setResults(prev=>({
                ...prev,
                "time-series":data
            }))

        } else if(chartType.value==="compare") {
            const inputObject = {
                chartType: "time-series",
                yearStart: fromDate.getFullYear(),
                yearEnd: toDate.getFullYear(),
                monthStart: monthNames[fromDate.getMonth()],
                monthEnd: monthNames[toDate.getMonth()]
            }
            setChartInputs(prev=>({
                ...prev,
                "compare":inputObject
            }))
            const data = await getCompareData(inputObject)
            setResults(prev=>({
                ...prev,
                "compare":data
            }))

        } else {
            console.log("Error!")
            return
        }
        }

        return (
            <div className="selection-menu">
                <div className="chart-type-selection">
                    <h3>Chart Options</h3>
                    <Dropdown
                            placeholderText="Select chart type"
                            stateVar={chartType}
                            optionsArr={chartTypeOptions}
                            setStateVar={setChartType}/>
                </div>
                {chartType && chartType.value==="time-series" && 
                <div className="menu-options">
                    <Dropdown
                        placeholderText="Select metric"
                        optionsArr={metricOptions}
                        stateVar={metric}
                        setStateVar={setMetric}
                    />
                        <MonthYearPicker
                            existingDate={fromDate}
                            onDateChange={setFromDate}
                            defaultDate={minDate} 
                            minDate={minDate} 
                            setMinDate={setMinDate}
                            maxDate={maxDate} 
                            dateType={"from"}
                            placeholderText={"Select a series start date"}
                        />
                        <MonthYearPicker 
                            existingDate={toDate}
                            onDateChange={setToDate}
                            defaultDate={maxDate} 
                            setMinDate={setMinDate}
                            minDate={minDate} 
                            maxDate={maxDate} 
                            placeholderText={"Select a series end date"}
                            />
                    <SelectSeries 
                        selectedSeries={selectedSeries}
                        handleCheck={handleCheck}/>

                    <CustomButton
                        isButtonEnabled={isButtonEnabled}
                        chartType={chartType}
                        buttonText={"Generate Series Chart"}
                        handleButtonClick={handleButtonClick}/>
                </div>
                }

                {chartType && chartType.value==="compare" && 
                    <div className="menu-options">
                       <MonthYearPicker 
                            onDateChange={setFromDate}
                            defaultDate={minDate} 
                            minDate={minDate} 
                            setMinDate={setMinDate}
                            maxDate={maxDate} 
                            dateType={"from"}
                            placeholderText={"Select a series start date"}
                        />
                        <MonthYearPicker 
                            onDateChange={setToDate}
                            defaultDate={maxDate} 
                            minDate={minDate}
                            setMinDate={setMinDate}
                            maxDate={maxDate} 
                            placeholderText={"Select a series end date"}/>
                        <CustomButton
                            isButtonEnabled={isButtonEnabled}
                            chartType={chartType}
                            buttonText={"Generate Waterfall Chart"}
                            handleButtonClick={handleButtonClick}/>
                    </div>
                }
            </div>
        )
    }


function CustomButton({ isButtonEnabled, chartType, buttonText, handleButtonClick }) {

    const isEnabled = isButtonEnabled(chartType.value);
    return (
        <button
            disabled={!isEnabled}
            style={{ cursor: isEnabled ? 'pointer' : 'not-allowed' }}
            className="generate-chart-btn"
            onClick={handleButtonClick}>
            {buttonText}
        </button>
    );
};