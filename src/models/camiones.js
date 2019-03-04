const mongoose = require('mongoose');
const { Schema } = mongoose;

const CamionesSchema = new Schema({
    placas: { type: String, required: true },
    partida: { type: String },
    destino: { type: String },
    fecha: { type: String },
    entrada: { type: String },
    salida: { type: String }
});

module.exports = mongoose.model('Camiones', CamionesSchema);

