import {useState, useEffect} from 'react'
import Dropdown from './Dropdown'
import MyPlotlyChart from './TimeSeriesChart'
import MonthYearPicker from './MonthYearPicker'
import SelectSeries from './SelectSeries'
import {chartTypeOptions, metricOptions, monthNames, monthToString} from '../optionsData'
import {getSeriesData, getCompareData} from '../utils/api.js';
import { useInput } from './InputContext'
import { useResults } from './ResultsContext'

export default function SelectionMenu({fromDateSeries, setFromDateSeries,
    toDateSeries, setToDateSeries, fromDateCompare, setFromDateCompare,
    toDateCompare, setToDateCompare, selectedSeries, setSelectedSeries, 
    metric, setMetric, chartType, setChartType}){

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
            return (chartType && metric && fromDateSeries && toDateSeries && selectedSeries.length > 0);
        } else if (type === 'compare') {
            return chartType && fromDateCompare && toDateCompare;
        } return false;
      };

    async function handleButtonClick() {
        if(chartType.value==="time-series") {
            const inputObject = {
                chartType: "time-series",
                seriesType: metric.value,
                yearStart: fromDateSeries.getFullYear(),
                yearEnd: toDateSeries.getFullYear(),
                monthStart: monthToString[monthNames[fromDateSeries.getMonth()]],
                monthEnd: monthToString[monthNames[toDateSeries.getMonth()]],
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
                chartType: "compare",
                yearStart: fromDateCompare.getFullYear(),
                yearEnd: toDateCompare.getFullYear(),
                monthStart: monthToString[monthNames[fromDateCompare.getMonth()]],
                monthEnd: monthToString[monthNames[toDateCompare.getMonth()]]
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
                            existingDate={fromDateSeries}
                            onDateChange={setFromDateSeries}
                            defaultDate={minDate} 
                            minDate={minDate} 
                            setMinDate={setMinDate}
                            maxDate={maxDate} 
                            dateType={"from"}
                            placeholderText={"Select a series start date"}
                        />
                        <MonthYearPicker 
                            existingDate={toDateSeries}
                            onDateChange={setToDateSeries}
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
                            existingDate={fromDateCompare}
                            onDateChange={setFromDateCompare}
                            defaultDate={minDate} 
                            minDate={minDate} 
                            setMinDate={setMinDate}
                            maxDate={maxDate} 
                            dateType={"from"}
                            placeholderText={"Select a series start date"}
                        />
                        <MonthYearPicker 
                            existingDate={toDateCompare}
                            onDateChange={setToDateCompare}
                            defaultDate={maxDate} 
                            setMinDate={setMinDate}
                            minDate={minDate} 
                            maxDate={maxDate} 
                            placeholderText={"Select a series end date"}
                            />
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