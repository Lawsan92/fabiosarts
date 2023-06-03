import React, { useState , useEffect} from 'react';
import { animated, useSpring, useSprings } from '@react-spring/web';
import '../dist/styles/styles.scss';
const axios = require('axios');

import Footer from './Footer.js';
import Header from './Header.js';

const App = () => {

  const [isHover, setHover] = useState(false);

  const getGallery = () => {
    axios({
      url: '/cloudinary',
      method: 'get'
    })
      .then((response) => {
        console.log('response:', response);
      })
      .catch((err) => {
        console.log('error:', err.stack)
      })
  }

  useEffect(() => {
    getGallery();
  }, [])

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
          return <animated.div onMouseOver={hoverOn} onMouseLeave={hoverOff}style={props}>oils</animated.div>
        })}
      </div>
    )

  };

  return (
    <animated.div style={{...spring}} className='app'>
      <Header/>
      <div className='app_body'>
        <ul>
          {mapGalleries()}
          {/* <animated.li onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{...liSpring}}>oils</animated.li>
          <li>copper plates</li>
          <li>printings</li>
          <li>early works</li>
          <li>aluminum</li>
          <li>series</li> */}
        </ul>
        <img src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg'/>
      </div>
      <Footer/>
    </animated.div>
  )
};

export default App;