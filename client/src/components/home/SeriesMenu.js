import React, { useState } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';

const SeriesMenu= ({ seriesSubList, setSubList, toggleSelect }) => {

  const series = ['2008', '2012', '2013', '2014', '2016', 'tarot cards', 'petrogliphs'];

  const mapSeries = () => {
    let key = -1;
    return series.map((gallery) => {
      key ++;
      return <li key={key}  onClick={(e) => {toggleSelect(e.target.innerText)}} className='series_item' >{gallery}</li>;
    })
  };

  const mountTransition = useTransition(seriesSubList['series'], {
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

export default SeriesMenu;