import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header: FC = () => {
    return <header>
        <Link to="/">
            {/* <FaBtc size={20} /> */}
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
                    <NavLink to={'/kekw'}>Kekw</NavLink>
                </li>

            </ul>
        </nav>
        <button>
            <span>Log Out</span>
        </button>
    </header>
}

export default Header