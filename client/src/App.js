import React, { useState , useEffect} from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';
import '../dist/styles/styles.scss';
import Gallery from './components/gallery/Gallery.js';
import Home from './components/home/Home.js';
import MobileGallery from './Mobile/MobileGallery.js';
import MobileHome from './Mobile/MobileHome.js';

const App = () => {

  /*---------------STATE && HOOKS---------------*/

  useEffect(() => {
    handleSize();
  }, []);

  const [exhibits, selectExhibit] = useState(false);

  const [viewSize, getSize] = useState(window.innerWidth);

  const [XYRef, getXYRef] = useState({});

  const MobileView = viewSize <= 450;

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
      { exhibits ?
        ( MobileView  ? <MobileGallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount} XYRef={XYRef} getXYRef={getXYRef}/> :
        <Gallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount} XYRef={XYRef} getXYRef={getXYRef}/> )
        :
        ( MobileView  ? <MobileHome isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect} XYRef={XYRef} getXYRef={getXYRef}/> :
        <Home isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect} viewSize={viewSize} XYRef={XYRef} getXYRef={getXYRef}/> )
      }
        {/* { (() => {
          switch (exhibits) {
            case exhibits.length:
              return ( MobileView  ? <MobileGallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount}/> :
              <Gallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount}/> )
            default:
              return ( MobileView ? <MobileHome isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect}/> :
              <Home isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect} viewSize={viewSize}/> )
            break;
          }
        })()
      } */}
    </div>
  )
};

export default App;