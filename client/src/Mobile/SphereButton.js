import React, { useState } from 'react';

const SphereButton = ({ setSphereModal, scrollIndex }) => {
  return (
    <div className="mobile_sphereBtn" onClick={() => {setSphereModal(true)}}>{scrollIndex + 1}</div>
  );
};

export default SphereButton;