import React, { useState } from 'react';
import MobileSphereSelect from './MobileSphereSelect.js';

const SphereModal = ({ setSphereModal,scrollPosition, handleSphereSelect, scrollToImg, getScrollIndex, gallery, sphereIsSelected, scrollIndex }) => {
  return (
    <div className='mobile_sphereModal' onClick={() => {setSphereModal(false)}}>
      <MobileSphereSelect
      scrollPosition={scrollPosition}
      handleSphereSelect={handleSphereSelect}
      scrollToImg={scrollToImg}
      getScrollIndex={getScrollIndex}
      gallery={gallery}
      sphereIsSelected={sphereIsSelected}
      scrollIndex={scrollIndex}
      />
    </div>
  );
};

export default SphereModal;