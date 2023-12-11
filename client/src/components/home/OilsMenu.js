import React, { useState } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';

const OilsMenu = ({ seriesSubList, setSubList, toggleSelect, XYRef, getXYRef }) => {

  const series = ['oils', 'mixed oils 2011', 'abstract'];

  const mapSeries = () => {
    let key = -1;
    return series.map((gallery) => {
      key ++;
      return <li key={key} onClick={(e) => {toggleSelect(e.target.innerText); getXYRef({...XYRef, x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y})}} className='series_item' >{gallery}</li>;
    })
  };

  const mountTransition = useTransition(seriesSubList['oils'], {
    from: {opacity: 0, y: 400 },
    enter: {opacity: 1, y: 0 },
    leave: {opacity: 0 },
    trail: 500
  });

  return mountTransition((style, item) =>
    item &&
      <animated.ul style={style} className='series_list'>
        {mapSeries()}
      </animated.ul>
  );

};

export default OilsMenu;