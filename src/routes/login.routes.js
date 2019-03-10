const express = require('express');
const router = express.Router();
const User = require('../models/user');
const cors = require('cors');
const jwt = require('jsonwebtoken');


router.use(cors());

process.env.SECRET_KEY = 'mysecret';

router.post('/register', (req, res) => {
    const userData = {
        email: req.body.email,
        name: req.body.name,
        type: req.body.type,
        password: req.body.password
    };

    User.findOne({ email: userData.email })
        .then(user => {
            if (!user) {
                const newUser = new User();
                userData.password = newUser.encryptPassword(userData.password);
                User.create(userData)
                    .then(user => {
                        res.json({status: 'Nuevo usuario creado'})
                    })
                    .catch(err => res.send(err));               
            } else {
                res.json({status: 'El correo ya ha sido registrado en el sistema'});
            }
        })
        .catch(err => res.send(err)); 
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                const userLogin = new User();
                userLogin.password = user.password;
                if (userLogin.checkPassword(req.body.password)) {
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        type: user.type,
                        email: user.email
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                    res.send(token);
                } else {
                    res.json({ status: 'La contraseña es incorrecta' });
                }
            } else {
                res.json({ status: 'El email es incorrecto' });
            }
        })
        .catch(err => res.send(err));
});

router.get('/profile', (req, res) => {
    let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    User.findOne({ _id: decoded._id })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.send('Usuario no existe');
            }
        })
        .catch(err => res.send(err));
})

router.get('/', async(req, res) => {
    const usuarios = await User.find();
    res.json({
        usuarios
    });
});

router.delete('/:id', async(req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'Usuario Eliminado'});
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return null;
    }
}

module.exports = router;