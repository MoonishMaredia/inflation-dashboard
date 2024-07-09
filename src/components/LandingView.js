import Dropdown from './Dropdown'
import MyPlotlyChart from './TimeSeriesChart'

export default function LandingView({chartTypeOptions, chartTypeStateVar, setChartTypeStateVar}) {

    console.log(chartTypeStateVar)

    return (
        <div className="landing-view-grid">
            <div class="item6">
                <Dropdown
                    placeholderText="Select chart type"
                    optionsArr={chartTypeOptions}
                    stateVar={chartTypeStateVar}
                    setStateVar={setChartTypeStateVar}
                />
            </div>
            <div className="item1">
                <MyPlotlyChart />
            </div>
        </div>
    )
    }

