const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const getGalleryFromCloudinary = async () => {

  try {
      const result = await cloudinary.api.resources({ cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API,
      api_secret: process.env.CLOUD_SECRET_API,
      public_ids: ['FABIO/oils'],
      max_results: 25
    });
      let gallery = [];
      result.resources.forEach((img) => {
        gallery.push(img.url);
      });
      return gallery;
      } catch (error) {
      console.error('error:', error);
  }
};
getGalleryFromCloudinary()

module.exports = getGalleryFromCloudinary;