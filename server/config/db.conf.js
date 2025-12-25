require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  port: 5432,
  database: 'fabiosarts',
  user: process.env.DB_USER
};

module.exports = config;