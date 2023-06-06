import React, { useState , useEffect } from 'react';
import { animated } from '@react-spring/web';
import { headerSpring, gallerySpring } from './hooks/Springs.js';
const axios = require('axios');


const Gallery = ({ exhibits, selectExhibit, setMount }) => {

  /*---------------STATE && HOOKES---------------*/

  useEffect(() => {
    fetchGallery();
    handleSelectPosition();
  }, [])

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
  };

  const [scrollPosition, getScrollPosition] = useState('10vh');
  const handleSelectPosition = () => {
    window.addEventListener('scroll', () => {
      getScrollPosition(document.documentElement.scrollTop + (window.innerHeight / 10))
    })
  };

  const scrollToImg = (imgIndex) => {
    const imgNode = document.querySelector(`.gallery_img.index${imgIndex}`);
    imgNode.scrollIntoView({ behavior: 'smooth'});
  };

  const mapGallery = () => {
    return gallery.map((url, index) => {
      return <img className={`gallery_img index${index}`} key={index} src={url} />
    });
  }

  const mapSelect = () => {
    return gallery.map((gallery, index) => {
      return <li className={`gallery_select_item index${index}`} key={index} onClick={(e) => {scrollToImg(index)}}/>
    })
  }

  return (
    <div className='gallery'>
      <animated.h1
      className='gallery_header'
      style={{...headerSpring()}}
      onClick={() => {selectExhibit(false); setMount(true)}}>
        {exhibits.exhibit}
      </animated.h1>
      <animated.div className='gallery_container' style={{...gallerySpring()}} >
        {mapGallery()}
      </animated.div>
      <ul className='gallery_select_menu' style={{top: scrollPosition}}>
        {mapSelect()}
      </ul>
    </div>
  )
}

export default Gallery;