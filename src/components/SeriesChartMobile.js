import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useResults } from "./ResultsContext"
import { useInput } from './InputContext';
import {seriesObj} from '../optionsData'

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

    const generateTicks = (min, max, tickCount) => {
      const step = (max - min) / (tickCount - 1);

      if(chartInputs['time-series'].seriesType==="Level"){
        return Array.from({ length: tickCount }, (_, i) => Math.floor((Math.round((min + i * step) * 100) / 100)));
      } else {
        return Array.from({ length: tickCount }, (_, i) => (Math.round((min + i * step) * 100) / 100).toFixed(1));
      }
    };
    
    const data = useMemo(() => {
        return results['time-series']['x-axis'].map((date, index) => {
            let point = { date };
            resultKeys.forEach(key => {
                point[key] = results['time-series'].data[key].value[index];
            });
            return point;
        });
    }, [results, resultKeys]);

    const { yDomain, yTicks } = useMemo(() => {
      let minValue = Infinity;
      let maxValue = -Infinity;
      data.forEach(point => {
          resultKeys.forEach(key => {
              if (point[key] < minValue) minValue = point[key];
              if (point[key] > maxValue) maxValue = point[key];
          });
      });
      const padding = (maxValue - minValue) * 0.1;
      const min = Math.floor(Math.max(0, minValue - padding));
      const max = Math.ceil(maxValue + padding);
      
      // Generate 6 evenly spaced ticks
      const ticks = generateTicks(min, max, 6);
      
      return {
          yDomain: [min, max],
          yTicks: ticks
      };
  }, [results, resultKeys]);

    const handleClick = (point, event) => {
        if (point && point.activePayload && point.activePayload.length > 0) {
            const clickedPoint = point.activePayload[0];
            setSelectedPoint({
                x: clickedPoint.payload.date,
                y: clickedPoint.value,
                name: clickedPoint.dataKey
            });
        }
    };

    const formatXAxis = (tickItem) => {
      return new Date(tickItem).getFullYear();
  }

    return (
        <div style={{ width: '100%', height: '55vh', position: 'relative' }}>
            <h3 style={{ textAlign: 'center', textDecoration: 'underline', marginTop: '5px', marginBottom: '10px'}}>{chartTitleMapping[chartInputs['time-series'].seriesType]}</h3>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                    data={data}
                    margin={{ top: 5, right: 0, left: 20, bottom: 5 }}
                    onClick={handleClick}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="date" 
                        axisLine={true}
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                        tickFormatter={formatXAxis}
                    />
                    <YAxis 
                        domain={yDomain}
                        axisLine={true}
                        tickLine={true}
                        tick={{ fontSize: 10 }}
                        width={3}
                        orientation="left"
                        ticks={yTicks}
                    />
                    <Tooltip />
                    {resultKeys.map((key, index) => (
                        <Line
                            key={index}
                            type="monotone"
                            dataKey={key}
                            name={seriesObj[key].series}
                            stroke={seriesColors[index % seriesColors.length]}
                            dot={false}
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}



// {selectedPoint && (
//   <div style={{
//       position: 'absolute',
//       top: '10px',
//       right: '10px',
//       background: 'rgba(255, 255, 255, 0.8)',
//       padding: '5px',
//       borderRadius: '5px',
//       fontSize: '12px',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//       zIndex: 1000
//   }}>
//       {/* <strong>{selectedPoint.name}: {selectedPoint.x}, {selectedPoint.y.toFixed(2)}</strong> */}
//   </div>
// )}