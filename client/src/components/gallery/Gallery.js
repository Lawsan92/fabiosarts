import React, { useState , useEffect, useRef  } from 'react';
import { animated } from '@react-spring/web';
import { headerSpring, gallerySpring, headerSpringTablet } from '../../hooks/Springs.js';
import HomeIcon from '../HomeIcon.js';
import Modal from '../Modal.js';
import SphereSelect from '../SphereSelect.js';
import Gallery_Footer from './galleryFooter.js';
import Gallery_Header from './galleryHeader.js';
import { handleSelectPosition } from './gallery_events.js';
import useAPI from '../../hooks/useAPI.js';
import { useParams, useLocation } from 'react-router-dom';

const axios = require('axios');

const Gallery = ({ exhibits, selectExhibit, setMount, XYRef, getXYRef, pageRef, getVisitRef }) => {

  /*---------------STATE && HOOKS---------------*/
  useEffect(() => {
    URLhashScroll();
    fetchGallery();
    handleSelectPosition();
    handleDownKey();
    handleUpKey();
    handleEscKey();
    getVisitRef();
    console.log('window.innnerWidth:', window.innnerWidth);
  }, [sphereIsSelected]);

   /*------Refs------ */
   const scrollRef = useRef(0);
   const galleryRef = useRef([]);

   /*-----fetch gallery data from cloudinary API----*/
   const [gallery, getGallery] = useState([]);
   const fetchGallery = () => {
     axios({
       url: `/cloudinary/?exhibit=${params.id}`,
       method: 'get',
     })
       .then((response) => {
         galleryRef.current = response.data.data;
         getGallery(response.data.data)
       })
       .catch((err) => {
         console.log('error:', err.stack)
       })
   };

  const params= useParams();
  const location = useLocation();
  const [locationHash, updateHash] = useState('')

  const URLhashScroll = () => {

      const timer = setTimeout(() => { // <- delay element scroll in case API call doesn't retrieve gallery data fast enough

        if (location.hash) {
          let element;
          if (location.hash.indexOf('%')) {
            let [HASHarr, eleIDfromHASH]= [Array.from(location.hash).slice(1), ''];

            for (let index = 0; index < HASHarr.length; index++) {
              const ifParam = HASHarr[index]  === '2' && HASHarr[index + 1] === '0' && HASHarr[index - 1] === '%';
              if (ifParam) {
                index +=1;
                continue;
              }
              if (HASHarr[index] === '%') {
                eleIDfromHASH += ' ';
                continue;
              }
              eleIDfromHASH += HASHarr[index];
            }
            updateHash(eleIDfromHASH);
            element = document.getElementById(eleIDfromHASH);
          } else {
            element = document.querySelector(location.hash);
          }
          element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }

      }, 1200);
      return () => clearTimeout(timer);
  };


 /*----- Map gallery data ui to gallery page-----*/
 const mapGallery = () => {
  let galleryDataHasArrived = gallery.length;
  if (galleryDataHasArrived) {
    return gallery.map((img, index) => {
      return (
      <div className='gallery_img_container'>
        <img
          className={`gallery_img index${index}`}
          id={img.title}
          key={index + gallery.length}
          src={img.url}
          onClick={(e) => {
          handleModal();
          getModalImgSource(e.target.attributes.src.value);
          scrollRef.current = index;
          handleSphereSelect(scrollRef.current);
        }}
        style={img.styles}/>
         <h2 className={`gallery_text_sold index${index}`} key={index}>{img.sold && 'SOLD'}</h2>
      </div>
      )
    });
  } else {
    return <h1 className='gallery_empty'>COMING SOON...</h1>
  }
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
    const imgNode = document.querySelector(`.gallery_img.index${imgIndex}`);
    imgNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'});
  };

  /*_________MODAL__________*/
  const [openModal, setModal] = useState(false);
  const [modalImgSource, getModalImgSource] = useState('');

  const handleModal = () => {
    setModal(prevState => !prevState);
  }

    /*----- Sphere List-----*/
    const [sphereIsSelected, selectSphere] = useState(false);
    const handleSphereSelect = (index) => {
      if (gallery[index]) {
        window.location.hash = gallery[index].title;
        updateHash(gallery[index].title);
      } else if (galleryRef.current[index]) {
        window.location.hash = galleryRef.current[index].title;
        updateHash(galleryRef.current[index].title);
      }
      selectSphere((({props}) => ({...props, [index]: true})))
    };
  /*_________KEYS_________*/

  const handleEscKey = () => {
    document.addEventListener('keydown', (e) => {
      e.key === 'Escape' && handleModal(false);
    });
  };

  const handleDownKey = () => {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 40) {
        e.preventDefault();
        scrollRef.current >= galleryRef.current.length - 1 ? scrollRef.current = 0 : scrollRef.current =  scrollRef.current + 1;
        handleSphereSelect(scrollRef.current);
        scrollToImg(scrollRef.current);
        getScrollIndex(scrollRef.current);
        let galleryArr = Array.from(galleryRef.current)
        getModalImgSource(galleryArr[scrollRef.current].url);
      }
    });
  };

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
      }
    });
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
      // style={{...headerSpring(XYRef)}}
      // >
         style={window.innerWidth > 800 ? {...headerSpring(XYRef)} : {...headerSpringTablet(XYRef)}}
         >
        {exhibits.exhibit ? exhibits.exhibit : params.id}
      </animated.h1>
      <animated.div className='gallery_body' style={{...gallerySpring()}}>
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
      </animated.div>
      <Gallery_Footer gallery={gallery} scrollRef={scrollRef} locationHash={locationHash}/>
    </div>
  )
};

export default Gallery;

// ref: https://dev.to/zeerorg/react-hooks-and-their-dependence-on-each-other-13pe