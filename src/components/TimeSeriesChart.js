import React from 'react';
import Plot from 'react-plotly.js';

const MyPlotlyChart = () => {
  return (
    <Plot
      className="my-plotly-chart"
      data={[
        {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
        { type: 'bar', x: [1, 2, 3, 4], y: [12, 18, 29, 20] },
      ]}
      layout={{ width: 720, height: 440, title: 'A Fancy Plot' }}
    />
  );
};

export default MyPlotlyChart;