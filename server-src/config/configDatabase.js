const mongoose = require('mongoose');
const config = require('./env');

mongoose.Promise = global.Promise;

const db = mongoose.connection;

console.log('connecting to MongoDB');

db.once('open', () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});


mongoose
    .connect(config.DATABASE_URL, { useNewUrlParser: true })
    .catch(err => console.log('Error Connecting to Mongo: \n\n', err));


module.exports = db;