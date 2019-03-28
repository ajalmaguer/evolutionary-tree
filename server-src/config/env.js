require('dotenv').config();

module.exports.PORT = process.env.PORT || 4200;
module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/evolutionary-tree';
