import React, { useState } from 'react';

export const MobileModal = ({ handleModal, modalImgSource, scrollPosition }) => {

    /*-----Set background color for gallery screen------*/
    const body = document.querySelector('body');
    // body.style.backgroundColor = '#0000007f'

  return (
    <div className='gallery_modal' style={{top: document.documentElement.scrollTop, backgroundColor: '#fff'}}>
      <div className='gallery_modal_background'>
        <div className='gallery_modal_body' onClick={handleModal}>
          <img src={modalImgSource} style={{maxHeight: '100vh', width: '100vw', zIndex: 2}}/>
        </div>
      </div>
    </div>
  );
};

export default MobileModal;