import React, { useState } from 'react'

const Gallery_Footer = ({ gallery, scrollRef }) => {
  return (
    <div className='gallery_footer'>
      <h1 className='gallery_footer_text'>{scrollRef.current ? gallery[scrollRef.current].title + ', ' + gallery[scrollRef.current].size + ', ' + gallery[scrollRef.current].type : ''}</h1>
    </div>
  );
}

export default Gallery_Footer;

