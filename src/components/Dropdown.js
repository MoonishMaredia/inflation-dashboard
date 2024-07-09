import { useEffect, useState } from 'react';
import Select from 'react-select';


function getStyles(isDropdownSet) {
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          textAlign:'left',
          fontSize:'16px',    
          // border: '2px solid black',  
          backgroundColor: isDropdownSet ? 'rgb(248 250 252)' : 'rgb(248 250 252)',
          border: isDropdownSet ? '2px solid black' : '2px solid red',
          boxShadow: state.isFocused ? 'none' : 'none',
          // '&:hover': {
          //   border: '2px solid black'
          // },
        }),
        placeholder: (provided) => ({
          ...provided,
          textAlign:'left',
          color: 'black'  // Color indicating that it needs to be filled
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          // backgroundColor: 'black'  // Color of the indicator separator
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          // color: 'black',  // Color of the dropdown arrow
          '&:hover': {
              color: 'black'
            },
        }),
        option: (provided) => ({
          ...provided,
          textAlign: 'left',
          fontWeight:'400',
          fontSize: '16px'  // Set the font size of the options
        })
      }
    return customStyles
};

export default function Dropdown({ placeholderText, optionsArr, stateVar, setStateVar, menuPlacement="bottom"}) {
  
  const [isDropdownSet, setDropdown] = useState(stateVar ? true : false);

  const handleSelection = (selectedOption) => {
    setStateVar(selectedOption);
    setDropdown(true)
  };

  return (
        <Select 
          value={stateVar}
          onChange={handleSelection} 
          options={optionsArr}
          placeholder={placeholderText}
          styles={getStyles(isDropdownSet)}
          menuPlacement={menuPlacement}
        />
  );
}