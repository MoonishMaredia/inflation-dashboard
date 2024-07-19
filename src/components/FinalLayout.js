import Header from './Header'
import { useState, useEffect } from 'react'
import { useInput } from './InputContext'
import { useResults } from './ResultsContext'
import SelectionMenu from './SelectionMenu'
import BlankChart from './BlankChart'
import SeriesChart from './SeriesChart'
import SeriesChartMobile from './SeriesChartMobile'
import WaterfallComponent from './WaterfallComponent'
import WaterfallComponentMobile from './WaterfallComponentMobile'
import {getMaxDate} from '../utils/api'


export default function FinalLayout() { 

    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 1280; // Adjust this breakpoint as needed  
    // const isMobile = () => {
    //     return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    //   };

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
            if(dateString) {
                const [year, month, day] = dateString.split('-').map(Number);
                const utcDate = new Date(Date.UTC(year, month - 1, day+1));
                setDataMaxDate(new Date(utcDate.toISOString()));
            } else {
                setDataMaxDate(new Date(2024, 4, 1))
            }
        };
        fetchData()
    }, [])

    const renderChart = (isMobile) => {
        if (!chartType) {
            return <BlankChart />;
        }
        if(isMobile) {
            switch (chartType.value) {
                case 'time-series':
                    return results['time-series'] ? <SeriesChartMobile /> : <BlankChart />;
                case 'compare':
                    return results['compare'] ? <WaterfallComponentMobile /> : <BlankChart />;
                default:
                    return <BlankChart />;
            }
        } else {
            switch (chartType.value) {
                case 'time-series':
                    return results['time-series'] ? <SeriesChart /> : <BlankChart />;
                case 'compare':
                    return results['compare'] ? <WaterfallComponent /> : <BlankChart />;
                default:
                    return <BlankChart />;
            }
        }
    };

    const renderOptionsButton = () => (
        <button className='option-btn' onClick={() => setShowOptions((prev) => !prev)}>
            {showOptions ? 'Hide Options' : 'Show Options'}
        </button>
    );

    return (
        <div>
            <Header/>
            {!isMobile ? (
                <>
                    {showOptions ? (
                        <div className="selection-view">
                            <div className="selection-menu">
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
                            </div>
                            <div className="item1">
                                {renderChart(isMobile)}
                            </div>
                        </div>
                    ) : (
                        <div className="no-options-view">
                            <div className="item1">
                                {renderChart(isMobile)}
                                {renderOptionsButton()}
                            </div>
                        </div>
                    )}
                </>
            ) : (
            <>
                <div className="selection-view">
                    <div className="selection-menu">
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
                    </div>
                    <div className="item1">
                        {renderChart(isMobile)}
                    </div>
                </div>
            </>
            )}
        </div>
    );
} 

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}


// return (
//     <div>
//         <Header />
//         {showOptions ? (
//             <div className="selection-view">
//                 <div className="selection-menu">
//                 <SelectionMenu
//                     fromDateSeries={fromDateSeries}
//                     setFromDateSeries={setFromDateSeries}
//                     toDateSeries={toDateSeries}
//                     setToDateSeries={setToDateSeries}
//                     fromDateCompare={fromDateCompare}
//                     setFromDateCompare={setFromDateCompare}
//                     toDateCompare={toDateCompare}
//                     setToDateCompare={setToDateCompare}
//                     dataMaxDate={dataMaxDate}
//                     selectedSeries={selectedSeries}
//                     setSelectedSeries={setSelectedSeries}
//                     metric={metric}
//                     setMetric={setMetric}
//                     chartType={chartType}
//                     setChartType={setChartType}
//                     showOptions={showOptions}
//                     setShowOptions={setShowOptions}
//                 />
//                 </div>
//                 <div className="item1 chart-mobile">
//                     {renderChart()}
//                 </div>
//             </div>
//         ) : (
//             <div className="no-options-view">
//                 <div className="item1">
//                     {renderChart()}
//                     {renderOptionsButton()}
//                 </div>
//             </div>
//         )}
//     </div>
// );