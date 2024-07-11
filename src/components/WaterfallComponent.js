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
    if (index === 9) return 'total';
    return 'relative';
  });

  const data = [{
    type: 'waterfall',
    x: x,
    y: y,
    text: y.map(value => `${Math.abs(value)}`),
    textposition: 'outside',
    connector: {
      line: {
        color: 'rgb(63, 63, 63)'
      }
    },
    measure: types,
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

function InfoDisplay({ category, categoryIndex, results }) {

  const categoryKeys = (category && categoryIndex !== 0 && categoryIndex !== 9) ? Object.keys(results['compare']['details'][category]) : null;
  const subResults = (category && categoryIndex !== 0 && categoryIndex !== 9) ? results['compare']['details'][category] : null;
  const categoryString = !category ? "Category Information" : categoryIndex===0 ? "Series Start" : categoryIndex===9 ? "Series End" : category

  return (
    <div>
      <div className="modal-content">
        <p className="wfall-detail-title">
          {categoryString}
        </p>
        {categoryKeys && categoryIndex !== 0 && categoryIndex !== 9 && 
          categoryKeys.map((key, index) => {
            return (
              <CategoryCard
                level={subResults[key]['level']}
                title={key}
                weight={subResults[key]['value']}
              />
            );
          })}
        {categoryIndex === 0 && 
          <div>

          </div>
        }
        {categoryIndex === 9 && 
          <p>Something about end index here!</p>
        }
      </div>
    </div>
  );
};

const WaterfallComponent = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { results } = useResults({});

  return (
    <div style={{ 
      display: 'flex', 
      height: '100%', 
      width: '100%' 
    }}>
      <div style={{ flex: '3', minWidth: 0 }}>
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
            results={results}
          />
        }
        {!hoveredCategory &&
          <div className="category-contain">
            <p className="wfall-detail-title">Category Information</p>
            <p className="wfall-detail-subtitle">Hover over the chart for additional detail </p>
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
    <div className="modal-card">
      <div className="modal-card-checkbox">
        <p className={getClassName(level, "title")}>{title}</p>
      </div>
      <p className={getClassName(level, "weight")}>{weight}</p>
    </div>
  );
}