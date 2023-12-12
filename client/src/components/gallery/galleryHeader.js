import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web';
import Gallery_Springs from '../../hooks/Gallery_Springs.js'

const Gallery_Header = () => {
  return (
    <animated.div className='gallery_header_main' style={{...Gallery_Springs.gallery_footer_spring()}}>
      <h1 className='gallery_header_main_text'>FABIO SANZOGNI</h1>
      <div className='gallery_header_main_sub'>
        <div className='gallery_header_main_sub_line' />
        <div className='gallery_header_main_sub_ellipse'>
          <div className='ellipse_1'></div>
        < div className='ellipse_2'/>
          <div className='ellipse_3'/>
        </div>
      <p className='gallery_header_main_sub_text'>international artist</p>
    </div>
  </animated.div>
  );
}

export default Gallery_Header;