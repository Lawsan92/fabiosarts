const express = require('express');
const router = express.Router();

//--------------------CONTROLLERS--------------------*/
const getGalleryFromCloudinary = require('../controllers/getGalleryFromCloudinary.js');

//--------------------MIDDLEWARE--------------------*/
router.use((req, res, next) => {
  console.log('/grepFiles', '@', new Date);
  next();
})

//--------------------ROUTES--------------------*/
router
  .route('/')
  .get( async (req, res) => {
    try {
      await getGalleryFromCloudinary()
        .then((gallery) => {
          console.log('gallery:', gallery);
          res.send({data: gallery});
        })

    } catch(err) {
      throw err;
    }
  })

  module.exports = router;