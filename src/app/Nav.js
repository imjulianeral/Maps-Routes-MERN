import React, { Component } from 'react';
import { getFromStorage, setInStorage } from './utils/storage';
import { NavLink, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            type: ''
        };
        this.logOut = this.logOut.bind(this);
    }

    logOut (e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/login');  
    }

    showNav(type){
        const adminLink = (
            <div className="container"> 
            <NavLink className="brand-logo" to={'/'}>RAEE</NavLink>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to={'/camiones'}>Camiones</NavLink></li>
                    <li><NavLink to={'/usuarios'}>Usuarios</NavLink></li>
                    <li><NavLink to={'/login'} onClick={this.logOut}>Cerrar Sesión</NavLink></li>
                </ul>   
            </div>         
        );
        const employeeLink = (
                <div className="container">
                <NavLink className="brand-logo" to={'/'}>RAEE</NavLink>
                        <ul className="right hide-on-med-and-down">
                            <li><NavLink to={'/camiones'}>Camiones</NavLink></li>
                            <li><NavLink to={'/login'} onClick={this.logOut}>Cerrar Sesión</NavLink></li>
                        </ul>         
                </div>   
        );
        if (type === 'ADMIN') {
            return adminLink;
        } else {
            return employeeLink;
        }
    }


    render() {     
        return (
            
            <nav className="light-blue darken-4">
                
                { this.showNav(this.props.type) }  
                
            </nav>
        )
    }
}

export default withRouter(Nav)