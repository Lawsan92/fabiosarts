const express = require('express');
const router = express.Router();
const updateVisits = require('../controllers/updateVisits.js');
const getVisits = require('../controllers/getVisits.js');

//--------------------MIDDLEWARE--------------------*/
router.use((req, res, next) => {
  req.method === 'POST' && console.log('-POST /visits', '@', new Date);
  req.method === 'GET' && console.log('-GET /visits', '@', new Date);
  next();
});

//--------------------ROUTES--------------------*/
router
  .route('/')
  .post((req, res) => { try {
    console.log('req.body:', req.body)
     if (JSON.stringify(req.body) == '{}') {
      res.send('404, FAILED TP UPDATE \'{}\'')
      return '404 NO DATA FOUND: \'{\''
    };
    updateVisits(req.body)
    res.send('200, VISITS UPDATED')
  } catch (error) {
      res.send(console.error())
  } })
  .get((req, res) => {
    try {
     getVisits().then((data) => {res.send({visits: data})})
    } catch (error) {
      res.send(console.error())
    }
  })

module.exports = router;