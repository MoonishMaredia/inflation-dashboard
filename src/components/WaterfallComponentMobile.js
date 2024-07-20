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

  const handleClick = (data, index) => {
    if (data) {
      setClickedCategory({ index, xValue: data.name });
    }
  };


  return (
    <ResponsiveContainer width="100%" height="100%" className="custom-label">
      <BarChart data={data} layout="vertical" margin={{ left: 26, right: 15, top: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
        type="number" 
        tick={{ fontSize: 10 }}/>
        <YAxis 
        type="category" 
        dataKey="name" 
        tick={{ fontSize: 10 }}
        />
        <Bar dataKey="previousValue" stackId="a" fill="transparent" onClick={(data, index) => handleClick(data, index)}/>
        <Bar dataKey="value" stackId="a" onClick={(data, index) => handleClick(data, index)}>
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList 
                dataKey="value" 
                position="right" 
                formatter={(value) => `${value.toFixed(1)}`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

function InfoDisplay({ category, categoryIndex, chartInputs, results }) {
  const categoryKeys = (category && categoryIndex !== 0 && categoryIndex !== 9) ? Object.keys(results['compare']['details'][category]) : null;
  const subResults = (category && categoryIndex !== 0 && categoryIndex !== 9) ? results['compare']['details'][category] : null;
  const categoryString = !category ? "Category Information" : categoryIndex === 0 ? "Series Start" : categoryIndex !== 9 ? "Series End" : category;

  return (
    <div>
      <div className="">
        {categoryKeys && categoryIndex !== 0 && categoryIndex !== 9 &&
          <>
            <div className='category-display-header'>
              <p>Total Contributing Change</p>
              <p>{results['compare']['y-axis'][categoryIndex].toFixed(1)}</p>
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
            <p className="display-explain">Price level indexed to 100 for your series start date. <br></br><br></br>Each bar describes how much that category contributed to the total change in CPI between time periods, accounting for both its importance and level change</p>
          </div>
        }
        {categoryIndex === 9 &&
          <p className="display-explain">CPI index {results['compare']['y-axis'][9] - 100 > 0 ? "increased" : "decreased"} by ~{Math.abs((results['compare']['y-axis'][9] - 100).toFixed(0))}% between {stringToMonth[chartInputs['compare'].monthStart]}, {chartInputs['compare'].yearStart} and {stringToMonth[chartInputs['compare'].monthEnd]}, {chartInputs['compare'].yearEnd}</p>
        }
      </div>
    </div>
  );
};

function Modal({ show, onClose, children, title }) {
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal-backdrop" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div className="modal-content" style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <p className="wfall-detail-title">{title}</p>
            <button onClick={onClose} className="modal-close-button">Close</button>
          </div>
          {children}
        </div>
      </div>
    );
  }

const WaterfallComponent = () => {
    const [clickedCategory, setClickedCategory] = useState(null);
    const { results } = useResults({});
    const { chartInputs } = useInput({});
  
    const handleCloseModal = () => {
      setClickedCategory(null);
    };

    const getCategoryString = (category, categoryIndex) => {
        if (!category) return "Category Information";
        if (categoryIndex === 0) return "Series Start";
        if (categoryIndex === results['compare']['x-axis'].length - 1) return "Series End";
        return category;
      };
  
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
      }}>
        <h4 className="wfall-chart-title">Contribution to CPI By Category</h4>
        <h4 className="wfall-chart-subtitle">Click on bars for more detail</h4>
        <div style={{ flex: '1', minWidth: 0 }}>
          <WaterfallChart setClickedCategory={setClickedCategory} />
        </div>
        <Modal 
        show={clickedCategory !== null} 
        onClose={handleCloseModal} 
        title={clickedCategory ? getCategoryString(clickedCategory.xValue, clickedCategory.index) : ""}>
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
      <p className={getClassName(level, "weight")}>{weight.toFixed(1)}</p>
    </div>
  );
}
