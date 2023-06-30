import React, { useState } from 'react';

export const MobileModal = ({ handleModal, modalImgSource, scrollPosition }) => {

  return (
    <div className='gallery_modal' style={{top: document.documentElement.scrollTop}}>
      <div className='gallery_modal_background'>
        <div className='gallery_modal_body' onClick={handleModal}>
          <img src={modalImgSource} style={{height: 'auto', maxWidth: '100vw'}}/>
        </div>
      </div>
    </div>
  );
};

export default MobileModal;