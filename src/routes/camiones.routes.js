const express = require('express');
const router = express.Router();
const Camiones = require('../models/camiones');

router.get('/', async(req, res) => {    
    const camiones = await Camiones.find();
    
    res.json({
        camiones
    });
});

router.get('/:id', async(req, res) => {
    const camion = await Camiones.findById(req.params.id);
    res.json({camion});
});


router.post('/', async(req, res) => {
    console.log(req.body);
    const { placas, partida, destino, fecha, entrada, salida, entradas } = req.body;
    const camion = new Camiones({ placas, partida, destino, fecha, entrada, salida, entradas });
    await camion.save();
    res.json({status: 'Camion Guardado'});
});

router.put('/:id', async(req, res) => {
    const { placas, partida, destino, fecha, entrada, salida, entradas } = req.body;
    const newCamion = { placas, partida, destino, fecha, entrada, salida, entradas };
    await Camiones.findByIdAndUpdate(req.params.id, newCamion);
    res.json({status: 'Camion Actualizado'});
});

router.delete('/:id', async(req, res) => {
    await Camiones.findByIdAndRemove(req.params.id);
    res.json({status: 'Camion Eliminado'});
});

router.delete('/', async(req, res) => {
    await Camiones.remove();
    res.json({status: 'todos los registros fueron eliminados'});
});


module.exports = router;
