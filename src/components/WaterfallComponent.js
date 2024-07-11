import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { useResults } from "./ResultsContext"
import { useInput } from './InputContext';
import {stringToMonth} from '../optionsData'


const WaterfallChart = ({ setHoveredCategory }) => {
    
    const {chartInputs } = useInput({})
    const {results} = useResults({})
    
    const x = [`CPI ${stringToMonth[chartInputs['compare'].monthStart]}, ${chartInputs['compare'].yearStart}`, 
                    ...results['compare']['x-axis'], 
                    `CPI ${stringToMonth[chartInputs['compare'].monthEnd]}, ${chartInputs['compare'].yearEnd}`]

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
    title: 'Drivers of CPI by Category ',
    xaxis: { 
    //   title: 'CPI Category',
      tickfont: {
        size: 13,  // Adjust this value to change the font size
      },
      tickangle: 0,  // This will angle the labels if they're too long
      tickvals: x,
      ticktext: x.map(label => label.replace(/ /g, '<br>')),  // Replace spaces with line breaks
      automargin: true  // This helps to ensure all labels are visible
    },
    yaxis: { 
      title: 'CPI Index', 
      automargin: true  // This helps to ensure all labels are visible
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
      style={{ width: '100%', 
        height: '100%',
        border: '1px solid black'}}
      useResizeHandler={true}
      onHover={(data) => {
        if (data.points.length > 0) {
          setHoveredCategory(data.points[0].x);
        }
      }}
      onUnhover={() => setHoveredCategory(null)}
    />
  );
};

function InfoDisplay({category, results }) {

  console.log("I am here")
  console.log(results)
  console.log(category)
  const categoryKeys = category ? Object.keys(results['compare']['details'][category]) : null
  const subResults = category ? results['compare']['details'][category] : null

  console.log("Category Keys:", categoryKeys)
  console.log("Subresults:", subResults)

  return (
    <div style={{ 
      height: '100%', 
      padding: '20px', 
      border: '1px solid #ccc', 
      overflowY: 'auto',
      boxSizing: 'border-box'
    }}>
      <h3>{category || 'Category Information'}</h3>
      {<div className="modal-content">
        {categoryKeys && 
        
        categoryKeys.map((key,index)=> {
            return <CategoryCard
                level={subResults[key]['level']}
                title={key}
                weight={subResults[key]['value']}
            />
        })}
        </div>}
    </div>
  );
};

const WaterfallComponent = () => {

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const {results} = useResults({})

  return (
    <div style={{ 
      display: 'flex', 
      height: '100%', 
      width: '100%'
    }}>
      <div style={{ flex: '3', minWidth: 0 }}>
        <WaterfallChart setHoveredCategory={setHoveredCategory} />
      </div>
      <div style={{ flex: '1', minWidth: '250px' }}>
        <InfoDisplay
            category={hoveredCategory} 
            results={results}/>
      </div>
    </div>
  );
};

export default WaterfallComponent;


function CategoryCard({level, title, weight}) {

    function getClassName(level, element) {
        if(level===0) {
            return "level0-" + element
        } else if(level===1){
            return "level1-" + element
        } else if(level===2) {
            return "level2-" + element
        } else if(level===3) {
            return "level3-" + element
        }
    }

    return(
        <div className="modal-card">
            <div className="modal-card-checkbox">
                <p className={getClassName(level, "title")}>{title}</p>
            </div>
            <p className={getClassName(level, "weight")}>{weight}</p>
        </div>
    )
}