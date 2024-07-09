import {useState} from 'react'
import Dropdown from './Dropdown'
import MyPlotlyChart from './TimeSeriesChart'
import MonthYearPicker from './MonthYearPicker'
import SelectSeries from './SelectSeries'
import {
    chartTypeOptions,
    metricOptions
} from '../optionsData'
import ButtonComponent from './ButtonComponent'

export default function SelectionMenu(){

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState([]);
    const[metric, setMetric] = useState(null)  
    const[chartType, setChartType] = useState(null)
    const [minDate, setMinDate] = useState(new Date(1999, 1, 1));
    const maxDate = new Date(2024, 5, 1);
    // const [isButtonEnabled, setIsButtonEnabled] = useState(false)

    function handleCheck(seriesId) {
        setSelectedSeries(prevSeries=>{
            if(prevSeries.includes(seriesId)) {
                return prevSeries.filter(id=>id!==seriesId)
            } else {
                return [...prevSeries, seriesId]
            }
        })
    }

    const isButtonEnabled = () => {
        if (chartType.value === 'time-series') {
          return (
            chartType &&
            metric &&
            fromDate &&
            toDate &&
            selectedSeries.length > 0
          );
        } else if (chartType.value === 'compare') {
          return chartType && fromDate && toDate;
        }
        return false;
      };

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
                            setMinDate={setMinDate}
                            minDate={minDate} 
                            maxDate={maxDate} 
                            placeholderText={"Select a series end date"}
                            />
                    <SelectSeries 
                        selectedSeries={selectedSeries}
                        handleCheck={handleCheck}/>

                    <button
                        disabled={isButtonEnabled()}
                        style={{ cursor: !isButtonEnabled() ? 'not-allowed' : 'pointer' }}
                        className="generate-chart-btn">
                        Generate Chart
                    </button>
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
                            <button
                                disabled={isButtonEnabled()}
                                style={{ cursor: !isButtonEnabled() ? 'not-allowed' : 'pointer' }}
                                className="generate-chart-btn">
                                Generate Chart
                            </button>
                    </div>
                }
            </div>
        )

}