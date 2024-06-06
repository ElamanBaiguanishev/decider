import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './header.css'
import { GiWarhammer } from "react-icons/gi";


const Header: FC = () => {
    return <header>
        <Link to="/" className="logo">
            <GiWarhammer />
        </Link>
        <nav>
            <ul>
                <li>
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/decider'}>Deciders</NavLink>
                </li>
                <li>
                    <NavLink to={'/webosocket'}>WSTest</NavLink>
                </li>
            </ul>
        </nav>
        <button>
            <span>Log Out</span>
        </button>

    </header>
}

export default Header
