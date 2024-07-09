import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { seriesData } from '../optionsData';
import { seriesObj } from '../optionsData'
import CategoryCard from './CategoryCard';
import SelectedPill from './SelectedPill';

export default function SelectSeries({selectedSeries, handleCheck}) {

    const [openMenu, setOpenMenu] = useState(false)

    function getBorderStyling() {
        if(selectedSeries.length === 0) {
            return 'series-select-pending'
        }
    }

    return (
        <div className="series-btn-layout">
            <button onClick={()=>setOpenMenu(prev=>!prev)} className={"add-series-btn " + getBorderStyling()}>
            <FontAwesomeIcon className="plus-icon" icon={faPlus} />
            <span className="selected-pill">{selectedSeries.length > 0 ? selectedSeries.length + " categories selected": "Select CPI categories for chart"}</span>
            </button>
            {openMenu &&
                <>
                <div className="modal-category-table">
                    <p>CPI Category</p>
                    <p>% Weight in CPI</p>
                </div>

                    <div className="modal-content">
                        {seriesData.map((series,index)=> {
                            return <CategoryCard
                                key={index}
                                level={series.level}
                                series_id={series.series_id}
                                title={series.series}
                                weight={series.weight}
                                handleCheck={handleCheck}
                                isChecked={selectedSeries.includes(series.series_id)}
                            />
                        })}
                    </div>

                    {/* <div className="modal-footer">
                        <div className="modal-footer-elements">
                            <div className="modal-selected-pills">
                                {selectedSeries.map((id, index)=>{
                                    return <SelectedPill
                                        key={index}
                                        series_desc={seriesObj[id].series}
                                    />
                                })
                                }
                            </div>
                        </div>
                    </div> */}
                    </>
                }
            </div>
    )
}

{/* <div className="modal-category-table">
<p>CPI Category</p>
<p>% Weight in CPI</p>
</div>

<div className="modal-content">
{seriesData.map((series,index)=> {
    return <CategoryCard
        key={index}
        level={series.level}
        series_id={series.series_id}
        title={series.series}
        weight={series.weight}
        handleCheck={handleCheck}
        isChecked={selectedSeries.includes(series.series_id)}
    />
})}
</div>

<div className="modal-footer">
<div className="modal-footer-elements">
    <div className="modal-selected-pills">
        {selectedSeries.map((id, index)=>{
            return <SelectedPill
                key={index}
                series_desc={seriesObj[id].series}
            />
        })
        }
    </div>
    <button className="add-series-modal-btn" onClick={handleModal}>Add Series</button>
</div>
</div> */}