import React, { useState , useEffect} from 'react';
import { animated } from '@react-spring/web';
import { headerSpring, gallerySpring } from './hooks/Springs.js';
const axios = require('axios');


const Gallery = ({ exhibits, selectExhibit, setMount }) => {

  const [gallery, getGallery] = useState([]);

  const fetchGallery = () => {
    axios({
      url: `/cloudinary/?exhibit=${exhibits.exhibit}`,
      method: 'get',
    })
      .then((response) => {
        console.log('response:', response);
        getGallery(response.data.data)
      })
      .catch((err) => {
        console.log('error:', err.stack)
      })
  }

  useEffect(() => {
    fetchGallery();
  }, [])

  const mapGallery = () => {
    return gallery.map((url) => {
      return <img className='gallery_img' src={url}/>
    });
  }

  return (
    <div className='gallery'>
      <animated.h1
      className='gallery_header'
      style={{...headerSpring()}}
      onClick={() => {selectExhibit(false); setMount(true)}}>
        {exhibits.exhibit}
      </animated.h1>
      <animated.div className='gallery_container' style={{...gallerySpring()}}>
        {mapGallery()}
      </animated.div>
    </div>
  )
}

export default Gallery;