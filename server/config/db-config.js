const mongoose = require('mongoose');
let User = require('../models/User');


module.exports = (settings) => {
    mongoose.connect(settings.db, { useNewUrlParser: true });
    let connection = mongoose.connection;

    connection.once('open', (err) => {
        if (err) {
            throw err;
        }
        User.seedAdminUser();
        console.log('MongoDb ready!');
    });
    connection.on('error', (err) => console.log('Database error: ' + err));
}