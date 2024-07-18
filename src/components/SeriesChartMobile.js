import React, { useState, useCallback } from 'react';
import Plot from 'react-plotly.js';
import { useResults } from "./ResultsContext"
import { useInput } from './InputContext';

const YtitleMapping = {
  "Level": "CPI Level (1984 = Index 100)",
  "Monthly Rate": "MoM % Change",
  "Annual Rate": "YoY % Change"
}

const chartTitleMapping = {
  "Level": "CPI Level by Metric Date",
  "Monthly Rate": "MoM % Change by Metric Date",
  "Annual Rate": "YoY % Change by Metric Date"
}

export default function SeriesChart() {
    const { chartInputs } = useInput()
    const { results } = useResults();
    const [selectedPoint, setSelectedPoint] = useState(null);

    const resultKeys = Object.keys(results['time-series'].data)
    const data = resultKeys.map((key) => {
      return {
        x: results['time-series']['x-axis'],
        y: results['time-series'].data[key].value,
        type: 'scatter',
        mode: 'lines',
        name: results['time-series'].data[key].series_desc
      }
    })

    const handleClick = useCallback((event) => {
      if (event.points && event.points.length > 0) {
        const point = event.points[0];
        setSelectedPoint({
          x: point.x,
          y: point.y,
          name: point.data.name
        });
      }
    }, []);

    const layout = {
      title: chartTitleMapping[chartInputs['time-series'].seriesType],
      xaxis: {
        title: {
          text: 'Metric Date',
          standoff: 30,
          font: { size: 14 }
        },
      },
      yaxis: {
        title: {
          text: YtitleMapping[chartInputs['time-series'].seriesType],
          standoff: 30,
          font: { size: 14 }
        },
      },
      margin: { l: 50, r: 20, b: 40, t: 40 },
      legend: { orientation: 'h', y: 0.8, x: 0.1 },
      autosize: true,
      responsive: true,
      hovermode: 'closest'
    };
  
    const config = {
      responsive: true,
      displayModeBar: false, // Hide the mode bar for mobile
    };
  
    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh'}}>
        <Plot
          className="my-multi-series-line-chart"
          data={data}
          layout={layout}
          config={config}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          onClick={handleClick}
        />
        {/* {selectedPoint && (
          <div style={{
            position: 'absolute',
            bottom: '7vh',
            right: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '12px'
          }}>
            {`${selectedPoint.name}: ${selectedPoint.y} (${selectedPoint.x})`}
          </div>
        )} */}
      </div>
    );
};