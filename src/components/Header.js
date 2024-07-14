import flagLogo from '../assets/flag.svg'
import { updateData } from '../utils/api'

export default function Header({showOptions, setShowOptions}) {

    async function makeAPICall() {
        const inputRequest = {
            addDate: "2024-06-01",
            // weightTableUpdated: false
        }
        const result = await updateData(inputRequest)
        console.log(result)
    }

    return (
        <div className="header-layout">
            <div className="header">
                <img className="header-logo" src={flagLogo}></img>
                <p>US CPI Inflation Dashboard</p>
                <button onClick={makeAPICall}> Test For Data Update</button>
            </div>
        </div>
    )
}