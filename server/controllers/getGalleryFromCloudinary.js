const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const getGalleryFromCloudinary = async (exhibit) => {
  let prefix;
  exhibit && console.log('exhibit:', exhibit.exhibit);
  exhibit ? prefix =  `FABIO/san francisco` : '';
  console.log('prefix:', prefix);

  try {
      const result = await cloudinary.api.resources({ cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API,
      api_secret: process.env.CLOUD_SECRET_API,
      type: 'upload',
      prefix: exhibit.exhibit === 'early works' ? prefix : `FABIO/${(exhibit.exhibit || '')}`,
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