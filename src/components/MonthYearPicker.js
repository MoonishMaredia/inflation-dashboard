import React, { useState } from 'react';
import './MonthYearPicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar} from '@fortawesome/free-solid-svg-icons';

const MonthYearPicker = ({ onDateChange, defaultDate, minDate, maxDate, pickerPosition }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(defaultDate);
    const [isSelected, setIsSelected] = useState(false)
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const handleMonthClick = (monthIndex) => {
      const newDate = new Date(selectedDate.getFullYear(), monthIndex, 1);
      if (newDate >= minDate && newDate <= maxDate) {
        setSelectedDate(newDate);
        setIsOpen(false);
        onDateChange(newDate);
        setIsSelected(true)
      }
    };

    function getPickerDropdownPosition(pickerPosition) {
        if(pickerPosition==="top") {
            return 'picker-dropdown-top'
        }
    }

    function getBorderStyling(isSelected) {
        if(!isSelected) {
            return 'picker-input-border'
        }
    }
  
    const handleYearChange = (year) => {
      const newDate = new Date(year, selectedDate.getMonth(), 1);
      if (newDate >= minDate && newDate <= maxDate) {
        setSelectedDate(newDate);
        onDateChange(newDate);
        setIsSelected(true)
      }
    };
  
    const incrementYear = () => handleYearChange(selectedDate.getFullYear() + 1);
    const decrementYear = () => handleYearChange(selectedDate.getFullYear() - 1);
  
    const toggleOpen = () => setIsOpen(!isOpen);
  
    return (
      <div className="month-year-picker">
        <div className={"picker-input " + getBorderStyling(isSelected)} onClick={toggleOpen}>
          {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          <FontAwesomeIcon className="plus-icon" icon={faCalendar} />
        </div>
        {isOpen && (
          <div className={"picker-dropdown " + getPickerDropdownPosition(pickerPosition)}>
            <div className="picker-header">
              <button onClick={decrementYear} disabled={selectedDate.getFullYear() <= minDate.getFullYear()}>‹</button>
              <span>{selectedDate.getFullYear()}</span>
              <button onClick={incrementYear} disabled={selectedDate.getFullYear() >= maxDate.getFullYear()}>›</button>
            </div>
            <div className="picker-months">
              {months.map((month, index) => {
                const monthDate = new Date(selectedDate.getFullYear(), index+1, 1);
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