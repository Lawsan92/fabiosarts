// import React, { useState , useEffect, useRef } from 'react';
// import { animated } from '@react-spring/web';
// import { headerSpring, gallerySpring, mobileHeaderSpring } from '../hooks/Springs.js';
// import MobileModal from './MobileModal.js';
// import SphereButton from './SphereButton.js';
// import SphereModal from './SphereModal.js';
// const axios = require('axios');

// const MobileGallery = ({ exhibits, selectExhibit, setMount, XYRef, getXYRef }) => {

//   /*-----Set background color for gallery screen------*/
//   const body = document.querySelector('body');
//   body.style.backgroundColor = '#fffafa'

//   const styles = {
//     galleryContainer: {
//       width: '100vw',
//       maxWidth: '100vw',
//     },
//     imgContainer: {
//       width: '100vw',
//       // border: 'solid'
//     },
//     img: {
//       maxHeight: '62vh',
//       maxWidth: '80vw',
//       objectFit: 'contain'
//     },
//     icon: {
//       marginRight: '10px',
//       marginTop: '10px'
//     },
//     empty: {
//       fontSize: '10vw',
//       height: '50vh',
//       transform: 'translateY(0)'
//     }
//   }

//   /*-----STATE----- */
//   useEffect(() => {
//     fetchGallery();
//   }, [])

//   /*------Refs------ */
//    const scrollRef = useRef(0);
//    const galleryRef = useRef([]);

//   /*-----API-----*/
//   const [gallery, getGallery] = useState([]);
//   const fetchGallery = () => {
//     axios({
//       url: `/cloudinary/?exhibit=${exhibits.exhibit}`,
//       method: 'get',
//     })
//       .then((response) => {
//         console.log('response:', response);
//         galleryRef.current = response.data.data;
//         getGallery(response.data.data)
//       })
//       .catch((err) => {
//         console.log('error:', err.stack)
//       })
//   };

//   /*----- Scroll-----*/
//   const [scrollPosition, getScrollPosition] = useState('10vh');
//   const handleSelectPosition = () => {
//     window.addEventListener('scroll', () => {
//       getScrollPosition(document.documentElement.scrollTop + (window.innerHeight / 10))
//     })
//   };
//   /*----- Modal-----*/
//   const [openModal, setModal] = useState(false);
//   const [modalImgSource, getModalImgSource] = useState('');

//   const handleModal = () => {
//     setModal(prevState => !prevState);
//   };

//   /*-----Sphere-----*/
//   const [scrollIndex, getScrollIndex] = useState(0);
//   const [sphereIsSelected, selectSphere] = useState(false);
//   const handleSphereSelect = (index) => {
//     selectSphere((({props}) => ({...props, [index]: true})))
//   };

//   const scrollToImg = (imgIndex) => {
//     console.log('SCROLL', imgIndex)
//     const imgNode = document.querySelector(`.gallery_img.index${imgIndex}`);
//     imgNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'});
//   };


//   /*----- Maps-----*/
//   const [openSphereModal, setSphereModal] = useState(false);

//   /*----- Maps-----*/
//   const mapGallery = () => {
//     if (gallery.length) {
//       return gallery.map((img, index) => {
//         return (
//         <div className='mobile_gallery_img_container' style={styles.imgContainer}>
//           <p className={`mobile_gallery_text index${index}`} key={index} style={{color: 'red' }}>{img.sold && 'SOLD'}</p>
//           <img className={`mobile_gallery_img index${index}`} key={index + gallery.length} src={img.url}  onClick={(e) => {handleModal(); getModalImgSource(e.target.attributes.src.value); getScrollIndex(index); scrollRef.current = index}} style={styles.img}/>
//           <p className={`mobile_gallery_text index${index}`} key={index + gallery.length + 2}>{img.title + ', ' + img.size + ', ' + img.type}</p>
//         </div>
//         )
//       });
//     } else {
//       return <h1 className='mobile_gallery_empty' style={styles.empty}>COMING SOON...</h1>
//     }
//   };

