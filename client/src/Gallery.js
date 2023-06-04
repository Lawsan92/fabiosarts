import React, { useState , useEffect} from 'react';
import { animated, useSpring, useSprings } from '@react-spring/web';
const axios = require('axios');

import { headerSpring } from './hooks/Springs.js';


const Gallery = ({exhibits}) => {

  const [gallery, getGallery] = useState([]);

  const spring = useSpring({
    from: {
      opacity: 0,
      transition: '2s ease-in'
     },
    to: {
      opacity: 1,
    }
  });

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

  const mapGallery = () => {
    return gallery.map((url) => {
      return <img src={url}/>
    });
  }

  useEffect(() => {
    fetchGallery();
  }, [])

  return (
    <div className='gallery'>
      <animated.h1 className='gallery_header' style={{...headerSpring()}}>{exhibits.exhibit}</animated.h1>
      <animated.div className='gallery_container' style={{...spring}}>
        {mapGallery()}
      </animated.div>
    </div>
  )
}

export default Gallery;