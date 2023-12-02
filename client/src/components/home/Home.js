import React, { useState } from 'react';
import { animated, useSpring, useSprings, useTransition } from '@react-spring/web';
import Email from '../Email.js';
import SeriesMenu from './SeriesMenu.js';
import OilsMenu from './OilsMenu.js';

const Home = ({ isMounted, setMount, toggleSelect, viewSize }) => {

  // const [seriesSubList, setSubList] = useState(false);
  const [seriesSubList, setSubList] = useState({oils: false, series: false});

  /*------STATE:email------*/
  const [emailFormOpen, setEmailForm] = useState(false);

  const body = document.querySelector('body');

  const mapGalleries = () => {
    const galleries = ['oils', 'copper plates', 'printings', 'early works', 'aluminum', 'series'];
    let key = -1;
    return galleries.map((gallery) => {
      key ++;
      return gallery == 'series' ?
        <li key={galleries.length - 1} onClick={(e) => {setSubList(prevState => ({...seriesSubList, ['series']: !prevState['series']}))}}>series</li> :
          gallery === 'oils' ?
          <li key={galleries.length - 1} onClick={(e) => {setSubList(prevState => ({...seriesSubList, ['oils']: !prevState['oils']}))}}>oils</li> :
      <li key={key} data-key={key} onClick={(e) => {toggleSelect(e.target.innerText); setMount(false)}}>{gallery}</li>
    })
  };

  const transitions = useTransition(isMounted, {
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    enter: { x: 0, y: 0, opacity: 1, transition: '0.5s ease-in' },
    leave: { x: 200, y: 800, opacity: 0, transition: '0.5s ease-in' }
  });

  const Test_List = () => {

    /*
    const numbersList = [
      {item: 1, x: -500, color: 'red' },
      {item: 2, x: 500, color: 'blue' },
    ];

    const springTransitions = useTransition(numbersList.map(numberItem => ( {...numberItem, enterFrame: numberItem.x, numberColor: numberItem.color })), {
      from: ({ enterFrame, color }) => ({ opacity: 0, x: enterFrame, transition: '0.5s ease-in', color }),
      enter: { opacity: 1, x: 100, transition: '0.5s ease-in' },
      leave: { opacity: 1, transition: '0.5s ease-in' },
    });

    const animateListItems = () => {
      return  springTransitions((springStyles, state) => (
          <animated.li style={springStyles}>{state.item}</animated.li>
      ));
    }

    return <ul style={{position: 'absolute', width: '50vw', height: '50vh', border: 'solid'}}>{animateListItems()}</ul>

          Width | Height
    body: 1512      686
      1 : 511       461 => 33.8% | 67.2%
      2:  887       486 => 58.7% | 70.8%
      3:  794       610 => 52.5% | 88.9%
      4:  567       558 => 37.5% | 81.3%
      5:  459       496 => 30.4% | 72.3%
      6;  770       586 => 51%% |  86.4%
    */

    const imageList = [
      {
        url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200221/FABIO/2016/Sanzogni_Starry_night_40_x_30_mixed_media_on_canvas_e806sj.jpg',
        enterX: 0,
        inFrameX: 400,
        enterY: -200,
        inFrameY: 0,
        width: '33.8%',
        height:'67.2%',
        zIndex: 6
      },
      {
        url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200234/FABIO/2012/Time_1_acrylic_and_resin_on_aluminum_4_panel_48_x_96_p6pqmj.jpg',
        enterX: 500,
        inFrameX: 200,
        enterY: 0,
        inFrameY: 0,
        width: '58.7%',
        height:'70.8%',
        zIndex: 4
      },
      {
        url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200225/FABIO/2016/Sanzogni_Palmistry_36_x_54_mixed_media_on_canvas_JPG_wtkzwh.png',
        enterX: 500,
        inFrameX: 900,
        enterY: 0,
        inFrameY: 0,
        width: '52.5%',
        height:'88.9%',
        zIndex: 5
      },
      {
        url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200223/FABIO/2016/Sanzogni_Strainer_35_x_35_mixed_media_on_canvas_cncfxx.jpg',
        enterX: 500,
        inFrameX: 0,
        enterY: 0,
        inFrameY: 200,
        width: '37.5%',
        height:'81.3%',
        zIndex: 4
      },
      {
        url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200270/FABIO/oil%20on%20canvas%20abstract/Sanzogni_Upswing_68_x_53_oil_on_canvas_hjufwm.jpg',
        enterX: 500,
        inFrameX: 0,
        enterY: 0,
        inFrameY: 0,
        width: '30.4%',
        height:'72.3%',
        zIndex: 0
      },
      {
        url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200235/FABIO/2013/Sanzogni_Megalopolis_mixed_media_on_aluminum_4_panels_96_x_48_ihxsuc.jpg',
        enterX: 500,
        inFrameX: 0,
        enterY: 700,
        inFrameY: 0,
        width: '51%',
        height:'86.4%',
        zIndex: 0
      }
    ]

    const imageList_springTransitions = useTransition(imageList.map(image => ( {...image, enterFrameX: image.enterX, inFrameX: image.inFrameX, enterFrameY: image.enterY, inFrameY: image.inFrameY })), {
      from: ({ enterFrameX, color, enterFrameY }) => ({ opacity: 0, x: enterFrameX,y: enterFrameY, transition: '1s ease-in', color }),
      enter: (({ inFrameX, inFrameY }) => ({ opacity: 1, x: inFrameX, y: inFrameY, transition: '1s ease-in' })),
      leave: { opacity: 1, transition: '1s ease-in' },
    });

    const animateimageList = () => {
      return  imageList_springTransitions((springStyles, state) => (
          <animated.img src={state.url} style={{height: state.height, width: state.width, position: 'absolute', zIndex: state.zIndex, ...springStyles}}/>
      ));
    }


    return <div style={{position: 'absolute', width: '100vw', height: '73vh', border: 'solid', top: '16vh', overflow: 'hidden'}}>{animateimageList()}</div>

  }


  const mountSpring = () => {
  //                              | arg = [isMounted] React state
  //                              V
    return transitions((style, items) =>
      items &&
      <animated.div style={style} className='home'>
        <div className='home_header'>
          <h1 className='home_header_text'>FABIO SANZOGNI</h1>
          <div className='home_header_sub'>
            <div className='home_header_sub_line' />
            <div className='home_header_sub_ellipse'>
              <div className='ellipse_1'></div>
              <div className='ellipse_2'/>
              <div className='ellipse_3'/>
            </div>
            <p className='home_header_sub_text'>international artist</p>
          </div>
        </div>
        <div className='home_body'>
          <ul className='home_list'>
            {mapGalleries()}
          </ul>
          <OilsMenu seriesSubList={seriesSubList} setSubList={setSubList} toggleSelect={toggleSelect}/>
          <SeriesMenu seriesSubList={seriesSubList} setSubList={setSubList} toggleSelect={toggleSelect}/>
          <div className='home_img_container'>
            <img className='home_img' src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg'/>
          </div>
        </div>
        <Test_List/>
        <div className='home_footer'>
          <p className='footer_text_contact' onClick={() => {setEmailForm(true)}}>Contact</p>
          <p className='footer_text'>All rights reserved</p>
          <a href='http://studiodarteonline.com/' style={{textDecoration: 'none'}}>
            <p className='footer_text_link'>studiodarteonline.com</p>
          </a>
          <p className='footer_text'>designed by Lawrence Sanzogni</p>
        </div>
        {emailFormOpen && <Email setEmailForm={setEmailForm}/>}
      </animated.div>
    );
  }

  return (
    <div>
      {/* <button style={{zIndex: 4, position: 'absolute'}} onClick={() => {setMount((prevState) =>  {return !prevState; } )}}>setMount</button> */}
      {mountSpring()}
    </div>
  );

};

export default Home;