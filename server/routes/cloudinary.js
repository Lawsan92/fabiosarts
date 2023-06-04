const express = require('express');
const router = express.Router();

//--------------------CONTROLLERS--------------------*/
const getGalleryFromCloudinary = require('../controllers/getGalleryFromCloudinary.js');

//--------------------MIDDLEWARE--------------------*/
router.use((req, res, next) => {
  console.log('/cloudinary', 'w/', req.query, '@', new Date);
  next();
})

router.use(express.json())

//--------------------ROUTES--------------------*/
router
  .route('/')
  .get( async (req, res) => {
    try {
      await getGalleryFromCloudinary(req.query)
        .then((gallery) => {
          // console.log('gallery:', gallery);
          res.send({data: gallery});
        })

    } catch(err) {
      throw err;
    }
  })

  module.exports = router;