import React, { useState } from 'react';
import SphereSelect from '../SphereSelect.js';

const SphereModal = ({ setSphereModal }) => {
  return (
    <div className='mobile_sphereModal' onClick={() => {setSphereModal(false)}}>
      {/* <SphereModal/> */}
    </div>
  );
};

export default SphereModal;