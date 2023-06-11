import React, { useState , useEffect } from 'react';
import { animated } from '@react-spring/web';
import { headerSpring, gallerySpring } from './hooks/Springs.js';
const axios = require('axios');

export const Modal = ({ handleModal, modalImgSource, scrollPosition }) => {

  return (
    <div className='gallery_modal' style={{top: document.documentElement.scrollTop}}>
      <div className='gallery_modal_background'>
        <div className='gallery_modal_body' onClick={handleModal}>
          <img src={modalImgSource} style={{height: 'inherit'}}/>
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
    upKeyEvent();
    downKeyEvent();
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
    console.log('SCROLL', imgIndex)
    const imgNode = document.querySelector(`.gallery_img.index${imgIndex}`);
    imgNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'});
  };

  /*----- Modal-----*/
  const [openModal, setModal] = useState(false);
  const [modalImgSource, getModalImgSource] = useState('');

  const handleModal = () => {
    setModal(prevState => !prevState);
  }


  /*-----Key events-----*/

  const escKeyEvent = document.addEventListener('keydown', (e) => {
    e.key === 'Escape' && handleModal(false);
  });


  const [scrollIndex, getScrollIndex] = useState(0);

  const downKeyEvent = () => {
    document.addEventListener('keydown', (e) => {
      e.keyCode=== 40 && scrollToImg(scrollIndex + 1);
    });
  }

  const upKeyEvent = () => {
    document.addEventListener('keydown', (e) => {
      console.log('scrollIndex:', scrollIndex);
      e.keyCode === 38 && scrollToImg(scrollIndex - 1);
    });
  }


  /*----- Sphere List-----*/
  const [sphereIsSelected, selectSphere] = useState(false);
  const handleSphereSelect = (index) => {
    selectSphere(prevState => ({...sphereIsSelected, [index]: !prevState[index]}));
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
  }

  const mapSelect = () => {
    return gallery.map((item, index) => {
      return <li
      className={`gallery_select_item index${index}`}
      key={index}
      onClick={(e) => {scrollToImg(index); getScrollIndex(index); console.log('scrollIndex:', scrollIndex); handleSphereSelect(index);}}
      style={{
        height: gallery.length > 12 && '10px',
        width: gallery.length > 12 && '10px',
        backgroundColor: sphereIsSelected[index] && 'lightblue',
        transform: sphereIsSelected[index] && 'scale(1.2)'
      }}
      />
    })
  }

  return (
    <div className='gallery'>
      {openModal ?
        <Modal handleModal={handleModal} modalImgSource={modalImgSource} scrollPosition={scrollPosition}/> :
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
      <ul className='gallery_select_menu' style={{top: scrollPosition - 10}} >
        {mapSelect()}
      </ul>
    </div>
  )
}

export default Gallery;