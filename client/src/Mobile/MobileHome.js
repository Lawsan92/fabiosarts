import React, { useState , useEffect } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';
import MobileEmail from './MobileEmail.js';
import MobileList from './MobileList.js';

const MobileHome = ({ isMounted, setMount, toggleSelect, XYRef, getXYRef }) => {

  /*-----STATE: mobile list-----*/
  const [mobileListMounted, mountMobileList] = useState(false);
  const [seriesSubList, setSubList] = useState({oils: false, series: false});

   /*------STATE:email------*/
   const [emailFormOpen, setEmailForm] = useState(false);

  /*-----springs-----*/
  const transitions = useTransition(isMounted, {
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    enter: { x: 0, y: 0, opacity: 1, transition: '0.5s ease-in' },
    leave: { x: 200, y: 800, opacity: 0, transition: '0.5s ease-in' }
  });

  const mountSpring = () => {

    return transitions((style, items) =>
      items &&
      <animated.div className='mobile_home'>
        <ImageAnimation/>
        <MobileMenu mountMobileList={mountMobileList}/>
        <div className='mobile_home_header'>
          <h1 className='mobile_home_header_text'>FABIO SANZOGNI</h1>
          <div className='mobile_home_header_sub'>
            <div className='mobile_home_header_sub_line'/>
            <div className='mobile_home_header_sub_ellipse'>
              <div className='ellipse_1'></div>
              <div className='ellipse_2'/>
              <div className='ellipse_3'/>
            </div>
            <p className='mobile_home_header_sub_text'>international artist</p>
          </div>
        </div>
        <div className='mobile_home_footer'>
          <p className='mobile_home_footer_text_contact' style={{cursor: 'pointer'}}
          onClick={() => {setEmailForm(true)}}
          >Contact</p>
          <p className='mobile_home_footer_text' >All rights reserved</p>
          <a href='http://studiodarteonline.com/' style={{textDecoration: 'none'}}>
            <p className='mobile_home_footer_text_link' >studiodarteonline.com</p>
          </a>
          <p className='mobile_home_footer_text' >designed by Lawrence Sanzogni</p>
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

/*/----------------------- */

const ImageAnimation = () => {

  const imageList = [
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200221/FABIO/2016/Sanzogni_Starry_night_40_x_30_mixed_media_on_canvas_e806sj.jpg'
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200234/FABIO/2012/Time_1_acrylic_and_resin_on_aluminum_4_panel_48_x_96_p6pqmj.jpg'
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200225/FABIO/2016/Sanzogni_Palmistry_36_x_54_mixed_media_on_canvas_JPG_wtkzwh.png'
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200235/FABIO/2013/Sanzogni_Slum_city_mixed_media_on_aluminum_72_x_48_3_panels_znla3l.jpg'
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200270/FABIO/oil%20on%20canvas%20abstract/Sanzogni_Upswing_68_x_53_oil_on_canvas_hjufwm.jpg'
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200235/FABIO/2013/Sanzogni_Megalopolis_mixed_media_on_aluminum_4_panels_96_x_48_ihxsuc.jpg'
    }
  ]

    return (
      <div className='mobile_home_body'>{
        imageList.map((img, i) => {
          return (<img src={img.url} className={`img${i}`} /> )
        })
        }
      </div>)
}


export default MobileHome;