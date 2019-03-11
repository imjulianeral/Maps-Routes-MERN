const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./db');
const session = require('express-session');
const cors = require('cors');
const router = express.Router();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/camiones', require('./routes/camiones.routes'));
app.use('/usuarios', require('./routes/login.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// Starting Server
app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
});