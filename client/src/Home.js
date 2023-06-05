import React, { useState , useEffect} from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';

const Home = ({ isMounted, setMount, toggleSelect }) => {


  const mapGalleries = () => {
    const galleries = ['oils', 'copper plates', 'printings', 'early works', 'aluminum', 'series'];
    let key = 0;
    return galleries.map((gallery) => {
      key ++;
      return <li key={key} data-key={key} onClick={(e) => {toggleSelect(e.target.innerText); setMount(false)}}>{gallery}</li>
    })
  };


  const transitions = useTransition(isMounted, {
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 200, y: 800, opacity: 0, transition: '0.5s ease-in' }
  });


  const mountSpring = () => {

    return transitions((style, items) =>
      items ?
      <animated.div style={style} className='home'>
        <div className='home_header'>
          <h1>FABIO SANZOGNI</h1>
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
          <div className='home_img_container'>
            <img className='home_img' src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg'/>
          </div>
          <div className='home_select'></div>
        </div>
        <div className='home_footer'></div>
      </animated.div>
      :
      ''
    );
  }

  return (
    <div>
      {mountSpring()}
    </div>
  )

};


export default Home;