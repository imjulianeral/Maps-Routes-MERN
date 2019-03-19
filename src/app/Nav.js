import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import logo from "./logo.png";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      type: ""
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/login");
  }

  tooltip() {
      let elems = document.querySelectorAll(".tooltipped");
      let instances = M.Tooltip.init(elems);
  }

  componentDidMount () {
      this.tooltip();
  }

  showNav(type) {
    const adminLink = (
      <div className="container">
        <NavLink className="brand-logo" to={"/camiones"}>
          <img src={logo} width="60px" />
        </NavLink>
        <ul className="right hide-on-med-and-down" >
          <li>
            <NavLink
              to={"/login"}
              onClick={this.logOut}
              className="waves-effect waves-light btn tooltipped"
              data-position="left"
              data-tooltip="Cerrar Sesión"
            >
                <i className="material-icons">person_pin</i>
            </NavLink>
          </li>            
          <li activeClassName="active">
            <NavLink to={"/camiones"}>Camiones</NavLink>
          </li>
          <li>
            <NavLink to={"/usuarios"}>Usuarios</NavLink>
          </li>          
        </ul>
      </div>
    );
    const employeeLink = (
      <div className="container">
        <NavLink className="brand-logo" to={"/camiones"}>
          <img src={logo} width="60px" />
        </NavLink>
        <ul className="right hide-on-med-and-down">
          <li>
            <NavLink
              to={"/login"}
              onClick={this.logOut}
              className="waves-effect waves-light btn tooltipped"
              data-position="right"
              data-tooltip="Cerrar Sesión"
            >
            <i className="material-icons">person_pin</i>
            </NavLink>
          </li>
        </ul>
      </div>
    );
    if (type === "ADMIN") {
      return adminLink;
    } else {
      return employeeLink;
    }
  }

  render() {
    return (
      <nav className="light-blue darken-4">{this.showNav(this.props.type)}</nav>
    );
  }
}

export default withRouter(Nav);
