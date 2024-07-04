import React from 'react';
import Plot from 'react-plotly.js';

const MyPlotlyChart = () => {
  const data = [
    {
      x: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
      y: [10, 15, 13, 17],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
      name: 'Series 1'
    },
    {
      x: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
      y: [16, 5, 11, 9],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'red' },
      name: 'Series 2'
    },
    {
      x: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
      y: [12, 9, 15, 12],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'green' },
      name: 'Series 3'
    },
    {
      x: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
      y: [32, 9, 15, 12],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'pink' },
      name: 'Series 4'
    },
    {
      x: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
      y: [18, 9, 15, 12],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'purple' },
      name: 'Series 5'
    },
    {
      x: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
      y: [48, 9, 15, 12],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'cyan' },
      name: 'Series 6'
    }
  ];

  const layout = {
    xaxis: {
      title: 'Date',
    },
    yaxis: {
      title: 'Value',
    },
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
    legend: {
      x: 1,
      xanchor: 'right',
      y: 1
    },
    autosize: true,
    responsive: true
  };

  const config = {
    responsive: true,
    displayModeBar: false // Optional: hides the mode bar
  };

  return (
      <Plot
        className="my-multi-series-line-chart"
        data={data}
        layout={layout}
        config={config}
        useResizeHandler={true}
        style={{ width: "90%", height: "100%" }}
      />
  );
};

export default MyPlotlyChart;