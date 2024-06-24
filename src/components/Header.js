import flagLogo from '../assets/flag.svg'

export default function Header() {


    return (
        <div className="header">
            <img className="header-logo" src={flagLogo}></img>
            <p>US CPI Inflation Dashboard</p>
        </div>
    )
}