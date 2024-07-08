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
                        <img src="/src/assets/256x256.png" alt="" />
                    </Link>
                </div>

                <div className='header-nav'>
                    <nav>
                        <ul className='ul-main'>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "active" : undefined
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className='dropdown'>
                                <NavLink
                                    to="/decider"
                                    className={({ isActive }) =>
                                        isActive ? "active" : undefined
                                    }
                                >
                                    Десайдер<span className="expand-arrow"></span>
                                </NavLink>
                                <ul className='dropdown-content'>
                                    <li>
                                        <NavLink
                                            to="/decider/list"
                                            className={({ isActive }) =>
                                                isActive ? "active" : undefined
                                            }
                                        >
                                            Список
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/decider/editor"
                                            className={({ isActive }) =>
                                                isActive ? "active" : undefined
                                            }
                                        >
                                            Создать
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/decider/option3"
                                            className={({ isActive }) =>
                                                isActive ? "active" : undefined
                                            }
                                        >
                                            Option 3
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink
                                    to="/webosocket"
                                    className={({ isActive }) =>
                                        isActive ? "active" : undefined
                                    }
                                >
                                    WSTest
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/hui"
                                    className={({ isActive }) =>
                                        isActive ? "active" : undefined
                                    }
                                >
                                    HUI
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/tornado"
                                    className={({ isActive }) =>
                                        isActive ? "active" : undefined
                                    }
                                >
                                    TORNADO
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='header-button'>
                    <a href="https://dowstats.ru/download.php">dowstats</a>
                    <a href="">discord</a>
                    <button>
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
