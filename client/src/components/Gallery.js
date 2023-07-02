import React, { useState , useEffect, useRef } from 'react';
import { animated } from '@react-spring/web';
import { headerSpring, gallerySpring } from '../hooks/Springs.js';
import HomeIcon from './HomeIcon.js';
import Modal from './Modal.js';
import SphereSelect from './SphereSelect.js';
const axios = require('axios');

const Gallery = ({ exhibits, selectExhibit, setMount }) => {

  /*---------------STATE && HOOKS---------------*/
  useEffect(() => {
    console.log('MOUNTED')
    fetchGallery();
    handleSelectPosition();
    handleDownKey();
    handleUpKey();
    handleEscKey();
  }, [sphereIsSelected])

  const scrollRef = useRef(0);

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
    console.log('imgIndex', imgIndex)
    const imgNode = document.querySelector(`.gallery_img.index${imgIndex}`);
    imgNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'});
    console.log('called')
  };

  /*----- Modal-----*/
  const [openModal, setModal] = useState(false);
  const [modalImgSource, getModalImgSource] = useState('');

  const handleModal = () => {
    setModal(prevState => !prevState);
  }

  /*-----Key events-----*/

  const handleEscKey = () => {
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && handleModal(false);
    });
  }

  const [scrollIndex, getScrollIndex] = useState(0);

  const handleDownKey = () => {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 40) {
        e.preventDefault();
        scrollToImg(scrollRef.current + 1);
        console.log('DOWN');
      }
    });
  }

  const handleUpKey = () => {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 38) {
        e.preventDefault();
        console.log('scrollRef:', scrollRef.current);
        scrollRef > 0 ? scrollToImg(scrollRef.current - 1) : scrollToImg(gallery.length - 1);
        console.log('UP');
      }
    });
  }

  /*----- Sphere List-----*/
  const [sphereIsSelected, selectSphere] = useState(false);
  const handleSphereSelect = (index) => {
    selectSphere((({props}) => ({...props, [index]: true})))
  };

  /*----- Maps-----*/
  const mapGallery = () => {
    return gallery.map((img, index) => {
      return (
      <div className='gallery_img_container'>
        <p className={`gallery_text index${index}`} key={index} style={{color: 'red'}}>{img.sold && 'SOLD'}</p>
        <img className={`gallery_img index${index}`} key={index + gallery.length} src={img.url}  onClick={(e) => {handleModal(); getModalImgSource(e.target.attributes.src.value)}}/>
        <p className={`gallery_text index${index}`} key={index + gallery.length + 2}>{img.title + ' ' + img.size + ' ' + img.type}</p>
      </div>
      )
    });
  };

  return (
    <div className='gallery'>
      {openModal ?
        <Modal handleModal={handleModal} modalImgSource={modalImgSource} scrollPosition={scrollPosition}/> :
        ''
      }
      <animated.h1
      className='gallery_header'
      style={{...headerSpring()}}
      >
        {exhibits.exhibit}
      </animated.h1>
      <HomeIcon selectExhibit={selectExhibit} setMount={setMount}/>
      <animated.div className='gallery_container' style={{...gallerySpring()}} >
        {mapGallery()}
      </animated.div>
      <SphereSelect
      scrollPosition={scrollPosition}
      handleSphereSelect={handleSphereSelect}
      scrollToImg={scrollToImg}
      getScrollIndex={getScrollIndex}
      gallery={gallery}
      sphereIsSelected={sphereIsSelected}
      scrollIndex={scrollIndex}
      scrollRef={scrollRef}
      />
    </div>
  )
};

export default Gallery;

// ref: https://dev.to/zeerorg/react-hooks-and-their-dependence-on-each-other-13pe