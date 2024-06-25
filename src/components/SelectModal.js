import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import CategoryCard from './CategoryCard';

export default function SelectModal({handleModal}) {


    return (
        <div className="modal">
            <div className="modal-top">
                <p className="modal-header">Select series for chart</p>
                <FontAwesomeIcon className="x-icon" onClick={handleModal}icon={faX}/>
            </div>

            <div className="modal-category-table">
                <p>CPI Category</p>
                <p>% Weight in CPI</p>
            </div>

            <div>
                <CategoryCard
                    level={"0"}
                    title={"Overall CPI"}
                    weight={"100%"}
                />
                <CategoryCard
                    level={"1"}
                    title={"Food and Beverages"}
                    weight={"14.5%"}
                />
            </div>

            <div className="modal-footer">
                <div className="modal-footer-elements">
                    <div className="modal-selected-pills">
                        <p>Item</p>
                        <p>Item</p>
                        <p>Item</p>
                        <p>Item</p>
                        <p>Item</p>
                    </div>
                    <button onClick={handleModal}>Add Selected</button>
                </div>
            </div>
        </div>
    )
}