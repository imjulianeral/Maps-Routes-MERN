const mongoose = require('mongoose');

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// DB
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/raee';
} else {
    urlDB = process.env.MONGO_URI;
}

mongoose.connect(urlDB, { useNewUrlParser: true })
        .then(db => console.log('DB Connected ' + process.env.NODE_ENV))
        .catch(err => console.error(err));

module.exports = mongoose;
