import React, { useState , useEffect } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';

const MobileHome = ({ isMounted, setMount, toggleSelect }) => {

  /*-----STATE: mobile list-----*/
  const [mobileListMounted, mountMobileList] = useState(false);

  const [seriesSubList, setSubList] = useState(false);

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
          <p className='footer_text' style={mobileStyles.home.footer} >Contact</p>
          <p className='footer_text' style={mobileStyles.home.footer}>All rights reserved</p>
          <p className='footer_text' style={mobileStyles.home.footer}>studiodarteonline.com</p>
          <p className='footer_text' style={mobileStyles.home.footer}>designed by Lawrence Sanzogni</p>
        </div>
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

export const MobileList = ({ toggleSelect, mountMobileList, mobileListMounted, setSubList, seriesSubList, setMount }) => {

  /*-----springs-----*/
  const listTransitions = useTransition(mobileListMounted, {
    from: { opacity: 0, transition: '0.5s ease-in', x: 200 },
    enter: { x: 0, y: 0, opacity: 1, transition: '0.5s ease-in' },
    leave: { x: -200, y: 800, opacity: 0, transition: '0.5s ease-in' }
  });

  const MountList = () => {
    return listTransitions (( style, itemState ) =>
      itemState &&
      <animated.ul className='mobile_home_list' style={{...style}}>
        {mapGalleries()}
        <SeriesMenu seriesSubList={seriesSubList} toggleSelect={toggleSelect}/>
        <button className='mobile_home_list_btn' onClick={() => {mountMobileList(false)}}>X</button>
      </animated.ul>
    );
  }

  /*-----maps-----*/
  const mapGalleries = () => {
    const galleries = ['oils', 'copper plates', 'printings', 'early works', 'aluminum', 'series'];
    let key = -1;
    return galleries.map((gallery) => {
      key ++;
      return gallery !== 'series' ?
      <li key={key} data-key={key} onClick={(e) =>  {toggleSelect(e.target.innerText)}}>{gallery}</li>
      :
      <li key={galleries.length - 1}onClick={() => {setSubList(prevState => !prevState)}}>series</li>
    })
  };

  /*-----jsx-----*/
  return MountList();
};

export const SeriesMenu= ({ seriesSubList, setSubList, toggleSelect }) => {

  const mountTransition = useTransition(seriesSubList, {
    from: {opacity: 0, y: 400 },
    enter: {opacity: 1, y: 0 },
    leave: {opacity: 0 },
    trail: 500
  });

  const mapSeries = () => {
    let key = -1;
    return series.map((gallery) => {
      key ++;
      return <li key={key}  onClick={(e) => {toggleSelect(e.target.innerText)}} className='series_item' >{gallery}</li>;
    })
  };

  const series = ['2008', '2012', '2013', '2014', '2016', 'tarot cards', 'petrogliphs'];

  return mountTransition((style, item) =>
    item &&
      <animated.ul style={style} className='mobile_series_list'>
      {mapSeries()}
    </animated.ul>
  );

};

export default MobileHome;