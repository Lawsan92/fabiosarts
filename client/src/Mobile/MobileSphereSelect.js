import React, { useState , useEffect } from 'react';

const MobileSphereSelect = ({ scrollPosition, handleSphereSelect, scrollToImg, getScrollIndex, gallery, sphereIsSelected, scrollIndex }) => {

  const mapSelect = () => {
    return gallery.map((item, index) => {
      return <li
      className={`mobile_gallery_select_item index${index}`}
      key={index}
      onClick={(e) => { handleSphereSelect(index); scrollToImg(index); getScrollIndex(index); console.log('scrollIndex:', scrollIndex); }}
      style={{
        backgroundColor: sphereIsSelected[index] && 'lightblue',
        transform: sphereIsSelected[index] && 'scale(1.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fffafa',
        fontFamily: "'Inter', sans-serif"
      }}
      >
        {index + 1}
      </li>
    })
  };

  return (
    <ul className='mobile_gallery_select_menu' style={{top: scrollPosition - 10}} >
      {mapSelect()}
    </ul>
  );
};

export default MobileSphereSelect;