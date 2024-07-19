import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { useResults } from "./ResultsContext";
import { useInput } from './InputContext';
import { stringToMonth } from '../optionsData';

const WaterfallChart = ({ setClickedCategory }) => {
  const { chartInputs } = useInput({});
  const { results } = useResults({});

  const CustomLabel = ({ x, y, value }) => {
    return (
      <text x={x} y={y} dy={-4} fontSize="10" fill="#000" textAnchor="middle">
        {value.toFixed(2)}
      </text>
    );
  };

  const x = [
    `CPI ${stringToMonth[chartInputs['compare'].monthStart]}, ${chartInputs['compare'].yearStart}`,
    ...results['compare']['x-axis'],
    `CPI ${stringToMonth[chartInputs['compare'].monthEnd]}, ${chartInputs['compare'].yearEnd}`
  ];

  const y = [...results['compare']['y-axis']];

  // Transform data for waterfall
  let cumulativeValue = 0;
  const data = x.map((label, index) => {
    const previousValue = cumulativeValue;
    cumulativeValue += y[index];
    return {
      name: label,
      previousValue: index===y.length - 1 ? 0 : index===0 ? 0: previousValue,
      value: index===y.length - 1 ? y[index] : index===0 ? 100: y[index],
      cumulativeValue: cumulativeValue,
      color: index === 0 || index === y.length - 1 ? 'blue' : y[index] > 0 ? 'green' : 'red'
    };
  });

  const handleClick = (data) => {
    if (data) {
      const index = data.index;
      const xValue = data.value;
      setClickedCategory({ index, xValue });
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%" className="custom-label">
      <BarChart data={data} layout="vertical" margin={{ left: 15, right: 25, top: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
        type="number" 
        tick={{ fontSize: 10 }}/>
        <YAxis 
        type="category" 
        dataKey="name" 
        tick={{ fontSize: 10 }}
        />
        <Tooltip />
        <Bar dataKey="previousValue" stackId="a" fill="transparent" />
        <Bar dataKey="value" stackId="a" onClick={(data) => handleClick(data)}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <LabelList 
          dataKey="value" position="right" formatter={(value) => `${value.toFixed(1)}`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

function InfoDisplay({ category, categoryIndex, chartInputs, results }) {
  const categoryKeys = (category && categoryIndex !== 0 && categoryIndex !== results['compare']['x-axis'].length - 1) ? Object.keys(results['compare']['details'][category]) : null;
  const subResults = (category && categoryIndex !== 0 && categoryIndex !== results['compare']['x-axis'].length - 1) ? results['compare']['details'][category] : null;
  const categoryString = !category ? "Category Information" : categoryIndex === 0 ? "Series Start" : categoryIndex === results['compare']['x-axis'].length - 1 ? "Series End" : category;

  return (
    <div>
      <div className="">
        <p className="wfall-detail-title">{categoryString}</p>
        {categoryKeys && categoryIndex !== 0 && categoryIndex !== results['compare']['x-axis'].length - 1 &&
          <>
            <div className='category-display-header'>
              <p>Total Contributing Change</p>
              <p>{results['compare']['y-axis'][categoryIndex].toFixed(3)}</p>
            </div>
            {categoryKeys.map((key, index) => {
              return (
                <CategoryCard
                  key={index}
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
        {categoryIndex === results['compare']['x-axis'].length - 1 &&
          <p className="display-explain">CPI index {results['compare']['y-axis'][results['compare']['x-axis'].length - 1] - 100 > 0 ? "increased" : "decreased"} by ~{Math.abs((results['compare']['y-axis'][results['compare']['x-axis'].length - 1] - 100).toFixed(0))}% between {stringToMonth[chartInputs['compare'].monthStart]}, {chartInputs['compare'].yearStart} and {stringToMonth[chartInputs['compare'].monthEnd]}, {chartInputs['compare'].yearEnd}</p>
        }
      </div>
    </div>
  );
};

function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">Close</button>
        {children}
      </div>
    </div>
  );
}

const WaterfallComponent = () => {
  const [clickedCategory, setClickedCategory] = useState(null);
  const { results } = useResults({});
  const { chartInputs } = useInput({});

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%'
    }}>
      <div style={{ flex: '1', minWidth: 0 }}>
        <WaterfallChart setClickedCategory={setClickedCategory} />
      </div>
      <Modal show={clickedCategory !== null} onClose={() => setClickedCategory(null)}>
        {clickedCategory &&
          <InfoDisplay
            category={clickedCategory.xValue}
            categoryIndex={clickedCategory.index}
            chartInputs={chartInputs}
            results={results}
          />
        }
      </Modal>

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
