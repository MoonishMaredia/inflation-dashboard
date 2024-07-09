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

return (
    <div className="main">
        <Header
            showOptions={showOptions}
            setShowOptions={setShowOptions}/>
        {showOptions && 
            <div className="selection-view">
                <SelectionMenu
                />
                <div className="item1">
                    <MyPlotlyChart />
                </div>
            </div>
        }
        {!showOptions && 
            <div className="no-options-view">
                <div className="item1">
                    <MyPlotlyChart />
                </div>
            </div>
        }


    </div>
    )}