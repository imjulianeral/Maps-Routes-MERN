import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Nav from './Nav';

class Maps extends Component {
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
            camiones: [],
            type: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addCamion = this.addCamion.bind(this);
    }

    addCamion(e) {
        if (this.state._id) {
            fetch(`/api/camiones/${this.state._id}`, {
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
            fetch('/api/camiones', {
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
                      salida: ''
                    });
                  this.fetchCamiones();
              })
              .catch(err => console.log(err));
        }

        e.preventDefault();
    }

    fetchCamiones() {
        fetch('/api/camiones')
            .then(res => res.json())
            .then(data => {
                this.setState({camiones: data.camiones});
            })
            .catch(err => console.log(err))
    }

    deleteCamion(id) {
        if (confirm('¿Estas seguro de querer eliminar este camión?')) {
            fetch(`/api/camiones/${id}`, {
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

    deleteAll() {
        if (confirm('¿Estas seguro de querer eliminar TODOS los camiones?')) {
            fetch(`/api/camiones/`, {
                method: 'DELETE'
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
        fetch(`/api/camiones/${id}`)
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

    maps(origin, destiny) {
        const directionsDisplay = new google.maps.DirectionsRenderer();
        const directionsService = new google.maps.DirectionsService();

        let map;

        let partida = origin;
        let destino = destiny;
        let center = new google.maps.LatLng(101.53, 102.52);

        map =  new google.maps.Map(document.querySelector('.map'), {
            zoom: 17,
            center
        });

        directionsDisplay.setMap(map);

        let request = {
            origin: partida,
            destination: destino,
            travelMode: 'DRIVING'
        }

        directionsService.route(request, (res, status) => {
            if (status == "OK") {
                directionsDisplay.setDirections(res);
            }
        });
    }

    pickers() {
        // timepicker
        let timepicker = document.querySelectorAll('.timepicker');
        let time_init = M.Timepicker.init(timepicker);
        // datepicker
        let datepicker = document.querySelectorAll('.datepicker');
        let date_init = M.Datepicker.init(datepicker, {
            format: 'dd/mm/yyyy',
            onSelect: function(time){
                let date =`${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
                this.setState({fecha: date})
            }.bind(this)
        });
    }

    componentDidMount() {
        this.pickers();
        this.fetchCamiones();
        const token = localStorage.usertoken;   
        const decoded = jwt_decode(token);
        
        this.setState({
            type: decoded.type
        });
        
    }
    render() {
        return (
            <div>
                <Nav type={this.state.type} />
                <div className="container">
                    <div className="card hoverable">
                        <form onSubmit={this.addCamion}>
                            <div className="row">
                                <div className="input-field col s2">
                                    <input type="text" name="placas" id="placas" onChange={this.handleChange} value={this.state.placas}/>
                                    <label htmlFor="placas">Placas</label>
                                </div>
                                <div className="input-field col s5">
                                    <input type="text" id="partida" name="partida" onChange={this.handleChange} value={this.state.partida} />                                    
                                    <label htmlFor="partida">Punto de Partida</label>
                                </div>
                                <div className="input-field col s5">
                                    <input type="text" id="destino" name="destino" onChange={this.handleChange} value={this.state.destino} />                                    
                                    <label htmlFor="destino">Destino</label>
                                </div>
                                <div className="input-field col s3">
                                    <input className="datepicker" type="text" placeholder="Fecha" name="fecha" onSelect={this.handleChange} value={this.state.fecha} />                                    
                                </div>
                                <div className="input-field col s2">
                                    <input className="timepicker" type="text" placeholder="Hora entrada" name="entrada" onSelect={this.handleChange} value={this.state.entrada} />                                    
                                </div>
                                <div className="input-field col s2">
                                    <input className="timepicker" type="text" placeholder="Hora salida" name="salida" onSelect={this.handleChange} value={this.state.salida} />                                    
                                </div>
                                <div className="row">
                                    <button type="submit" className="col s2 offset-s9 btn light-blue darken-4">{(this.state._id)?'Actualizar':'Agregar'}</button>                                
                                </div>
                            </div>
                        </form>
                    </div>                    
                    <hr/>
                    <div className="row">
                        <table className="col s8 centered">
                            <thead>
                                <tr>
                                    <th>Placas</th>
                                    <th>Fecha</th>
                                    <th>Tiempo</th>
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
                                                <td>{camion.entrada} - {camion.salida}</td>
                                                <td>
                                                    <button className="btn yellow accent-2" style={{margin:'5px'}} onClick={() => this.editCamion(camion._id)}>
                                                        <i className="material-icons" style={{color: '#000'}}>edit</i>
                                                    </button>
                                                    { 
                                                    this.state.type === 'ADMIN' ? 
                                                        <button className="btn red accent-4"  style={{margin:'5px'}} onClick={() => this.deleteCamion(camion._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    :
                                                        null 
                                                    }
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
                        <div className="card col s4 hoverable" style={{position:'sticky', top: '0'}}>
                            <h5>Mapa</h5>
                            <div style={{width: '100%', height: '300px', marginBottom: '10px'}} className="map"></div>                         
                            { 
                                this.state.type === 'ADMIN' ? 
                                    <button className="btn red accent-4"  style={{margin:'5px'}} onClick={() => this.deleteAll()}>
                                        Eliminar TODOS los camiones
                                    </button>
                                    :
                                null 
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  }
  
export default Maps;