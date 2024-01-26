import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Gallery_Springs from '../../hooks/Gallery_Springs.js'

const Gallery_Footer = ({ gallery, scrollRef, locationHash }) => {


  const descFromHash = locationHash + ',' + ( gallery[scrollRef.current] && gallery[scrollRef.current].size + ', ' + gallery[scrollRef.current].type);
  const descFromState = gallery[scrollRef.current] && gallery[scrollRef.current].title + ',' + gallery[scrollRef.current].size + ', ' + gallery[scrollRef.current].type;

  return (
    <animated.div style={{...Gallery_Springs.gallery_footer_spring()}} className='gallery_footer'>
      <h1 className='gallery_footer_text'>{ window.location.hash ? descFromHash : descFromState}</h1>
    </animated.div>
  );
}

export default Gallery_Footer;

