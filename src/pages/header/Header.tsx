import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.css';
import { FiMenu } from "react-icons/fi";

const Header: FC = () => {
    return (
        <header>
            <div className='header-inner'>
                <div className='header-menu'>
                    <button>
                        <FiMenu />
                    </button>
                </div>

                <div className='header-logo'>
                    <Link to="/" className="logo">
                        <img src="/src/assets/soulstorm.ico" alt="" />
                    </Link>
                </div>

                <div className='header-nav'>
                    <nav>
                        <ul className='ul-main'>
                            <li>
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li className='dropdown'>
                                <NavLink to='/decider'>
                                    Десайдер<span className="expand-arrow"></span>
                                </NavLink>
                                <ul className='dropdown-content'>
                                    <li><NavLink to='/decider/list'>Список</NavLink></li>
                                    <li><NavLink to='/decider/editor'>Создать</NavLink></li>
                                    <li><NavLink to='/decider/option3'>Option 3</NavLink></li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to='/webosocket'>WSTest</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>HUI</NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>TORNADO</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='header-button'>
                    <button>
                        <span>DOWSTATS</span>
                    </button>
                    <button>
                        <span>DISCORD</span>
                    </button>
                    <button>
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
