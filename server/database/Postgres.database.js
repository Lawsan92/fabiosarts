const { Client } = require('pg');
const config = require('../config/db.conf.js');

const client = new Client(config);

client
  .connect()
  .then(() => {console.log('connected to postgres database: portfolio')})
  .catch((err) => {
    err = err.stack.toString();
    const endOfErr = err.search(/\bexist\b/);
    console.log('Postgres DB connection error:', err.slice(0, endOfErr + 5));
  });

module.exports = client;