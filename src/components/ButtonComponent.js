import React, { useState } from 'react';

export default function ButtonComponent({ chartType, metric, fromDate, toDate, selectedSeries }){

  const [buttonHoverText, setButtonHoverText] = useState('');

  const isButtonEnabled = () => {
    if (chartType.value === 'time-series') {
      return (
        chartType &&
        metric &&
        fromDate &&
        toDate &&
        selectedSeries.length > 0
      );
    } else if (chartType.value === 'compare') {
      return chartType && fromDate && toDate;
    }
    return false;
  };

  const getHoverText = () => {
    if (chartType.value === 'time-series') {
      if (!chartType) return 'Please select a chart type.';
      if (!metric) return 'Please select a metric.';
      if (!fromDate) return 'Please select a from date.';
      if (!toDate) return 'Please select a to date.';
      if (selectedSeries.length === 0) return 'Please select at least one series.';
    } else if (chartType.value === 'compare') {
      if (!chartType) return 'Please select a chart type.';
      if (!fromDate) return 'Please select a from date.';
      if (!toDate) return 'Please select a to date.';
    }
    return '';
  };

  console.log(buttonHoverText)

  const handleMouseEnter = () => {
    if (!isButtonEnabled()) {
      setButtonHoverText(getHoverText());
    }
  };

  const handleMouseLeave = () => {
    setButtonHoverText('');
  };

  return (
    <div className="button-component">
      <button
        disabled={!isButtonEnabled()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: !isButtonEnabled() ? 'not-allowed' : 'pointer' }}
        className="generate-chart-btn">
        Generate Chart
      </button>
      {!isButtonEnabled() && (
        <div className="hover-text">
          {buttonHoverText}
        </div>
      )}
    </div>
  );
};