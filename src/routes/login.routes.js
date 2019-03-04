const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserSession = require('../models/userSession');

router.get('/', async(req, res) => {
    const usuarios = await User.find();
    res.json({
        usuarios
    });
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


router.get('/logout', async(req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: { isDeleted: true }
    }, null, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message:'Error: Server error'
            });
        }
            
        return res.send({
            success: true,
            message:'Ha cerrado la sesión'
        });                
             
    });
});

router.get('/verificar', async(req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message:'Error: Server error'
            });
        }

        if (sessions.length != 1) {
            return res.send({
                success: false,
                message:'Error: No ha iniciado sesión'
            });
        } else {
            return res.send({
                success: true,
                message:'Ha iniciado sesión'
            });                
        }        
    });
});

router.post('/signin', async(req, res, next) => {
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

    User.find({ email }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message:'Error: Server error'
            });
        }else if (users.length != 1) {
            return res.send({
                success: false,
                message:'Error: El usuario no existe'
            });
        }

        const user = users[0];
        if (!user.checkPassword(password)) {
            return res.send({
                success: false,
                message:'Error: Contraseña invalida'
            });
        }

        const userSession = new UserSession();
        userSession.userID = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message:'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message:'Inicio de sesión correcto',
                token: doc._id
            });
        });
    });
});

module.exports = router;