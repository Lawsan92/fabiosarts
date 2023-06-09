const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const getGalleryFromCloudinary = async (exhibit) => {
  let [prefix, gallery] = [null, []];

  let validExhibit;
  (validExhibit = () => {
    exhibit && console.log('exhibit:', exhibit.exhibit);
    exhibit ? prefix =  `FABIO/san francisco` : '';
    console.log('prefix:', prefix);
    }
  )();

  try {

    const options = { cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API,
      api_secret: process.env.CLOUD_SECRET_API,
      secure: true
    };

    cloudinary.config(options);

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: exhibit.exhibit === 'early works' ? prefix : `FABIO/${(exhibit.exhibit || '')}`,
      max_results: 25,
      context: true,
      ...options
    });

      result.resources.forEach((item) => {
        console.log(typeof item.context.custom.title, item.context.custom.title);
        let img = {
          url: item.url || '',
          title: (item.context && item.context.custom.title) ? item.context.custom.title : '',
          size: (item.context && item.context.custom.size) ? item.context.custom.size : '',
          type: (item.context && item.context.custom.type) ? item.context.custom.type : '',
          sold: (item.context && item.context.custom.sold) ? item.context.custom.sold : '',
        };
        gallery.push(img);
      });
      console.log('gallery:', gallery);
      return gallery;

      } catch (error) {
      console.error('error:', error);
  }
};
getGalleryFromCloudinary()

module.exports = getGalleryFromCloudinary;