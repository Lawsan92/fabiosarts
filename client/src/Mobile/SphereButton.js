import React, { useState } from 'react';

const SphereButton = ({ setSphereModal }) => {
  return (
    <div className="mobile_sphereBtn" onClick={() => {setSphereModal(true)}}></div>
  );
};

export default SphereButton;