const mongoose = require('mongoose');

const URI = 'mongodb+srv://jorge:jjalcs5x17798@cluster0-msfrl.mongodb.net/test?retryWrites=true';
mongoose.connect(URI, { useNewUrlParser: true })
        .then(db => console.log('DB Connected'))
        .catch(err => console.error(err));

module.exports = mongoose;