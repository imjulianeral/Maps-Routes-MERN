import React, { Component } from 'react';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            placas: '',
            partida: '',
            destino: '',
            fecha: '',
            entrada: '',
            salida: '',
            _id: '',
            camiones: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addCamion = this.addCamion.bind(this);
    }

    addCamion(e) {
        if (this.state._id) {
            fetch(`/camiones/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
              .then(res => res.json())
              .then(data => {
                M.toast({ html: data.status });
                this.setState({ 
                    placas: '',
                    partida: '',
                    destino: '',
                    fecha: '',
                    entrada: '',
                    salida: '',
                    _id: ''
                  });
                this.fetchCamiones();
              })
              .catch(err => console.log(err));
        }else {
            fetch('/camiones', {
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
                      placas: '',
                      partida: '',
                      destino: '',
                      fecha: '',
                      entrada: '',
                      salida: '',
                    });
                  this.fetchCamiones();
              })
              .catch(err => console.log(err));
        }

        e.preventDefault();
    }

    fetchCamiones() {
        fetch('/camiones')
            .then(res => res.json())
            .then(data => {
                this.setState({camiones: data.camiones});
            })
            .catch(err => console.log(err))
    }

    deleteCamion(id) {
        if (confirm('¿Estas seguro de querer eliminar este camión?')) {
            fetch(`/camiones/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
             .then(res => res.json())
             .then(data => {
                M.toast({ html: data.status });            
                this.fetchCamiones();
             })
             .catch(err => console.log(err));
        } 
    }

    editCamion(id) {
        fetch(`/camiones/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    placas: data.camion.placas,
                    partida: data.camion.partida,
                    destino: data.camion.destino,
                    fecha: data.camion.fecha,
                    entrada: data.camion.entrada,
                    salida: data.camion.salida,
                    _id: data.camion._id
                });
            })
            .catch(err => console.log(err));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }    

    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                
                <div className="container">
                    <div className="row">
                        <div className="col s4 card hoverable">
                            <form onSubmit>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="text" name="name" id="name"/>
                                        <label for="name">Nombre</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="email" id="email" name="email"/>                                    
                                        <label for="email">Correo</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="password" id="password" name="password"/>                                    
                                        <label for="password">Contraseña</label>
                                    </div>
                                    <div className="row center-align">
                                        <button type="submit" className="btn light-blue darken-4">{(this.state._id)?'Actualizar':'Agregar'}</button>                                
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
                                    this.state.camiones.map(camion => {
                                        return (
                                            <tr key={camion._id}>
                                                <td>{camion.placas}</td>
                                                <td>{camion.fecha}</td>
                                                <td>
                                                    <button className="btn yellow accent-2" style={{margin:'5px'}} onClick={() => this.editCamion(camion._id)}>
                                                        <i className="material-icons" style={{color: '#000'}}>edit</i>
                                                    </button>
                                                    <button className="btn red accent-4"  style={{margin:'5px'}} onClick={() => this.deleteCamion(camion._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button className="btn green accent-4" style={{margin:'5px'}} onClick={() => this.maps(camion.partida, camion.destino)}>
                                                        <i className="material-icons">map</i>
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