//     return (
//       <div className='gallery'>
//       {openModal ?
//         <MobileModal handleModal={handleModal} modalImgSource={modalImgSource} scrollPosition={scrollPosition} scrollRef={scrollRef} galleryRef={galleryRef} getModalImgSource={getModalImgSource} getScrollIndex ={getScrollIndex}/> :
//         ''
//       }
//       <animated.h1 className='mobile_gallery_header'style={{...mobileHeaderSpring(), width: 'fit-content', fontSize: '25px'}}>
//         {exhibits.exhibit}
//       </animated.h1>
//       <SphereButton setSphereModal={setSphereModal} scrollIndex={scrollIndex}/>
//       <HomeIcon selectExhibit={selectExhibit}/>
//       <animated.div className='mobile_gallery_container' style={{...gallerySpring(), ...styles.galleryContainer}} >
//         {mapGallery()}
//       </animated.div>
//       { openSphereModal ?
//       <SphereModal
//       setSphereModal={setSphereModal}
//       scrollPosition={scrollPosition}
//       handleSphereSelect={handleSphereSelect}
//       scrollToImg={scrollToImg}
//       getScrollIndex={getScrollIndex}
//       gallery={gallery}
//       sphereIsSelected={sphereIsSelected}
//       scrollIndex={scrollIndex}
//       />  : ''}
//     </div>
//     )
// };

// export const HomeIcon = ({ selectExhibit, setMount }) => {

//   const styles =  {
//     right: '10px',
//     top: '10px',
//     position: 'fixed'
//   };

//   const [isHover, setHover] = useState(false);

//   const handleHover = () => {
//     setHover(prevState => !prevState);
//   };

//   return (
//     <div className='gallery_homeIcon' onClick={() => {selectExhibit(false); setMount(true)}} style={styles}>
//       <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
//         width="5vh" height="5vh" viewBox="0 0 495.398 495.398" style={{enableBackground:"new 0 0 495.398 495.398"}}
//         space="preserve" onMouseEnter={handleHover} onMouseLeave={handleHover}>
//         <path fill={ isHover ? "#338BA8" : "#338BA880"} d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
//         <path fill={ isHover ? "#338BA8" : "#338BA880"} d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
//       </svg>
//     </div>
//   );
// };

// export default MobileGallery;

import React, { useState , useEffect, useRef } from 'react';
import { animated } from '@react-spring/web';
import { mobileHeaderSpring, gallerySpring } from '../hooks/Springs.js';
import MobileModal from './MobileModal.js';
import SphereButton from './SphereButton.js';
import SphereModal from './SphereModal.js';
const axios = require('axios');

