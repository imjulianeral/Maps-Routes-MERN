import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="light-blue darken-4">
            <div className="container">
                <NavLink className="brand-logo" to={'/'}>RAEE</NavLink>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to={'/camiones'}>Camiones</NavLink></li>
                    <li><NavLink to={'/login'}>Login</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;
