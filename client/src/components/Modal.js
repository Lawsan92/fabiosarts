import React, { useState } from 'react';

export const Modal = ({ handleModal, modalImgSource, scrollPosition }) => {

  return (
    <div className='gallery_modal' style={{top: document.documentElement.scrollTop}}>
      <div className='gallery_modal_background'>
        <div className='gallery_modal_body' onClick={handleModal}>
          <img src={modalImgSource} style={{height: 'inherit', maxWidth: '100vw', zIndex: '2'}}/>
        </div>
      </div>
    </div>
  );
};

export default Modal;