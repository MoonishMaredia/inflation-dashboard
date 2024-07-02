import {useState, useEffect} from 'react'
import TimeSeriesMenu from './TimeSeriesMenu'
import CompareMenu from './CompareMenu'

export default function OptionsMenu({isCompare}) {
      

    return (
        <div className="inputs-menu">
            {!isCompare && 
            <TimeSeriesMenu/>}
            {isCompare &&
            <CompareMenu/>}
        </div>
    )
}