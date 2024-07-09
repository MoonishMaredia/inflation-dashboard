import Header from './Header'
import { useState, useEffect } from 'react'
import { useInput } from './InputContext'
import { useResults } from './ResultsContext'
import LandingView from './LandingView'
import SeriesView from './SeriesOptionsView'
import NoOptionsView from './NoOptionsView'
import CompareView from './CompareOptionsView'

import {
    chartTypeOptions,
    metricOptions
} from '../optionsData'

export default function FinalLayout() { 

    const saveToSessionStorage = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
      };

    const getFromSessionStorage = (key) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
    };


    const [showOptions, setShowOptions] = useState(true)
    const [fromDate, setFromDate] = useState(getFromSessionStorage('fromDate') || new Date());
    const [toDate, setToDate] = useState(getFromSessionStorage('toDate') || new Date());
    const [selectedSeries, setSelectedSeries] = useState(getFromSessionStorage('selectedSeries') || []);
    const[metric, setMetric] = useState(getFromSessionStorage('metric'))  
    const[chartType, setChartType] = useState(getFromSessionStorage('chartType'))
    const minDate = new Date(1999, 1, 1);
    const maxDate = new Date(2024, 5, 1);
    const [layoutScenario, setLayoutScenario] = useState("landing-view")

      useEffect(() => {
        const dataToStore = {
          fromDate,
          toDate,
          selectedSeries,
          metric,
          chartType,
        };
        saveToSessionStorage('myComponentData', dataToStore);
      }, [fromDate, toDate, selectedSeries, metric, chartType]);


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
    <div className="main">
        <Header
            showOptions={showOptions}
            setShowOptions={setShowOptions}
        />
        {layoutScenario==="landing-view" &&
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
        }

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