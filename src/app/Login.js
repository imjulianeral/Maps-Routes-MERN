import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }

    
    render() {
        return (
            <div>                
                <div className="container">
                    
                        <div className="row">
                            <div className="col s4"></div>
                            <form onSubmit className="card col s4">
                                <div className="row">
                                    <div className="row center-align">
                                        <i class="large material-icons light-blue-text text-darken-4">account_circle</i>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="text" id="name" name="name" className="validate"/>
                                        <label for="name">Nombre de Usuario</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="password" name="password" id="password"/>
                                        <label for="password">Contraseña</label>                                    
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