const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./db');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/camiones', require('./routes/camiones.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server
app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
});