const MobileGallery = ({ exhibits, selectExhibit, setMount }) => {

  /*-----Set background color for gallery screen------*/
  const body = document.querySelector('body');
  body.style.backgroundColor = '#fffafa'

  const styles = {
    galleryContainer: {
      width: '100vw',
      maxWidth: '100vw',
    },
    imgContainer: {
      width: '100vw',
      // border: 'solid'
    },
    img: {
      maxHeight: '62vh',
      maxWidth: '80vw',
      objectFit: 'contain'
    },
    icon: {
      marginRight: '10px',
      marginTop: '10px'
    },
    empty: {
      fontSize: '10vw',
      height: '50vh',
      transform: 'translateY(0)'
    }
  }

  /*-----STATE----- */
  useEffect(() => {
    fetchGallery();
  }, [])

  /*------Refs------ */
   const scrollRef = useRef(0);
   const galleryRef = useRef([]);

  /*-----API-----*/
  const [gallery, getGallery] = useState([]);
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

  /*----- Scroll-----*/
  const [scrollPosition, getScrollPosition] = useState('10vh');
  const handleSelectPosition = () => {
    window.addEventListener('scroll', () => {
      getScrollPosition(document.documentElement.scrollTop + (window.innerHeight / 10))
    })
  };
  /*----- Modal-----*/
  const [openModal, setModal] = useState(false);
  const [modalImgSource, getModalImgSource] = useState('');

  const handleModal = () => {
    setModal(prevState => !prevState);
  };

  /*-----Sphere-----*/
  const [scrollIndex, getScrollIndex] = useState(0);
  const [sphereIsSelected, selectSphere] = useState(false);
  const handleSphereSelect = (index) => {
    selectSphere((({props}) => ({...props, [index]: true})))
  };

  const scrollToImg = (imgIndex) => {
    console.log('SCROLL', imgIndex)
    const imgNode = document.querySelector(`.mobile_gallery_img.index${imgIndex}`);
    imgNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'});
  };


  /*----- Maps-----*/
  const [openSphereModal, setSphereModal] = useState(false);

  /*----- Maps-----*/
  const mapGallery = () => {
    if (gallery.length) {
      return gallery.map((img, index) => {
        return (
        <div className='mobile_gallery_img_container' style={styles.imgContainer}>
          <p className={`mobile_gallery_text index${index}`} key={index} style={{color: 'red' }}>{img.sold && 'SOLD'}</p>
          <img className={`mobile_gallery_img index${index}`} key={index + gallery.length} src={img.url}  onClick={(e) => {handleModal(); getModalImgSource(e.target.attributes.src.value); getScrollIndex(index); scrollRef.current = index}} style={styles.img}/>
          <p className={`mobile_gallery_text index${index}`} key={index + gallery.length + 2}>{img.title + ', ' + img.size + ', ' + img.type}</p>
        </div>
        )
      });
    } else {
      return <h1 className='mobile_gallery_empty' style={styles.empty}>COMING SOON...</h1>
    }
  };

    return (
      <div className='mobile_gallery'>
      {openModal ?
        <MobileModal handleModal={handleModal} modalImgSource={modalImgSource} scrollPosition={scrollPosition} scrollRef={scrollRef} galleryRef={galleryRef} getModalImgSource={getModalImgSource} getScrollIndex ={getScrollIndex}/> :
        ''
      }
      <animated.h1 className='mobile_gallery_header'style={{...mobileHeaderSpring(), width: 'fit-content', fontSize: '25px'}}>
        {exhibits.exhibit}
      </animated.h1>
      <SphereButton setSphereModal={setSphereModal} scrollIndex={scrollIndex}/>
      <HomeIcon selectExhibit={selectExhibit}/>
      <animated.div className='mobile_gallery_container' style={{...gallerySpring(), ...styles.galleryContainer}} >
        {mapGallery()}
      </animated.div>
      { openSphereModal ?
      <SphereModal
      setSphereModal={setSphereModal}
      scrollPosition={scrollPosition}
      handleSphereSelect={handleSphereSelect}
      scrollToImg={scrollToImg}
      getScrollIndex={getScrollIndex}
      gallery={gallery}
      sphereIsSelected={sphereIsSelected}
      scrollIndex={scrollIndex}
      />  : ''}
    </div>
    )
};

export const HomeIcon = ({ selectExhibit, setMount }) => {

  const styles =  {
    right: '10px',
    top: '10px',
    position: 'fixed'
  };

  const [isHover, setHover] = useState(false);

  const handleHover = () => {
    setHover(prevState => !prevState);
  };

  return (
    <div className='mobile_gallery_homeIcon' onClick={() => {selectExhibit(false); setMount(true)}} style={styles}>
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="5vh" height="5vh" viewBox="0 0 495.398 495.398" style={{enableBackground:"new 0 0 495.398 495.398"}}
        space="preserve" onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <path fill={ isHover ? "#338BA8" : "#338BA880"} d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
        <path fill={ isHover ? "#338BA8" : "#338BA880"} d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
      </svg>
    </div>
  );
};

export default MobileGallery;