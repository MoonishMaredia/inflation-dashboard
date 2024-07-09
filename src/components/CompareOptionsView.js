import Dropdown from './Dropdown'
import MyPlotlyChart from './TimeSeriesChart'
import MonthYearPicker from './MonthYearPicker'
import SelectSeries from './SelectSeries'

export default function CompareView({setFromDateVar, minDate, maxDate, setToDateVar, 
    chartType, selectedSeries, handleCheck, chartTypeOptions, setChartTypeStateVar}) {

        return (
            <div class="compare-view">
                <div className="item1">
                    <MyPlotlyChart />
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

