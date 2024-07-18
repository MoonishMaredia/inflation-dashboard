import React, { useState, useCallback, useMemo } from 'react';
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

const seriesColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

export default function SeriesChart() {
    const { chartInputs } = useInput()
    const { results } = useResults();
    const [selectedPoint, setSelectedPoint] = useState(null);

    const resultKeys = Object.keys(results['time-series'].data)
    
    const baseData = useMemo(() => {
      return resultKeys.map((key, index) => {
        return {
          x: results['time-series']['x-axis'],
          y: results['time-series'].data[key].value,
          type: 'scatter',
          mode: 'lines',
          name: results['time-series'].data[key].series_desc,
          hoverinfo: 'none',
          line: { color: seriesColors[index % seriesColors.length] }
        }
      });
    }, [results]);

    const data = useMemo(() => {
      if (selectedPoint) {
        return [
          ...baseData,
          {
            x: [selectedPoint.x],
            y: [selectedPoint.y],
            type: 'scatter',
            mode: 'markers',
            marker: { 
              color: selectedPoint.color,
              size: 10,
              symbol: 'circle',
              line: {
                color: 'white',
                width: 2
              }
            },
            showlegend: false
          }
        ];
      }
      return baseData;
    }, [baseData, selectedPoint]);

    const handleClick = useCallback((event) => {
      if (event.points && event.points.length > 0) {
        const point = event.points[0];
        setSelectedPoint({
          x: point.x,
          y: point.y,
          name: point.data.name,
          color: point.data.line.color
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
        fixedrange: true
      },
      yaxis: {
        title: {
          text: YtitleMapping[chartInputs['time-series'].seriesType],
          standoff: 30,
          font: { size: 14 }
        },
        fixedrange: true
      },
      margin: { l: 50, r: 20, b: 40, t: 40 },
      showlegend: false,
      autosize: true,
      responsive: true,
      hovermode: 'closest'
    };
  
    const config = {
      responsive: true,
      displayModeBar: false,
      scrollZoom: false,
      doubleClick: false,
      modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d'],
      dragmode: false,
    };
  
    return (
      <div style={{ position: 'relative', width: '100%', height: '60vh'}}>
        <Plot
          className="my-multi-series-line-chart"
          data={data}
          layout={layout}
          config={config}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          onClick={handleClick}
        />
        {selectedPoint && (
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '18%',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '12px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${selectedPoint.color}`
          }}>
            <strong style={{color: selectedPoint.color}}>{selectedPoint.name}</strong><br/>
            {selectedPoint.x}<br/>
            {chartTitleMapping[chartInputs['time-series'].seriesType]}: {selectedPoint.y.toFixed(2)}
          </div>
        )}
      </div>
    );
};