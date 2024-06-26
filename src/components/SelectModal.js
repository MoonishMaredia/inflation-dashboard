import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import CategoryCard from './CategoryCard';
import { seriesData } from '../optionsData';
import { seriesObj } from '../optionsData'
import SelectedPill from './SelectedPill';

export default function SelectModal({handleModal, selectedSeries, handleCheck}) {

    // console.log(selectedSeries)

    return (
        <div className="modal">
            <div className="modal-top">
                <FontAwesomeIcon className="x-icon" onClick={handleModal}icon={faX}/>
            </div>

            <div className="modal-category-table">
                <p>CPI Category</p>
                <p>% Weight in CPI</p>
            </div>

            <div className="modal-content">
                {seriesData.map((series,index)=> {
                    return <CategoryCard
                        id={index}
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
                        {selectedSeries.map(id=>{
                            return <SelectedPill
                                series_desc={seriesObj[id].series}
                            />
                        })
                        }
                    </div>
                    <button className="add-series-modal-btn" onClick={handleModal}>Add Series</button>
                </div>
            </div>
        </div>
    )
}