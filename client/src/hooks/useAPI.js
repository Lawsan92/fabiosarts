import React, { useState , useEffect, useRef } from 'react';
const axios = require('axios');

const useAPI = (exhibits) => {
  const [gallery, getGallery] = useState([]);
  const galleryRef = useRef([]);

  const fetchGallery = () => {
    axios({
      url: `/cloudinary/?exhibit=${exhibits.exhibit}`,
      method: 'get',
    })
      .then((response) => {
        console.log('response:', response);
        galleryRef.current = response.data.data;
        getGallery(response.data.data)
      })
      .catch((err) => {
        console.log('error:', err.stack)
      })
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return galleryRef.current;

};

export default useAPI;