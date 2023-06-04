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

  const [liSpring, api] = useSpring(() => ({
      from: {color: '#808080'},
  }))

  const hoverOn = (key) => {
    console.log('key:', key)
    api.start({
      to: {color: 'blue', transition: '0.5s ease-in'}
    })
  }

  const hoverOff = (key) => {
    api.start({
      to: {color: '#808080', transition: '0.5s ease-in'}
    })
  }

  const toggleSelect = (exhibit) => {
    selectExhibit({...exhibits, ['exhibit']: exhibit});
  }

  const mapGalleries = () => {
    // const galleries = ['oils', 'copper plates', 'printings', 'early works', 'aluminum', 'series'];
    // let key = 0;
    // return galleries.map((gallery) => {
    //   key ++;
    //   return <animated.li onMouseEnter={(e) => {hoverOn(e.target.dataset.key); handleHover(e.target.dataset.key)}} onMouseLeave={(e) => {hoverOff; handleHover(e.target.dataset.key) }} style={{...liSpring}} key={key} data-key={key}>{gallery}</animated.li>
    // })
    const [liSpring, api] = useSprings(2, () => ({
      from: {color: '#808080'},
      to: {color: 'blue', transition: '0.5s ease-in'}
    }))

    const hoverOn = (key) => {
      console.log('key:', key)
      api.start({
        to: {color: 'blue', transition: '0.5s ease-in'}
      })
    }

    const hoverOff = (key) => {
      api.start({
        to: {color: '#808080', transition: '0.5s ease-in'}
      })
    }

    let key = 0;
//  return galleries.map((gallery) => {
//       key ++;
//     return (
//       {liSpring.map((props) => {
//         (<animated.div></animated.div>)
//       })}
//     );
//   })

    return (
      <div>
        {liSpring.map((props) => {
          return <animated.div onMouseOver={hoverOn} onMouseLeave={hoverOff}style={props} onClick={toggleSelect}>oils</animated.div>
        })}
      </div>
    )

  };


  if (exhibits) {
    return <Gallery exhibits={exhibits}/>;
  } else {
    return (
      <animated.div style={{...spring}} className='app'>
        <Header/>
        <div className='app_body'>
          <ul className='app_list'>
            {/* {mapGalleries()} */}
            <animated.li
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff}
            onClick={(e) => {toggleSelect(e.target.innerText)}}
            style={{...liSpring}}>oils</animated.li>
            <li onClick={(e) => {toggleSelect(e.target.innerText)}}>copper plates</li>
            <li>printings</li>
            <li onClick={(e) => {toggleSelect(e.target.innerText)}}>early works</li>
            <li>aluminum</li>
            <li>series</li>
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