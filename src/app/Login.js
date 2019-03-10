import React, { Component } from 'react';
import { login } from './loginFunction';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    logIn(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user)
            .then(res => {
                if (res) {
                    this.props.history.push('/camiones');
                }
            });
    }    

    render() {

        return (
            <div>                
                <div className="container">
                    
                        <div className="row">
                            <div className="col s4"></div>
                            <form onSubmit={this.logIn} className="card col s4">
                                <div className="row">
                                    <div className="row center-align">
                                        <i className="large material-icons light-blue-text text-darken-4">account_circle</i>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="text" id="email" name="email" className="validate" value={this.state.email} onChange={this.handleChange}/>
                                        <label htmlFor="email">Correo electrónico</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                                        <label htmlFor="password">Contraseña</label>                                    
                                    </div>
                                    <div className="row center-align">
                                        <button type="submit" className="btn light-blue darken-4">Login</button>                                     
                                    </div>
                                </div>
                            </form>
                            <div className="col s4"></div>
                        </div>  
                                      
                </div>
            </div>
        )
    }
  }
  
export default Login;