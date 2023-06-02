import React from 'react';

const Header = () => {

  return(
    <div className='app_header'>
      <h1>FABIO SANZOGNI</h1>
      <div className='app_header_sub'>
        <div className='app_header_sub_line' />
        <div className='app_header_sub_ellipse'>
          <div className='ellipse_1'></div>
          <div className='ellipse_2'/>
          <div className='ellipse_3'/>
        </div>
        <p className='app_header_sub_text'>international artist</p>
      </div>
    </div>
  );

}

export default Header;