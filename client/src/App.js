import React, { useState , useEffect} from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';
import '../dist/styles/styles.scss';

import Gallery from './Gallery.js';
import Home from './Home.js';

const App = () => {

  /*---------------STATE && HOOKS---------------*/
  const [exhibits, selectExhibit] = useState(false);

  const spring = useSpring({
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    to: {opacity: 1, x: 0}
  })

  const [isMounted, setMount] = useState(true);

  const toggleSelect = (exhibit) => {
    selectExhibit({...exhibits, ['exhibit']: exhibit});
  }


  return (
    <div className="app">
      {/* <button onClick={() => {setMount(prevState => !prevState)}}>{isMounted ? 'unmount' : 'mount'}</button> */}
      {exhibits ?
        <Gallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount}/>
      :
      <Home isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect}/>
      }
    </div>
  )
};

export default App;