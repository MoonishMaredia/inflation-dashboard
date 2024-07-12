import React, { useState } from 'react';
import './MonthYearPicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const MonthYearPicker = ({existingDate, onDateChange, defaultDate, minDate, setMinDate, maxDate, placeholderText, 
  dateType = "", pickerPosition="" }) => {
    
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(existingDate ? existingDate : defaultDate);
  const [isSelected, setIsSelected] = useState(existingDate ? true : false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthClick = (monthIndex) => {
    const newDate = new Date(selectedDate.getFullYear(), monthIndex, 1);
    if (newDate >= minDate && newDate <= maxDate) {
      setSelectedDate(newDate);
      if(dateType === "from") {
        setMinDate(newDate);
      }
      setIsOpen(false);
      onDateChange(newDate);
      setIsSelected(true);
    }
  };

  const getPickerDropdownPosition = (pickerPosition) => {
    return pickerPosition === 'top' ? 'picker-dropdown-top' : '';
  };

  const getBorderStyling = (isSelected) => {
    return !isSelected ? 'picker-input-border' : '';
  };

  const handleYearChange = (year) => {
    const newDate = new Date(year, selectedDate.getMonth(), 1);
    if (newDate >= minDate && newDate <= maxDate) {
      setSelectedDate(newDate);
      onDateChange(newDate);
      setIsSelected(true);
    }
  };

  const incrementYear = () => handleYearChange(selectedDate.getFullYear() + 1);
  const decrementYear = () => handleYearChange(selectedDate.getFullYear() - 1);
  const incrementYearByFive = () => handleYearChange(selectedDate.getFullYear() + 5);
  const decrementYearByFive = () => handleYearChange(selectedDate.getFullYear() - 5);

  const toggleOpen = () => {
    if(dateType === "from") {
      setMinDate(new Date(1999, 0, 1))
    }
    setIsOpen(!isOpen)};

  return (
    <div className="month-year-picker">
      <div className={"picker-input " + getBorderStyling(isSelected)} onClick={toggleOpen}>
        {isSelected ? `${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}` : placeholderText}
        <FontAwesomeIcon className="plus-icon" icon={faCalendar} />
      </div>
      {isOpen && (
        <div className={"picker-dropdown " + getPickerDropdownPosition(pickerPosition)}>
          <div className="picker-header">
            <button onClick={decrementYearByFive} disabled={selectedDate.getFullYear() - 5 < minDate.getFullYear()}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>
            <button onClick={decrementYear} disabled={selectedDate.getFullYear() <= minDate.getFullYear()}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <span>{selectedDate.getFullYear()}</span>
            <button onClick={incrementYear} disabled={selectedDate.getFullYear() >= maxDate.getFullYear()}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button onClick={incrementYearByFive} disabled={selectedDate.getFullYear() + 5 > maxDate.getFullYear()}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
          <div className="picker-months">
            {months.map((month, index) => {
              const monthDate = new Date(selectedDate.getFullYear(), index, 1);
              const isDisabled =
                (monthDate.getFullYear() === minDate.getFullYear() && monthDate < minDate) ||
                (monthDate.getFullYear() === maxDate.getFullYear() && monthDate > maxDate) ||
                (monthDate.getFullYear() < minDate.getFullYear()) ||
                (monthDate.getFullYear() > maxDate.getFullYear());
              return (
                <div
                  key={index}
                  onClick={() => !isDisabled && handleMonthClick(index)}
                  className={`month ${isDisabled ? 'disabled' : ''}`}
                >
                  {month}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthYearPicker;