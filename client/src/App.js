import React, { useState , useEffect} from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';
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

  const [isMounted, setMount] = useState(true);
  const transitions = useTransition(isMounted, {
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 200, y: 800, opacity: 0, transition: '0.5s ease-in' }
  });


  const mountSpring = () => {
    return transitions((style, items) =>
      items ?
      <animated.div style={style} className='home'>
        <Header/>
        <div className='home_body'>
          <ul className='home_list'>
            {mapGalleries()}
          </ul>
          <div className='home_img_container'>
            <img className='home_img' src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg'/>
          </div>
          <div className='home_select'></div>
        </div>
        <Footer/>
      </animated.div>
      :
      ''
    )
  }


  const toggleSelect = (exhibit) => {
    selectExhibit({...exhibits, ['exhibit']: exhibit});
  }

  const mapGalleries = () => {
    const galleries = ['oils', 'copper plates', 'printings', 'early works', 'aluminum', 'series'];
    let key = 0;
    return galleries.map((gallery) => {
      key ++;
      return <li key={key} data-key={key} onClick={(e) => {toggleSelect(e.target.innerText); setMount(false)}}>{gallery}</li>
    })
  };


  return (
    <div className="app">
      {/* <button onClick={() => {setMount(prevState => !prevState)}}>{isMounted ? 'unmount' : 'mount'}</button> */}
      {exhibits ?
        <Gallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount}/>
      :
    mountSpring()
      }
    </div>
  )
};

export default App;