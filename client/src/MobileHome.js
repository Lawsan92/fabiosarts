import React, { useState , useEffect } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';


export const MobileMenu = () => {

  return (
    <div className='mobile_home_menu'>
      <div className='mobile_home_menu_bar'></div>
      <div className='mobile_home_menu_bar'></div>
      <div className='mobile_home_menu_bar'></div>
    </div>
  );
}

const MobileHome = ({ isMounted, setMount, toggleSelect }) => {

  const mobileStyles = {
    home: {
      backgroundImage: `url(https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg)`,
      height: '100%',
      header: {
        backgroundColor: '#fffafa',
        width: '20vw',
        height: '80vh',
        marginRight: 'auto',
        display: 'flex',
        sub: {
          flexDirection: 'column',
          marginLeft: 0,
          text: {
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            fontSize: '8px',
            marrgin: 0
          }
        },
        line: {
          height: '30vh',
          width: '1px'
        },
        ellipse: {
          flexDirection: 'column'
        },
        text: {
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          fontSize: '33px'
        },
      },
      footer: {
        fontSize: '12px'
      }
    },
  };

  const transitions = useTransition(isMounted, {
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    enter: { x: 0, y: 0, opacity: 1, transition: '0.5s ease-in' },
    leave: { x: 200, y: 800, opacity: 0, transition: '0.5s ease-in' }
  });

  const mountSpring = () => {

    return transitions((style, items) =>
      items &&
      <animated.div style={{...style, ...mobileStyles.home}} className='home'>
        <MobileMenu/>
        <div className='home_header' style={mobileStyles.home.header}>
          <h1 className='home_header_text' style={mobileStyles.home.header.text}>FABIO SANZOGNI</h1>
          <div className='home_header_sub' style={mobileStyles.home.header.sub}>
            <div className='home_header_sub_line' style={mobileStyles.home.header.line}/>
            <div className='home_header_sub_ellipse' style={mobileStyles.home.header.ellipse}>
              <div className='ellipse_1'></div>
              <div className='ellipse_2'/>
              <div className='ellipse_3'/>
            </div>
            <p className='home_header_sub_text' style={mobileStyles.home.header.sub.text}>international artist</p>
          </div>
        </div>
        <div className='home_footer'>
          <p className='footer_text' style={mobileStyles.home.footer} >Contact</p>
          <p className='footer_text' style={mobileStyles.home.footer}>All rights reserved</p>
          <p className='footer_text' style={mobileStyles.home.footer}>studiodarteonline.com</p>
          <p className='footer_text' style={mobileStyles.home.footer}>designed by Lawrence Sanzogni</p>
        </div>
      </animated.div>
    );
  }

  return (
    <div>
      {mountSpring()}
    </div>
  );
}

export default MobileHome;