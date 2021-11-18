const mongoose = require('mongoose');
const config = require('../config/config');

const connectToMongo = async () => {

    mongoose.connect(config.mongoUri, () => {
        console.log("Connected to Mongo Successfully");
    });

    mongoose.connection.on('error', () => {
        throw new Error(`Unable to connect to database: ${config.mongoUri}`)
    });
}

module.exports = connectToMongo;