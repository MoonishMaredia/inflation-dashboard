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
import WaterfallComponent from './WaterfallComponent'

import {
    chartTypeOptions,
    metricOptions
} from '../optionsData'

export default function FinalLayout() { 

    const [showOptions, setShowOptions] = useState(true)
    const [fromDateSeries, setFromDateSeries] = useState(null);
    const [toDateSeries, setToDateSeries] = useState(null);
    const [fromDateCompare, setFromDateCompare] = useState(null);
    const [toDateCompare, setToDateCompare] = useState(null);
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

                    fromDateSeries={fromDateSeries}
                    setFromDateSeries={setFromDateSeries}
                    toDateSeries={toDateSeries}
                    setToDateSeries={setToDateSeries}

                    fromDateCompare={fromDateCompare}
                    setFromDateCompare={setFromDateCompare}
                    toDateCompare={toDateCompare}
                    setToDateCompare={setToDateCompare}

                    selectedSeries={selectedSeries}
                    setSelectedSeries={setSelectedSeries}
                    metric={metric}
                    setMetric={setMetric}
                    chartType={chartType}
                    setChartType={setChartType}/>

                {(!chartType || (chartType && chartType.value==='time-series' && !results['time-series'])) &&
                    <div className="item1">
                        <BlankChart />
                    </div>}

                {(!chartType || (chartType && chartType.value==='compare' && !results['compare'])) &&
                <div className="item1">
                    <BlankChart />
                </div>}

                {((chartType && chartType.value==='time-series' && results['time-series'])) &&
                    <div className="item1">
                        <SeriesChart />
                    </div>}

                {((chartType && chartType.value==='compare' && results['compare'])) &&
                <div className="item1">
                    <WaterfallComponent />
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