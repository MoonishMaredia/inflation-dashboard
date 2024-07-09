import Dropdown from './Dropdown'
import MyPlotlyChart from './TimeSeriesChart'
import MonthYearPicker from './MonthYearPicker'
import SelectSeries from './SelectSeries'

export default function SeriesView({metricOptionsArr, metricsVar, setMetricStateVar, 
    fromDateVar, setFromDateVar, minDate, maxDate, toDateVar, setToDateVar, selectedSeries, handleCheck, 
    chartType, chartTypeOptions, setChartTypeStateVar}) {

        return (
            <div class="series-view">
                <div className="item1">
                    <MyPlotlyChart />
                </div>
                <div className="item2">
                    <Dropdown
                    placeholderText="Select metric"
                    optionsArr={metricOptionsArr}
                    stateVar={metricsVar}
                    setStateVar={setMetricStateVar}
                    />
                </div>
                <div class="item3">
                    <label>Select series start date:</label>
                        <MonthYearPicker 
                            onDateChange={setFromDateVar}
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
                        onDateChange={setToDateVar}
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
                        handleCheck={handleCheck}
                    />
                </div>
                <div class="item6">
                    <Dropdown
                        placeholderText="Select chart type"
                        stateVar={chartType}
                        optionsArr={chartTypeOptions}
                        setStateVar={setChartTypeStateVar}
                    />
                </div>
        </div>
        )
    }