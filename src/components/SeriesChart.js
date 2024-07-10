import React from 'react';
import Plot from 'react-plotly.js';
import { useResults } from "./ResultsContext"
import { useInput } from './InputContext';
import { seriesData } from '../optionsData';
import {useState, useEffect} from 'react'

const YtitleMapping = {
  "Level":"CPI Level (1984 = Index 100)",
  "Monthly Rate":"MoM % Change",
  "Annual Rate":"YoY % Change"
}

const chartTitleMapping = {
  "Level":"CPI Level by Metric Date",
  "Monthly Rate":"MoM % Change by Metric Date",
  "Annual Rate":"YoY % Change by Metric Date"
}

export default function SeriesChart() {

    const {chartInputs, setChartInputs} = useInput()
    const {results, setResults } = useResults();
    const resultKeys = Object.keys(results['time-series'].data)
    const data = resultKeys.map((key) => {
      return {
        x: results['time-series']['x-axis'],
        y: results['time-series'].data[key].value,
        type: 'scatter',
        mode: 'lines+markers',
        name: results['time-series'].data[key].series_desc
      }
    })

    const layout = {
      title: chartTitleMapping[chartInputs['time-series'].seriesType],
      xaxis: {
        title: {
          text: 'Metric Date',
          standoff: 50,
          font: {
            size: 16,
          }
        },
      },
      yaxis: {
        title: {
          text: 'CPI Level (1984 = Index 100)',
          standoff: 50,
          font: {
            size: 16,
          }
        },
      },
      margin: {
      l: 80,
      r: 50,
      b: 50,
      t: 50,
    },
    legend: {
      x: 1,
      xanchor: 'left',
      y: 1
    },
    autosize: true,
    responsive: true
  };
  
  const config = {
    responsive: true,
  };
  
  return (
      <Plot
        className="my-multi-series-line-chart"
        data={data}
        layout={layout}
        config={config}
        useResizeHandler={true}
        style={{ 
          width: "100%", 
          height: "100%",
          border: "1px solid black" 
        }}
      />
  );
};