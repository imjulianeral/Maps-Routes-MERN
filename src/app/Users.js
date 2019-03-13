import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Nav from './Nav';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            type: '', 
            password: '',           
            usuarios: [],
            _id: '',
            typeJWT: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    fetchUsers() {
        fetch('/api/usuarios')
            .then(res => res.json())
            .then(data => {
                this.setState({usuarios: data.usuarios});
            })
            .catch(err => console.log(err))
    }    

    addUser(e) {
        fetch('/api/usuarios/register', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => {
              M.toast({ html: data.status });    
              this.setState({ 
                name: '',
                email: '',
                type: '', 
                password: ''
              });
              this.fetchUsers();
          })
          .catch(err => console.log(err));

          e.preventDefault();
    }

    deleteUser(id) {
        if (confirm('¿Estas seguro de querer eliminar este usuario?')) {
            fetch(`/api/usuarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
             .then(res => res.json())
             .then(data => {
                M.toast({ html: data.status });            
                this.fetchUsers();
             })
             .catch(err => console.log(err));
        } 
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    initSelect() {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
    }   

    decode() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            typeJWT: decoded.type
        });
    }

    componentDidMount() {
        this.fetchUsers();
        this.initSelect();
        this.decode();
    }
    render() {
        return (
            <div>
                <Nav type={this.state.typeJWT} />
                <div className="container">
                    <div className="row">
                        <div className="col s4 card hoverable">
                            <form onSubmit={this.addUser}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name}/>
                                        <label htmlFor="name">Nombre</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="email" id="email" name="email" onChange={this.handleChange} value={this.state.email}/>                                    
                                        <label htmlFor="email">Correo</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password}/>                                    
                                        <label htmlFor="password">Contraseña</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <select onChange={this.handleChange} value={this.state.type} name="type">
                                            <option value="" disabled defaultValue>Escoge un tipo de usuario</option>
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="EMPLEADO">EMPLEADO</option>
                                        </select>
                                        <label>Tipo de usuario</label>
                                    </div>
                                    <div className="row center-align">
                                        <button type="submit" className="btn light-blue darken-4">Agregar</button>                                
                                    </div>
                                </div>
                            </form>
                        </div>
                        <table className="col s8 centered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Tipo</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.usuarios.map(usuario => {
                                        return (
                                            <tr key={usuario._id}>
                                                <td>{usuario.name}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.type}</td>
                                                <td>
                                                    <button className="btn red accent-4"  style={{margin:'5px'}} onClick={() => this.deleteUser(usuario._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>  
                    </div>                  
                    <hr/>                        
                </div>
            </div>
        )
    }
  }
  
export default Users;