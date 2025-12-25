const client = require('../database/Postgres.database.js');

const getVisits = (visit) => {
  return client.query(`select * from visitors`)
  .then((res) => {
    return res.rows;
      })
  .catch((err) => {console.log('err:', err)});
}

module.exports = getVisits