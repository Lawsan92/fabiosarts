import React, { useState , useEffect} from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';
import '../dist/styles/styles.scss';
import Gallery from './Gallery.js';
import Home from './Home.js';
import MobileGallery from './MobileGallery.js';
import MobileHome from './MobileHome.js';

const App = () => {

  /*---------------STATE && HOOKS---------------*/

  useEffect(() => {
    handleSize();
  }, []);

  const [exhibits, selectExhibit] = useState(false);

  const [viewSize, getSize] = useState(window.innerWidth);

  const handleSize = (size) => {
    window.addEventListener('resize', () => {
      console.log('window.innerWidth:', window.innerWidth);
      getSize(window.innerWidth);
    })
  };


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
        ( viewSize <= 450 ? <MobileGallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount}/> : <Gallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount}/> )
        :
        ( viewSize <= 450 ? <MobileHome isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect}/> : <Home isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect} viewSize={viewSize}/> )
      }
    </div>
  )
};

export default App;