import React, { useState , useEffect } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';
import Email from '../Email.js';
import SeriesMenu from './SeriesMenu.js';
import OilsMenu from './OilsMenu.js';

const Home = ({ isMounted, setMount, toggleSelect, viewSize }) => {

  // const [seriesSubList, setSubList] = useState(false);
  const [seriesSubList, setSubList] = useState({oils: false, series: false});

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

  /*------STATE:email------*/
  const [emailFormOpen, setEmailForm] = useState(false);

  const transitions = useTransition(isMounted, {
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    enter: { x: 0, y: 0, opacity: 1, transition: '0.5s ease-in' },
    leave: { x: 200, y: 800, opacity: 0, transition: '0.5s ease-in' }
  });

  const mountSpring = () => {

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
      {mountSpring()}
    </div>
  );

};

export default Home;