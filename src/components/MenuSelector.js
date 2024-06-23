
export default function MenuSelector({isCompare, toggleMenu}) {

    function getMenuItemClass(itemId) {
        if(itemId === "time-series") {
            return isCompare ? "unselected-menu-item" : "selected-menu-item"
        }

        if(itemId === "compare") {
            return isCompare ? "selected-menu-item" : "unselected-menu-item"
        }
    }

    return(
        <div className="menu-selector">
            <h3 className={getMenuItemClass('time-series')} onClick={toggleMenu}>Time Series</h3>
            <h3 className={getMenuItemClass('compare')} onClick={toggleMenu}>Compare</h3>
        </div>
    )
}