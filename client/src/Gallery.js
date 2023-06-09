import React, { useState , useEffect } from 'react';
import { animated } from '@react-spring/web';
import { headerSpring, gallerySpring } from './hooks/Springs.js';
const axios = require('axios');

export const Modal = ({ handleModal }) => {

  return (
    <div className='gallery_modal'>
      <div className='gallery_modal_background'>
        <div className='gallery_modal_body' onClick={handleModal}>
          Modal
        </div>
      </div>
    </div>
  );
}

const Gallery = ({ exhibits, selectExhibit, setMount }) => {

  /*---------------STATE && HOOKS---------------*/

  useEffect(() => {
    fetchGallery();
    handleSelectPosition();
  }, [])

  /*----- Gallery-----*/
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

  /*----- Scroll-----*/
  const [scrollPosition, getScrollPosition] = useState('10vh');
  const handleSelectPosition = () => {
    window.addEventListener('scroll', () => {
      getScrollPosition(document.documentElement.scrollTop + (window.innerHeight / 10))
    })
  };

  const scrollToImg = (imgIndex) => {
    const imgNode = document.querySelector(`.gallery_img.index${imgIndex}`);
    imgNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'});
  };

  /*----- Modal-----*/
  const [openModal, setModal] = useState(false);

  const handleModal = () => {
    setModal(prevState => !prevState);
  }

  /*----- Maps-----*/

  const mapGallery = () => {
    return gallery.map((img, index) => {
      return (
      <div className='gallery_img_container'>
        <p className={`gallery_text index${index}`} key={index} style={{color: 'red'}}>{img.sold && 'SOLD'}</p>
        <img className={`gallery_img index${index}`} key={index} src={img.url}  onClick={handleModal}/>
        <p className={`gallery_text index${index}`} key={index}>{img.title + ' ' + img.size + ' ' + img.type}</p>
      </div>
      )
    });
  }

  const mapSelect = () => {
    return gallery.map((item, index) => {
      return <li
      className={`gallery_select_item index${index}`}
      key={index}
      onClick={(e) => {scrollToImg(index)}}
      style={{
        height: gallery.length > 12 && '10px',
        width: gallery.length > 12 && '10px',
      }}
      />
    })
  }

  return (
    <div className='gallery'>
      {openModal ?
        <Modal handleModal={handleModal}/> :
        ''
      }
      <animated.h1
      className='gallery_header'
      style={{...headerSpring()}}
      onClick={() => {selectExhibit(false); setMount(true)}}>
        {exhibits.exhibit}
      </animated.h1>
      <animated.div className='gallery_container' style={{...gallerySpring()}} >
        {mapGallery()}
      </animated.div>
      <ul className='gallery_select_menu' style={{top: scrollPosition}} >
        {mapSelect()}
      </ul>
    </div>
  )
}

export default Gallery;