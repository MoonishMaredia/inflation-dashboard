import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { useResults } from "./ResultsContext";
import { useInput } from './InputContext';
import { stringToMonth } from '../optionsData';

const WaterfallChart = ({ setHoveredCategory }) => {
  const { chartInputs } = useInput({});
  const { results } = useResults({});

  const x = [
    `CPI ${stringToMonth[chartInputs['compare'].monthStart]}, ${chartInputs['compare'].yearStart}`, 
    ...results['compare']['x-axis'], 
    `CPI ${stringToMonth[chartInputs['compare'].monthEnd]}, ${chartInputs['compare'].yearEnd}`
  ];

  const y = [...results['compare']['y-axis']];

  const types = y.map((_, index) => {
    if (index === 0 || index === y.length - 1) return 'total';
    return 'relative';
  });

  const data = [{
    type: 'waterfall',
    x: x,
    y: y,
    text: y.map(value => `${value}`),
    textposition: 'outside',
    connector: {
      line: {
        color: 'rgb(63, 63, 63)'
      }
    },
    measure: types,
    increasing: {
      marker: {
        color: 'green'
      }
    },
    decreasing: {
      marker: {
        color: 'red'
      }
    },
    totals: {
      marker: {
        color: 'blue'
      }
    },
    marker: {
      color: y.map((value, index) => {
        if (index === 0 || index === y.length - 1) return 'blue';
        return value > 0 ? 'green' : 'red';
      })
    },
    base: 100
  }];

  const layout = {
    title: 'Drivers of CPI by Category',
    xaxis: { 
      tickfont: {
        size: 13,
      },
      tickangle: 0,
      tickvals: x,
      ticktext: x.map(label => label.replace(/ /g, '<br>')),
      automargin: true
    },
    yaxis: { 
      title: 'CPI Index', 
      automargin: true
    },
    autosize: true,
    showlegend: false
  };

  return (
    <Plot
      data={data}
      layout={{
        ...layout,
        autosize: true,
        margin: { l: 50, r: 50, b: 50, t: 50 },
      }}
      style={{ 
        width: '100%', 
        height: '100%', 
        border: '1px solid black' 
      }}
      useResizeHandler={true}
      onHover={(data) => {
        if (data.points.length > 0) {
          const point = data.points[0];
          const index = point.pointNumber;  // Get the index of the hovered point
          const xValue = point.x;           // Get the x-value of the hovered point
          // console.log('Index:', index, 'X Value:', xValue);
          setHoveredCategory({ index, xValue });
        }
      }}
      onUnhover={() => setHoveredCategory(null)}
    />
  );
};

function InfoDisplay({ category, categoryIndex, chartInputs, results }) {

  const categoryKeys = (category && categoryIndex !== 0 && categoryIndex !== 9) ? Object.keys(results['compare']['details'][category]) : null;
  const subResults = (category && categoryIndex !== 0 && categoryIndex !== 9) ? results['compare']['details'][category] : null;
  const categoryString = !category ? "Category Information" : categoryIndex===0 ? "Series Start" : categoryIndex===9 ? "Series End" : category

  return (
    <div>
      <div className="">
        <p className="wfall-detail-title">
          {categoryString}
        </p>
        {categoryKeys && categoryIndex !== 0 && categoryIndex !== 9 && 
        <>
          <div className='category-display-header'>
            <p>Total Contributing Change</p>
            <p>{results['compare']['y-axis'][categoryIndex].toFixed(3)}</p>
          </div>
          {categoryKeys.map((key, index) => {
            return (
              <CategoryCard
                level={subResults[key]['level']}
                title={key}
                weight={subResults[key]['value']}
              />
            );
          })}
          </>
          }
        {categoryIndex === 0 && 
          <div>
            <p className="display-explain">Price level indexed to 100 for your series start date</p>
          </div>
        }
        {categoryIndex === 9 && 
            <p className="display-explain">CPI index {results['compare']['y-axis'][9] - 100 > 0 ? "increased" : "decreased"} by ~{Math.abs((results['compare']['y-axis'][9] - 100).toFixed(0))}% between {stringToMonth[chartInputs['compare'].monthStart]}, {chartInputs['compare'].yearStart} and {stringToMonth[chartInputs['compare'].monthEnd]}, {chartInputs['compare'].yearEnd}</p>
        }
      </div>
    </div>
  );
};

const WaterfallComponent = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { results } = useResults({});
  const {chartInputs} = useInput({})

  return (
    <div style={{ 
      display: 'flex', 
      height: '100%', 
      width: '100%' 
    }}>
      <div style={{ flex: '3.25', minWidth: 0 }}>
        <WaterfallChart setHoveredCategory={setHoveredCategory} />
      </div>
      <div style={{ flex: '1', 
        minWidth: '250px',
        height: '100%', 
        padding: '20px', 
        border: '1px solid #ccc', 
        overflowY: 'auto',
        boxSizing: 'border-box' ,
        marginLeft: '0.75rem'
        }}>
        <>
        {hoveredCategory && 
          <InfoDisplay
            category={hoveredCategory.xValue}
            categoryIndex={hoveredCategory.index}
            chartInputs={chartInputs}
            results={results}
          />
        }
        {!hoveredCategory &&
          <div className="category-contain">
            <p className="wfall-detail-title">Category Information</p>
            <p className="wfall-detail-subtitle">Hover over the chart for more detail</p>
          </div>
        }
        </>
      </div>
    </div>
  );
};

export default WaterfallComponent;

function CategoryCard({ level, title, weight }) {
  function getClassName(level, element) {
    if (level === 0) {
      return "level0-" + element;
    } else if (level === 1) {
      return "level1-" + element;
    } else if (level === 2) {
      return "level2-" + element;
    } else if (level === 3) {
      return "level3-" + element;
    }
  }

  return (
    <div className="category-display-row">
      <p className={getClassName(level, "title")}>{title}</p>
      <p className={getClassName(level, "weight")}>{weight.toFixed(3)}</p>
    </div>
  );
}