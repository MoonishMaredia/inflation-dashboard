import flagLogo from '../assets/flag.svg'
import { updateData } from '../utils/api'

export default function Header({showOptions, setShowOptions}) {


    return (
        <div className="header-layout">
            <div className="header">
                <img className="header-logo" src={flagLogo}></img>
                <p>US CPI Inflation Dashboard</p>
            </div>
        </div>
    )
}