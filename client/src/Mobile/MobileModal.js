import React, { useState, useRef } from 'react';

export const MobileModal = ({ handleModal, modalImgSource, scrollPosition, scrollRef, galleryRef, getModalImgSource, getScrollIndex }) => {
    /*-----Set background color for gallery screen------*/
    const body = document.querySelector('body');
    // body.style.backgroundColor = '#0000007f'

    const handleArrow = () => {
      let gallery = Array.from(galleryRef.current);
      console.log('scrollRef:', scrollRef.current);
      console.log('gallery:', gallery.length);
      scrollRef.current >= gallery.length - 1 ? scrollRef.current = 0 : scrollRef.current = scrollRef.current + 1;
      getScrollIndex(scrollRef.current)
      getModalImgSource(gallery[scrollRef.current].url)
    }

  return (
    <div className='mobile_gallery_modal' style={{top: document.documentElement.scrollTop, backgroundColor: '#fff'}}>
      <div className='mobile_gallery_modal_background'>
        <div className='mobile_gallery_modal_body' onClick={(e) => { console.log('e.target:', e.target, 'e.currentTarget:', e.currentTarget); e.currentTarget === e.target && handleModal()}}>
          <img src={modalImgSource} style={{maxHeight: '100vh', width: '100vw', zIndex: 2}}/>
          <div className='mobile_gallery_modal_scrollBtn' onClick={handleArrow}>
            <div className='mobile_gallery_modal_scrollArrow'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileModal;