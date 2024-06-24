
export default function ToggleSelector({isCompare, toggleMenu, toggleText1, toggleText2}) {

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
            <h3 className={getMenuItemClass('time-series')} onClick={toggleMenu}>{toggleText1}</h3>
            <h3 className={getMenuItemClass('compare')} onClick={toggleMenu}>{toggleText2}</h3>
        </div>
    )
}