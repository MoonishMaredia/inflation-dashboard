

export default function CategoryCard({level, title, weight}) {

    console.log(level, title, weight)


    function getClassName(level, element) {
        if(level==="0") {
            return "level0-" + element
        } else if(level==="1"){
            return "level1-" + element
        } else if(level==="2") {
            return "level2-" + element
        } else if(level==="3") {
            return "level3-" + element
        }
    }

    return(
        <div className="modal-card">
            <div className="modal-card-checkbox">
                <input type="checkbox"/>
                <p className={getClassName(level, "title")}>{title}</p>
            </div>
            <p className={getClassName(level, "weight")}>{weight}</p>
        </div>
    )
}