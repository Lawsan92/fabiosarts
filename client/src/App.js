import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import '../dist/styles/styles.scss';

import Footer from './Footer.js';
import Header from './Header.js';

const App = () => {

  const spring = useSpring({
    from: { opacity: 0, transition: '0.5s ease-in' },
    to: {opacity: 1}
  })


  return (
    <animated.div style={{...spring}} className='app'>
      <Header/>
      <div className='app_body'>
        <ul>
          <li>oils</li>
          <li>copper plates</li>
          <li>printings</li>
          <li>early works</li>
          <li>aluminum</li>
          <li>series</li>
        </ul>
        <img src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200227/FABIO/2017/Sanzogni_Significance_14_36_x_48_silver_leaf_oil_on_canvas_mouygv.jpg'/>
      </div>
      <Footer/>
    </animated.div>
  )
};

export default App;