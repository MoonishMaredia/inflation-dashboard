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
import BlankChart from './BlankChart'
import SeriesChart from './SeriesChart'

import {
    chartTypeOptions,
    metricOptions
} from '../optionsData'

export default function FinalLayout() { 

    const [showOptions, setShowOptions] = useState(true)
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState([]);
    const [metric, setMetric] = useState(null)  
    const [chartType, setChartType] = useState(null)
    const {results, setResults} = useResults({})

return (
    <div className="main">
        <Header
            showOptions={showOptions}
            setShowOptions={setShowOptions}/>

        {showOptions && 
            <div className="selection-view">
                <SelectionMenu
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    selectedSeries={selectedSeries}
                    setSelectedSeries={setSelectedSeries}
                    metric={metric}
                    setMetric={setMetric}
                    chartType={chartType}
                    setChartType={setChartType}/>

                {!results['time-series'] &&
                    <div className="item1">
                        <BlankChart />
                    </div>}

                {results['time-series'] &&
                <div className="item1">
                    <SeriesChart />
                </div>}
            </div>
        }
        {!showOptions && 
            <div className="no-options-view">
                
                {!results['time-series'] &&
                    <div className="item1">
                        <BlankChart />
                    </div>}

                {results['time-series'] &&
                <div className="item1">
                    <SeriesChart />
                </div>}
            </div>
        }
    </div>
    )}