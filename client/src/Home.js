import React, { useState , useEffect } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';

const Home = ({ isMounted, setMount, toggleSelect, viewSize }) => {

  const [seriesSubList, setSubList] = useState(false);

  const body = document.querySelector('body');

  viewSize < 400 ?  body.style.backgroundImage = `url(https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg)` : '';

  const mapGalleries = () => {
    const galleries = ['oils', 'copper plates', 'printings', 'early works', 'aluminum', 'series'];
    let key = -1;
    return galleries.map((gallery) => {
      key ++;
      return gallery !== 'series' ?
      <li key={key} data-key={key} onClick={(e) => {toggleSelect(e.target.innerText); setMount(false)}}>{gallery}</li>
      :
      <li key={galleries.length - 1}onClick={() => {setSubList(prevState => !prevState)}}>series</li>
    })
  };

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
          <SeriesMenu seriesSubList={seriesSubList} setSubList={setSubList} toggleSelect={toggleSelect}/>
          <div className='home_img_container'>
            <img className='home_img' src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg'/>
          </div>
          <div className='home_select'>
            <ul className='home_select_menu'>
              <li className='home_select_item'></li>
              <li className='home_select_item'></li>
              <li className='home_select_item'></li>
              <li className='home_select_item'></li>
              <li className='home_select_item'></li>
              <li className='home_select_item'></li>
              <li className='home_select_item'></li>
            </ul>
          </div>
        </div>
        <div className='home_footer'>
          <p className='footer_text'>Contact</p>
          <p className='footer_text'>All rights reserved</p>
          <p className='footer_text'>studiodarteonline.com</p>
          <p className='footer_text'>designed by Lawrence Sanzogni</p>
        </div>
      </animated.div>
    );
  }

  return (
    <div>
      {mountSpring()}
    </div>
  );

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
      <animated.ul style={style} className='series_list'>
      {mapSeries()}
    </animated.ul>
  );

};

export default Home;