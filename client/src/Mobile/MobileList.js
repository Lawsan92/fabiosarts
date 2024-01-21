import React, { useState } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';

const MobileList = ({ toggleSelect, mountMobileList, mobileListMounted, setSubList, seriesSubList, setMount }) => {

  /*-----Set background color for select screen------*/
  const body = document.querySelector('body');
  body.style.backgroundColor = '#808080'

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
        <OilsMenu seriesSubList={seriesSubList} toggleSelect={toggleSelect}/>
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
      return gallery == 'series' ?
        <li key={galleries.length - 1} onClick={(e) => {setSubList(prevState => ({...seriesSubList, ['series']: !prevState['series']}))}}>series</li> :
          gallery === 'oils' ?
          <li key={galleries.length - 1} onClick={(e) => {setSubList(prevState => ({...seriesSubList, ['oils']: !prevState['oils']}))}}>oils</li> :
      <li key={key} data-key={key} onClick={(e) => {toggleSelect(e.target.innerText); setMount(false)}}>{gallery}</li>
    })
  };

  /*-----jsx-----*/
  return MountList();
};

export const OilsMenu = ({ seriesSubList, setSubList, toggleSelect }) => {

  const series = ['oils', 'mixed oils 2011', 'abstract'];

  const mapSeries = () => {
    let key = -1;
    return series.map((gallery) => {
      key ++;
      return <li key={key}  onClick={(e) => {toggleSelect(e.target.innerText)}} className='series_item' style={{color: '#fff'}}>{gallery}</li>;
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
      <animated.ul style={style} className='mobile_series_list'>
      {mapSeries()}
    </animated.ul>
  );
};

export const SeriesMenu= ({ seriesSubList, setSubList, toggleSelect }) => {

  const mountTransition = useTransition(seriesSubList['series'], {
    from: {opacity: 0, y: 400 },
    enter: {opacity: 1, y: 0 },
    leave: {opacity: 0 },
    trail: 500
  });

  const mapSeries = () => {
    let key = -1;
    return series.map((gallery) => {
      key ++;
      return <li key={key}  onClick={(e) => {toggleSelect(e.target.innerText)}} className='series_item' style={{color: '#fff'}}>{gallery}</li>;
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

export default MobileList;