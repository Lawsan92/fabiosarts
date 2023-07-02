import React, { useState , useEffect } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';
import MobileEmail from './MobileEmail.js';
import MobileList from './MobileList.js';

const MobileHome = ({ isMounted, setMount, toggleSelect }) => {

  /*-----STATE: mobile list-----*/
  const [mobileListMounted, mountMobileList] = useState(false);

  const [seriesSubList, setSubList] = useState(false);

   /*------STATE:email------*/
   const [emailFormOpen, setEmailForm] = useState(false);

  /*-----styles-----*/
  const mobileStyles = {
    home: {
      backgroundImage: `url(https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg)`,
      header: {
        backgroundColor: '#fffafa',
        width: '13vw',
        height: '80vh',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        sub: {
          flexDirection: 'column',
          marginLeft: 0,
          transform: 'translate(0, -38px)',
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
          fontSize: '32px',
          marrgin: 0
        },
      },
      footer: {
        fontSize: '12px'
      }
    },
  };

  /*-----springs-----*/
  const transitions = useTransition(isMounted, {
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    enter: { x: 0, y: 0, opacity: 1, transition: '0.5s ease-in' },
    leave: { x: 200, y: 800, opacity: 0, transition: '0.5s ease-in' }
  });

  const mountSpring = () => {

    return transitions((style, items) =>
      items &&
      <animated.div style={{...style, ...mobileStyles.home}} className='home'>
        <MobileMenu mountMobileList={mountMobileList}/>
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
          <p className='footer_text' style={{...mobileStyles.home.footer, cursor: 'pointer'}}
          onClick={() => {setEmailForm(true)}}
          >Contact</p>
          <p className='footer_text' style={mobileStyles.home.footer}>All rights reserved</p>
          <a href='http://studiodarteonline.com/' style={{textDecoration: 'none'}}>
            <p className='footer_text_link' style={mobileStyles.home.footer}>studiodarteonline.com</p>
          </a>
          <p className='footer_text' style={mobileStyles.home.footer}>designed by Lawrence Sanzogni</p>
        </div>
        {emailFormOpen && <MobileEmail setEmailForm={setEmailForm}/>}
      </animated.div>
    );
  };

  /*-----jsx-----*/
  if (mobileListMounted) {
    return (
      <div>
        <MobileList
        mobileListMounted={mobileListMounted}
        mountMobileList={mountMobileList}
        seriesSubList={seriesSubList}
        setSubList={setSubList}
        setMount={setMount}
        toggleSelect={toggleSelect}/>
      </div>
    );
  }

  return (
    <div>
      {mountSpring()}
    </div>
  );
};

export const MobileMenu = ({ mountMobileList }) => {

  const [isHover, setHover] = useState(false);

  const styles = {
    // opacity: isHover ? 1 : 0.5,
    opacity: 1,
    backgroundColor: isHover && '#808080',
    text: {
      // opacity: isHover ? 1 : 0.5,
      opacity: 1,
      color: isHover && '#fffafa'
    },
    arrow: {
      // opacity: isHover ? 1 : 0.5,
      opacity: 1,
      transform: isHover ? 'rotate(180deg) translate(7px, 0px)' : 'rotate(0) translate(7px, 0px)',
      borderLeft: isHover && 'solid #fffafa 10px'
    }
  }

  return (
    <div
    className='mobile_home_menu'
    onClick={() => {mountMobileList(true); setHover(true)}}
    style={styles}
    onMouseEnter={() => {setHover(true)}}
    onMouseLeave={() => {setHover(false)}}
    >
      {/* <div className='mobile_home_menu_bar'></div>
      <div className='mobile_home_menu_bar'></div>
      <div className='mobile_home_menu_bar'></div> */}
      <div className='mobile_home_menu_text' style={styles.text}>Galleries</div>
      <div className='mobile_home_menu_arrow' style={styles.arrow}></div>
    </div>
  );
};

export default MobileHome;