import React, { useState , useEffect} from 'react';
import { animated, useSpring, useSprings } from '@react-spring/web';
import '../dist/styles/styles.scss';

import Footer from './Footer.js';
import Header from './Header.js';
import Gallery from './Gallery.js';

const App = () => {

  const [isHover, setHover] = useState(false);
  const [exhibits, selectExhibit] = useState(false);

  const handleHover = (key) => {
    setHover( prevState => ({...isHover, [key]: !prevState}))
  }

  const spring = useSpring({
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    to: {opacity: 1, x: 0}
  })

  const toggleSelect = (exhibit) => {
    selectExhibit({...exhibits, ['exhibit']: exhibit});
  }

  const mapGalleries = () => {
    const galleries = ['oils', 'copper plates', 'printings', 'early works', 'aluminum', 'series'];
    let key = 0;
    return galleries.map((gallery) => {
      key ++;
      return <li key={key} data-key={key} onClick={(e) => {toggleSelect(e.target.innerText)}}>{gallery}</li>
    })
  };


  if (exhibits) {
    return <Gallery exhibits={exhibits} selectExhibit={selectExhibit}/>;
  } else {
    return (
      <animated.div style={{...spring}} className='app'>
        <Header/>
        <div className='app_body'>
          <ul className='app_list'>
            {mapGalleries()}
          </ul>
          <div className='app_img_container'>
            <img className='app_img' src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg'/>
          </div>
          <div className='app_select'></div>
        </div>
        <Footer/>
      </animated.div>
    )
  }
};

export default App;