import Header from './Header'
import { useState, useEffect } from 'react'
import { useInput } from './InputContext'
import { useResults } from './ResultsContext'
import LandingView from './LandingView'
import SeriesView from './SeriesOptionsView'
import NoOptionsView from './NoOptionsView'
import CompareView from './CompareOptionsView'
import SelectionMenu from './SelectionMenu'
import MyPlotlyChart from './TimeSeriesChart'

import {
    chartTypeOptions,
    metricOptions
} from '../optionsData'

export default function FinalLayout() { 

    const [showOptions, setShowOptions] = useState(true)
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [selectedSeries, setSelectedSeries] = useState([]);
    const[metric, setMetric] = useState(null)  
    const[chartType, setChartType] = useState(null)
    const minDate = new Date(1999, 1, 1);
    const maxDate = new Date(2024, 5, 1);
    const [layoutScenario, setLayoutScenario] = useState("landing-view")

    useEffect(()=>{
        if(!showOptions) {
            setLayoutScenario("no-options-view")
        } else {
            if(chartType) {
                if(chartType.value==="time-series") {
                    setLayoutScenario("series-view")
                } else if(chartType.value==="compare") {
                    setLayoutScenario("compare-view")
                }
            } else {
                setLayoutScenario("landing-view")
            }
        }
    }, [showOptions, chartType])

return (
    <div className="main">
        <Header
            showOptions={showOptions}
            setShowOptions={setShowOptions}
        />
        <div className="selection-view">
            <SelectionMenu
            />
            <div className="item1">
                <MyPlotlyChart />
            </div>

        </div>

        {/* {layoutScenario==="landing-view" &&
            <LandingView
                chartTypeOptions={chartTypeOptions}
                chartTypeStateVar={chartType}
                setChartTypeStateVar={setChartType}/>
        }

        {layoutScenario==="series-view" &&
            <SeriesView 
                metricOptionsArr={metricOptions}
                metricsVar={metric}
                setMetricStateVar={setMetric}
                fromDateVar={fromDate}
                setFromDateVar={setFromDate}
                minDate={minDate}
                maxDate={maxDate}
                toDateVar={toDate}
                setToDateVar={setToDate}
                selectedSeries={selectedSeries}
                handleCheck={handleCheck}
                chartType={chartType}
                chartTypeOptions={chartTypeOptions}
                setChartTypeStateVar={setChartType}/>
        }

        {layoutScenario==="compare-view" &&
            <CompareView 
                setFromDateVar={setFromDate}
                minDate={minDate}
                maxDate={maxDate}
                setToDateVar={setToDate}
                selectedSeries={selectedSeries}
                handleCheck={handleCheck}
                chartTypeOptions={chartTypeOptions}
                setChartTypeStateVar={setChartType}/>
        }

        {layoutScenario==="no-options-view" && 
            <NoOptionsView
            />
        } */}

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