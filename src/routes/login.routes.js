const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/registrar', async(req, res, next) => {

});


router.post('/registrar', (req, res, next) => {
    const { body } = req;
    const { password, name, type } = body;
    let { email } = body;

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: email no puede estar vacio'
        });
    } 
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: contraseña no puede estar vacio'
        });
    } 
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: nombre no puede estar vacio'
        });
    } 
    if (!type) {
        return res.send({
            success: false,
            message: 'Error: tipo no puede estar vacio'
        });
    }

    email.trim();

    User.find({ email }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message:'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message:'Error: El correo ya ha sido registrado en el sistema'
            });
        }

        const newUser = new User();
        newUser.email = email;
        newUser.name = name;
        newUser.type = type;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message:'Error: Server error'
                });
            }

            return res.send({
                success: true,
                message:'Usuario registrado'
            });
        })
    })
});


router.get('/signin', async(req, res, next) => {

});


router.post('/signin', async(req, res, next) => {
    
});

module.exports = router;