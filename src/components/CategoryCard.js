import {useState} from 'react'

export default function CategoryCard({level, title, series_id, weight, handleCheck, isChecked}) {

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

    // const[isChecked, setIsChecked] = useState(false)

    function handleChange() {
        // setIsChecked(!isChecked)
        handleCheck(series_id)
    }

    return(
        <div className="modal-card">
            <div className="modal-card-checkbox">
                <input 
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                    />
                <p className={getClassName(level, "title")}>{title}</p>
            </div>
            <p className={getClassName(level, "weight")}>{weight} %</p>
        </div>
    )
}