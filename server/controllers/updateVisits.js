const client = require('../database/Postgres.database.js');

const updateVisits = (visit) => {
  const flagQuery = `select * from visitors where ip=$1`;
  const flagValues = [visit.ip];
  client.query(flagQuery, flagValues)
    .then((res) => {
      let noEntry = res.rows == false;
      if (noEntry) {
        const insertQuery = `insert into visitors (ip, country, city, lat, long, first_visit, last_visit, session_time, pages)
          values($1, $2, $3, $4, $5, $6, $7, $8, ARRAY[$9])`;
        const insertValues = [visit.ip, visit.country, visit.city, visit.lat, visit.long, visit.date, visit.date, visit['session_time'], `0: ["{${Object.keys(visit.pages)}}", time: ${visit['session_time']}], visit_date: ${visit.date}]`]
        client.query(insertQuery, insertValues)
      } else {
        const countQuery = `select sum (visit_count) from visitors where ip=$1`;
        const countValues = [visit.ip]
        client.query(countQuery, countValues).then((res) => {
          let count = res['rows'][0]['sum'];
          const updateQuery = `update visitors set
          visit_count=visit_count+1,
          last_visit=$2,
          session_time=$3,
          pages=array_append(pages, $4)
          where ip=$1`;
          const updateValues = [visit.ip, visit.date, visit['session_time'], `${count}: ["{${Object.keys(visit.pages)}}", session_time: ${visit['session_time']}, visit_date: ${visit.date}]`]
          console.log(updateValues[3])
          client.query(updateQuery, updateValues)
        })
      }
    })
}

module.exports = updateVisits;