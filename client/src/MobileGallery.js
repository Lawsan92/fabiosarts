import React, { useState , useEffect } from 'react';
import { animated } from '@react-spring/web';
import { headerSpring, gallerySpring } from './hooks/Springs.js';
const axios = require('axios');

const MobileGallery = ({ exhibits, selectExhibit, setMount }) => {

  /*-----API-----*/
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
      {/* {openModal ?
        <Modal handleModal={handleModal} modalImgSource={modalImgSource} scrollPosition={scrollPosition}/> :
        ''
      } */}
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
      {/* <ul className='gallery_select_menu' >
        {mapSelect()}
      </ul> */}
    </div>
    )
};

export const HomeIcon = ({ selectExhibit, setMount }) => {

  const [isHover, setHover] = useState(false);

  const handleHover = () => {
    setHover(prevState => !prevState);
  };

  return (
    <div className='gallery_homeIcon' onClick={() => {selectExhibit(false); setMount(true)}}>
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="5vh" height="5vh" viewBox="0 0 495.398 495.398" style={{enableBackground:"new 0 0 495.398 495.398"}}
        space="preserve" onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <path fill={ isHover ? "#000" : "#00000080"} d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
        <path fill={ isHover ? "#000" : "#00000080"} d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
      </svg>
    </div>
  );
};

export default MobileGallery;