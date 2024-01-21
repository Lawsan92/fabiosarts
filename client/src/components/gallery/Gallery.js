import React, { useState , useEffect, useRef } from 'react';
import { animated } from '@react-spring/web';
import { headerSpring, gallerySpring } from '../../hooks/Springs.js';
import HomeIcon from '../HomeIcon.js';
import Modal from '../Modal.js';
import SphereSelect from '../SphereSelect.js';
import Gallery_Footer from './galleryFooter.js';
import Gallery_Header from './galleryHeader.js';
import { handleSelectPosition } from './gallery_events.js';
import useAPI from '../../hooks/useAPI.js';

const axios = require('axios');

const Gallery = ({ exhibits, selectExhibit, setMount, XYRef, getXYRef, location, updateLocation }) => {

  /*---------------STATE && HOOKS---------------*/
  useEffect(() => {
    console.log('MOUNTED')
    fetchGallery();
    handleSelectPosition();
    handleDownKey();
    handleUpKey();
    handleEscKey();
    updateLocation(window.location.pathname);
    getURLid()

  }, [sphereIsSelected])

  /*------Refs------ */
  const scrollRef = useRef(0);
  const galleryRef = useRef([]);

  const getURLid = () => {
    let [URLarr, URLparams]= [Array.from(window.location.pathname).slice(8), ''];
    URLarr.map((char) => {
      if (char === '%') {
        URLparams += ' ';
      }
      if (char.match(/[a-z]/i)) {
        URLparams += char;
      }
    });
    updateLocation(URLparams);
  }

  /*----- Gallery-----*/
  const [gallery, getGallery] = useState([]);
  const fetchGallery = () => {
    axios({
      url: `/cloudinary/?exhibit=${location}`,
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

  /*************- EVENT Handlers-*************/

  /*_________SCROLL__________*/
  const [scrollPosition, getScrollPosition] = useState('10vh');
  const [scrollIndex, getScrollIndex] = useState(0);
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

  /*_________MODAL__________*/
  const [openModal, setModal] = useState(false);
  const [modalImgSource, getModalImgSource] = useState('');

  const handleModal = () => {
    setModal(prevState => !prevState);
  }

  /*_________KEYS_________*/

  const handleEscKey = () => {
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && handleModal(false);
    });
  }

  const handleDownKey = () => {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 40) {
        e.preventDefault();
        scrollRef.current >= galleryRef.current.length - 1 ? scrollRef.current = 0 : scrollRef.current =  scrollRef.current + 1;
        handleSphereSelect(scrollRef.current);
        scrollToImg(scrollRef.current);
        getScrollIndex(scrollRef.current);
        let galleryArr = Array.from(galleryRef.current)
        console.log('galleryArr[scrollRef.current].url:', galleryArr[scrollRef.current].url);
        getModalImgSource(galleryArr[scrollRef.current].url);
        console.log('DOWN');
      }
    });
  }

  const handleUpKey = () => {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 38) {
        e.preventDefault();
        scrollRef.current <= 0 ? scrollRef.current = galleryRef.current.length - 1 : scrollRef.current = scrollRef.current - 1;
        handleSphereSelect(scrollRef.current);
        scrollToImg(scrollRef.current);
        getScrollIndex(scrollRef.current);
        let galleryArr = Array.from(galleryRef.current)
        getModalImgSource(galleryArr[scrollRef.current].url);
        console.log('UP');
      }
    });
  }

  /***************************************/

  /*----- Sphere List-----*/
  const [sphereIsSelected, selectSphere] = useState(false);
  const handleSphereSelect = (index) => {
    selectSphere((({props}) => ({...props, [index]: true})))
  };

  /*----- Maps-----*/
  const mapGallery = () => {
    let galleryDataHasArrived = gallery.length;
    if (galleryDataHasArrived) {
      return gallery.map((img, index) => {
        return (
        <div className='gallery_img_container'>
          <img className={`gallery_img index${index}`} key={index + gallery.length} src={img.url} onClick={(e) => {
            handleModal();
            getModalImgSource(e.target.attributes.src.value);
            scrollRef.current = index;
            handleSphereSelect(scrollRef.current);
          }}
          style={img.styles}/>
          {/* <div className='gallery_desc'>
            <p className={`gallery_text index${index}`} key={index + gallery.length + 2}>{img.title + ', ' + img.size + ', ' + img.type}</p> */}
           <h2 className={`gallery_text_sold index${index}`} key={index}>{img.sold && 'SOLD'}</h2>
          {/* </div> */}
        </div>
        )
      });
    } else {
      return <h1 className='gallery_empty'>COMING SOON...</h1>
    }
  };

  return (
    <div className='gallery'>
      {openModal ?
        <Modal handleModal={handleModal} modalImgSource={modalImgSource} scrollPosition={scrollPosition}/> :
        ''
      }
      <Gallery_Header/>
      <animated.h1
      className='gallery_header'
      style={{...headerSpring(XYRef)}}
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
      <Gallery_Footer gallery={gallery} scrollRef={scrollRef}/>
    </div>
  )
  /*
  return (
    <div className='gallery'>
      {openModal ?
        <Modal handleModal={handleModal} modalImgSource={modalImgSource} scrollPosition={scrollPosition}/> :
        ''
      }
      <Gallery_Header/>
      <div className='gallery_body'>
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
      <Gallery_Footer gallery={gallery} scrollRef={scrollRef}/>
    </div>
  )
*/

};

export default Gallery;

// ref: https://dev.to/zeerorg/react-hooks-and-their-dependence-on-each-other-13pe


