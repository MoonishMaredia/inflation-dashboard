import Header from './Header'
import { useState, useEffect } from 'react'
import { useInput } from './InputContext'
import { useResults } from './ResultsContext'
import SelectionMenu from './SelectionMenu'
import BlankChart from './BlankChart'
import SeriesChart from './SeriesChart'
import WaterfallComponent from './WaterfallComponent'
import {getMaxDate} from '../utils/api'


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
    const [dataMaxDate, setDataMaxDate] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const dateString = await getMaxDate()
            const [year, month, day] = dateString.split('-').map(Number);
            const utcDate = new Date(Date.UTC(year, month - 1, day+1));
            setDataMaxDate(new Date(utcDate.toISOString()));
        };
        fetchData()
    }, [])

return (
    <div className="main">
        <Header/>

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

                    dataMaxDate={dataMaxDate}

                    selectedSeries={selectedSeries}
                    setSelectedSeries={setSelectedSeries}
                    metric={metric}
                    setMetric={setMetric}
                    chartType={chartType}
                    setChartType={setChartType}

                    showOptions={showOptions}
                    setShowOptions={setShowOptions}
                    />

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
                
                {(!chartType || (chartType && chartType.value==='time-series' && !results['time-series'])) &&
                    <div className="item1">
                        <button className="option-btn" onClick={()=>setShowOptions(prev=>!prev)}>{showOptions ? "Hide Options" : "Show Options"}</button>
                        <BlankChart />
                    </div>}

                {(!chartType || (chartType && chartType.value==='compare' && !results['compare'])) &&
                <div className="item1">
                    <button className="option-btn" onClick={()=>setShowOptions(prev=>!prev)}>{showOptions ? "Hide Options" : "Show Options"}</button>
                    <BlankChart />
                </div>}

                {((chartType && chartType.value==='time-series' && results['time-series'])) &&
                    <div className="item1">
                        <button className="option-btn" onClick={()=>setShowOptions(prev=>!prev)}>{showOptions ? "Hide Options" : "Show Options"}</button>
                        <SeriesChart />
                    </div>}

                {((chartType && chartType.value==='compare' && results['compare'])) &&
                <div className="item1">
                    <button className="option-btn" onClick={()=>setShowOptions(prev=>!prev)}>{showOptions ? "Hide Options" : "Show Options"}</button>
                    <WaterfallComponent />
                </div>}
            </div>
        }
    </div>
    )}

