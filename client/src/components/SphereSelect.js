import React, { useState , useEffect } from 'react';

const SphereSelect = ({ scrollPosition, handleSphereSelect, scrollToImg, getScrollIndex, gallery, sphereIsSelected, scrollIndex, scrollRef }) => {

  const stylesFunc = () => {
    if (gallery.length > 12) {
      return {
        width: '20px',
        flexWrap: 'wrap',
        height: '95vh',
        justifyContent: 'flex-start',
        right: '35px'
      }
    }
  }

  const mapSelect = () => {
    return gallery.map((item, index) => {
      return <li
      className={`gallery_select_item index${index}`}
      key={index}
      onClick={(e) => { handleSphereSelect(index); scrollToImg(index); getScrollIndex(index); console.log('scrollIndex:', scrollIndex); scrollRef.current = index}}
      style={{
        height: gallery.length > 12 && '10px',
        width: gallery.length > 12 && '10px',
        backgroundColor: sphereIsSelected[index] && 'lightblue',
        transform: sphereIsSelected[index] && 'scale(1.2)',
        marginRight: gallery.length > 12 && '10px'
      }}
      />
    })
  };

  return (
    <ul className='gallery_select_menu' style={{top: scrollPosition - 10, ...stylesFunc()}} >
      {mapSelect()}
    </ul>
  );
};

export default SphereSelect;